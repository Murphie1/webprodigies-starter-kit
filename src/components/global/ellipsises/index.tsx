import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Menu from "@/app/(profile)/(categories)/(general)/organizations/_components/Gen-navbar/menu"

const Ellipsises = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Quick Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <ScrollArea className="whitespace-nowrap rounded-md border">
                        <Menu orientation="mobile" />
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Ellipsises
