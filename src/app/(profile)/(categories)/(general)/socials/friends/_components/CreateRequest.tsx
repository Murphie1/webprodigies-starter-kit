"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast"; // Assuming you use a toast component
import { api } from "@/convex/_generated/client"; // Adjust path as needed
import { useMutation } from "convex/react"; // For calling the Convex API

type Props = {
    clerkstring: string;
}
// Validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, {
    message: "Email is required.",
  }),
});

export const CreateRequest = ({ clerkstring } : Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const createFriend = useMutation(api.friends.createFriend);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createFriend({
        email: values.email,
        clerkId: clerkstring, // Replace with actual clerkId
      });

      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Friend request sent successfully.",
          variant: "success",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error creating friend:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isMounted) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <span>
          <CirclePlus /> <p>Send a request</p>
        </span>
      </DialogTrigger>
      <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-black dark:text-white">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Send a Request
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-themeWhite">
            Add a user by their email.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    User's Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white dark:border-2 dark:border-themeGray"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="bg-transparent px-6 py-4">
              <Button disabled={isLoading} variant="primary" type="submit">
                Send Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
