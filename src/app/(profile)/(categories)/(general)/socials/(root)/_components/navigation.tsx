"use client"

import LeftPanel from "@/components/uMessage/home/left-panel"
import { usePathname } from "next/navigation"

export const MobileLeftPanel = ({ clerkId }: { clerkId: string}) => {
    const pathname = usePathname()
    const isHome = pathname === "/socials"

    return (
        <section>
            {isHome && (
                <div className="w-full h-full relative md:hidden">
                    <LeftPanel clerkId={clerkId} />
                </div>
            )}
        </section>
    )
                  }
