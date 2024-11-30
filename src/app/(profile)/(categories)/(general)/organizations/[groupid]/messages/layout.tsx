import GlassSheet from "@/components/global/glass-sheet"
import { Menu } from "lucide-react"
import { GroupChatMenu } from "./_components/chat-menu"
import SideBar from "@/components/global/sidebar"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"


type HuddlesLayoutProps = {
    children: React.ReactNode
    params: { groupid: string }
}

const HuddlesLayout = async ({ children, params }: HuddlesLayoutProps) => {
    const user = await onAuthenticatedUser()
    if (!user.id) redirect("/sign-in")
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 flex-1 h-0">
            <div className="lg:col-span-4 flex flex-col">
                <div className="flex justify-between items-center p-5 lg:hidden">
                    <GlassSheet trigger={<Menu />} className="md:hidden cursor-pointer" >
                        <SideBar groupid={params.groupid} userid={user.id} mobile />
                    </GlassSheet>
                    <p className="font-medium text-gray-300 dark:text-themeTextWhite">
                        No chat selected
                    </p>
                    <GlassSheet trigger={<Menu />}>
                        <GroupChatMenu groupid={params.groupid} />
                    </GlassSheet>
                </div>
                {children}
            </div>
            <div className="hidden lg:inline lg:col-span-2 bg-white dark:bg-themeBlack rounded-tl-3xl overflow-auto">
                <GroupChatMenu groupid={params.groupid} />
            </div>
        </div>
    )
}

export default HuddlesLayout
