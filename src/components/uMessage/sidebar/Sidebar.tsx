import DesktopSidebar from "./DesktopSidebar";
import MobileHeader from "./MobileHeader";

import { onAuthenticatedUser } from "@/actions/auth";

async function Sidebar({ children }: {
  children: React.ReactNode;
}) {
  const currentUser = await onAuthenticatedUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileHeader />
      <main className="h-[700px] w-[calc(100vw-10px)] bg-themeWhite dark:bg-gray-900 sm:rounded-2xl border-1 border-gray-500 dark:border-themeGray sm:overflow-y-auto justify-center md:w-full lg:pl-20 lg:h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;