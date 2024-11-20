import { ProfileCard } from "@/components/user-profile-card"
import { CreateProfile} from "@/components/modals/create-profile"
import { client } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

export const InitialProfile = async () => {
    const clerk = await currentUser()

    if (!clerk) {
        return redirect("/sign-in")
    }
    const profile = await client.profile.findMany({
        where: {
            clerkId: clerk.id, // Use clerkId to find the profile
        },
    })

    if (profile) {
        return {
                    name: profile.name,
                    imageUrl: profile.imageUrl,
                    type: profile.type,
                    email: profile.email,
                    id: profile.id,            
    } //return the existing profile
    }

    return null
}
