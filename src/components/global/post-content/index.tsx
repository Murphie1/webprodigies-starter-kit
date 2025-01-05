"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming this exists
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import { Upload, X } from "lucide-react";

type PostContentProps = {
    channelid: string;
};

const formSchema = z.object({
    title: z.string().optional(), // Title is optional
    content: z.string().min(1, {
        message: "Your Post cannot be empty.",
    }),
    image: z.string().optional(),
    video: z.string().optional(),
});

export const PostContent = ({ channelid }: PostContentProps) => {
    const [imageOpen, setImageOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            image: "",
            video: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/groups/channels/${channelid}/post`, values);
            form.reset();
            router.refresh();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-h-screen overflow-y-auto p-4 sm:p-6"
            >
                <div className="space-y-6">
                    {/* Title Field */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                    Title (Optional)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        {...field}
                                        placeholder="e.g. 'Announcement'"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Content Field */}
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
                    {/* Image Upload */}
                    {imageOpen ? (
                        <div className="relative border rounded-lg p-4 dark:bg-gray-800 bg-white">
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
                            <Button
                                type="button"
                                variant="ghost"
                                className="absolute top-2 right-2"
                                onClick={() => setImageOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            type="button"
                            className="rounded-2xl bg-themeBlack text-white dark:bg-white dark:text-black flex gap-x-2"
                            onClick={() => setImageOpen(true)}
                        >
                            <Upload />
                            Add an Image
                        </Button>
                    )}
                    {/* Video Upload */}
                    {videoOpen ? (
                        <div className="relative border rounded-lg p-4 dark:bg-gray-800 bg-white">
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
                            <Button
                                type="button"
                                variant="ghost"
                                className="absolute top-2 right-2"
                                onClick={() => setVideoOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            type="button"
                            className="rounded-2xl bg-themeBlack text-white dark:bg-white dark:text-black flex gap-x-2"
                            onClick={() => setVideoOpen(true)}
                        >
                            <Upload />
                            Add a Video
                        </Button>
                    )}
                </div>
                {/* Submit Button */}
                <div className="px-6 py-4 bg-transparent">
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="w-full"
                    >
                        Post
                    </Button>
                </div>
            </form>
        </Form>
    );
};




    
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
