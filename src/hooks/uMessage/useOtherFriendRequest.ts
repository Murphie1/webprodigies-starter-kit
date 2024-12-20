import { loggedInUser } from "@/actions/auth"
import { FullFriendRequestType } from "@/type"
import { User } from "@prisma/client"
import { NextResponse } from "next/server"

const useOtherUser = async (
    friendrequest:
        | FullFriendRequestType
        | {
              users: User[]
          },
) => {
    const clerk = await loggedInUser()
    if (!clerk || !clerk.email) {
        throw new Error("Unauthorized")
    }

    const currentUserEmail = clerk.email
    const otherUser = friendrequest.users.find(
        (user) => user.email !== currentUserEmail,
    )

    return otherUser || clerk
}

export default useOtherUser
