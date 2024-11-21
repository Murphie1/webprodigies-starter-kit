import { onAuthenticatedUser } from "@/actions/auth"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
    try {
        const clerk = await currentUser()
        if (!clerk) {
            return redirect("/sign-in")
        }
        const { name, imageUrl } = await req.json()
        const user = await onAuthenticatedUser()

        if (!user) {
            return new NextResponse("userless", { status: 401 })
        }

        const profile = await client.profile.create({
            data: {
                clerkId: clerk.id,
                name,
                imageUrl,
                email: clerk.emailAddresses[0]?.emailAddress,
                userId: user.id,
            },
        })
    } catch (error) {
        console.log("[PROFILES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
  }
