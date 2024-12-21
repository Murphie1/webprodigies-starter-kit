import { loggedInUser } from "@/actions/auth"
import { FullFriendType } from "@/type"
import { User } from "@prisma/client"
import { NextResponse } from "next/server"

const useOtherUsers = async (
    friends: Array<
        FullFriendType | { users: User[] }
    >
): Promise<User[]> => {
    const clerk = await loggedInUser()
    if (!clerk || !clerk.email) {
        throw new Error("Unauthorized")
    }
    const currentUserEmail = clerk.email

    // Accumulate all users from the friends array
    const otherUsers: User[] = []

    // Loop through each friend and filter users based on the email
    for (const friend of friends) {
        const users = friend.users || []

        // Filter users whose email is not the logged-in user's email
        const filteredUsers = users.filter(
            (user) => user.email !== currentUserEmail
        )

        // Add the filtered users to the result array
        otherUsers.push(...filteredUsers)
    }

    return otherUsers
}

export default useOtherUsers
