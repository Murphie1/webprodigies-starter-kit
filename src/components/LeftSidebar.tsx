"use client"

import { SidebarItem } from "./sidebar-item"
import { Home, Heart } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"
import { cn } from "@/lib/utils"
import { useAudio } from "@/providers/AudioProvider"

const podcastRoutes = [
    {
        key: 1,
        icon: Home,
        label: "Return Home",
        href: "/home",
    },
    {
        key: 2,
        icon: Heart,
        label: "Create a Podcast",
        href: "/podcast/create",
    },
    {
        key: 3,
        icon: Heart,
        label: "Browse other podcasts",
        href: "/home/search/podcasts",
    },
]
const prepRoutes = [
    {
        key: 4,
        icon: Heart,
        label: "Tests",
        href: "/prep/tests",
    },
    {
        key: 5,
        icon: Heart,
        label: "Practice",
        href: "/prep/practice",
    },
]

const LeftSidebar = () => {
    const pathname = usePathname()
    const { audio } = useAudio()
    const isPrepPage = pathname?.includes("/prep")

    const routes = isPrepPage ? prepRoutes : podcastRoutes

    return (
        <section
            className={cn("left_sidebar h-[calc(100vh-5px)]", {
                "h-[calc(100vh-140px)]": audio?.audioUrl,
            })}
        >
            <nav className="flex flex-col">
                <div className="flex flex-col w-full">
                    {routes.map((route) => (
                        <SidebarItem
                            key={route.key}
                            icon={route.icon}
                            label={route.label}
                            href={route.href}
                        />
                    ))}
                </div>
            </nav>
        </section>
    )
}

export default LeftSidebar
