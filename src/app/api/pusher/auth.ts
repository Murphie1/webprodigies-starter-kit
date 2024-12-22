import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { pusherServer } from "@/lib/pusher"

export default async function handler(request: Request) {
    const session = await currentUser()
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!session.emailAddresses[0]?.emailAddress) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const { socket_id, channel_name } = await request.json()
    const data = {
        user_id: session.emailAddresses[0]?.emailAddress,
    }

    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, data)

    return new NextResponse(JSON.stringify(authResponse))
            }
