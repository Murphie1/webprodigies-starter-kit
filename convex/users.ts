import { ConvexError, v } from "convex/values"
import { internalMutation, query } from "./_generated/server"
import Clerk from "@clerk/backend"

// Initialize Clerk with your secret key
const clerk = Clerk({ apiKey: process.env.CLERK_API_KEY })

// Utility function to validate Clerk session
async function getClerkUserFromSession(ctx) {
    const sessionToken = ctx.req.headers["authorization"]?.replace(
        "Bearer ",
        "",
    )

    if (!sessionToken) {
        throw new ConvexError("Unauthorized: No session token provided")
    }

    try {
        const session = await clerk.sessions.verifySession(sessionToken)
        const clerkUserId = session.userId

        // Fetch the user from your database using the Clerk user ID
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), clerkUserId))
            .unique()

        if (!user) {
            throw new ConvexError("Unauthorized: User not found in database")
        }

        return user
    } catch (error) {
        throw new ConvexError("Unauthorized: Invalid or expired session")
    }
}

// Queries and mutations
export const getUserById = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique()

        if (!user) {
            throw new ConvexError("User not found")
        }

        return user
    },
})

export const getUsers = query({
    args: {},
    handler: async (ctx) => {
        const currentUser = await getClerkUserFromSession(ctx)

        const users = await ctx.db.query("users").collect()
        return users.filter((user) => user.clerkId !== currentUser.clerkId)
    },
})

export const getMe = query({
    args: {},
    handler: async (ctx) => {
        return await getClerkUserFromSession(ctx)
    },
})

export const getGroupMembers = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        const currentUser = await getClerkUserFromSession(ctx)

        const conversation = await ctx.db
            .query("conversations")
            .filter((q) => q.eq(q.field("_id"), args.conversationId))
            .first()
        if (!conversation) {
            throw new ConvexError("Conversation not found")
        }

        const users = await ctx.db.query("users").collect()
        return users.filter((user) =>
            conversation.participants.includes(user._id),
        )
    },
})

export const createUser = internalMutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            clerkId: args.clerkId,
            email: args.email,
            imageUrl: args.imageUrl,
            name: args.name,
            isOnline: true,
        })
    },
})

export const updateUser = internalMutation({
    args: {
        clerkId: v.string(),
        imageUrl: v.string(),
        email: v.string(),
    },
    async handler(ctx, args) {
        const currentUser = await getClerkUserFromSession(ctx)

        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique()

        if (!user) {
            throw new ConvexError("User not found")
        }

        await ctx.db.patch(user._id, {
            imageUrl: args.imageUrl,
            email: args.email,
        })

        const podcast = await ctx.db
            .query("podcasts")
            .filter((q) => q.eq(q.field("authorId"), args.clerkId))
            .collect()

        await Promise.all(
            podcast.map(async (p) => {
                await ctx.db.patch(p._id, {
                    authorImageUrl: args.imageUrl,
                })
            }),
        )
    },
})

export const deleteUser = internalMutation({
    args: { clerkId: v.string() },
    async handler(ctx, args) {
        const currentUser = await getClerkUserFromSession(ctx)

        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique()

        if (!user) {
            throw new ConvexError("User not found")
        }

        await ctx.db.delete(user._id)
    },
})

export const setUserOnline = internalMutation({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const currentUser = await getClerkUserFromSession(ctx)

        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique()

        if (!user) {
            throw new ConvexError("User not found")
        }

        await ctx.db.patch(user._id, { isOnline: true })
    },
})

export const setUserOffline = internalMutation({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const currentUser = await getClerkUserFromSession(ctx)

        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique()

        if (!user) {
            throw new ConvexError("User not found")
        }

        await ctx.db.patch(user._id, { isOnline: false })
    },
})
export const getTopUserByPodcastCount = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").collect()

        const userData = await Promise.all(
            user.map(async (u) => {
                const podcasts = await ctx.db
                    .query("podcasts")
                    .filter((q) => q.eq(q.field("authorId"), u.clerkId))
                    .collect()

                const sortedPodcasts = podcasts.sort(
                    (a, b) => b.views - a.views,
                )

                return {
                    ...u,
                    totalPodcasts: podcasts.length,
                    podcast: sortedPodcasts.map((p) => ({
                        podcastTitle: p.podcastTitle,
                        podcastId: p._id,
                    })),
                }
            }),
        )

        return userData.sort((a, b) => b.totalPodcasts - a.totalPodcasts)
    },
})
