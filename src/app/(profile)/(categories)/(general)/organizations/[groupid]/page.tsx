import { client } from "@/lib/prisma"; // Adjust path as per your setup
import Image from "next/image";
import Link from "next/link";
import AvatarGroup from "@/components/global/AvatarGroup";

interface GroupPageProps {
    params: { groupid: string };
}

export default async function GroupPage({ params }: GroupPageProps) {
    const groupId = params.groupid;

    // Fetch group data
    const group = await client.group.findUnique({
        where: { id: groupId },
        include: {
            member: { select: { User: { select: { image: true } } } },
            channel: { select: { id: true, name: true } },
        },
    });

    if (!group) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
                <h1 className="text-gray-700 dark:text-gray-300 text-xl">
                    Group not found
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Group Header */}
                <div className="flex items-center gap-4">
                    {group.thumbnail ? (
                        <Image
                            src={group.thumbnail}
                            alt="Group Thumbnail"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    ) : group.member.length > 3 ? (
                        <AvatarGroup
    users={group.member.map((m) => m.User).filter((user) => user !== null) as { image?: string }[]}
/>
                    ) : (
                        <Image
                            src={group.User?.image || "/default-group-image.png"}
                            alt="Group Owner Avatar"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    )}
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {group.name}
                    </h1>
                </div>

                {/* Channels List */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        Channels
                    </h2>
                    <ul className="mt-4 space-y-2">
                        {group.channel.map((channel) => (
                            <li
                                key={channel.id}
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow"
                            >
                                <Link href={`/organizations/${groupId}/${channel.id}`}>
                                <span className="text-gray-800 dark:text-gray-200">
                                    {channel.name}
                                </span>
                                    </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
                        }
