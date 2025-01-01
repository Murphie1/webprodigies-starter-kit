import { onAuthenticatedUser } from "@/actions/auth"
import { CreateRequest } from "./CreateRequest"
import { redirect } from "next/navigation"

const AsyncCreateRequest = async () => {
    const clerk = await onAuthenticatedUser()
    if (!clerk || !clerk.clerkId) redirect("/")
    
    return <CreateRequest clerkstring={clerk.clerkId!} />
}

export default AsyncCreateRequest
