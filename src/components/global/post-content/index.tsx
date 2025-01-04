"use client"
//import BlockTextEditor from "@/components/global/rich-text-editor"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FileUpload } from "@/components/file-upload"

import { useCreateChannelPost } from "@/hooks/channels"

import { Upload } from "lucide-react"

type PostContentProps = {
    channelid: string
}


    const formSchema = z.object({
    content: z.string().min(1, {
        message: "Your Post cannot be empty.",
    }),
  //  imageUrl: z.string().min(1, {
      //  message: "Having an image is also quite important you know.",
    //}),
})


export const PostContent = ({ channelid }: PostContentProps) => {
    const [isMounted, setIsMounted] = useState(false)
    const [imageOpen, setImageOpen] = useState(false)
    const [videoOpen, setVideoOpen] = useState(false)
    
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            image: "",
            video: "",
        },
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/groups/channels/${channelid}/post`, values)

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
        <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white dark:border-2 dark:border-themeGray"
                                                placeholder="e.g Announcement"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Content
                                        </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      {...field}
                      placeholder="e.g. 'This post is about...'"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                            {imageOpen ? ( 
                        <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="postImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div> ) : ( 
                        <Button type="button" className="self-end rounded-2xl bg-themeBlack text-white dark:bg-white dark:text-black flex gap-x-2">
                <Upload onClick={() => setImageOpen(true)} />
                Add an Image
            </Button>
                        )}
                            {videoOpen ? ( 
                        <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="video"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="postVideo"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div> ) : ( 
                        <Button type="button" className="self-end rounded-2xl bg-themeBlack text-white dark:bg-white dark:text-black flex gap-x-2">
                <Upload onClick={() => setVideoOpen(true)} />
                Add a Video
            </Button>
                        )}
                        </div>
                        
                                <div className="bg-transparent px-6 py-4">
                                            <Button
                                                disabled={isLoading}
                                                variant="ghost"
                                                type="submit"
                                            >
                                                Post
                                            </Button>
                                        <div>
                    </form>
                </Form>
        )
    }








    
    {/* const {
        errors,
        register,
        onDescription,
        onJsonDescription,
        onHtmlDescription,
        setOnDescription,
        setOnHtmlDescription,
        setJsonDescription,
        onCreatePost,
    } = useCreateChannelPost(channelid)

    return (
        <form className="flex flex-col gap-y-5 w-full" onSubmit={onCreatePost}>
            <Input
                placeholder="Enter your title here and your post below"
                className="bg-transparent outline-none border-none text-xl p-0"
                {...register("title")}
            />
            <BlockTextEditor
                errors={errors}
                name="jsoncontent"
                min={0}
                max={10000}
                inline
                onEdit
                textContent={onDescription}
                content={onJsonDescription}
                setContent={setJsonDescription}
                setTextContent={setOnDescription}
                htmlContent={onHtmlDescription}
                setHtmlContent={setOnHtmlDescription}
            />
            <Button className="self-end rounded-2xl bg-black text-white dark:bg-white dark:text-black flex gap-x-2">
                <Upload />
                Create
            </Button>
        </form>
    )
}*/}
