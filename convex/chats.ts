import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createChat = mutation({
  args: {
    title: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerkId"), args.clerkId))
			.unique();

		if (!user) throw new ConvexError("User not found");
    

    const chat = await ctx.db.insert("chats", {
      title: args.title,
      userId: user._id,
      createdAt: Date.now(),
    });

    return chat;
  },
});

export const listChats = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx) => {
    const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerkId"), args.clerkId))
			.unique();

		if (!user) throw new ConvexError("User not found");
    

    const chats = await ctx.db
      .query("chats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return chats;
  },
});

export const deleteChat = mutation({
  args: { 
        id: v.id("chats"),
        clerkId: v.string(),
        },
  handler: async (ctx, args) => {
    const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerkId"), args.clerkId))
			.unique();

		if (!user) throw new ConvexError("User not found");
    

    const chat = await ctx.db.get(args.id);
    if (!chat || chat.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    // Delete all messages in the chat
    const messages = await ctx.db
      .query("aimessages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.id))
      .collect();

    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    // Delete the chat
    await ctx.db.delete(args.id);
  },
});

export const getChat = query({
  args: { id: v.id("chats"), clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerkId"), args.clerkId))
			.unique();

		if (!user) throw new ConvexError("User not found");
      
    try {
      const chat = await ctx.db.get(args.id);

      // Return null if chat doesn't exist or user is not authorized
      if (!chat || chat.userId !== user._id) {
        console.log("❌ Chat not found or unauthorized", {
          chatExists: !!chat,
          chatUserId: chat?.userId,
          requestUserId: user._id,
        });
        return null;
      }

      console.log("✅ Chat found and authorized");
      return chat;
    } catch (error) {
      console.error("🔥 Error in getChat:", error);
      return null;
    }
  },
});
