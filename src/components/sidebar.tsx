//SideBar

import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export cont SideBar = () => {
return (
<div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm dark:bg-black">
<div className="p-6">
<Logo />
</div>
<div className="flex flex-col w-full">
<SidebarRoutes/>
</div>
</div>
)
  }
