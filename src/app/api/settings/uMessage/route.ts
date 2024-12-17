import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const clerk = await currentUser();
    const body = await request.json();
    const {
      name,
      image
    } = body;

    if (!clerk.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedUser = await client.user.update({
      where: {
        clerkId: clerk.id
      },
      data: {
        image: image,
        firstname: name
      }
    });

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.log(error, 'ERROR_SETTINGS');
    return new NextResponse('Internal Error', { status: 500 });
  }
      }
