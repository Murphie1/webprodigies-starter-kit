//SideBar

import { BookOpen } from "lucide-react"
import { SidebarRoutes } from "./sidebar-routes"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const SideBar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm dark:bg-black">
            <div className="grid grid-cols-2 flex-1 space-x-2">
                <BookOpen />
                YouLearn
            </div>
            <div className="grid grid-cols-2 pb-2 px-2">
                <Link href="/">
                    <Button className="rounded-md">Profiles</Button>
                </Link>
                <Link href="/home">
                    <Button className="rounded-md">Back Home</Button>
                </Link>
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
          }
