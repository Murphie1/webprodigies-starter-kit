"use server"
import { User } from "@prisma/client"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

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

export const loggedInUser = async (): Promise<User> => {
    try {
        const clerk = await currentUser()

        // Throw an error if Clerk is not authenticated
        if (!clerk) {
            throw new Error("Unauthorized")
        }

        // Try to find the user in the database
        let user = await client.user.findUnique({
            where: {
                clerkId: clerk.id,
            },
        })

        // If the user doesn't exist, create a new one
        if (!user) {
            user = await client.user.create({
                data: {
                    clerkId: clerk.id,
                    firstname: `${clerk.firstName || clerk.username}`,
                    lastname: `${clerk.lastName || ""}`,
                    email: `${clerk.emailAddresses[0]?.emailAddress || ""}`,
                    image: `${clerk.imageUrl || null}`,
                },
            })
        }

        return user
    } catch (error) {
        console.error("Error fetching or creating user:", error)
        throw error // Re-throw the error to handle it at a higher level
    }
}

export const onSignUpUser = async (data: {
    firstname: string
    lastname: string
    image: string
    clerkId: string
}) => {
    try {
        const createdUser = await client.user.create({
            data: {
                ...data,
            },
        })

        if (createdUser) {
            return {
                status: 200,
                message: "User successfully created",
                id: createdUser.id,
            }
        }

        return {
            status: 400,
            message: "User could not be created! Try again",
        }
    } catch (error) {
        return {
            status: 400,
            message: "Oops! something went wrong. Try again",
        }
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
