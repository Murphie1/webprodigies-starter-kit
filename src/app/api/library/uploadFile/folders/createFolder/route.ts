import { NextResponse } from "next/server";
import { createFolder } from "@/lib/actions/folder.actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, ownerId, authId, clerkId } = body;

    const result = await createFolder({ name, ownerId, authId, clerkId });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating folder:", error);
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 });
  }
      }
