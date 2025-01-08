import { NextResponse } from "next/server";
import { createSubFolder } from "@/lib/actions/folder.actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, folderId, ownerId, clerkId } = body;

    const result = await createSubFolder({ name, folderId, ownerId, clerkId });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating sub-folder:", error);
    return NextResponse.json({ error: "Failed to create sub-folder" }, { status: 500 });
  }
}
