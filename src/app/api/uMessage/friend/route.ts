import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { onAuthenticatedUser } from "@/actions/auth";
import { pusherServer } from "@/lib/pusher";

export async function POST(
  request: Request
) {
  try {
    const clerk = await currentUser();
    if (!clerk) {
      return new NextResponse('UnAuthorized', { status: 401 });
    }
    const localUser = await onAuthenticatedUser();
    if (!localUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const body = await request.json();
    const {
      userId,
    } = body;

    if (!localUser?.id || !clerk.emailAddresses[0]?.emailAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const exisitingFriends = await client.friend.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [localUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, localUser.id]
            }
          }
        ]
      }
    });

    const singleConversation = exisitingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newFriend = await client.friend.create({
      data: {
        users: {
          connect: [
            {
              id: localUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    });

    
    return NextResponse.json(newFriend);
  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 });
  }
  }
