import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import Clerk from "@clerk/backend";

// Initialize Clerk with your secret key
const clerk = Clerk({ apiKey: process.env.CLERK_API_KEY });

// Utility function to validate Clerk session
async function getClerkUserFromSession(ctx) {
  const sessionToken = ctx.req.headers["authorization"]?.replace("Bearer ", "");

  if (!sessionToken) {
    throw new ConvexError("Unauthorized: No session token provided");
  }

  try {
    const session = await clerk.sessions.verifySession(sessionToken);
    const clerkUserId = session.userId;

    // Fetch the user from your database using the Clerk user ID
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkUserId))
      .unique();

    if (!user) {
      throw new ConvexError("Unauthorized: User not found in database");
    }

    return user;
  } catch (error) {
    throw new ConvexError("Unauthorized: Invalid or expired session");
  }
}

export const sendTextMessage = mutation({
  args: {
    sender: v.string(),
    content: v.string(),
    conversation: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const user = await getClerkUserFromSession(ctx);

    const conversation = await ctx.db
      .query("conversations")
      .filter((q) => q.eq(q.field("_id"), args.conversation))
      .first();

    if (!conversation) {
      throw new ConvexError("Conversation not found");
    }

    if (!conversation.participants.includes(user._id)) {
      throw new ConvexError("You are not part of this conversation");
    }

    await ctx.db.insert("messages", {
      sender: args.sender,
      content: args.content,
      conversation: args.conversation,
      messageType: "text",
    });

    if (args.content.startsWith("@hakima")) {
      await ctx.scheduler.runAfter(0, api.openaitwo.chat, {
        messageBody: args.content,
        conversation: args.conversation,
      });
    }

    if (args.content.startsWith("~hakima")) {
      await ctx.scheduler.runAfter(0, api.openaitwo.dall_e, {
        messageBody: args.content,
        conversation: args.conversation,
      });
    }
  },
});

export const sendHakimaMessage = mutation({
  args: {
    content: v.string(),
    conversation: v.id("conversations"),
    messageType: v.union(v.literal("text"), v.literal("image")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      content: args.content,
      sender: "Hakima",
      messageType: args.messageType,
      conversation: args.conversation,
    });
  },
});

export const getMessages = query({
  args: {
    conversation: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const user = await getClerkUserFromSession(ctx);

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversation", args.conversation))
      .collect();

    const userProfileCache = new Map();

    const messagesWithSender = await Promise.all(
      messages.map(async (message) => {
        if (message.sender === "Hakima") {
          const image = message.messageType === "text" ? "/gpt.png" : "dall-e.png";
          return { ...message, sender: { name: "Hakima", image } };
        }

        let sender;
        if (userProfileCache.has(message.sender)) {
          sender = userProfileCache.get(message.sender);
        } else {
          sender = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), message.sender))
            .first();
          userProfileCache.set(message.sender, sender);
        }

        return { ...message, sender };
      })
    );

    return messagesWithSender;
  },
});

export const sendImage = mutation({
  args: { imgId: v.id("_storage"), sender: v.id("users"), conversation: v.id("conversations") },
  handler: async (ctx, args) => {
    const user = await getClerkUserFromSession(ctx);

    const content = (await ctx.storage.getUrl(args.imgId)) as string;

    await ctx.db.insert("messages", {
      content,
      sender: args.sender,
      messageType: "image",
      conversation: args.conversation,
    });
  },
});

export const sendVideo = mutation({
  args: { videoId: v.id("_storage"), sender: v.id("users"), conversation: v.id("conversations") },
  handler: async (ctx, args) => {
    const user = await getClerkUserFromSession(ctx);

    const content = (await ctx.storage.getUrl(args.videoId)) as string;

    await ctx.db.insert("messages", {
      content,
      sender: args.sender,
      messageType: "video",
      conversation: args.conversation,
    });
  },
});
