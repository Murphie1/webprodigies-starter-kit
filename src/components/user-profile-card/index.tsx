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
        router.push("/")
    }

  return (
        <div className="relative">
            <Card
           className="bg-white border-black w-[350px] h-[350px] hover:border-bold hover:outline hover:w-[380px] hover:h-[380px] dark:bg-black dark:border-white"
                onClick={onClick}>
          <CardHeader className="space-x-2">
                    <Image fill src={imageUrl} alt="Profile Image" className="h-[80px] w-[80px] rounded-full" />
           <CardTitle>
           <p>{name}</p>
           </CardTitle>
    </CardHeader>
                  <CardContent>
                  <h3>
    {type}
                  </h3>
                  <h3> 
                {email} 
                  </h3>
    </CardContent>
                  <CardFooter>
                  Click to continue
  </CardFooter>
            </Card>
        </div>
    )
}
