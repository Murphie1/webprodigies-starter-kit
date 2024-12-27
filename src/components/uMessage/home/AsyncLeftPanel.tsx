import LeftPanel from "./left-panel"
import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"


const AsyncLeftPanel = async () => {
  const clerk = await onAuthenticatedUser()
  if (!clerk || !clerk.clerkId) redirect("/")

  return (
    <div className="relative">
    <LeftPanel clerkId={clerk.clerkId} />
      </div>
    )
}
export default AsyncLeftPanel
