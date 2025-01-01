import { FriendRequests } from "./_components/FriendRequests"

export default function FriendsLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="h-full">
            <div className="flex flex-col gap-y-3">
                <FriendRequests />
            </div>
            {children}
        </div>    
    )
}
