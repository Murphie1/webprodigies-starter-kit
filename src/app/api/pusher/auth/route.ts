import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { pusherServer } from "@/lib/pusher"

export async function POST(request: Request) {
    try {
        // Retrieve the session using Clerk
        const session = await currentUser()
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!session.emailAddresses[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Parse the incoming request body to get socket_id and channel_name
        const { socket_id, channel_name } = await request.json()

        // Ensure both socket_id and channel_name are provided
        if (!socket_id || !channel_name) {
            return new NextResponse("Bad Request", { status: 400 })
        }

        // Prepare the data for Pusher authorization
        const data = {
            user_id: session.emailAddresses[0]?.emailAddress,
        }

        // Authorize the Pusher channel
        const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, data)

        // Return the Pusher auth response
        return new NextResponse(JSON.stringify(authResponse), { status: 200 })
    } catch (error) {
        console.error("Pusher authorization error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
