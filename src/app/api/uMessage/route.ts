import { onAuthenticatedUser } from "@/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export async function POST(request: Request) {
    try {
        const clerk = await currentUser()
        if (!clerk) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const localUser = await onAuthenticatedUser()
        if (!localUser) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await request.json()
        const { message, image, conversationId } = body

        if (!localUser?.id || !clerk.emailAddresses[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const newMessage = await client.chat.create({
            data: {
                body: message,
                image: image,
                video: video,
                conversation: {
                    connect: {
                        id: conversationId,
                    },
                },
                sender: {
                    connect: {
                        id: localUser.id,
                    },
                },
                seen: {
                    connect: {
                        id: localUser.id,
                    },
                },
            },
            include: {
                seen: true,
                sender: true,
            },
        })

        const updatedConversation = await client.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                chats: {
                    connect: {
                        id: newMessage.id,
                    },
                },
            },
            include: {
                users: true,
                chats: {
                    include: {
                        seen: true,
                    },
                },
            },
        })

        await pusherServer.trigger(conversationId, "messages:new", newMessage)

        const lastMessage =
            updatedConversation.chats[updatedConversation.chats.length - 1]

        updatedConversation.users.map((user) => {
            pusherServer.trigger(user.email!, "conversation:update", {
                id: conversationId,
                chats: [lastMessage],
            })
        })

        return NextResponse.json(newMessage)
    } catch (error: any) {
        console.log(error, "ERROR_MESSAGES")
        return new NextResponse("InternalError", { status: 500 })
    }
}
