
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ImageProps {
  imageUrl: string;
}

const GroupImage = ({ imageUrl } : ImageProps) => {
  return (
    <Dialog>
      <DialogTrigger>
<div
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
         hover:scale-15
        "
      >
        <Image
          alt="Group"
          src={imageUrl}
          fill
        />
      </div>
        <DialogContent className="rounded-md h-[350px] w-[350px]">
          <Image
            src={imageUrl}
            alt="GroupLarge"
            fill
            />
        </DialogContent>
        </DialogTrigger>
      </Dialog>
  )
}
export default GroupImage
