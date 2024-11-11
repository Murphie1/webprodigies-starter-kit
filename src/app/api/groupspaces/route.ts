import { currentGroup } from "@/lib/current-group"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { GSMemberRole } from "@prisma/client"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
    try {
        const user = await currentUser()
        if (!user) {
            return redirect("/sign-in")
        }
        const { name, imageUrl } = await req.json()
        const group = await currentGroup()

        if (!group) {
            return new NextResponse("Groupless", { status: 401 })
        }

        const groupspace = await client.groupspace.create({
            data: {
                clerkId: user.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                joinCode: uuidv4(),
                session: {
                    create: [{ name: "General", clerkId: user.id }],
                },
                gsMember: {
                    create: [{ clerkId: user.id, role: GSMemberRole.ADMIN }],
                },
            },
        })
    } catch (error) {
        console.log("[GROUPSPACES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
