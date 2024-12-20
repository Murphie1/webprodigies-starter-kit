import { loggedInUser } from "@/actions/auth"
import { FullConversationType } from "@/type"
import { User } from "@prisma/client"

const useOtherUser = async (
    conversation:
        | FullConversationType
        | {
              users: User[]
          },
): Promise<User | null> => {
    const clerk = await loggedInUser()
    if (!clerk || !clerk.email) {
        throw new Error("Unauthorized") // Throw an error instead of returning NextResponse
    }

    const currentUserEmail = clerk.email
    const otherUser = conversation.users.find(
        (user) => user.email !== currentUserEmail,
    )

    return otherUser || null
}

export default useOtherUser
