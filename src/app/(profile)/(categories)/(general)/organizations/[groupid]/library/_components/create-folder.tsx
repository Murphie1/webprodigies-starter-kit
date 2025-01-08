"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast"; // Assuming you use a toast component

type FolderDialogProps = {
  ownerId: string;
  clerkId: string;
  authId?: string;
  groupId?: string;
  folderId?: string;
};

// Validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, {
    message: "Email is required.",
  }),
});

export const FolderDialog = ({ ownerId, clerkId, authId, groupId, folderId }: FolderDialogProps) => {
  const { toast } = useToast();
  const router = useRouter();
  
  const isLoading = form.formState.isSubmitting;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async () => {
  try {
    if (authId) {
      await fetch("/api/library/folders/createFolder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ownerId, authId, clerkId }),
      });
    } else if (groupId) {
      await fetch("/api/library/folders/createGroupFolder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ownerId, groupId, clerkId }),
      });
    } else if (folderId) {
      await fetch("/api/library/folders/createSubFolder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ownerId, folderId, clerkId }),
      });
    }
  } catch (error) {
    console.error("Error creating folder:", error);
  }
};

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2">
          {authId
            ? "Create Folder"
            : groupId
            ? "Create Group Folder"
            : folderId
            ? "Create Sub-Folder"
            : "Open Dialog"}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>
            {authId
              ? "Create Folder"
              : groupId
              ? "Create Group Folder"
              : folderId
              ? "Create Sub-Folder"
              : "Folder Dialog"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    User&apos;s Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="rounded-lg"
                      placeholder="Enter folder name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <DialogFooter>
            <Button
              type="submit"
              className="rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors px-4 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create"}
            </Button>
            </DialogFooter>
        </form>
          </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FolderDialog;
