import { onAuthenticatedUser } from "@/actions/auth"
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
//import { Navbar } from "../_components/navbar"
import MobileNav from "../_components/mobile-nav"
import { ChevronsRight } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

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
                <div className="md:ml-[300px] flex flex-col flex-1 bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]">
        {/*  <Navbar groupid={params.groupid} userid={user.id} /> */}
                    {children}
                    <div className="fixed pl-1 bottom-10 pb-10 md:hidden">
                        <Sheet>
                                <SheetTrigger>
                                    <div className="h-[60px] w-[60px] rounded-full bg-white dark:bg-black">
                                    <ChevronsRight />
                                        </div>
                                </SheetTrigger>
                                <SheetContent className="h-auto w-full">
                                        <MobileNav groupid={params.groupid} />
                                </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default GroupLayout
