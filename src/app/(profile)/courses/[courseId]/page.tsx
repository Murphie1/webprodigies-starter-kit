import { client } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ courseId: string }>;
};

const CourseIdPage = async ({ params }: Props) => {
  const { courseId } = await params;
  const course = await client.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/");

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;
