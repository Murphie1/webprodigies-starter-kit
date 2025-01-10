import { client } from "@/lib/prisma";
import { Attachment, Chapter, Certificate } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getchapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await client.coursepurchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await client.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await client.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let certificates: Certificate[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await client.attachment.findMany({
        where: {
          courseId,
        },
      });
    }
    
if (purchase) {
      certificates = await client.certificate.findMany({
        where: {
          courseId,
        },
      });
}
    
    if (chapter.isFree || purchase) {
      muxData = await client.muxData.findUnique({
        where: {
          chapterId,
        },
      });

      nextChapter = await client.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }
    const userProgress = await client.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });
    return {
      chapter ,
      course ,
      muxData ,
      attachments ,
      certificates,
      nextChapter ,
      userProgress ,
      purchase ,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      certificates: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
