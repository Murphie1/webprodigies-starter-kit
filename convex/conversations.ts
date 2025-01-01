import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createConversation = mutation({
	args: {
		participants: v.array(v.id("users")),
		isGroup: v.boolean(),
		groupName: v.optional(v.string()),
		groupImage: v.optional(v.id("_storage")),
		admin: v.optional(v.id("users")),
	},
	handler: async (ctx, args) => {
		try {
			console.log("Searching for existing conversation...");
			const existingConversation = await ctx.db
				.query("conversations")
				.filter((q) =>
					q.or(
						q.eq(q.field("participants"), args.participants),
						q.eq(q.field("participants"), args.participants.slice().reverse())
					)
				)
				.first();

			if (existingConversation) {
				console.log("Existing conversation found:", existingConversation._id);
				return existingConversation._id;
			}

			let groupImageUrl;
			if (args.groupImage) {
				try {
					groupImageUrl = await ctx.storage.getUrl(args.groupImage);
				} catch (err) {
					console.error("Error retrieving group image URL:", err);
					throw new Error("Failed to retrieve group image URL.");
				}
			}

			console.log("Inserting new conversation...");
			const conversationId = await ctx.db.insert("conversations", {
				participants: args.participants,
				isGroup: args.isGroup,
				groupName: args.groupName,
				groupImage: groupImageUrl,
				admin: args.admin,
			});

			if (!conversationId) {
				throw new Error("Failed to create a new conversation.");
			}

			console.log("New conversation created:", conversationId);
			return conversationId;
		} catch (err) {
			console.error("Error in createConversation mutation:", err);
			throw new Error("Failed to create conversation.");
		}
	},
});

export const getMyConversations = query({
	args: { clerkId: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerkId"), args.clerkId))
			.unique();

		if (!user) throw new ConvexError("User not found");

		const conversations = await ctx.db.query("conversations").collect();

		const myConversations = conversations.filter((conversation) => {
			return conversation.participants.includes(user._id);
		});

		const conversationsWithDetails = await Promise.all(
			myConversations.map(async (conversation) => {
				let userDetails = {};

				if (!conversation.isGroup) {
					const otherUserId = conversation.participants.find((id) => id !== user._id);
					const userProfile = await ctx.db
						.query("users")
						.filter((q) => q.eq(q.field("_id"), otherUserId))
						.take(1);

					userDetails = userProfile[0];
				}

				const lastMessage = await ctx.db
					.query("messages")
					.filter((q) => q.eq(q.field("conversation"), conversation._id))
					.order("desc")
					.take(1);

				// return should be in this order, otherwise _id field will be overwritten
				return {
					...userDetails,
					...conversation,
					lastMessage: lastMessage[0] || null,
				};
			})
		);

		return conversationsWithDetails;
	},
});

export const kickUser = mutation({
	args: {
		conversationId: v.id("conversations"),
		userId: v.id("users"),
	},
	handler: async (ctx, args) => {
		
		const conversation = await ctx.db
			.query("conversations")
			.filter((q) => q.eq(q.field("_id"), args.conversationId))
			.unique();

		if (!conversation) throw new ConvexError("Conversation not found");

		await ctx.db.patch(args.conversationId, {
			participants: conversation.participants.filter((id) => id !== args.userId),
		});
	},
});

export const generateUploadUrl = mutation(async (ctx) => {
	return await ctx.storage.generateUploadUrl();
});
