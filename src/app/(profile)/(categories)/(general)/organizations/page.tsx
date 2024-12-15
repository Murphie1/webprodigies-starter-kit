import { client } from "@/lib/prisma"
import GroupBox from "./_components/group-box"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"


const Orgs = async () => {
    
const user = await onAuthenticatedUser()
if (!user.id) return redirect("/sign-in")


const group = await client.group.findMany({
        where: {
            userId: user.id, // Use clerkId to find all profiles for the user
        },
    })
            if (!group) {
        return (
            <div className="flex flex-col w-full space-y-4 font-bold justify-center">
                <h2 className="justify-center">Create your first Group</h2>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col space-y-8 md:grid grid-cols-2 md:space-x-6">
                {groups.map((group) => (
                    <GroupBox
                        key={profile.id}
                        name={profile.name}
                        imageUrl={profile.imageUrl}
                        type={profile.type || null}
                        email={profile.email || null}
                    />
                ))}
            </div>
    );
};

export default Orgs
