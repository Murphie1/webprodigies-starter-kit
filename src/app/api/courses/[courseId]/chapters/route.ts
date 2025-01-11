import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const { title } = await req.json();
    
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    
    const courseOwner = await client.course.findUnique({
      where: { id: courseId, userId },
    });
    const lastChapter = await client.chapter.findFirst({
      where: { courseId },
      orderBy: { position: "desc" },
    });
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const chapter = await client.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    });
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
