"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/global/editor";
import { Preview } from "@/components/global/preview";

const formSchema = z.object({
  description: z.string().min(1),
});

interface GroupDescriptionFormProps {
  initialData: string;
  groupId: string;
}

const GroupDescriptionForm = ({ initialData, groupId }: GroupDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => {
    if (isEditing) {
      form.reset({ description: initialData || "" });
    }
    setIsEditing((current) => !current);
  };
const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/groups/${groupId}/description`,
        values
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Group Description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Cancel</> : <>
            <Pencil className="h-4 w-4 mr-2" />
            Edit description
          </>}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData && "italic text-slate-500"
          )}
        >
          {!initialData && "No description"}
          {initialData && (
            <Preview value={initialData} />
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default GroupDescriptionForm;
