import { client } from "@/lib/prisma"
import { RedirectToSignIn } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

export const InitialProfile = async () => {
    const user = await currentUser()

    if (!user) {
        return RedirectToSignIn()
    }
    const clerkId = user.id
    const profile = await client.profile.findUnique({
        where: {
            clerkId: clerkId, // Use clerkId to find the profile
        },
    })

    if (profile) {
        return profile // Return the existing profile
    }

    const newProfile = await client.profile.create({
        data: {
            clerkId: clerkId, // Use clerkId when creating a new profile
            name: `${user.firstName}`,
            imageUrl: user.imageUrl,
            // email: user.emailAddresses[0]?.emailAddress, // also add to schema profile model
        },
    })

    return newProfile
}
