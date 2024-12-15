import { onAuthenticatedUser } from "@/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import {
    onGetAllGroupMembers,
    onGetGroupChannels,
    onGetGroupInfo,
    onGetGroupSubscriptions,
    onGetUserGroups,
} from "@/actions/groups"
import SideBar from "@/components/global/sidebar"
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"
import Tab from "./_components/mobile-tab"

type Props = {
    children: React.ReactNode
    params: {
        groupid: string
    }
}

const GroupLayout = async ({ children, params }: Props) => {
    const query = new QueryClient()

    const user = await onAuthenticatedUser()
    if (!user.id) redirect("/sign-in")

    const clerk = await currentUser();
    if (!clerk) redirect("/sign-in")

    //group info
    await query.prefetchQuery({
        queryKey: ["group-info"],
        queryFn: () => onGetGroupInfo(params.groupid),
    })

    //user groups
    await query.prefetchQuery({
        queryKey: ["user-groups"],
        queryFn: () => onGetUserGroups(user.id as string),
    })

    //channels
    await query.prefetchQuery({
        queryKey: ["group-channels"],
        queryFn: () => onGetGroupChannels(params.groupid),
    })

    //group subscriptions
    await query.prefetchQuery({
        queryKey: ["group-subscriptions"],
        queryFn: () => onGetGroupSubscriptions(params.groupid),
    })

    //member-chats
    await query.prefetchQuery({
        queryKey: ["member-chats"],
        queryFn: () => onGetAllGroupMembers(params.groupid),
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen md:pt-5">
                <SideBar groupid={params.groupid} userid={user.id} />
                <div className="md:ml-[300px] flex flex-col flex-1 bg-white dark:bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-black dark:border-[#28282D]">
                    {children}
                    <div className="fixed pl-3 bottom-15 pb-10 md:hidden">
                        <Tab
                            groupId={params.groupid}
                            image={clerk.imageUrl!}
                            />
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default GroupLayout
