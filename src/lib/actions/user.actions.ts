"use server"

import { clerkClient } from "@clerk/nextjs/server"
import { parseStringify } from "../utils"
import { liveblocks } from "../liveblocks"


import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";

import { cookies } from "next/headers";
//import { avatarPlaceholderUrl } from "@/constants";

const getUserByClerkId = async (clerkId: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("clerkId", [clerkId])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const createSession = async (accountId: string) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createSession(accountId, "random-password"); // Replace with a secure method
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return session.$id;
  } catch (error) {
    console.error("Failed to create session:", error);
    throw error;
  }
};

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
      const sessionId = await createSession(existingUser.accountId);
      return parseStringify({ sessionId, user: existingUser });
    } else {
      const accountId = await createAccount({ fullName, email, clerkId, avatar });
      const sessionId = await createSession(accountId);
      return parseStringify({ sessionId, user: { fullName, email, clerkId, accountId } });
    }
  } catch (error) {
    console.error("Authentication failed:", error);
    throw new Error("Failed to authenticate user");
  }
};
export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const sessionCookie = (await cookies()).get("appwrite-session");
    if (!sessionCookie) return null;

    const session = await account.get();
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", session.$id)]
    );

    return user.total > 0 ? parseStringify(user.documents[0]) : null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};

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
