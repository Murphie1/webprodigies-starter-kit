import { loggedInUser } from "@/actions/auth"
import { FullFriendType } from "@/type"
import { User } from "@prisma/client"

const useOtherUser = async (
    friend:
        | FullFriendType
        | {
              users: User[]
          },
): Promise<User | null> => {
    const clerk = await loggedInUser()
    if (!clerk || !clerk.email) {
        throw new Error("Unauthorized") // Throw an error instead of returning NextResponse
    }

    const currentUserEmail = clerk.email
    const otherUser = friend.users.find(
        (user) => user.email !== currentUserEmail,
    )

    return otherUser || clerk
}

export default useOtherUser
