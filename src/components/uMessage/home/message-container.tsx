import ChatBubble from "./chat-bubble"
import { useQuery } from "convex/react"
import { api } from "~/convex/_generated/api"
import { useConversationStore } from "@/store/chat-store"
import { useEffect, useRef } from "react"
//import { onAuthenticatedUser } from "@/actions/auth"

type Props = {
    clerkId: string;
}

const MessageContainer = ({ clerkId }: Props) => {
    const { selectedConversation } = useConversationStore()
    //const clerk = await onAuthenticatedUser()
    const messages = useQuery(api.messages.getMessages, {
        conversation: selectedConversation!._id,
        clerkId: clerkId!,
    })
    const me = useQuery(api.users.getUserById, {
        clerkId: clerkId!,
    })
    const lastMessageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])

    return (
        <div className="relative p-3 flex-1 w-screen md:w-full overflow-y-auto h-full min-h-[650px] bg-chat-tile-light dark:bg-chat-tile-dark">
            <div className="mx-12 flex flex-col gap-3">
                {messages?.map((msg, idx) => (
                    <div key={msg._id} ref={lastMessageRef}>
                        <ChatBubble
                            message={msg}
                            me={me}
                            previousMessage={
                                idx > 0 ? messages[idx - 1] : undefined
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MessageContainer
