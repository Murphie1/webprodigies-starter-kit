"use client";

import { useCallback, useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FullConversationType } from "@/type";
import Avatar from "@/components/uMessage/Avatar";
import AvatarGroup from "@/components/uMessage/AvatarGroup";
import { onAuthenticatedUser } from "@/actions/auth"; // Use this action instead of useUser
import { User } from "@prisma/client";

// Type for the authenticated user
interface UserSession {
    id: string;
    role: string;
    email: string;
    image: string;
    username: string;
}

interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
    otherUser: User;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected, otherUser }) => {
    const [user, setUser] = useState<UserSession | null>(null); // Typed user state
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const router = useRouter();

    // Fetch authenticated user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authenticatedUser = await onAuthenticatedUser();
                if (!authenticatedUser || !authenticatedUser.email) {
                    router.replace("/sign-in");
                } else {
                    setUser(authenticatedUser); // Set user data to state
                }
            } catch (error) {
                console.error("Error fetching authenticated user:", error);
                router.replace("/sign-in");
            } finally {
                setIsLoading(false); // Set loading to false after fetching user
            }
        };

        fetchUser();
    }, [router]);

    // Memoize user email
    const userEmail = useMemo(() => {
        return user?.email || null;
    }, [user]);

    // Redirect to sign-in if user email is not found
    useEffect(() => {
        if (!userEmail && !isLoading) {
            router.replace("/sign-in");
        }
    }, [userEmail, isLoading, router]);

    // Memoize the last message of the conversation
    const lastMessage = useMemo(() => {
        const messages = data.chats || [];
        return messages[messages.length - 1];
    }, [data.chats]);

    // Check if the last message was seen by the user
    const hasSeen = useMemo(() => {
        if (!lastMessage) return false;
        const seenArray = lastMessage.seen || [];
        return seenArray.some((seenUser) => seenUser.email === userEmail);
    }, [userEmail, lastMessage]);

    // Determine the text to display for the last message
    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return "Sent an image";
        if (lastMessage?.video) return "Sent a video";
        if (lastMessage?.body) return lastMessage.body;
        return "Started a conversation";
    }, [lastMessage]);

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>; // Optionally, show a placeholder or spinner
    }

    // Render null if no user email
    if (!userEmail) return null;

    // Navigate to conversation page when clicked
    const handleClick = useCallback(() => {
        router.push(`/socials/${data.id}`);
    }, [data.id, router]);

    return (
        <div
            onClick={handleClick}
            className={cn(
                `
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
            `,
                selected ? "bg-sky-700" : "bg-white dark:bg-themeBlack"
            )}
        >
            {data.isGroup ? (
                <AvatarGroup conversation={data} users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md font-medium text-gray-900 dark:text-themeTextWhite">
                            {data.name || otherUser?.firstname}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400 dark:text-gray-200 font-light">
                                {format(new Date(lastMessage.createdAt), "p")}
                            </p>
                        )}
                    </div>
                    <p
                        className={cn(
                            `truncate text-sm`,
                            hasSeen
                                ? "text-gray-500 dark:text-gray-300"
                                : "text-black dark:text-white font-medium"
                        )}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConversationBox;
