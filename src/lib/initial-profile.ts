import {ProfileCard } from "@/components/user-profile-card"
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
        return (
             <div className="flex overflow-x-auto whitespace-nowrap w-full">
                <h2>Continue with another Profile </h2>
                <ProfileCard
                    name={profile.name}
                    imageUrl={profile.imageUrl || null}
                    type={profile.type || null}
                    email={profile.email || null}
                />
            </div>                  
            ) // Return the existing profile
    }

    return (
        <CreateProfile />
        )
}
