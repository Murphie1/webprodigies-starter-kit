"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { CirclePlus } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Your Profile needs a name.",
    }),
    //imageUrl: z.string().min(1, {
       // message: "Having an image is also quite important you know.",
  //  }),
})

export const CreateRequest = () => {
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            message: "",
        },
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/uMessage/friend/request", values)

            form.reset()
            router.refresh()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    if (!isMounted) {
        return null
    }

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
                        Send a request
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 dark:text-themeWhite">
                        Add a name and an image. You&apos;re free to change this
                        at anytime.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Add a message (optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white dark:border-2 dark:border-themeGray"
                                                placeholder="e.g College Stuff"
                                                {...field}
                                            />
                                          </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Users Email (required)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white dark:border-2 dark:border-themeGray"
                                                placeholder="e.g College Stuff"
                                                {...field}
                                            />
                                        </FormControl>
                                        <DialogFooter className="bg-transparent px-6 py-4">
                                            <Button
                                                disabled={isLoading}
                                                variant="primary"
                                                type="submit"
                                            >
                                                Done
                                            </Button>
                                        </DialogFooter>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
  }
