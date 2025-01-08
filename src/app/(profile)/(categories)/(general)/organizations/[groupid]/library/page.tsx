import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import { authenticateUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import React from "react";
import { getGroupFolders } from "@/lib/actions/folder.actions";
import { Models } from "node-appwrite";


type Props = {
    params: {
        groupid: string
    }
}

const LibraryPage = async ({ params }: Props) => {
  const user = await onAuthenticatedUser()
  if (!user) redirect("/")

  const clerk = await currentUser()
  if (!clerk) redirect("/sign-in")

  const appwriteUser = await authenticateUser({
    clerkId: user.clerkId || clerk.id,
    fullName: user.username || clerk.firstName || clerk.username || "",
    email: user.email || clerk.emailAddresses[0]?.emailAddress || "",
    avatar: user.image || clerk.imageUrl || "",
  })

  const folders = await getGroupFolders({ groupId: params.groupid });

  return (
    <div className="page-container">

      {/* Render the files */}
      {folders.total > 0 ? (
        <section className="file-list">
          {folders.documents.map((folder: Models.Document) => (
            <div key={folder.$id} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No folders created</p>
      )}
    </div>
  );
};

export default Page;
