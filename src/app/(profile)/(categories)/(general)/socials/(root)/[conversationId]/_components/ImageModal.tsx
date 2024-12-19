"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"

interface ImageModalProps {
    src?: FullMessageType | null
}

const ImageModal: React.FC<ImageModalProps> = ({ src }) => {
    if (!src) {
        return null
    }

    return (
        <Dialog>
            <DialogTrigger>
                {src?.image ? (
                <Image
                    alt="Image"
                    height="288"
                    width="288"
                    src={src.image}
                    className="
                object-cover
                cursor-pointer
                hover:scale-110
                transition
                translate
              "
                />
            ) : (
            <video
                alt="video"
                height="288"
                    width="288"
                src={src.video || ""}
                className="object-cover
                cursor-pointer
                hover:scale-110
                transition
                translate
                "
                />
            )}
            </DialogTrigger>
            <DialogContent>
                <div className="w-80 h-80">
                    {src?.image ? (
            <Image
                        alt="Image"
                        className="object-cover"
                        fill
                        src={src.image!}
                    />
            ) : (
            <video
                        alt="video"
                        className="object-cover"
                        fill
                        src={src.video || ""}
                    />
            )}
            
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ImageModal
