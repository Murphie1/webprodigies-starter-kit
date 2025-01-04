import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ReactPlayer from "react-player"

export const Modal = ({
    image,
  video,
}: {
    image?: string | null
    video?: string | null
}) => {
    return (
        <Dialog>
          <DialogTrigger>
            {image ? (
                        <Image
                        src={image!}
                        width={300}
                        fill
                        className="rounded-lg object-contain"
                        alt="image"
                    /> ) : (
                       <ReactPlayer
                            url={video || ""}
                            controls
                            width="100%"
                        />
)}
          </DialogTrigger>
            <DialogContent className="w-full md:min-w-[750px]">
                <DialogDescription className="relative h-[550px] flex justify-center">
                    {image ? (
                        <Image
                        src={src}
                        width={300}
                        fill
                        className="rounded-lg object-contain"
                        alt="image"
                    /> ) : (
                       <ReactPlayer
                            url={renderedVideo}
                            controls
                            width="100%"
                        />
)}
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
  }
          
