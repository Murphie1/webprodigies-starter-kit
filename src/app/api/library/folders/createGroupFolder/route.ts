import { NextResponse } from "next/server";
import { createGroupFolder } from "@/lib/actions/folder.actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, ownerId, groupId, clerkId } = body;

    const result = await createGroupFolder({ name, ownerId, groupId, clerkId });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating group folder:", error);
    return NextResponse.json({ error: "Failed to create group folder" }, { status: 500 });
  }
}
