import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

export const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = client
// for production dont forget to remove the last two lines and replace em with  export const client = new PrismaClient()
