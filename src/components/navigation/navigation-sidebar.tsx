import { ModeToggle } from "@/components/mode-toggle"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
//import {
    //onGetAllGroupMembers,
  //  onGetGroupChannels,
   // onGetGroupInfo,
    //onGetGroupSubscriptions,
    //onGetUserGroups,
//} from "@/actions/groups"
import { client } from "@/lib/prisma"
import { UserButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { NavigationAction } from "./navigation-action"
import { NavigationItem } from "./navigation-item"
//import {
   // HydrationBoundary,
    //QueryClient,
    //dehydrate,
//} from "@tanstack/react-query"

type NavSideProps = {
    groupId: string
}

export const NavigationSideBar = async ({
                                       groupId 
                                        }: NavSideProps
                                       ) => {
    //const query = new QueryClient()

   // group info
   // await query.prefetchQuery({
        //queryKey: ["group-info"],
        //queryFn: () => onGetGroupInfo(params.groupid),
   // })

    const groupspaces = await client.groupspace.findMany({
        where: {
            groupId: {groupId},
            },
        },
    })
    if (groupspaces) {
    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22]">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark;bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {groupspaces.map((groupspace) => (
                    <div key={groupspace.id} className="mb-4">
                        <NavigationItem
                            id={groupspace.id}
                            name={groupspace.name}
                            imageUrl={groupspace.imageUrl}
                            groupId={groupspace.groupId!}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "h-[48px] w-[48px]",
                        },
                    }}
                />
            </div>
        </div>
    )
}
    return null
}
