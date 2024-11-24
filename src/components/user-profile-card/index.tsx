"use client"

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
        <div className="relative rounded-lg">
            <div
                role="button"
                tabIndex={0}
                className="bg-white space-y-1 flex justify border-black rounded-lg w-[150px] h-[150px] hover:border-bold hover:outline hover:w-[180px] hover:h-[180px] transition-all duration-200 dark:bg-black dark:border-white"
                onClick={onClick}
            >
              <div>
                {imageUrl ? ( <Image
                        fill
                        src={imageUrl}
                        alt={`${name}'s Profile Image`}
                        className="h-[100px] w-full rounded-lg"
                    /> ) : ( <h2>No Image</h2> )
                }
              </div>
                <div className="space-x-2 h-[50px] w-full relative">
                  {imageUrl ? ( <Image
                        fill
                        src={imageUrl}
                        alt={`${name}'s Profile Image`}
                        className="h-[60px] w-[60px] rounded-full"
                    /> ) : ( <h2>No Image</h2> )
                  }
                    <div>
                        <h2>{name}</h2>
                    </div>
                </div>
                <div>
                    {type && <h3>{type}</h3>}
                    {email && <h3>{email}</h3>}
                </div>
                <h5>
                    Click to continue
                </h5>
            </div>
        </div>
    )
}
