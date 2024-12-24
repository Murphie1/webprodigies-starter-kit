import { FullConversationType } from "@/type"
import useOtherUser from "@/hooks/uMessage/useOtherUser"
import ConversationBox from "./ConversationBox"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"
interface AsyncHeaderProps {
    conversation: FullConversationType
    selected?: boolean
}

const AsyncConversationBox: React.FC<AsyncHeaderProps> = async ({
    conversation,
    selected,
}) => {
    const otherUser = await useOtherUser(conversation)
    if (!otherUser) {
        throw new Error("No other User")
    }
    const user = await onAuthenticatedUser()
    if (!user || !user.email) redirect("/")

    return (
        <ConversationBox
            data={conversation}
            selected={selected}
            otherUser={otherUser!}
            userEmail={user.email}
        />
    )
}

export default AsyncConversationBox
