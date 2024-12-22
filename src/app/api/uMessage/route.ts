import { onAuthenticatedUser } from "@/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export async function POST(request: Request) {
    try {
        // Authenticate user
        const clerk = await currentUser()
        if (!clerk) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const localUser = await onAuthenticatedUser()
        if (!localUser) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Parse request body
        const body = await request.json()
        const { message, image, video, conversationId } = body

        // Validate required fields
        if (!message || !conversationId) {
            return new NextResponse("Missing message or conversationId", { status: 400 })
        }

        // Create the new message
        const newMessage = await client.chat.create({
            data: {
                body: message,
                image,
                video,
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

        // Update conversation with the new message
        const updatedConversation = await client.conversation.update({
            where: { id: conversationId },
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

        // Trigger message:new event
        await pusherServer.trigger(conversationId, "messages:new", newMessage)

        // Send update to each user in the conversation
        const lastMessage = updatedConversation.chats[updatedConversation.chats.length - 1]
        const userEmails = updatedConversation.users.map(user => user.email)
        
        for (const email of userEmails) {
            await pusherServer.trigger(email!, "conversation:update", {
                id: conversationId,
                chats: [lastMessage],
            })
        }

        return NextResponse.json(newMessage)
    } catch (error: any) {
        console.log(error, "ERROR_MESSAGES")
        return new NextResponse("Internal Error", { status: 500 })
    }
                }
