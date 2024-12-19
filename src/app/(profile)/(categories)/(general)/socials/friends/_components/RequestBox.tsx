"use client"

import axios from "axios"
import { FullFriendRequestType } from "@/type"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import useOtherUser from "@/hooks/uMessage/useOtherFriendRequest"
import Avatar from "@/components/uMessage/Avatar"
import { format } from "date-fns"
import { useUser } from "@clerk/nextjs" // Import Clerk's useUser hook

interface FriendBoxProps {
    item: FullFriendRequestType
}

const RequestBox: React.FC<FriendBoxProps> = ({ item }) => {
    const { user } = useUser() // Get the current logged-in user
    const otherUser = useOtherUser(item)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    if (!otherUser) return null

    // Check if the current user is not the sender before allowing the action
    const handleClick = useCallback(() => {
        if (user?.id === item.senderId) return // Prevent action if the user sent the request

        setIsLoading(true)

        axios
            .post("/api/uMessage/friend", {
                userId: otherUser.id,
            })
            .then(() => {
                router.push(`/socials/friends`)
            })
            .finally(() => setIsLoading(false))
    }, [user, item.senderId, otherUser, router])

    return (
        <>
            {isLoading ? (
                <p className="justify-center">Loading...</p>
            ) : (
                <div
                    onClick={handleClick}
                    className="
            w-full
            relative
            flex
            items-center
            space-x-3
            hover:bg-neutral-100
            dark:hover:bg-sky-700
            rounded-lg
            transition
            cursor-pointer
            p-3
          "
                >
                    <Avatar user={otherUser} />
                    <div className="min-w-0 flex-1">
                        <div className="focus:outline-none">
                            <div
                                className="
                  flex
                  justify-between
                  items-center
                  mb-1
                "
                            >
                                <p
                                    className="
                    text-md
                    font-medium
                    text-gray-900
                    dark:text-themeTextWhite
                  "
                                >
                                    {otherUser.firstname}
                                </p>
                                {item.createdAt && (
                                    <p
                                        className="
                      text-xs
                      text-gray-400
                      dark:text-gray-200
                      font-light
                    "
                                    >
                                        {format(new Date(item.createdAt), "p")}
                                    </p>
                                )}
                            </div>
                            <p
                                className="
                  truncate
                  text-sm
                "
                            >
                                {item?.message || ""}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RequestBox
