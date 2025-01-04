
import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { onAuthenticatedUser } from "@/actions/auth"

export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string; } }
) {
  try {
    const user = await onAuthenticatedUser();
    const { groupId } = params;
    const { ...values } = await req.json();

    if (!user || !user.id) return new NextResponse("Unauthorized", { status: 401 });

   const ownGroup = await client.group.findUnique({
      where: { id: groupId, user?.id, },
    });

    if (!ownGroup) return new NextResponse("Unauthorized", { status: 401 });

    const groupUpdate = await client.group.update({
      where: { id: groupId },
      data: { ...values },
    });
  } catch (error) {
    console.log("GROUP_ID", error);
    new NextResponse("Internal Error", { status: 500 });
  }
  }
