import DesktopSidebar from "./DesktopSidebar"
import MobileHeader from "./MobileHeader"
import { redirect } from "next/navigation"
import { loggedInUser } from "@/actions/auth"

async function Sidebar({ children }: { children: React.ReactNode }) {
    const user = await loggedInUser()
    if (!user) return redirect("/sign-in")

    return (
        <div className="h-full">
            <DesktopSidebar loggedUser={user!} />
            <MobileHeader />
            <main className="h-[600px] w-[calc(100vw-10px)] pl-[5px] pt-[75px] rounded-4xl border-1 border-gray-500 dark:border-themeGray sm:overflow-y-auto md:pt-0 md:w-full lg:pl-20 lg:h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar
