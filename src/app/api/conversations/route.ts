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
      isGroup,
      members,
      name
    } = body;

    if (!localUser?.id || !clerk.emailAddresses[0]?.emailAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    if (isGroup) {
      const newConversation = await client.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value
              })),
              {
                id: localUser.id
              }
            ]
          }
        },
        include: {
          users: true
        }
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation);
        }
      })

      return NextResponse.json(newConversation);
    }

    const exisitingConversations = await client.conversation.findMany({
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

    const newConversation = await client.conversation.create({
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

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation);
      }
    })

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 });
  }
         }
