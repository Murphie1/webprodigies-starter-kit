import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getGroupspaces = async () => {
    const groupspaces = await prisma.groupspaces.findMany()
    return groupspaces
}
