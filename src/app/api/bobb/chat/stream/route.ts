import { submitQuestion } from "@/lib/bobb/langgraph";
import { api } from "~/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { getConvexClient } from "@/lib/bobb/convex";
import {
  ChatRequestBody,
  StreamMessage,
  StreamMessageType,
} from "@/lib/bobb/types";

export const runtime = "edge";

async function sendSSEMessage(
  writer: WritableStreamDefaultWriter<Uint8Array>,
  data: StreamMessage
) {
  const encoder = new TextEncoder();
  await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
}

export async function POST(req: Request) {
  const user = await auth();
  if (!user?.userId) return new Response("Unauthorized", { status: 401 });

  try {
    const { messages, newMessage, chatId } =
      (await req.json()) as ChatRequestBody;
    const convex = getConvexClient();

    // Open SSE stream
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Prepare response
    const response = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });

    (async () => {
      try {
        await sendSSEMessage(writer, { type: StreamMessageType.Connected });

        // Save user message in Convex
        await convex.mutation(api.aimessages.send, { chatId, content: newMessage });

        // Convert messages to LangChain format
        const langChainMessages = [
          ...messages.map((msg) =>
            msg.role === "user" ? new HumanMessage(msg.content) : new AIMessage(msg.content)
          ),
          new HumanMessage(newMessage),
        ];

        // Stream AI response
        for await (const event of await submitQuestion(langChainMessages, chatId)) {
          if (event.event === "on_chat_model_stream") {
            const text = event.data.chunk?.content?.[0]?.text;
            if (text) await sendSSEMessage(writer, { type: StreamMessageType.Token, token: text });
          }
        }

        // Close stream
        await sendSSEMessage(writer, { type: StreamMessageType.Done });
      } catch (error) {
        console.error("Stream error:", error);
        await sendSSEMessage(writer, {
          type: StreamMessageType.Error,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        writer.close();
      }
    })();

    return response;
  } catch (error) {
    console.error("API error:", error);
    return new Response("Failed to process request", { status: 500 });
  }
            }
