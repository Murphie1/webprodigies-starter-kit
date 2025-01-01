"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, X } from "lucide-react"
import MessageInput from "./message-input"
import MessageContainer from "./message-container"
import ChatPlaceHolder from "./chat-placeholder"
import EmptyStateTwo from "@/components/uMessage/EmptyState"
import GroupMembersDialog from "./group-members-dialog"
import { useConversationStore } from "@/store/chat-store"
//import { useConvexAuth } from "convex/react"

const RightPanel = ({ clerkId }: { clerkId: string; }) => {
    const { selectedConversation, setSelectedConversation } =
        useConversationStore()
   // const { isLoading } = useConvexAuth()

   // if (isLoading) return null
    if (!selectedConversation) return <EmptyStateTwo />//<ChatPlaceHolder />

    const conversationName =
        selectedConversation.groupName || selectedConversation.name
    const conversationImage =
        selectedConversation.groupImage || selectedConversation.image

    return (
        <div className="w-screen flex flex-col md:w-3/4">
            <div className="w-full sticky top-0 z-50">
                {/* Header */}
                <div className="flex justify-between bg-gray-primary p-3">
                    <div className="flex gap-3 items-center">
                        <Avatar>
                            <AvatarImage
                                src={conversationImage || "/placeholder.png"}
                                className="object-cover"
                            />
                            <AvatarFallback>
                                <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p>{conversationName}</p>
                            {selectedConversation.isGroup && (
                                <GroupMembersDialog
                                    selectedConversation={selectedConversation}
                                    clerkId={clerkId}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-7 mr-5">
                        <a href="/video-call" target="_blank">
                            <Video size={23} />
                        </a>
                        <X
                            size={16}
                            className="cursor-pointer"
                            onClick={() => setSelectedConversation(null)}
                        />
                    </div>
                </div>
            </div>
            {/* CHAT MESSAGES */}
            <MessageContainer clerkId={clerkId} />

            {/* INPUT */}
            <MessageInput clerkId={clerkId} />
        </div>
    )
}
export default RightPanel
