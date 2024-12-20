import { FullConversationType } from "@/type"
import useOtherUser from "@/hooks/uMessage/useOtherUser"
import ConversationBox from "./ConversationBox"

interface AsyncHeaderProps {
    conversation: FullConversationType;
    selected?: Boolean;
}

const AsyncConversationBox: React.FC<AsyncHeaderProps> = async ({ conversation }) => {
    const otherUser = await useOtherUser(conversation)
   if(!otherUser) {
       throw new Error("No other User")
   }
    return <ConversationBox data={conversation} selected={selected} otherUser={otherUser!} />
}

export default AsyncConversationBox