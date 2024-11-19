import { client } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

export const InitialUser = async () => {
    const clerk = await currentUser()

    if (!clerk) {
        return redirect("/sign-in")
    }
    const localUser = await client.user.findUnique({
        where: {
            clerkId: clerk.id, // Use clerkId to find the user
        },
    })

    if (localUser) {
        return localUser // Return the existing user
    }

    const newUser = await client.user.create({
        data: {
            clerkId: clerk.id // Use clerkId when creating a new user
            firstname: `${clerk.firstName}`,
            lastname: `${clerk.lastName}` || null,
           image: clerk.imageUrl || null,
           email: clerk.emailAddresses[0]?.emailAddress || null, // add by me to the user model
        },
    })

    return newUser
}
