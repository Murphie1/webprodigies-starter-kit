import { client } from "@/lib/prisma"; // Adjust path as per your setup
import Image from "next/image";
import Link from "next/link";
import AvatarGroup from "@/components/global/AvatarGroup";
import { Heart } from "lucide-react";
import { onAuthenticatedUser } from "@/actions/auth";

interface GroupPageProps {
    params: { groupid: string };
}

export default async function GroupPage({ params }: GroupPageProps) {
    const groupId = params.groupid;
    const current = await onAuthenticatedUser();

    // Fetch group data
    const group = await client.group.findUnique({
        where: { id: groupId },
        include: {
            User: { select: { image: true, firstname: true } },
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
            <div className="max-w-4xl mx-auto pb-10">
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
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/channel/${channel.id}`}>
                                <span className="text-gray-800 dark:text-gray-200">
                                    {channel.name}
                                </span>
                                    </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                        {/*Other Resources*/}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                        Other Resources:
                    </h2>
                    <ul className="mt-4 space-y-3">
                            <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/groupspaces`}>
                                <span className="flex flex-1 space-x-3 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> GroupSpaces 
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/courses`}>
                                <span className="flex flex-1 space-x-3 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Courses
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/library`}>
                                <span className="flex flex-1 space-x-3 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Library
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/events`}>
                                <span className="flex flex-1 space-x-3 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Events
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/chat`}>
                                <span className="flex flex-1 space-x-3 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Chat
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/about/${groupId}/`}>
                                <span className="flex flex-1 space-x-3 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> About
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/training`}>
                                <span className="flex flex-1 space-x-3 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Training and Simulations
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/payments`}>
                                <span className="flex flex-1 space-x-3 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Payments 
                                </span>
                                    </Link>
                            </li>
                    </ul>
                </div>
                {current.id === group.userId && (
            <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        Administrative Block
                    </h2>
                    <ul className="mt-4 space-y-2">
                            <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/settings`}>
                                <span className="flex flex-1 text-md space-x-2 font-semibold text-gray-800 dark:text-gray-200">
                                   <Heart size={25} /> Settings
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/analysis`}>
                                <span className="flex flex-1 space-x-2 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Members and Group Analysis
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/finance`}>
                                <span className="flex flex-1 space-x-2 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Finance 
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/meetings`}>
                                <span className="flex flex-1 space-x-2 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Meeting Room
                                </span>
                                    </Link>
                            </li>
                        <li
                                className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-all"
                            >
                                <Link href={`/organizations/${groupId}/ai`}>
                                <span className="flex flex-1 space-x-2 text-gray-800 dark:text-gray-200 font-semibold text-md">
                                   <Heart size={25} /> Assistant and AI Tools
                                </span>
                                    </Link>
                            </li>
                    </ul>
                </div>
            )}
            </div>
        </div>
    );
                        }
