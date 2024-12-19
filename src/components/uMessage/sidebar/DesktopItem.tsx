"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface DesktopItemProps {
    label: string
    icon: LucideIcon
    href: string
    active?: boolean
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    active,
}) => {
    return (
        <li>
            <Link
                href={href}
                className={cn(
                    `
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          dark:text-themeTextWhite
          hover:text-black
          dark:hover:text-white
          hover:bg-sky-700
          dark:hover:bg-sky-700
        `,
                    active && "bg-sky-700 text-black dark:text-white",
                )}
            >
                <Icon className="h-10 w-10 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem
