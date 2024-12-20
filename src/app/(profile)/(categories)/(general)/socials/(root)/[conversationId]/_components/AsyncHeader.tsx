import { Conversation, User } from "@prisma/client"
import useOtherUser from "@/hooks/uMessage/useOtherUser"
import Header from "./Header"

interface AsyncHeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const AsyncHeader: React.FC<AsyncHeaderProps> = async ({ conversation }) => {
    const otherUser = await useOtherUser(conversation)

    return <Header conversation={conversation} otherUser={otherUser} />
}

export default AsyncHeader
