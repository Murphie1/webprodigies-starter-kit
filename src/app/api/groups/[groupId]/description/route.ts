
import { client } from "@/lib/prisma";
import { useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string; } }
) {
  try {
    const { user } = useUser();
    const { groupId } = params;
    const { ...values } = await req.json();

    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const ownGroup = await client.group.findUnique({
      where: { id: groupId, userId: user?.id },
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
