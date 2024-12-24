import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import Clerk from "@clerk/backend"

// Initialize Clerk with your API key
const clerk = Clerk({ apiKey: process.env.CLERK_SECRET_KEY })

// Utility function to verify Clerk sessions
async function verifyClerkSession(ctx) {
    const authHeader = ctx.request.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ConvexError("Unauthorized")
    }

    const token = authHeader.split(" ")[1]
    try {
        const session = await clerk.sessions.verifySession(token)
        return session.userId // Return the Clerk user ID
    } catch (error) {
        console.error("Clerk session verification failed:", error)
        throw new ConvexError("Unauthorized")
    }
}

export const createConversation = mutation({
    args: {
        participants: v.array(v.id("users")),
        isGroup: v.boolean(),
        groupName: v.optional(v.string()),
        groupImage: v.optional(v.id("_storage")),
        admin: v.optional(v.id("users")),
    },
    handler: async (ctx, args) => {
        const userId = await verifyClerkSession(ctx)

        // Verify if participants exist in the database
        const existingConversation = await ctx.db
            .query("conversations")
            .filter((q) =>
                q.or(
                    q.eq(q.field("participants"), args.participants),
                    q.eq(q.field("participants"), args.participants.reverse()),
                ),
            )
            .first()

        if (existingConversation) {
            return existingConversation._id
        }

        let groupImage
        if (args.groupImage) {
            groupImage = (await ctx.storage.getUrl(args.groupImage)) as string
        }

        const conversationId = await ctx.db.insert("conversations", {
            participants: args.participants,
            isGroup: args.isGroup,
            groupName: args.groupName,
            groupImage,
            admin: args.admin,
        })

        return conversationId
    },
})

export const getMyConversations = query({
    args: {},
    handler: async (ctx, args) => {
        const clerkUserId = await verifyClerkSession(ctx)

        // Find the Convex user matching the Clerk user ID
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), clerkUserId))
            .unique()

        if (!user) throw new ConvexError("User not found")

        // Fetch all conversations involving the user
        const conversations = await ctx.db.query("conversations").collect()
        const myConversations = conversations.filter((conversation) =>
            conversation.participants.includes(user._id),
        )

        const conversationsWithDetails = await Promise.all(
            myConversations.map(async (conversation) => {
                let userDetails = {}

                if (!conversation.isGroup) {
                    const otherUserId = conversation.participants.find(
                        (id) => id !== user._id,
                    )
                    const userProfile = await ctx.db
                        .query("users")
                        .filter((q) => q.eq(q.field("_id"), otherUserId))
                        .take(1)

                    userDetails = userProfile[0]
                }

                const lastMessage = await ctx.db
                    .query("messages")
                    .filter((q) =>
                        q.eq(q.field("conversation"), conversation._id),
                    )
                    .order("desc")
                    .take(1)

                return {
                    ...userDetails,
                    ...conversation,
                    lastMessage: lastMessage[0] || null,
                }
            }),
        )

        return conversationsWithDetails
    },
})

export const kickUser = mutation({
    args: {
        conversationId: v.id("conversations"),
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const userId = await verifyClerkSession(ctx)

        const conversation = await ctx.db
            .query("conversations")
            .filter((q) => q.eq(q.field("_id"), args.conversationId))
            .unique()

        if (!conversation) throw new ConvexError("Conversation not found")

        await ctx.db.patch(args.conversationId, {
            participants: conversation.participants.filter(
                (id) => id !== args.userId,
            ),
        })
    },
})

export const generateUploadUrl = mutation(async (ctx) => {
    await verifyClerkSession(ctx) // Verify session before generating upload URL
    return await ctx.storage.generateUploadUrl()
})
