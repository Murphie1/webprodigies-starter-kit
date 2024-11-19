import { client } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

export const InitialProfile = async () => {
    const clerk = await currentUser()

    if (!clerk) {
        return redirect("/sign-in")
    }
    const profile = await client.profile.findUnique({
        where: {
            clerkId: clerk.id, // Use clerkId to find the profile
        },
    })

    if (profile) {
        return profile // Return the existing profile
    }

    const newProfile = await client.profile.create({
        data: {
            clerkId: clerk.id, // Use clerkId when creating a new profile
            name: `${clerk.firstName}`,
            imageUrl: clerk.imageUrl,
            // email: user.emailAddresses[0]?.emailAddress, // also add to schema profile model
        },
    })

    return newProfile
}
