import { onAuthenticatedUser } from "@/actions/auth"
import { client } from "@/lib/prisma"

export const currentGroup = async () => {
    const user = await onAuthenticatedUser()
    const group = await client.group.findUnique({
        where: {
            userId: user.id,
        },
    })
    return profile
}
