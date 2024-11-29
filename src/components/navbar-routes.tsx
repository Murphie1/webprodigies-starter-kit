//navbar-routes
"use client";

import { usePathname } from "next/navigation";
import Link from "next/Link";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";


export const NavbarRoutes = () => {
const pathname = usePathname();
const isTeacherPage = pathname?.startsWith("/teacher");
const isPlayerPage = pathname?.includes("/chapter");

return (
<div className="flex gap-x-2 ml-auto">
{isTeacherPage || isPlayerPage ? (
<Link href="/home">
<Button className="size-sm" variant="ghost">
<LogOut />
Exit
</Button>
</Link>) : ( 
<ModeToggle />
)}
<UserButton 
afterSignOutUrl="/sign-in"
/>
</div>
)
}
