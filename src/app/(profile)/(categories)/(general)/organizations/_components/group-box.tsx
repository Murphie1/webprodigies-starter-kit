"use client"

import Link from "next/link"
import GroupImage from "./group-image"

type GBProps = {
    href: string
    image: string
    name: string
    description: string
}

const GroupBox = ({ image, href, name, description }: GBProps) => {
    return (
        <div
            className="
        w-full,
        max-w-screen
        overflow-hidden
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-3
      "
        >
            <GroupImage imageUrl={image} />
            <Link href={href}>
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <div
                            className="
              flex
              justify-between
              items-center
              mb-1
            "
                        >
                            <p
                                className="
                text-md
                font-medium
                text-black
              dark:text-white
              "
                            >
                                {name}
                            </p>
                        </div>
                        <p
                            className="
            line-clamp-2
            text-sm
            text-gray-500
            dark:text-gray-100
            "
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default GroupBox
