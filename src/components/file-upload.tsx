"use client"
import { UploadDropZone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"
import Image from "next/image"
import { X } from "lucide-react"

interface FileUploadProps {
    onChange: (url?: string) => void
    value: string
    endpoint: "messageFile" | "groupspaceImage"
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value?.split(".").pop()

    if (value && (fileType !== "pdf") | "video") {
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="Upload" className="rounded-full" />
                <button
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    onClick={() => onChange("")}
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropZone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}
