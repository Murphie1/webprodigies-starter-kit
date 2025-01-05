import Image from "next/image";
import AvatarGroup from "@/components/global/AvatarGroup";
import { useEffect, useState } from "react";
import { client } from "@/lib/prisma";

interface ImageProps {
    imageUrl: string;
}

const GroupImage = ({ imageUrl }: ImageProps) => {
    const [group, setGroup] = useState<any | null>(null); // Replace `any` with the proper type for `group`
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const fetchedGroup = await client.group.findUnique({
                    where: { id: imageUrl },
                    include: {
                        User: { select: { image: true } },
                        member: { select: { User: { select: { image: true } } } },
                    },
                });
                setGroup(fetchedGroup);
            } catch (error) {
                console.error("Error fetching group:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroup();
    }, [imageUrl]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
                <h1 className="text-gray-700 dark:text-gray-300 text-xl">Loading...</h1>
            </div>
        );
    }

    if (!group) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
                <h1 className="text-gray-700 dark:text-gray-300 text-xl">Group not found</h1>
            </div>
        );
    }

    return (
        <>
            {group.thumbnail ? (
                <Image
                    src={group.thumbnail}
                    alt="Group Thumbnail"
                    width={50}
                    height={50}
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
                    width={50}
                    height={50}
                    className="rounded-full"
                />
            )}
        </>
    );
};

export default GroupImage;
