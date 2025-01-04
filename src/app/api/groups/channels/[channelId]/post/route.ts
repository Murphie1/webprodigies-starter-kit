import { onAuthenticatedUser } from "@/actions/auth";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const { channelId } = params;
    const clerk = await currentUser();
    if (!clerk) {
      return redirect("/sign-in");
    }
    const { title, image, content, video } = await req.json();
    const user = await onAuthenticatedUser();

    if (!user || !user.id) {
      return new NextResponse("userless", { status: 401 });
    }

    // Generate a unique ID for the post
    const postId = uuidv4();

    const post = await client.post.create({
      data: {
        id: postId, // Use the generated ID
        channelId,
        title,
        content,
        video,
        image,
        authorId: user.id!,
        htmlContent: content,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
    }
