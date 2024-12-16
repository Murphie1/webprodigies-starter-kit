import { client } from "@/lib/prisma";
import GroupBox from "./_components/group-box";
import { onAuthenticatedUser } from "@/actions/auth";
import { redirect } from "next/navigation";

const Orgs = async () => {
    // Authenticate the user
    const user = await onAuthenticatedUser();
    if (!user.id) return redirect("/sign-in");

    // Fetch all groups where the user is a member
    const groups = await client.group.findMany({
        where: {
            member: {
                some: {
                    userId: user.id, // Find groups where this user is a member
                },
            },
        },
    });

    return (
        <div className="flex flex-col h-full w-full space-y-8">
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
        </div>
    );
};

export default Orgs;
