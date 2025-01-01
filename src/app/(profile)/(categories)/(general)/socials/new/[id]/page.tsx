import RightPanel from "@/components/uMessage/home/right-panel"
import { useTheme } from "next-themes"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"


const Pages = async () => {
    const clerk = await onAuthenticatedUser()
    if (!clerk || !clerk.clerkId) redirect("/")
    
    return (
        <main className="relative flex h-full w-full">
            <RightPanel clerkId={clerk.clerkId} />
        </main>
    )
}
export default Pages
