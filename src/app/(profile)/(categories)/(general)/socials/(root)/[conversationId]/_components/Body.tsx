"use client"

import { useEffect, useRef, useState } from "react"
import useConversation from "@/hooks/uMessage/useConversation"
import { FullMessageType } from "@/type"
import MessageBox from "./MessageBox"
import axios from "axios"
import { pusherClient } from "@/lib/pusher"

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const { conversationId } = useConversation()

    // Track whether the user is scrolling up
    const [isUserAtBottom, setIsUserAtBottom] = useState(true)

    // Send "seen" status when conversationId changes
    useEffect(() => {
        if (conversationId) {
            axios.post(`/api/conversations/${conversationId}/seen`)
        }
    }, [conversationId])

    // Track the scroll position to determine if the user is at the bottom
    useEffect(() => {
        const chatContainer = chatContainerRef.current
        const handleScroll = () => {
            if (!chatContainer) return
            const isAtBottom =
                chatContainer.scrollHeight - chatContainer.scrollTop ===
                chatContainer.clientHeight
            setIsUserAtBottom(isAtBottom)
        }

        // Listen to scroll events
        if (chatContainer) {
            chatContainer.addEventListener("scroll", handleScroll)
        }

        return () => {
            // Cleanup event listener
            if (chatContainer) {
                chatContainer.removeEventListener("scroll", handleScroll)
            }
        }
    }, []) // Empty dependency array means this runs once after the initial render

    useEffect(() => {
        if (!conversationId) return

        pusherClient.subscribe(conversationId)

        // Message handler
        const messageHandler = (message: FullMessageType) => {
            setMessages((prevMessages) => {
                if (prevMessages.some((msg) => msg.id === message.id)) {
                    return prevMessages
                }
                return [...prevMessages, message]
            })

            // Scroll to bottom only if user is at the bottom
            if (isUserAtBottom && bottomRef.current) {
                bottomRef.current.scrollIntoView({ behavior: "smooth" })
            }
        }

        // Update message handler
        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((prevMessages) =>
                prevMessages.map((currentMessage) =>
                    currentMessage.id === newMessage.id
                        ? newMessage
                        : currentMessage,
                ),
            )
        }

        // Bind Pusher events
        pusherClient.bind("messages:new", messageHandler)
        pusherClient.bind("message:update", updateMessageHandler)

        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind("messages:new", messageHandler)
            pusherClient.unbind("message:update", updateMessageHandler)
        }
    }, [conversationId, isUserAtBottom])

    return (
        <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto"
            style={{ paddingBottom: "1rem" }} // Add some padding to avoid content being hidden
        >
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

export default Body
