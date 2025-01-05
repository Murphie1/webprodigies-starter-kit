// components/AvatarDialog.tsx
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";

interface AvatarDialogProps {
  imageUrl: string;
  size?: number; // Optional prop for customizing the size of the avatar
}

const GroupImage: React.FC<AvatarDialogProps> = ({ imageUrl, size = 40 }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={clsx(
          "rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:ring focus:ring-blue-400",
          `h-[${size}px] w-[${size}px]`
        )}
      >
        <img
          src={imageUrl}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content
          className="bg-white p-4 rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full"
        >
          <img
            src={imageUrl}
            alt="Enlarged Avatar"
            className="rounded-lg w-full object-contain"
          />
          <Dialog.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GroupImage;
