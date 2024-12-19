"use client"

import Avatar from "@/components/uMessage/Avatar"
import { FullMessageType } from "@/type"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { format } from "date-fns"
import Image from "next/image"
import { useState } from "react"
import ImageModal from "./ImageModal"
import { redirect } from "next/navigation"

interface MessageBoxProps {
    data: FullMessageType
    isLast?: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
    const session = useUser()
    if (!session || !session.primaryEmailAddress?.emailAddress)
        return redirect("/sign-in")

    const isOwn =
        session.primaryEmailAddress?.emailAddress === data?.sender?.email
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.firstname)
        .join(", ")

    const container = cn("flex gap-3 p-4", isOwn && "justify-end")

    const avatar = cn(isOwn && "order-2")

    const body = cn("flex flex-col gap-2", isOwn && "items-end")

    const message = cn(
        "text-sm w-fit overflow-hidden",
        isOwn ? "bg-black-500 text-white" : "bg-gray-100 text-black",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3",
    )

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500 dark:text-themeTextGray">
                        {data.sender.firstname}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-300">
                        {format(new Date(data.createdAt), "p")}
                    </div>
                </div>
                <div className={message}>
                    {data.image || data.video ? (
                        <ImageModal data={data} />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div
                        className="
              text-xs
              font-light
              text-gray-500
            "
                    >
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageBox
