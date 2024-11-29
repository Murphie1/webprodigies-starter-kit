//mobile-sidebar 
import { Menu } from "lucide-react";
import {
Sheet,
SheetTrigger,
SheetContent
} from "@/components/ui/sheet";
import { SideBar } from "./sidebar";

export const MobileSideBar = () => {
return (
<Sheet>
<SheetTrigger className="md:hidden pr:4 hover:opacity-75 transition">
<Menu />
</SheetTrigger>
<SheetContent>
<SideBar />
</SheetContent>
</Sheet>
)
}
