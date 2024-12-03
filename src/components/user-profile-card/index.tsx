"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface UserProfileCardProps {
    imageUrl: string
    //avatarUrl: string;
    name: string
    type: string | null
    email: string | null
}

export const ProfileCard = ({
    imageUrl,
    // avatarUrl,
    name,
    type,
    email,
}: UserProfileCardProps) => {
    const router = useRouter()

    const onClick = () => {
        router.push("/home")
    }

    return (
        <div
            role="button"
            tabIndex={0}
            className="relative rounded-lg bg-white dark:bg-gray-800 shadow-md w-[260px] hover:shadow-lg transition-shadow duration-200"
            onClick={onClick}
        >
            {/* Video Thumbnail */}
            <div className="relative w-full h-[140px]">
                {imageUrl ? (
                    <Image
                        fill
                        src={imageUrl}
                        alt="Video Thumbnail"
                        className="rounded-t-lg object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-t-lg dark:bg-gray-700">
                        <p className="text-gray-500">No Image</p>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-4 flex space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="Avatar"
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full dark:bg-gray-700" />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {name}
                    </h2>
                    {type && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {type}
                        </p>
                    )}
                    {email && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                            {email}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
