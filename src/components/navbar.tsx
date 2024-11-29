//NavBar

import { NavbarRoutes } from "./navbar-routes";
import { MobileSideBar } from "./mobile-sidebar";

export const NavBar = () => {
return (
<div className="h-full p-4 flex items-center bg-white shadow-sm dark:bg-black">
<MobileSideBar />
<NavbarRoutes />
</div>
)
}
