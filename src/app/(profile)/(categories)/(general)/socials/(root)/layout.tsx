import LeftPanel from "@/components/uMessage/home/left-panel"
import { MobileLeftPanel } from "./_components/navigation"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"


type Props = {
    children: React.ReactNode
}

const SocialLayout = async ({ children }: Props) => {
    const clerk = await onAuthenticatedUser()
    if (!clerk || !clerk.clerkId) redirect("/")
    
    return (
        <div className="flex flex-1">
            <div className="hidden md:flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel">
                <div className="hidden md:fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30" />
                <LeftPanel clerkId={clerk.clerkId} />
            </div>
            <MobileLeftPanel clerkId={clerk.clerkId} />
            <div className="h-full md:pl-1/3">{children}</div>
        </div>
    )
}
export default SocialLayout
