import { onAuthenticatedUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { getGroupFolders, createGroupFolder } from "@/lib/actions/folder.actions";
import { Models } from "node-appwrite";
import { FolderDialog } from "./_components/create-folder";
type Props = {
  params: {
    groupid: string;
  };
};

const LibraryPage = async ({ params }: Props) => {
  const user = await onAuthenticatedUser();
  if (!user) redirect("/");

  const clerk = await currentUser();
  if (!clerk) redirect("/sign-in");

  const appwriteUser = await authenticateUser({
    clerkId: user.clerkId || clerk.id,
    fullName: user.username || clerk.firstName || clerk.username || "",
    email: user.email || clerk.emailAddresses[0]?.emailAddress || "",
    avatar: user.image || clerk.imageUrl || "",
  });
  if (!appwriteUser) redirect("/");
const fold = await createGroupFolder({ name: "folder 1", groupId: params.groupid, ownerId: appwriteUser.$id!, clerkId: user.clerkId || clerk.id, });
  const folders = await getGroupFolders({ groupId: params.groupid });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-8 rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Library Folders
      </h1>

      {folders.total > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.documents.map((folder: Models.Document) => (
            <div
              key={folder.$id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                {folder.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Created on:{" "}
                {new Date(folder.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No folders created.
        </p>
      )}
      <div className="fixed bottom-[80px] right-1">
      <FolderDialog
  ownerId={appwriteUser.$id!}
  clerkId={user.clerkId!}
  groupId={params.groupid!}
/>
        </div>
    </div>
  );
};

export default LibraryPage;
