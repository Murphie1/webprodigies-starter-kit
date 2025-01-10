import { client } from "@/lib/prisma";

export const getProgress = async (
  userId: string | null,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await client.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    const publishedChapterIds = publishedChapters?.map((chapter) => chapter.id);

    const validCompletedChapters = await client.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100 || 0;
    return progressPercentage;
  } catch (error) {
    console.log("GET_PROGRESS", error);
    return 0;
  }
};
