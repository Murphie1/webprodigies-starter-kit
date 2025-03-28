"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useNavigation } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

type MenuProps = {
    orientation: "mobile" | "desktop"
    groupid: string
}

const Menu = ({ orientation, groupid }: MenuProps) => {
    const { section, onSetSection } = useNavigation()
    switch (orientation) {
        case "desktop":
            return (
                <Card className="bg-transparent dark:bg-themeGray border-transparent dark:border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex  md:rounded-xl flex items-center justify-center w-fit">
                    <CardContent className="p-0 flex gap-2">
                        {GROUPLE_CONSTANTS.groupPageMenu.map((menuItem) => (
                            <Link
                                href={`/organizations/${groupid}/${menuItem.path}`}
                                onClick={() => onSetSection(menuItem.path)}
                                className={cn(
                                    "rounded-xl flex gap-2 py-2 px-4 items-center",
                                    section == menuItem.path
                                        ? "bg-sky-500 border-gray dark:bg-[#09090B] dark:border-[#27272A]"
                                        : "",
                                )}
                                key={menuItem.id}
                            >
                                {section == menuItem.path && menuItem.icon}
                                {menuItem.label}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )

        case "mobile":
            return (
                <div className="flex items-center justify-center mt-3">
                    {GROUPLE_CONSTANTS.groupPageMenu.map((menuItem) => (
                        <Link
                            href={`/organizations/${groupid}/${menuItem.path}`}
                            onClick={() => onSetSection(menuItem.path)}
                            className={cn(
                                "rounded-xl flex gap-2 py-2 px-4 items-center",
                                section == menuItem.path
                                    ? "bg-sky-500 border-gray dark:bg-themeGray dark:border-[#27272A]"
                                    : "",
                            )}
                            key={menuItem.id}
                        >
                            {menuItem.icon}
                            {menuItem.label}
                        </Link>
                    ))}
                </div>
            )
        default:
            return <></>
    }
}

export default Menu
