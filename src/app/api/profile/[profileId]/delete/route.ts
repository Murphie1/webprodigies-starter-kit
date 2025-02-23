import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const { userId } = auth();
    const { profileId } = await params;
    
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const profile = await client.profile.delete({
      where: { id: profileId },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.log("PROFILE_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
  }
