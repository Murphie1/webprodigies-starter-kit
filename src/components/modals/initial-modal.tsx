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
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FileUpload } from "@/components/file-upload"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Atleast give your Groupspace a name.",
    }),
    imageUrl: z.string().min(1, {
        message: "Having an image is also quite important you know.",
    }),
})

export const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/groupspaces", values)

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
                <Plus />
            </DialogTrigger>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create your Groupspace
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
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
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="groupspaceImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            GroupSpace Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="e.g Anatomy 101"
                                                {...field}
                                            />
                                        </FormControl>
                                        <DialogFooter className="bg-gray-100 px-6 py-4">
                                            <Button
                                                disabled={isLoading}
                                                variant="primary"
                                                type="submit"
                                            >
                                                Create
                                            </Button>
                                            .
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
