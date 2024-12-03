import { client } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

export const InitialProfile = async () => {
    const clerk = await currentUser()

    if (!clerk) {
        return redirect("/sign-in")
    }

    // Fetch all profiles for the given clerkId
    const profiles = await client.profile.findMany({
        where: {
            clerkId: clerk.id, // Use clerkId to find all profiles for the user
        },
    })

    if (profiles.length > 0) {
        // Return an array of profiles with their respective data
        return profiles.map((profile) => ({
            name: profile.name,
            imageUrl: profile.imageUrl,
            type: profile.type,
            email: profile.email,
            id: profile.id,
        }))
    }

    // If no profiles are found, return null
    return null
}
