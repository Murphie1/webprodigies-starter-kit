import { client } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { ProfileCard } from "@/components/user-profile-card"
import { Separator } from "@/components/ui/separator"

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
            firstname: `${clerk.firstName}`,
            lastname: `${clerk.lastName}` || null,
           image: clerk.imageUrl || null,
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
