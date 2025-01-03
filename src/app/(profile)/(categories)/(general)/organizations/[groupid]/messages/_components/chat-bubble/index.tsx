import { cn } from "@/lib/utils"

type ChatBubbleProps = {
    senderid: string | null
    createdAt: Date
    message: string
    userid: string
}

export const ChatBubble = ({
    senderid,
    createdAt,
    message,
    userid,
}: ChatBubbleProps) => {
    return (
        <div
            className={cn(
                senderid === userid
                    ? "self-end bg-black text-white dark:bg-themeBlack max-w-[60%] min-w-[15%]"
                    : "self-start bg-sky-100 dark:bg-themeGray max-w-[60%] min-w-[15%]",
                "px-4 py-2 rounded-xl text-xl flex flex-col",
            )}
        >
            <p>{message}</p>
            <p className={cn("text-xs text-gray-100 dark:text-themeTextGray")}>
                {createdAt && (
                    <>
                        {createdAt.getHours()} {createdAt.getMinutes()}{" "}
                        {createdAt.getHours() > 12 ? "pm" : "am"}
                    </>
                )}
            </p>
        </div>
    )
}
