"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { liveblocks } from "../liveblocks";

// Function to find a user by Clerk ID in the Appwrite database
const getUserByClerkId = async (clerkId: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("clerkId", [clerkId])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

// Function to create a new user in the Appwrite database
const createAccount = async ({
  fullName,
  email,
  clerkId,
  avatar,
}: {
  fullName: string;
  email: string;
  clerkId: string;
  avatar: string;
}) => {
  const { databases } = await createAdminClient();

  const accountId = ID.unique();

  await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    accountId,
    {
      fullName,
      email,
      clerkId,
      avatar,
      accountId,
    }
  );

  return accountId;
};

// Function to authenticate or register a user
export const authenticateUser = async ({
  clerkId,
  fullName,
  email,
  avatar,
}: {
  clerkId: string;
  fullName: string;
  email: string;
  avatar: string;
}) => {
  try {
    const existingUser = await getUserByClerkId(clerkId);

    if (existingUser) {
      // User already exists, return user data
      return parseStringify({ user: existingUser });
    } else {
      // Create a new user in the database
      const accountId = await createAccount({ fullName, email, clerkId, avatar });
      return parseStringify({ user: { fullName, email, clerkId, accountId } });
    }
  } catch (error) {
    console.error("Authentication failed:", error);
    throw new Error("Failed to authenticate user");
  }
};

// Function to retrieve the current user based on Clerk's session
export const getCurrentUser = async () => {
  try {
    const { databases } = await createAdminClient();

    // Retrieve the current user from Clerk
    const { user } = await clerkClient.users.getUser();
    if (!user || !user.id) return null;

    // Find the user in Appwrite database using Clerk ID
    const result = await getUserByClerkId(user.id);

    return result ? parseStringify(result) : null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};

{/*export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if (text.length) {
      const lowerCaseText = text.toLowerCase();

      const filteredUsers = users.filter((email: string) =>
        email.toLowerCase().includes(lowerCaseText)
      );

      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
};*/}

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
    try {
        const { data } = await clerkClient.users.getUserList({
            emailAddress: userIds,
        })

        const users = data.map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            avatar: user.imageUrl,
        }))

        const sortedUsers = userIds.map((email) =>
            users.find((user) => user.email === email),
        )

        return parseStringify(sortedUsers)
    } catch (error) {
        console.log(`Error fetching users: ${error}`)
    }
}

export const getDocumentUsers = async ({
    roomId,
    currentUser,
    text,
}: {
    roomId: string
    currentUser: string
    text: string
}) => {
    try {
        const room = await liveblocks.getRoom(roomId)

        const users = Object.keys(room.usersAccesses).filter(
            (email) => email !== currentUser,
        )

        if (text.length) {
            const lowerCaseText = text.toLowerCase()

            const filteredUsers = users.filter((email: string) =>
                email.toLowerCase().includes(lowerCaseText),
            )

            return parseStringify(filteredUsers)
       }

        return parseStringify(users)
    } catch (error) {
        console.log(`Error fetching document users: ${error}`)
    }
}
