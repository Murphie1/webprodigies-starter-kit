import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await client.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 401 });

    const chapter = await client.chapter.findUnique({
      where: { id: chapterId, courseId },
    });

    const muxData = await client.muxData.findUnique({
      where: { chapterId },
    });

    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    )
      return new NextResponse("Missing required fields!", { status: 400 });
    const publishedChapter = await client.chapter.update({
      where: { id: chapterId, courseId },
      data: { isPublished: true },
    });
    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("CHAPTER_PUBLISH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  }
