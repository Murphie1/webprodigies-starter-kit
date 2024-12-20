import { FullFriendType } from "@/type"
import useOtherUser from "@/hooks/uMessage/useOtherFriend"
import FriendBox from "./FriendBox"

interface AsyncHeaderProps {
    data: FullFriendType;
}

const AsyncFriendBox: React.FC<AsyncHeaderProps> = async ({ data }) => {
    const otherUser = await useOtherUser(data)
   if(!otherUser) {
       throw new Error("No other User")
   }
    return <FriendBox otherUser={otherUser!} />
}

export default AsyncFriendBox
