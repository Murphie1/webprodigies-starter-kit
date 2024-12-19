import { loggedInUser } from "@/actions/auth"
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
    if (!clerk || !clerk.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const currentUserEmail = clerk.email
    const otherUser = conversation.users.find(
        (user) => user.email !== currentUserEmail,
    )

    return otherUser || null
}

export default useOtherUser
