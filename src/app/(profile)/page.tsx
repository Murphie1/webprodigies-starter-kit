import { InitialProfile } from "@/lib/initial-profile"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const ProfilePage = async () => {
    const profile = await InitialProfile()
    const user = await currentUser()
    if (!user) {
        return redirect("/sign-in")
    }
    const clerkId = user.id
    const kidsprofile = await client.kidsProfile.findUnique({
        where: {
            clerkId: clerkId, // Use clerkId to find the profile
        },
    })

    if (kidsprofile) {
        return kidsprofile
    }

    return <div className="justify-end pt-5 pr-5">Create a Kids Profile</div>
}
export default ProfilePage
