"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import Input from "@/components/uMessage/inputs/Input";
import Select from "@/components/uMessage/inputs/Select";
import { Friend } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface GroupChatModalProps {
  users: Friend[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  users
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh();
    })
    .catch((error) => toast({
           title: Something went wrong
    })
    .finally(() => setIsLoading(false))
  }

  return ( 
    <Dialog>
      <DialogTrigger>
      <Heart size="20" />
      </DialogTrigger>
      <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base
                font-semibold
                leading-7
                text-gray-900
              "
            >
              Create a group chat
            </h2>
            <p
              className="
                mt-1
                text-sm
                leading-6
                text-gray-600
              "
            >
              Create a chat with atleast 2 other people.
            </p>
            <div
              className="
                mt-10
                flex
                flex-col
                gap-y-8
              "
            >
              <Input
                register={register}
                label="Name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name
                }))}
                onChange={(value) => setValue('members', value, {
                  shouldValidate: true
                })}
                value={members}
              />
            </div>
          </div>
        </div>
        <div
          className="
            mt-6
            flex
            items-center
            justify-end
            gap-x-6
          "
        >
          <DialogClose>
          <Button
            disabled={isLoading}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
            </DialogClose>
          <Button
            disabled={isLoading}
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
            </DialogContent>
    </Dialog>
   );
}
 
export default GroupChatModal;
