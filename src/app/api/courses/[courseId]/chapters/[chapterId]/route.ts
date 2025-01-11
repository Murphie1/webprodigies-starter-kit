import Mux from "@mux/mux-node";
import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"], // This is the default and can be omitted
  tokenSecret: process.env["MUX_TOKEN_SECRET"], // This is the default and can be omitted
});

export async function DELETE(
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

    if (!chapter) return new NextResponse("Not Found", { status: 404 });

    if (chapter.videoUrl) {
      const existingMuxData = await client.muxData.findFirst({
        where: {
          chapterId,
        },
      });
      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await client.muxData.delete({
          where: { id: existingMuxData.id },
        });
      }
    }
    const deletedChapter = await client.chapter.delete({
      where: { id: chapterId },
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

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("CHAPTER_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await client.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 401 });

    const chapter = await client.chapter.update({
      where: { id: chapterId, courseId },
      data: { ...values },
    });

    if (values?.videoUrl) {
      const existingMuxData = await client.muxData.findFirst({
        where: { chapterId },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await client.muxData.delete({
          where: { id: existingMuxData.id },
        });
      }
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await client.muxData.create({
        data: {
          assetId: asset.id,
          chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("CHAPTER_ID", error);
    new NextResponse("Internal Error", { status: 500 });
  }
      }
