import { client } from "@/lib/prisma"; // Adjust path as per your setup
import Image from "next/image";
import AvatarGroup from "@/components/global/AvatarGroup";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ImageProps {
    imageUrl: string
}

const GroupImage = ({ imageUrl }: ImageProps) => {
    const group = await client.group.findUnique({
        where: { id: imageUrl },
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
        <Dialog>
            <DialogTrigger>
                    {group.thumbnail ? (
                        <Image
                            src={group.thumbnail}
                            alt="Group Thumbnail"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    ) : group.member.length > 3 ? (
                        <AvatarGroup users={group.member.map((m) => m.User)} />
                    ) : (
                        <Image
                            src={group.User?.image || "/default-group-image.png"}
                            alt="Group Owner Avatar"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    )}
                </DialogTrigger>
                <DialogContent className="rounded-md h-[350px] w-[350px]">
                        {group.thumbnail ? (
                        <Image
                            src={group.thumbnail}
                            alt="Group Thumbnail"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    ) : group.member.length > 3 ? (
                        <AvatarGroup users={group.member.map((m) => m.User)} />
                    ) : (
                        <Image
                            src={group.User?.image || "/default-group-image.png"}
                            alt="Group Owner Avatar"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    )}
                </DialogContent>
        </Dialog>
    )
}
export default GroupImage
