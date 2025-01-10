import { client } from "@/lib/prisma";
//import { auth } from "@clerk/nextjs";
import { onAuthenticatedUser } from "@/actions/auth";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/global/course-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
 // const { userId } = auth();

  //if (!userId) return redirect("/");
const user = await onAuthenticatedUser();
  if (!user || !user.clerkId) redirect("/");
  
  const purchase = await client.coursepurchase.findUnique({
    where: {
      userId_courseId: {
        userId: user.clerkId!,
        courseId: course.id,
      },
    },
  });
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              size="default"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            type={chapter.type}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
