"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

type LoggedInUser = {
    status: number;
    id: string;
    firstname: string;
    lastname: string | null;
    email: string | null;
    createdAt: Date;
    clerkId: string;
    image: string | null;
    stripeId: string | null;
    role: string;
    attributes: string[];
    conversationIds: string[];
    seenChatIds: string[];
};

export const onAuthenticatedUser = async () => {
    try {
        const clerk = await currentUser()
        if (!clerk) return { status: 404 }

        const user = await client.user.findUnique({
            where: {
                clerkId: clerk.id,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                image: true,
                role: true,
                email: true,
            },
        })
        if (user)
            return {
                status: 200,
                id: user.id,
                role: user.role,
                image: user.image || `${clerk.imageUrl}`,
                email: user.email || `${clerk.emailAddresses[0]?.emailAddress}`,
                username: `${user.firstname} ${user.lastname}`,
            }
        return {
            status: 200,
        }
            
    } catch (error) {
        return {
            status: 400,
        }
    }
}

export const loggedInUser = async (): Promise<LoggedInUser> => {
    try {
        const clerk = await currentUser()
        if (!clerk) return { status: 404, email: null } as any

        const user = await client.user.findUnique({
            where: {
                clerkId: clerk.id,
            },
        })

        if (!user) {
            return {
                status: 404,
                id: "",
                firstname: "",
                lastname: null,
                email: null,
                createdAt: new Date(),
                clerkId: "",
                image: null,
                stripeId: null,
                role: "user", // Default role
                attributes: [],
                conversationIds: [],
                seenChatIds: [],
            }
        }

        // Make sure you return a full user object
        return {
            status: 200,
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            createdAt: user.createdAt,
            clerkId: user.clerkId,
            image: user.image,
            stripeId: user.stripeId,
            role: user.role,
            attributes: user.attributes || [],
            conversationIds: user.conversationIds || [],
            seenChatIds: user.seenChatIds || [],
        }
    } catch (error) {
        return {
            status: 400,
            email: null,
        } as any
    }
            }

export const onSignInUser = async (clerkId: string) => {
    try {
        const loggedInUser = await client.user.findUnique({
            where: {
                clerkId,
            },
            select: {
                id: true,
                group: {
                    select: {
                        id: true,
                        channel: {
                            select: {
                                id: true,
                            },
                            take: 1,
                            orderBy: {
                                createdAt: "asc",
                            },
                        },
                    },
                },
            },
        })

        if (loggedInUser) {
            if (loggedInUser.group.length > 0) {
                return {
                    status: 207,
                    id: loggedInUser.id,
                    groupId: loggedInUser.group[0].id,
                    channelId: loggedInUser.group[0].channel[0].id,
                }
            }

            return {
                status: 200,
                message: "User successfully logged in",
                id: loggedInUser.id,
            }
        }

        return {
            status: 400,
            message: "User could not be logged in! Try again",
        }
    } catch (error) {
        return {
            status: 400,
            message: "Oops! something went wrong. Try again",
        }
    }
}
