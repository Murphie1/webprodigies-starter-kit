import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import { authenticateUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"


const LibraryPage = async () => {
  const user = await onAuthenticatedUser()
  if (!user) redirect("/")

  const clerk = await currentUser()
  if (!clerk) redirect("/sign-in")

  const appwriteUser = await authenticateUser({
    clerkId: user.clerkId || clerk.id,
    fullName: user.username || `${clerk.firstName + clerk.lastName}` || clerk.username || "",
    email: user.email || clerk.emailAddresses[0]?.emailAddress || "",
    avatar: user.image || clerk.imageUrl || "",
  })
  
    return 
      <div>
        <p>{user.username}</p>
        library
      </div>
}

export default LibraryPage
