import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    podcasts: defineTable({
        user: v.id("users"),
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioUrl: v.optional(v.string()),
        audioStorageId: v.optional(v.id("_storage")),
        imageUrl: v.optional(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
        author: v.string(),
        authorId: v.string(),
        authorImageUrl: v.string(),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        audioDuration: v.number(),
        views: v.number(),
    })
        .searchIndex("search_author", { searchField: "author" })
        .searchIndex("search_title", { searchField: "podcastTitle" })
        .searchIndex("search_body", { searchField: "podcastDescription" }),
    users: defineTable({
        email: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        name: v.string(),
        isOnline: v.boolean(),
    }).index("by_clerkId", ["clerkId"]),

    conversations: defineTable({
        participants: v.array(v.id("users")),
        isGroup: v.boolean(),
        groupName: v.optional(v.string()),
        groupImage: v.optional(v.string()),
        admin: v.optional(v.id("users")),
    }),

    messages: defineTable({
        conversation: v.id("conversations"),
        sender: v.string(), // should be string so that it doesn't throw errors in openai part ("ChatGPT")
        content: v.string(),
        messageType: v.union(
            v.literal("text"),
            v.literal("image"),
            v.literal("video"),
        ),
    }).index("by_conversation", ["conversation"]),
})
