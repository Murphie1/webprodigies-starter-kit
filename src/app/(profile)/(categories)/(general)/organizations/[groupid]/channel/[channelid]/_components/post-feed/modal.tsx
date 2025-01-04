import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ReactPlayer from "react-player";

export const Modal = ({
  image,
  video,
}: {
  image?: string | null;
  video?: string | null;
}) => {
  return (
    <Dialog>
      {/* Trigger for the modal */}
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          {image ? (
            <Image
              src={image}
              width={300}
              height={200}
              className="rounded-lg object-cover"
              alt="Preview image"
            />
          ) : (
            <div className="w-full">
              <ReactPlayer url={video || ""} controls width="100%" />
            </div>
          )}
        </div>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="w-full max-w-screen-md p-4 dark:bg-gray-800 bg-white rounded-lg shadow-lg">
        <DialogDescription className="relative flex items-center justify-center h-[350px] sm:h-[550px]">
          {image ? (
            <Image
              src={image}
              fill
              className="rounded-lg object-contain"
              alt="Full-size image"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : video ? (
            <ReactPlayer url={video} controls width="100%" height="100%" />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No content available
            </p>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
