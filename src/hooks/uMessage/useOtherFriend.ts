import { loggedInUser } from "@/actions/auth"
import { FullFriendType } from "@/type"
import { User } from "@prisma/client"
import { NextResponse } from "next/server"

const useOtherUser = async (
    friend:
        | FullFriendType
        | {
              users: User[]
          },
) => {
    const clerk = await loggedInUser()
    if (!clerk || !clerk.email) {
        throw new Error("Unauthorized", { status: 401 })
    }

    const currentUserEmail = clerk.email
    const otherUser = friend.users.find(
        (user) => user.email !== currentUserEmail,
    )

    return otherUser || clerk
}

export default useOtherUser
