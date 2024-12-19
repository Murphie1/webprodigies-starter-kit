import { currentUser } from "@clerk/nextjs/server"
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
    const clerk = await currentUser()
    if (!clerk || clerk.emailAddresses[0]?.emailAddress) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const otherUser = useMemo(() => {
        const currentUserEmail = clerk.emailAddresses[0]?.emailAddress

        const otherUser = conversation.users.filter(
            (user) => user.email !== currentUserEmail,
        )

        return otherUser[0]
    }, [clerk.emailAddresses[0]?.emailAddress, conversation.users])

    return otherUser
}

export default useOtherUser
