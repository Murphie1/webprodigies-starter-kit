"use client"

import { ListFilter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import ThemeSwitch from "./theme-switch"
import Conversation from "./conversation"
import { UserButton } from "@clerk/nextjs"
import { CreateRequest } from "@/app/(profile)/(categories)/(general)/socials/friends/_components/CreateRequest"

import UserListDialog from "./user-list-dialog"
import { useQuery } from "convex/react"
import { api } from "~/convex/_generated/api"
import { useEffect } from "react"
import { useConversationStore } from "@/store/chat-store"

interface LeftPanelProps {
    clerkId: string
}

const LeftPanel = ({ clerkId }: LeftPanelProps) => {
 const conversations = useQuery(
        api.conversations.getMyConversations, clerkId ? { 
         clerkId: clerkId 
        } : "skip"
 )

    const { selectedConversation, setSelectedConversation } =
        useConversationStore()

      useEffect(() => {
        const conversationIds = conversations?.map(
            (conversation) => conversation._id
        )
        if (
            selectedConversation &&
            conversationIds &&
            !conversationIds.includes(selectedConversation._id)
        ) {
            setSelectedConversation(null)
        }
    }, [conversations, selectedConversation, setSelectedConversation])

    if (!clerkId) return null // Ensure clerkId exists before rendering

    return (
        <div className="w-screen md:w-1/4 md:border-gray-600 md:border-r">
            <div className="sticky top-0 bg-left-panel z-10">
                {/* Header */}
                <div className="flex justify-between bg-gray-primary p-3 items-center">
                    <div className="flex items-center gap-3">
                        <UserButton />
                        <CreateRequest clerkstring={clerkId} />
                        </div>

                    <div className="flex items-center gap-3">
                         <UserListDialog clerkid={clerkId} />
                        <ThemeSwitch />
                    </div>
                </div>
                <div className="p-3 flex items-center">
                    {/* Search */}
                    <div className="relative h-10 mx-3 flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                            size={18}
                        />
                        <Input
                            type="text"
                            placeholder="Search or start a new chat"
                            className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent"
                        />
                    </div>
                    <ListFilter className="cursor-pointer" />
                </div>
            </div>

            {/* Chat List */}
            <div className="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
                {/* Conversations */}
                {conversations?.map((conversation) => (
                  <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        clerkId={clerkId}
                    />
                ))}

                {conversations?.length === 0 && (
                    <>
                        <p className="text-center text-gray-500 text-sm mt-3">
                            No conversations yet
                        </p>
                        <p className="text-center text-gray-500 text-sm mt-3">
                            We understand {"you're"} an introvert, but{" "}
                            {"you've"} got to start somewhere 😊
                        </p>
                    </>
                  )}
            </div>
        </div>
    )
}

export default LeftPanel
