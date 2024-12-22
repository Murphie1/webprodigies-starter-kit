"use client"

import { cn } from "@/lib/utils"

import useConversation from "@/hooks/uMessage/useConversation"
import EmptyStateTwo from "@/components/uMessage/EmptyState"

const Home = () => {
   const { isOpen } = useConversation()

    return (
        <div
           className={cn(
             "lg:pl-80 h-full lg:block",
         isOpen ? "block" : "hidden",
            )}
        >
            <EmptyStateTwo />
        </div>
    )
}

export default Home
