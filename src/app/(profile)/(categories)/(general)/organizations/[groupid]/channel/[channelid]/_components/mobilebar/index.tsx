import Menu from "@/app/(profile)/(categories)/(general)/organizations/[groupid]/_components/group-navbar"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const Bar = () => {
    return (
        <div className="relative overflow-x-auto whitespace-nowrap">
            <ScrollArea className="whitespace-nowrap rounded-md border">
                <Menu orientation="mobile" />
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default Bar
