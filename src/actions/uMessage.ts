import { client } from "@/lib/prismad"
import { onAuthenticatedUser } from "./auth"
import { currentUser } from "@clerk/nextjs/server"

export const getFriends = async () => {
    const localUser = await onAuthenticatedUser()
    if (!localUser || localUser.id) {
        return []
    }
    const clerk = await currentUser()

    if (!clerk || !clerk.emailAddresses[0]?.emailAddress) {
        return []
    }

    try {
        const friends = await client.friend.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                userIds: {
                    has: localUser.id, // Check if the array includes localUser.id
                },
            },
        })

        return friends
    } catch (error: any) {
        console.error("Error fetching friends:", error)
        return []
    }
}

export const getMessages = async (conversationId: string) => {
    try {
        const messages = await client.chat.findMany({
            where: {
                conversationId: conversationId,
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        })

        return messages
    } catch (error: any) {
        return []
    }
}

export const getConversations = async () => {
    const localUser = await onAuthenticatedUser()

    if (!localUser || !localUser.id) {
        return []
    }

    try {
        const conversations = await client.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc",
            },
            where: {
                userIds: {
                    has: localUser.id,
                },
            },
            include: {
                users: true,
                chats: {
                    include: {
                        sender: true,
                        seen: true,
                    },
                },
            },
        })

        return conversations
    } catch (error: any) {
        return []
    }
}

export const getConversationById = async (conversationId: string) => {
    try {
        const clerk = await currentUser()

        if (!clerk || !clerk.emailAddresses[0]?.emailAddress) {
            return null
        }

        const conversation = await client.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
            },
        })

        return conversation
    } catch (error: any) {
        return null
    }
}

export const getRequests = async () => {
    const localUser = await onAuthenticatedUser()
    if (!localUser || localUser.id) {
        return []
    }
    const clerk = await currentUser()

    if (!clerk || !clerk.emailAddresses[0]?.emailAddress) {
        return []
    }

    try {
        const friendrequests = await client.friendrequest.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                userIds: {
                    has: localUser.id, // Check if the array includes localUser.id
                },
            },
        })

        return friendrequests
    } catch (error: any) {
        console.error("Error fetching friendrequests:", error)
        return []
    }
}
