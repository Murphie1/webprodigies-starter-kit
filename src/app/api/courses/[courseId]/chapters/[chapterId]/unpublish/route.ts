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

    const unpublishedChapter = await client.chapter.update({
      where: { id: chapterId, courseId },
      data: { isPublished: false },
    });
    const publishedChaptersInCourse = await client.chapter.findMany({
      where: { courseId, isPublished: true },
    });

    if (!publishedChaptersInCourse.length) {
      await client.course.update({
        where: { id: courseId },
        data: { isPublished: false },
      });
    }
    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("CHAPTER_UNPUBLISH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
