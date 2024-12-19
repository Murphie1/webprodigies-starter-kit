import { loggedInUser } from "@clerk/nextjs/server"
import { useMemo } from "react"
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
    if (!clerk || clerk.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const otherUser = useMemo(() => {
        const currentUserEmail = clerk.email

        const otherUser = friend.users.filter(
            (user) => user.email !== currentUserEmail,
        )

        return otherUser[0]
    }, [clerk.email, friend.users])

    return otherUser
}

export default useOtherUser
