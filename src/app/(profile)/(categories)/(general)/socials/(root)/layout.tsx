//import { getConversations } from "@/actions/uMessage"
//import { getFriends } from "@/actions/uMessage"
//import Sidebar from "@/components/uMessage/sidebar/Sidebar"
//import ConversationList from "./_components/ConversationList"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"


export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
  //  const conversations = await getConversations()
   // const users = await getFriends()
   const current = await onAuthenticatedUser()
    if (!current || !current.email) redirect("/sign-in")
    return (
       // <Sidebar>
            <div className="h-full bg-themeWhite rounded-2xl pt-8 dark:bg-gray-900">
                {/* <ConversationList users={users} initialItems={conversations} email={current.email} />
                */}
                {children}
            </div>
       // </Sidebar>
    )
}
