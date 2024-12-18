"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import Image from "next/image";

interface ImageModalProps {
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  src
}) => {
  if (!src) {
    return null;
  }

  return ( 
    <Dialog>
      <DialogTrigger>
      <Image
              alt="Image"
              height="288"
              width="288"
              src={src}
              className="
                object-cover
                cursor-pointer
                hover:scale-110
                transition
                translate
              "
            />
      </DialogTrigger>
      <DialogContent>
      <div className="w-80 h-80">
        <Image
          alt="Image"
          className="object-cover"
          fill
          src={src}
        />
      </div>
    </DialogContent>
    </Dialog>
  );
}
 
export default ImageModal;
