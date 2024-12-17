import { NextApiRequest, NextApiResponse } from "next"
import { currentUser } from "@clerk/nextjs/server"

import { pusherServer } from "@/lib/pusher"


export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await currentUser()
  if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
  }

  if (!session.emailAddresses[0]?.emailAddress) {
    return response.status(401)
  }

  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  const data = {
    user_id: session.emailAddresses[0]?.emailAddress
  }

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data)

  return response.send(authResponse)
}
