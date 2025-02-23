import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const courseOwner = await client.course.findUnique({
      where: { id: courseId, userId: userId }, 
    });
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await client.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: courseId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
