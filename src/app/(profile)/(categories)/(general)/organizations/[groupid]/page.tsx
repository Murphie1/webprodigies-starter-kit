// pages/group/[groupid].tsx
"use client";

import { GetServerSideProps } from "next";
import { client } from "@/lib/prisma"; // Adjust path as per your setup
import Image from "next/image";
import { useTheme } from "next-themes";
import AvatarGroup from "@/components/global/AvatarGroup";

interface GroupPageProps {
    group: {
        id: string;
        name: string;
        thumbnail?: string;
        member: { user: { image: string } }[];
        channel: { id: string; name: string }[];
    } | null;
}

export default function GroupPage({ group }: GroupPageProps) {
    const { theme } = useTheme();

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
    <AvatarGroup users={group.member.map((m) => m.user)} />
) : (
    <Image
        src={group.User.image || "/default-group-image.png"} // Fallback if group.User.image is not available
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
                                <span className="text-gray-800 dark:text-gray-200">
                                    {channel.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const groupId = context.params?.groupid as string;

    const group = await client.group.findUnique({
        where: { id: groupId },
        include: {
            member: { select: { user: { select: { image: true } } } },
            channel: { select: { id: true, name: true } },
        },
    });

    return {
        props: {
            group,
        },
    };
};
