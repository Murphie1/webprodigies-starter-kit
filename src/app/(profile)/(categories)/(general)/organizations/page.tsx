import { client } from "@/lib/prisma"
import GroupBox from "./_components/group-box"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import { NavBar } from "@/components/navbar"
import { SideBar } from "@/components/sidebar"

const Orgs = async () => {
    // Authenticate the user
    const user = await onAuthenticatedUser()
    if (!user.id) return redirect("/sign-in")

    // Fetch all groups where the user is a member
    const groups = await client.group.findMany({
        where: {
            member: {
                some: {
                    userId: user.id, // Find groups where this user is a member
                },
            },
        },
    })

    return (
        <div className="h-full relative flex">
            <div className="h-[50px] md:h-[75px] md:pl-56 fixed inset-y-0 w-full z-50">
                <NavBar />
            </div>

            {/* Sidebar */}
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <SideBar />
            </div>
            <div className="flex flex-col h-full w-full space-y-8 pt-[75px] md:pl-56">
                {/* Buttons for "Create" and "Explore" */}
                <div className="flex justify-center space-x-4 bottom-10">
                    <a
                        href="/organizations/create"
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Create
                    </a>
                    <a
                        href="/organizations/explore"
                        className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                    >
                        Explore
                    </a>
                </div>
                {/* Display groups or a message */}
                {groups.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {groups.map((group) => (
                            <GroupBox
                                key={group.id}
                                name={group.name}
                                image={group.thumbnail || user.image}
                                description={group.description || " "}
                                href={`/organizations/about/${group.id}`}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-4 font-bold">
                        <h2>Create your first Group</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orgs
