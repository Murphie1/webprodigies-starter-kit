"use client"

import AsyncLeftPanel from "@/components/uMessage/home/AsyncLeftPanel"
import { usePathname } from "next/navigation"

export const MobileLeftPanel = () => {
    const pathname = usePathname()
    const isHome = pathname === "/socials/new"

    return (
        <section>
            {isHome && (
                <div className="w-full h-full relative md:hidden">
                    <AsyncLeftPanel />
                </div>
            )}
        </section>
    )
}
