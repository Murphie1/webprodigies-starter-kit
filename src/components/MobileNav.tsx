
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import LeftSidebar from "./LeftSidebar"
import { Menu } from "lucide-react"

const MobileNav = () => {

    return (
        <section>
            <Sheet>
                <SheetTrigger className="md:hidden pr-3">
                    <Menu />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-white dark:bg-black">
                    <h1>
                        Podcasts
                        </h1>
                        <SheetClose asChild>
                            <LeftSidebar />
                        </SheetClose>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
