import { FullFriendRequestType } from "@/type"
import useOtherUser from "@/hooks/uMessage/useOtherFriendRequest"
import RequestBox from "./RequestBox"

interface AsyncHeaderProps {
    item: FullFriendRequestType;
}

const AsyncRequestBox: React.FC<AsyncHeaderProps> = async ({ conversation, selected }) => {
    const otherUser = await useOtherUser(item)
   if(!otherUser) {
       throw new Error("No other User")
   }
    return <RequestBox item={item} otherUser={otherUser!} />
}

export default AsyncRequestBox
