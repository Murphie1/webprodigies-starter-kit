import { Menu } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { SideBar } from "./sidebar"

export const MobileSideBar = () => {
    return (
        <Sheet>
            <SheetTrigger
                type="button"
                className="md:hidden pr-4 hover:opacity-75 transition"
            >
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white dark:bg-black">
                <SideBar />
            </SheetContent>
        </Sheet>
    )
}
