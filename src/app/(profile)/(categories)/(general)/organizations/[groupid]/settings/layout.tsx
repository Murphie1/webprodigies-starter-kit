import GlassSheet from "@/components/global/glass-sheet"
import { Menu } from "lucide-react"
import SideBar from "@/components/global/sidebar"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"


type SettingsLayoutProps = {
    children: React.ReactNode
    params: { groupid: string }
}

const SettingsLayout = async ({ children, params }: SettingsLayoutProps) => {
    const user = await onAuthenticatedUser()
    if (!user.id) redirect("/sign-in")
    
    return (
        <div className="grid grid-cols-1 flex-1 h-full">
                <div className="flex justify-start items-center p-5 md:hidden">
                    <GlassSheet trigger={<Menu />} className="md:hidden cursor-pointer" >
                        <SideBar groupid={params.groupid} userid={user.id} mobile />
                    </GlassSheet>
                </div>
                {children}
            </div>
    )
}

export default SettingsLayout
