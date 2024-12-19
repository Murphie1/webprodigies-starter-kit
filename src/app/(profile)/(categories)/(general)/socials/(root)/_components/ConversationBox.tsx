"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Conversation, Chat, User } from "@prisma/client"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { FullConversationType } from "@/type"
import useOtherUser from "@/hooks/uMessage/useOtherUser"
import Avatar from "@/components/uMessage/Avatar"
import AvatarGroup from "@/components/uMessage/AvatarGroup"

interface ConversationBoxProps {
    data: FullConversationType
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected,
}) => {
    const otherUser = useOtherUser(data)
    const { session } = useUser()
    if (!session || !session.primartEmailAddress?.emailAddress)
        return redirect("/sign-in")

    const router = useRouter()

    const handleClick = useCallback(() => {
        router.push(`/socials/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.chats || []

        return messages[messages.length - 1]
    }, [data.chats])

    const userEmail = useMemo(() => {
        return session.primaryEmailAddress?.emailAddress
    }, [session.primaryEmailAddress?.emailAddress])

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false
        }

        const seenArray = lastMessage.seen || []

        if (!userEmail) {
            return false
        }

        return seenArray.filter((user) => user.email === userEmail).length !== 0
    }, [userEmail, lastMessage])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image"
        }
        if (lastMessage?.video) {
            return "Sent a Video"
        }

        if (lastMessage?.body) {
            return lastMessage.body
        }

        return "Started a conversation"
    }, [lastMessage])

    return (
        <div
            onClick={handleClick}
            className={cn(
                `
        w-full,
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
      `,
                selected ? "bg-sky-700" : "bg-white dark:bg-themeBlack",
            )}
        >
            {data.isGroup ? (
                <AvatarGroup conversation={data} users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}
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
                            {data.name || otherUser.firstname}
                        </p>
                        {lastMessage?.createdAt && (
                            <p
                                className="
                  text-xs
                  text-gray-400
                  dark:text-gray-200
                  font-light
                "
                            >
                                {format(new Date(lastMessage.createdAt), "p")}
                            </p>
                        )}
                    </div>
                    <p
                        className={cn(
                            `
              truncate
              text-sm
            `,
                            hasSeen
                                ? "text-gray-500 dark:text-gray-300"
                                : "text-black dark:text-white font-medium",
                        )}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox
