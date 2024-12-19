import { loggedInUser } from "@clerk/nextjs/server"
import { useMemo } from "react"
import { FullConversationType } from "@/type"
import { User } from "@prisma/client"
import { NextResponse } from "next/server"

const useOtherUser = async (
    conversation:
        | FullConversationType
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

        const otherUser = conversation.users.filter(
            (user) => user.email !== currentUserEmail,
        )

        return otherUser[0]
    }, [clerk.email, conversation.users])

    return otherUser
}

export default useOtherUser
