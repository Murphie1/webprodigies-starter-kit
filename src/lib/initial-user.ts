import { client } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { ProfileCard } from "@/components/user-profile-card"
import { Separator } from "@/components/ui/separator"

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
        return (
            <div className="flex flex-col md:grid grid-col-2">
            <h2>
            User Account
            </h2>
            <ProfileCard
                name={user.firstname}
                imageUrl={user.image} || null
                type="User Account"
                email={user.email} || null
             />  
                    <div>
                    <Separator 
                    className="md:hidden"
                        />
                        <Separator
                    className="hidden md:flex"
                    />
                      <h5>
                    OR
                        </h5>
                    </div>
                    </div>  // Return the existing user
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
    return (
            <div className="flex flex-col md:grid grid-col-2">
            <h2>
            User Account
            </h2>
            <ProfileCard
                name={user.firstname}
                imageUrl={user.image} || null
                type="User Account"
                email={user.email} || null
             />  
                    <div>
                    <Separator 
                    className="md:hidden"
                        />
                        <Separator
                    className="hidden md:flex"
                    />
                      <h5>
                    OR
                        </h5>
                    </div>
                    </div> 
                    )
