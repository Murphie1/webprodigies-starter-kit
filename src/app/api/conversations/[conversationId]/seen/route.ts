import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { onAuthenticatedUser } from "@/actions/auth";
import { client } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  conversationId?: string;
};

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const localUser = await onAuthenticatedUser();
    if (!localUser) {
       return new NextResponse('Unauthorized', { status: 401});
    }
    const clerk = await currentUser();
    if (!clerk) {
      return new NextResponse('Unauthorized', { status: 401});
    }
    const {
      conversationId
    } = params;

    if (!localUser?.id || !clerk.emailAddresses[0]?.emailAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    // Find the existing conversation
    const conversation = await client.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        chats: {
          include: {
            seen: true,
          }
        },
        users: true,
      }
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Find the last message
    const lastMessage = conversation.chats[conversation.chats.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // Update seen of last message
    const updatedMessage = await client.chat.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true
      },
      data: {
        seen: {
          connect: {
            id: localUser.id
          }
        }
      }
    });

    await pusherServer.trigger(clerk.emailAddresses[0]?.emailAddress, 'conversation:update', {
      id: conversationId,
      chats: [updatedMessage]
    });

    if (lastMessage.seenIds.indexOf(localUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(conversationId!, 'message:update', updatedMessage);

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse("Internal Error", { status: 500 });
  }
      }
