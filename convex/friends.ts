import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFriend = mutation({
  args: {
    email: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, clerkId } = args;

    // Find the current user by clerkId
    const currentUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    if (!currentUser) {
      return { success: false, message: "Current user not found" };
    }

    // Find the other user by email
    const otherUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .unique();

    if (!otherUser) {
      // Return a controlled response for non-existent otherUser
      return { success: false, message: "User with the provided email not found" };
    }

    // Check if the friendship already exists
    const existingFriend = await ctx.db
      .query("friends")
      .filter(
        q.and(
          q.eq(q.field("friend"), otherUser._id),
          q.eq(q.field("user"), currentUser._id)
        )
      )
      .first();

    if (existingFriend) {
      return { success: true, message: "Friendship already exists", friendId: existingFriend._id };
    }

    // Create a new friendship
    const friendId = await ctx.db.insert("friends", {
      user: currentUser._id,
      friend: otherUser._id,
      creatorClerkId: clerkId,
    });

    return { success: true, message: "Friendship created successfully", friendId };
  },
});

export const getMyFriends = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const { clerkId } = args;

    // Find the user by clerkId
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    if (!user) throw new ConvexError("User not found");

    // Fetch all friends where creatorClerkId matches
    const friends = await ctx.db
      .query("friends")
      .filter((q) => q.eq(q.field("creatorClerkId"), clerkId))
      .collect();

    // Fetch detailed info about each friend
    const friendDetails = await Promise.all(
      friends.map(async (friend) => {
        const friendUser = await ctx.db.get(friend.friend); // Fetch friend data by ID
        return { ...friend, friendDetails: friendUser };
      })
    );

    return friendDetails;
  },
});

//export const getMyFriends = query({
  //args: { clerkId: v.string() },
  //handler: async (ctx, args) => {
    //const { clerkId } = args;

    // Find the user by clerkId
   // const user = await ctx.db
     // .query("users")
     // .filter((q) => q.eq(q.field("clerkId"), clerkId))
     // .unique();

    //if (!user) throw new ConvexError("User not found");

    // Fetch all friends where creatorClerkId matches
    //const friends = await ctx.db
     // .query("friends")
      //.filter((q) => q.eq(q.field("creatorClerkId"), clerkId))
      //.collect();

   // return friends;
  //},
//});

//export const createFriend = mutation({
  //args: {
   // email: v.string(),
    //clerkId: v.string(),
 // },
  //handler: async (ctx, args) => {
    //const { email, clerkId } = args;

    // Find the current user by clerkId
    //const currentUser = await ctx.db
      //.query("users")
      //.filter((q) => q.eq(q.field("clerkId"), clerkId))
      //.unique();

    //if (!currentUser) throw new ConvexError("User not found");

    // Find the other user by email
    //const otherUser = await ctx.db
      //.query("users")
      //.filter((q) => q.eq(q.field("email"), email))
     // .unique();

    //if (!otherUser) throw new ConvexError("User with provided email not found");

    // Check if the friendship already exists
  //  const existingFriend = await ctx.db
      //.query("friends")
     // .filter(
       // q.and(
         // q.eq(q.field("friend"), otherUser._id),
         // q.eq(q.field("user"), currentUser._id)
        //)
      //)
      //.first();

    //if (existingFriend) {
     // return existingFriend._id;
  //  }

    // Create a new friendship
    //const friendId = await ctx.db.insert("friends", {
     // user: currentUser._id,
      //friend: otherUser._id,
     // creatorClerkId: clerkId,
   // });

   // return friendId;
 // },
//});
              
