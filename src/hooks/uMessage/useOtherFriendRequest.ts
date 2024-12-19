import { loggedInUser } from "@clerk/nextjs/server"
import { useMemo } from "react"
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
    if (!clerk || clerk.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const otherUser = useMemo(() => {
        const currentUserEmail = clerk.email

        const otherUser = friendrequest.users.filter(
            (user) => user.email !== currentUserEmail,
        )

        return otherUser[0]
    }, [clerk.email, friendrequest.users])

    return otherUser
}

export default useOtherUser
