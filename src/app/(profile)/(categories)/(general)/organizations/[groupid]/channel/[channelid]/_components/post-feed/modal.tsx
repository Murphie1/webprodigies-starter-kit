import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export const Modal = ({
  image,
}: {
  image?: string | null | undefined;
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
              <p className="text-center text-gray-500 dark:text-gray-400">
                No content available
              </p>
            </div>
          )}
        </div>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="w-full max-w-screen-md p-4 dark:bg-gray-800 bg-white rounded-lg shadow-lg">
        <DialogDescription className="relative w-full h-full flex items-center justify-center">
          {image ? (
            <div className="relative w-full h-full">
              <Image
                src={image}
                fill
                className="rounded-lg object-contain"
                alt="Full-size image"
                heigt={200}
                width={300}
               // sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
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
