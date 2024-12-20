"use client"

import { User } from "@prisma/client"
import axios from "axios"
import Avatar from "../Avatar"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import Input from "../inputs/Input"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import { Button } from "@/components/ui/button"

interface SettingsModalProps {
    currentUser: User
}

const SettingsModal: React.FC<SettingsModalProps> = ({ currentUser }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.firstname,
            image: currentUser?.image,
        },
    })

    const image = watch("image")

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios
            .post("/api/settings/uMessage", data)
            .then(() => {
                router.refresh()
                toast({
                    title: "Success!",
                    description: "Settings updated successfully.",
                    variant: "default",
                })
            })
            .catch((error) => {
                console.error("Error updating settings:", error)
                toast({
                    title: "Something went wrong!",
                    description: "Please try again later.",
                    variant: "destructive", // Optional: highlight error visually
                })
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Avatar user={currentUser} />
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
                                Profile
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Edit your Profile Info.
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
                                    disabled={isLoading}
                                    label="Name"
                                    id="name"
                                    errors={errors}
                                    required
                                    register={register}
                                />
                                <div>
                                    <label
                                        className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-900
                  "
                                    >
                                        Photo
                                    </label>
                                    <div
                                        className="
                  mt-2
                  flex
                  items-center
                  gap-x-3
                "
                                    >
                                        <Image
                                            width="48"
                                            height="48"
                                            className="rounded-full"
                                            src={
                                                image ||
                                                currentUser?.image ||
                                                "/next.svg"
                                            }
                                            alt="Avatar"
                                        />
                                        <CldUploadButton
                                           options={{
                                               maxFiles: 1,              // Limit to 1 file per upload  
                                               }}
                                            onUpload={handleUpload}
                                            uploadPreset="uMessageImages"
                                            >
                                            <Button
                                                disabled={isLoading}
                                                variant="secondary"
                                                type="button"
                                            >
                                                Change
                                            </Button>
                                        </CldUploadButton>
                                    </div>
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
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={isLoading} type="submit">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsModal
