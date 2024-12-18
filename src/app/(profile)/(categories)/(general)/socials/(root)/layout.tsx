import getConversations from "@/actions/uMessage"
import getFriends from "@/actions/uMessage"
import Sidebar from "@/components/uMessage/sidebar/Sidebar"
import ConversationList from "./_components/ConversationList"

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations();
  const users = await getFriends();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  )
};
