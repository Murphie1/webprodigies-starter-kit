import { Conversation, User } from "@prisma/client"
import useOtherUser from "@/hooks/uMessage/useOtherUser"
import ProfileDrawer from "./ProfileDrawer"

interface AsyncHeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const AsyncProfileDrawer: React.FC<AsyncHeaderProps> = async ({
    conversation,
}) => {
    const otherUser = await useOtherUser(conversation)
    if (!otherUser) {
        throw new Error("No other User")
    }
    return <ProfileDrawer data={conversation} otherUser={otherUser!} />
}

export default AsyncProfileDrawer
