import { onAuthenticatedUser } from "@/actions/auth"
import { onGetChannelInfo } from "@/actions/channels"
import { onGetGroupInfo } from "@/actions/groups"

import { LeaderBoardCard } from "@/app/(profile)/(categories)/(general)/organizations/_components/leaderboard"
import GroupSideWidget from "@/components/global/group-side-widget"
import { currentUser } from "@clerk/nextjs/server"
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"
import Bar from "@/app/(profile)/(categories)/(general)/organizations/[groupid]/channel/[channelid]/_components/mobilebar"
import CreateNewPost from "./_components/create-post"
import { PostFeed } from "./_components/post-feed"
import { Navbar } from "@/app/(profile)/(categories)/(general)/organizations/_components/navbar"
type Props = {
    params: { channelid: string; groupid: string }
}

const GroupChannelPage = async ({ params }: Props) => {
    const client = new QueryClient()
    const user = await currentUser()
    const authUser = await onAuthenticatedUser()
    if (!authUser.id) redirect("/sign-in")

    await client.prefetchQuery({
        queryKey: ["channel-info"],
        queryFn: () => onGetChannelInfo(params.channelid),
    })

    await client.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(params.groupid),
    })

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <div className="flex flex-col space-y-3">
                <Navbar groupid={params.groupid} userid={authUser.id} />
                <div className="grid lg:grid-cols-4 grid-cols-1 w-full flex-1 h-0 gap-x-5 px-5 s">
                    <div className="col-span-1 lg:inline relative hidden py-5">
                        <LeaderBoardCard groupId={params.groupid} />
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-y-5 py-5">
                        <Bar groupId={params.groupid} />
                        <CreateNewPost
                            userImage={user?.imageUrl!}
                            channelid={params.channelid}
                            username={user?.firstName!}
                        />

                        <PostFeed
                            channelid={params.channelid}
                            userid={authUser.id!}
                        />
                    </div>
                    <div className="col-span-1 hidden lg:inline relative py-5">
                        <GroupSideWidget light />
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default GroupChannelPage
