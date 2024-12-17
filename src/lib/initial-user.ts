import { client } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

export const initialUser = async () => {
    const clerk = await currentUser()

    if (!clerk) {
        return redirect("/sign-in")
    }
    const localUser = await client.user.findUnique({
        where: {
            clerkId: clerk.id,
        },
    })
    if (localUser) {
        return {
            name: localUser.firstname,
            email: localUser.email,
            imageUrl: localUser.image,
            id: localUser.id,
        }
    }
    const newUser = await client.user.create({
        data: {
            clerkId: clerk.id, // Use clerkId when creating a new user
            firstname: `${clerk.firstName}`|| `${clerk.username}`,
            lastname: `${clerk.lastName}` || " ",
            image: clerk.imageUrl || "@/app/favicon.ico",
            email: clerk.emailAddresses[0]?.emailAddress || null, // add by me to the user model
        },
    })
    return {
        name: newUser.firstname,
        email: newUser.email,
        imageUrl: newUser.image,
        id: newUser.id,
    }
}
