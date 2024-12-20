"use client"

import { useState, useEffect } from "react";
import { loggedInUser } from "@/actions/auth";
import { FullConversationType } from "@/type";
import { User } from "@prisma/client";

const useOtherUser = (
    conversation:
        | FullConversationType
        | { users: User[] },
): User | null => {
    const [otherUser, setOtherUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchOtherUser = async () => {
            const clerk = await loggedInUser();
            if (!clerk || !clerk.email) {
                throw new Error("Unauthorized");
            }

            const currentUserEmail = clerk.email;
            const otherUser = conversation.users.find(
                (user) => user.email !== currentUserEmail,
            );

            setOtherUser(otherUser || clerk);
        };

        fetchOtherUser().catch((error) => {
            console.error(error); // Handle errors if necessary
        });
    }, [conversation]);

    return otherUser;
};

export default useOtherUser;
