"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface ImageModalProps {
  src?: FullMessageType | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ src }) => {
  if (!src) {
    return null;
  }

  const isImage = Boolean(src.image);
  const videoFallback =
    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

  return (
    <Dialog>
      <DialogTrigger>
        {isImage ? (
          <Image
            alt="Image"
            height={288}
            width={288}
            src={src.image!}
            className="
              object-cover
              cursor-pointer
              hover:scale-110
              transition
              transform
            "
          />
        ) : (
          <video
            height={288}
            width={288}
            src={src.video || videoFallback}
            className="
              object-cover
              cursor-pointer
              hover:scale-110
              transition
              transform
            "
            controls
            poster="https://via.placeholder.com/288"
          />
        )}
      </DialogTrigger>
      <DialogContent>
        <div className="w-80 h-80 relative">
          {isImage ? (
            <Image
              alt="Image"
              className="object-cover"
              fill
              src={src.image!}
            />
          ) : (
            <video
              className="object-cover w-full h-full"
              src={src.video || videoFallback}
              controls
              poster="https://via.placeholder.com/320"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
