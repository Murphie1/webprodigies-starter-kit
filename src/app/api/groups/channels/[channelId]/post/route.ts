import { onAuthenticatedUser } from "@/actions/auth"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: { channelId: string } }
) {
    try {
       const { channelId } = params;
        const clerk = await currentUser()
        if (!clerk) {
            return redirect("/sign-in")
        }
        const { title, image, content, video } = await req.json()
        const user = await onAuthenticatedUser()

        if (!user) {
            return new NextResponse("userless", { status: 401 })
        }

        const post = await client.post.create({
            data: {
                channeld,
                title,
                content,
                video,
                image,
                authorId: user.id,
                htmlContent: content,
            },
        })
    } catch (error) {
        console.log("[POST_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
