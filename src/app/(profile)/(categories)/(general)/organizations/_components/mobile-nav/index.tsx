import { Notification } from "@/components/global/user-widget/notification"
import { UserAvatar } from "@/components/global/user-widget/user"
import { LayoutGrid, MessageSquare, Compass } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"

type Props = {
    groupid: string
}

const MobileNav = async ({ groupid }: Props) => {
    const user = await currentUser()

    return (
        <div className="bg-[#1A1A1D] space-x-7 w-auto overflow-x-auto whitespace-nowrap py-3 px-11 fixed bottom-5 z-50 md:hidden justify-between items-center flex">
            <Link href={`/organizations/${groupid}/groupspaces`}>
                <LayoutGrid />
            </Link>
            <Notification />
            <Link href={`/organizations/${groupid}/messages`}>
                <MessageSquare />
            </Link>
            <Link href={`/organizations/explore`}>
                <Compass />
            </Link>
            <UserAvatar image={user?.imageUrl!} groupid={groupid} />
        </div>
    )
}

export default MobileNav
