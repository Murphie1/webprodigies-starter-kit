import { onAuthenticatedUser } from "@/actions/auth"
import CreateRequest from "./CreateRequest"


const AsyncCreateRequest = async () => {
    const otherUser = await onAuthenticatedUser()
    if (!otherUser || !otherUser.clerkId) {
        throw new Error("No other User")
    }
    return <CreateRequest clerkstring={otherUser.clerkId!} />
}

export default AsyncCreateRequest
