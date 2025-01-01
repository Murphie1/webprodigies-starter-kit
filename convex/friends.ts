import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFriend = mutation({
	args: {
		email: v.string(),
    clerkId: v.string(),
	},
	handler: async (ctx, args) => {

    const current = await ctx.db
    .query("users")
    	.filter((q) => q.eq(q.field("clerkId"), args.clerkId)
      .unique();

    if (!current) throw new ConvexError("User not found");

    const otheruser = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("email"), args.email))
			.unique();

		if (!otheruser) throw new ConvexError("User not found");

		const existingFriend = await ctx.db
			.query("friends")
			.filter(
				q.and(
					q.eq(q.field("friend"), otheruser),
					q.eq(q.field("user"), current)
				)
			)
			.first();

		if (existingFriend) {
			return existingFriend._id;
		}

		const FriendId = await ctx.db.insert("friends", {
			user: current,
			friend: otheruser,
			creatorClerkId: args.clerkId,
		});

		return FriendId;
	},
});

export const getMyFriends = query({
	args: { clerkId: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerkId"), args.clerkId))
			.unique();

		if (!user) throw new ConvexError("User not found");

		const friends = await ctx.db.query("friends").collect();

		const myConversations = conversations.filter((conversation) => {
			return friend.creatorClerkId === (args.clerkId);
		});
