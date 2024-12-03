import { onGetGroupCourses } from "@/actions/course"
import CourseCreate from "@/components/global/create-course"
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query"
import CourseList from "./_components/course-list"
import GlassSheet from "@/components/global/glass-sheet"
import { Menu } from "lucide-react"
import SideBar from "@/components/global/sidebar"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"

type Props = {
    params: {
        groupid: string
    }
}

const CoursesPage = async ({ params }: Props) => {
    const client = new QueryClient()
    const user = await onAuthenticatedUser()
    if (!user.id) redirect("/sign-in")

    await client.prefetchQuery({
        queryKey: ["group-courses"],
        queryFn: () => onGetGroupCourses(params.groupid),
    })

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <div className="relative">
                <div className="flex justify-start items-center p-5 md:hidden">
                    <GlassSheet
                        trigger={<Menu />}
                        className="md:hidden cursor-pointer"
                    >
                        <SideBar
                            groupid={params.groupid}
                            userid={user.id}
                            mobile
                        />
                    </GlassSheet>
                </div>
                <div className="container grid lg:grid-cols-2 2xl:grid-cols-3 py-10 gap-5">
                    <CourseCreate groupid={params.groupid} />
                    <CourseList groupid={params.groupid} />
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default CoursesPage
