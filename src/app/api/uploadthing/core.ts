import { auth } from "@clerk/nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

const handleAuth = () => {
    const { userId } = auth()
    if (!userId) throw new Error("Unauthorized")
    return { userId: userId }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    groupspaceImage: f({ image: { maxFileSize: "1GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

    profileImage: f({ image: { maxFileSize: "1GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
   
    postImage: f({ image: { maxFileSize: "1GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    
    postVideo: f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    
    messageFile: f(["image", "pdf", "video"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
