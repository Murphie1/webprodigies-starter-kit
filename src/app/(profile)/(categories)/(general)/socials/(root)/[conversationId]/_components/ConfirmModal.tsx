"use client";

import { Button } from "@/components/ui/button";
import useConversation from "@/hooks/uMessage/useConversation";
import { 
Dialog,
DialogHeader,
DialogTrigger,
DialogContent
} from "@/components/ui/dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Heart } from "lucide-react";


const ConfirmModal = () => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      onClose();
      router.push('/socials');
      router.refresh();
    })
    .catch((error) => toast(
{
title: 'Something went wrong!'
}
))
    .finally(() => setIsLoading(false))
  }, [conversationId, router, onClose]);

  return ( 
    <Dialog>
<DialogTrigger>
<Heart size={20} />
</DialogTrigger>
<DialogContent>
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            bg-red-100
            sm:mx-0
            sm:h-10
            sm:w-10
          "
        >
          <BookOpen
            className="h-6 w-6 text-red-600"
          />
        </div>
        <div
          className="
            mt-3
            text-center
            sm:ml-4
            sm:mt-0
            sm:text-left
          "
        >
          <DialogHeader>
            className="
              text-base
              font-semibold
              leading-6
              text-gray-900
            "
          >
            Delete conversation
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div
        className="
          mt-5
          sm:mt-4
          sm:flex
          sm:flex-row-reverse
        "
      >
        <Button
          disabled={isLoading}
          variant="destructive"
          onClick={onDelete}
        >
          Delete
        </Button>
<DialogClose>
        <Button
          disabled={isLoading}
          variant="secondary"
        >
          Cancel
        </Button>
</DialogClose>
      </div>
</DialogContent>
    </Dialog>
   );
}
 
export default ConfirmModal;
