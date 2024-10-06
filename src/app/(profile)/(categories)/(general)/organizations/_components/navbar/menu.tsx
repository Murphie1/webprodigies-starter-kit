"use client"

import { useNavigation } from "@/hooks/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { GROUPLE_CONSTANTS } from "@/constants"
import Link from "next/link"
import { cn } from "@/lib/utils"

type MenuProps = {
    orientation: "mobile" | "desktop"
}

const Menu = ({ orientation }: MenuProps) => {
    const { section, onSetSection } = useNavigation()

    switch (orientation) {
        case "desktop":
            return (
                <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex hidden rounded-xl">
                    <CardContent className="p-0 flex gap-2">
                        {GROUPLE_CONSTANTS.OrganizationMenu.map((menuItem) => (
                            <Link
                                href={menuItem.path}
                                {...(menuItem.section && {
                                    onClick: () => onSetSection(menuItem.path),
                                })}
                                className={cn(
                                    "rounded-xl flex gap-2 py-2 px-4 items-center",
                                    section === menuItem.path
                                        ? "bg-[#09090B] border-[#27272A]"
                                        : "",
                                )}
                                key={menuItem.id}
                            >
                                {section === menuItem.path && menuItem.icon}
                                {menuItem.label}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )

        case "mobile":
            return (
                <div className="flex mt-10 justify-center">
                    {" "}
                    {/* Center the icons horizontally */}
                    {GROUPLE_CONSTANTS.OrganizationMenu.map((menuItem) => (
                        <Link
                            href={menuItem.path}
                            {...(menuItem.section && {
                                onClick: () => onSetSection(menuItem.path),
                            })}
                            className={cn(
                                "rounded-xl flex flex-col items-center gap-1 py-1 px-2", // Use flex-col for the icon and label
                                section === menuItem.path
                                    ? "bg-themeGray border-[#27272A]"
                                    : "",
                            )}
                            key={menuItem.id}
                        >
                            <div className="w-5 h-5">
                                {" "}
                                {/* Adjust icon size */}
                                {menuItem.icon}
                            </div>
                            {menuItem.label}
                        </Link>
                    ))}
                </div>
            )
    }
}

export default Menu
