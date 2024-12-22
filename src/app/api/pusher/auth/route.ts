import { NextResponse } from 'next/server';
import { pusherServer } from "@/lib/pusher"; // Adjust to your Pusher server configuration
import { currentUser } from "@clerk/nextjs/server"; // Assuming you use Clerk for authentication

export async function POST(request: Request) {
    try {
        const clerkUser = await currentUser();

        if (!clerkUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { channel_name, socket_id } = body;

        if (!channel_name || !socket_id) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const authPayload = pusherServer.authenticate(socket_id, channel_name);

        return NextResponse.json(authPayload);
    } catch (error) {
        console.error("Error with Pusher authentication:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
               }
