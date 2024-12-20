"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import Input from "@/components/uMessage/inputs/Input"
import Select from "@/components/uMessage/inputs/Select"
import { FullFriendType } from "@/type"
import axios from "axios"
import { User } from "@prisma/client";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useOtherUsers from "@/hooks/uMessage/friends"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"

interface GroupChatModalProps {
    users: FullFriendType[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ users }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast();
    // Call `useOtherUsers` at the top level
const otherUsers = useOtherUsers(users) // Returns an array
const [friends, setFriends] = useState<User[]>([])

// Process `otherUsers` asynchronously if needed
useEffect(() => {
    const fetchFriends = async () => {
        try {
            const fetchedFriends = await Promise.resolve(otherUsers) // Ensures async handling if needed
            setFriends(fetchedFriends) // Directly set the array to state
        } catch (error) {
            console.error("Error fetching friends:", error)
        }
    }

    fetchFriends()
}, [otherUsers]) // Re-fetch when `otherUsers` changes

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: [],
        },
    })

    const members = watch("members")
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)

        try {
            await axios.post("/api/conversations", {
                ...data,
                isGroup: true,
            })
            router.refresh()
            toast({
                title: "Success",
                description: "Conversation created successfully!",
                variant: "default",
            })
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
                variant: "destructive",
            })
            console.error("API Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Heart size={20} />
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Create a group chat
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Create a chat with at least 2 other people.
                            </p>
                            <div className="mt-10 flex flex-col gap-y-8">
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
                                    options={friends.map((friend) => ({
                                        value: friend.id,
                                        label: friend.firstname,
                                    }))}
                                    onChange={(value) =>
                                        setValue("members", value, {
                                            shouldValidate: true,
                                        })
                                    }
                                    value={members}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <DialogClose>
                            <Button disabled={isLoading} type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isLoading} type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default GroupChatModal
