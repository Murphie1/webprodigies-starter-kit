import { loggedInUser } from "@/actions/auth"
import { FullFriendRequestType } from "@/type"
import { User } from "@prisma/client"

const useOtherUser = async (
    friendrequest:
        | FullFriendRequestType
        | {
              users: User[]
          },
): Promise<User | null> => {
    const clerk = await loggedInUser()
    if (!clerk || !clerk.email) {
        throw new Error("Unauthorized") // Throw an error instead of returning NextResponse
    }

    const currentUserEmail = clerk.email
    const otherUser = friendrequest.users.find(
        (user) => user.email !== currentUserEmail,
    )

    return otherUser || clerk
}

export default useOtherUser
