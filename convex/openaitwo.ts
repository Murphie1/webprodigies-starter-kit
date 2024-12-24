import OpenAI from "openai"
import { action } from "./_generated/server"
import { v } from "convex/values"
import { api } from "./_generated/api"

const apiKey = process.env.MESSAGE_OPENAI_API_KEY
const openai = new OpenAI({ apiKey })

export const chat = action({
    args: {
        messageBody: v.string(),
        conversation: v.id("conversations"),
    },
    handler: async (ctx, args) => {
        const res = await openai.chat.completions.create({
            model: "gpt-4o", // "gpt-4" also works, but is so slow!
            messages: [
                {
                    role: "system",
                    content:
                        "You are a terse bot in a group chat responding to questions with typically short answers, unless the question requires a longer answer",
                },
                {
                    role: "user",
                    content: args.messageBody,
                },
            ],
        })

        const messageContent = res.choices[0].message.content

        await ctx.runMutation(api.messages.sendHakimaMessage, {
            content:
                messageContent ?? "I'm sorry, I don't have a response for that",
            conversation: args.conversation,
            messageType: "text",
        })
    },
})

export const dall_e = action({
    args: {
        conversation: v.id("conversations"),
        messageBody: v.string(),
    },
    handler: async (ctx, args) => {
        const res = await openai.images.generate({
            model: "dall-e-3",
            prompt: args.messageBody,
            n: 1,
            size: "1024x1024",
        })

        const imageUrl = res.data[0].url
        await ctx.runMutation(api.messages.sendHakimaMessage, {
            content: imageUrl ?? "/gpt.png",
            conversation: args.conversation,
            messageType: "image",
        })
    },
})
