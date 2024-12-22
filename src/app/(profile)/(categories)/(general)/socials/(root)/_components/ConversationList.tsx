"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useConversation from "@/hooks/uMessage/useConversation";
import { FullConversationType, FullFriendType } from "@/type";
import AsyncConversationBox from "./AsyncConversationBox";
import GroupChatModal from "./GroupChatModal";
import { onAuthenticatedUser } from "@/actions/auth"; // Replace Clerk's useUser with this
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

// Define the type for the authenticated user
interface AuthenticatedUser {
    status: number;
    id?: string;
    role?: string;
    image?: string;
    email?: string;
    username?: string;
}

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: FullFriendType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users,
}) => {
    const router = useRouter();
    const { conversationId, isOpen } = useConversation();

    const [items, setItems] = useState(initialItems);
    const [user, setUser] = useState<AuthenticatedUser | null>(null);

    const pusherKey = useMemo(() => {
        return user?.email || ""; // Memoize pusherKey based on the user's email
    }, [user]);

    // Fetch authenticated user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authenticatedUser = await onAuthenticatedUser();
                if (!authenticatedUser || !authenticatedUser.email) {
                    router.push("/sign-in");
                } else {
                    setUser(authenticatedUser); // Set the authenticated user to state
                }
            } catch (error) {
                console.error("Error fetching authenticated user:", error);
                router.push("/sign-in"); // Redirect to sign-in on error
            }
        };

        fetchUser();
    }, [router]);

    // Handle Pusher subscription
    useEffect(() => {
        if (!pusherKey) return;

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }
                return [conversation, ...current];
            });
        };

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) =>
                current.map((currentConversation) => {
                    if (currentConversation.id === conversation.id) {
                        return {
                            ...currentConversation,
                            messages: conversation.chats,
                        };
                    }
                    return currentConversation;
                })
            );
        };

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) =>
                current.filter((convo) => convo.id !== conversation.id)
            );

            if (conversationId === conversation.id) {
                router.push("/socials");
            }
        };

        pusherClient.bind("conversation:new", newHandler);
        pusherClient.bind("conversation:update", updateHandler);
        pusherClient.bind("conversation:remove", removeHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("conversation:new", newHandler);
            pusherClient.unbind("conversation:update", updateHandler);
            pusherClient.unbind("conversation:remove", removeHandler);
        };
    }, [pusherKey, conversationId, router]);

    // Render loading state
    if (!user) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Loading conversations...</p>
            </div>
        );
    }

    return (
        <aside
            className={cn(
                `
          fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-80
          lg:block
          overflow-y-auto
          border-r
          border-gray-200
          dark:border-themeBlack
        `,
                isOpen ? "hidden" : "block w-full left-0"
            )}
        >
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div
                        className="
                            text-2xl
                            font-bold
                            text-neutral-800
                            dark:text-white
                        "
                    >
                        uMessages
                    </div>
                    <div
                        className="
                            rounded-full
                            p-2
                            bg-gray-100
                            dark:bg-gray-900
                            text-gray-600
                            cursor-pointer
                            hover:opacity-75
                            transition
                        "
                    >
                        <GroupChatModal users={users} />
                    </div>
                </div>
                {items.map((item) => (
                    <AsyncConversationBox
                        key={item.id}
                        conversation={item}
                        selected={conversationId === item.id}
                    />
                ))}
            </div>
        </aside>
    );
};

export default ConversationList;
