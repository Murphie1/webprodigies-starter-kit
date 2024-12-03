//"use client"
import GlassSheet from "@/components/global/glass-sheet"
import Search from "@/components/global/search"
import SideBar from "@/components/global/sidebar"
//import { usePathname } from "next/navigation"
import { UserWidget } from "@/components/global/user-widget"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "@/icons"
import { onAuthenticatedUser } from "@/actions/auth"
//import { currentUser } from "@clerk/nextjs/server"
import { Menu, ToggleLeft } from "lucide-react"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type NavbarProps = {
    groupid: string
    userid: string
}

export const Navbar = async ({ groupid, userid }: NavbarProps) => {
    const user = await onAuthenticatedUser() //currentUser()

    return (
        <div className="bg-white dark:bg-[#1A1A1D] py-2 px-3 md:px-7 md:py-5 flex gap-5 justify-between md:justify-end items-center">
            <GlassSheet trigger={<Menu className="md:hidden cursor-pointer" />}>
                <SideBar groupid={groupid} userid={userid} mobile />
            </GlassSheet>
            <Search
                searchType="POSTS"
                className="rounded-full border-black dark:border-themeGray bg-white dark:bg-black !opacity-100 px-3"
                placeholder="Search..."
            />
            <Link href={`/organizations/create`} className="hidden md:inline">
                <Button
                    variant="outline"
                    className="bg-white dark:bg-themeBlack rounded-2xl flex gap-2 border-black dark:border-themeGray hover:bg-themeGray"
                >
                    <CirclePlus />
                    Create Group
                </Button>
            </Link>
            <UserWidget
                userid={userid}
                image={user?.image!}
                //image={user?.imageUrl!}
                groupid={groupid}
            />
            <ToggleLeft />
        </div>
    )
}
