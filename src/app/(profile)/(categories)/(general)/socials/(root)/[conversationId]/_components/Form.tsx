"use client"

import useConversation from "@/hooks/uMessage/useConversation"
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Heart } from "lucide-react"
import { CldUploadButton } from "next-cloudinary"

import MessageInput from "./MessageInput"

const Form = () => {
    const { conversationId } = useConversation()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            message: "",
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", { shouldValidate: true })

        axios.post("/api/uMessage", {
            ...data,
            conversationId,
        })
    }

    const handleUpload = (result: any) => {
        axios.post("/api/uMessage", {
            image: result?.info?.secure_url,
            conversationId,
        })
    }

    const handleUploadTwo = (result: any) => {
        axios.post("/api/uMessage", {
            video: result?.info?.secure_url,
            conversationId,
        })
    }

    
    return (
        <div
            className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
      "
        >
            <CldUploadButton
    options={{
        maxFiles: 1,              // Limit to 1 file per upload        )
    }}
    onUpload={handleUpload}
    uploadPreset="uMessageImages"
>
    <Heart size={30} className="text-sky-500" />
</CldUploadButton>
            <CldUploadButton
    options={{
        maxFiles: 1,              // Limit to 1 file per upload       
    }}
    onUpload={handleUploadTwo}
    uploadPreset="uMessageVideos"
>
    <Heart size={30} className="text-sky-500" />
</CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type="submit"
                    className="
            rounded-full
            p-2
            bg-sky-500
            cursor-pointer
            hover:bg-sky-600
            transition
          "
                >
                    <Heart size={18} className="text-white dark:text-black" />
                </button>
            </form>
        </div>
    )
}

export default Form
