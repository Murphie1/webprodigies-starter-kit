"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface UserProfileCardProps {
    imageUrl: string
    name: string
    type: string | null
    email: string | null
}

export const ProfileCard = ({
    imageUrl,
    name,
    type,
    email
}: UserProfileCardProps) => {
    const router = useRouter()

    const onClick = () => {
        router.push("/home")
    }

    return (
        <div className="relative">
            <Card
                role="button"
                tabIndex={0}
                className="bg-white border-black w-[350px] h-[350px] hover:border-bold hover:outline hover:w-[380px] hover:h-[380px] transition-all duration-200 dark:bg-black dark:border-white"
                onClick={onClick}
            >
                <CardHeader className="space-x-2 relative">
                    <Image
                        fill
                        src={imageUrl}
                        alt={`${name}'s Profile Image`}
                        className="h-[80px] w-[80px] rounded-full"
                    />
                    <CardTitle>
                        <p>{name}</p>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {type && <h3>{type}</h3>}
                    {email && <h3>{email}</h3>}
                </CardContent>
                <CardFooter>
                    Click to continue
                </CardFooter>
            </Card>
        </div>
    )
}
