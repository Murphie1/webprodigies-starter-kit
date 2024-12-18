import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { onAuthenticatedUser } from "@/actions/auth";

export async function POST(request: Request) {
  try {
    // Get the current Clerk user
    const clerk = await currentUser();
    if (!clerk) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the authenticated local user
    const localUser = await onAuthenticatedUser();
    if (!localUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { email, message } = await request.json();

    // Validate the input
    if (!email || !localUser?.id) {
      return new NextResponse("Invalid Input", { status: 400 });
    }

    // Check if a user with the given email exists in the database
    const queriedUser = await client.user.findUnique({
      where: { email },
    });

    if (!queriedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const queriedUserId = queriedUser.id;

    // Check if a friend request already exists between the users
    const existingFriendRequest = await client.friendrequest.findFirst({
      where: {
        OR: [
          {
            userIds: {
              equals: [localUser.id, queriedUserId],
            },
          },
          {
            userIds: {
              equals: [queriedUserId, localUser.id],
            },
          },
        ],
      },
    });

    if (existingFriendRequest) {
      return NextResponse.json(existingFriendRequest);
    }

    // Create a new friend request
    const newFriendRequest = await client.friendrequest.create({
      data: {
        users: {
          connect: [
            { id: localUser.id },
            { id: queriedUserId },
          ],
        },
        userIds: [localUser.id, queriedUserId],
        senderId: localUser.id,
        message: message || null, // Optional message
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newFriendRequest);
  } catch (error: any) {
    console.error("Error creating friend request:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
