import { getFriends } from "@/actions/uMessage"
import Sidebar from "@/components/uMessage/sidebar/Sidebar"
import FriendList from "./_components/FriendList"
import { FriendRequests } from "./_components/FriendRequests"

export default async function FriendsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const friends = await getFriends()

    return (
        
        <Sidebar>
            <div className="h-full sm:rounded-2xl bg-themeWhite dark:bg-gray-900">
                <a className="pt-8">
                    <FriendRequests />
                </a>
                <FriendList items={friends} />
                {children}
            </div>
        </Sidebar>
    )
}
