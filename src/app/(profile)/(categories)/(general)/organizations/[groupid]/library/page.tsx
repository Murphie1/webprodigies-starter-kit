import { onAuthenticatedUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { authenticateUser, getCurrentUser } from "@/lib/actions/user.actions";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getGroupFolders } from "@/lib/actions/folder.actions";
import { getGroupFiles } from "@/lib/actions/file.actions";
import React from "react";
import { Models } from "node-appwrite";
import ActionDropdown from "@/components/library/ActionDropdown";
import { Thumbnail } from "@/components/library/Thumbnail";
import { FormattedDateTime } from "@/components/library/FormattedDateTime";
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
    email: user.email || clerk.emailAddresses?.[0]?.emailAddress || "",
    avatar: user.image || clerk.imageUrl || "",
  });
  if (!appwriteUser) redirect("/");

  const current = await getCurrentUser();
  if (!current) redirect("/");

  const folders = await getGroupFolders({ groupId: params.groupid });
  const files = await getGroupFiles({ types: [], groupId: params.groupid, limit: 10 });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-8 rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Library Folders
      </h1>

      {folders.total > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {folders.documents.map((folder: Models.Document) => (
            <div
              key={folder.$id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={`/organizations/${params.groupid}/library/${folder.$id}`}>
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {folder.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Created on:{" "}
                  {new Date(folder.$createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No folders created.
        </p>
      )}

      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100">Received Files</h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files recieved</p>
        )}
      </section>

      <div className="flex fixed bottom-[80px] right-3 z-30">
        <FolderDialog
          ownerId={current.$id}
          clerkId={user.clerkId || clerk.id}
          groupId={params.groupid}
        />
      </div>
    </div>
  );
};

export default LibraryPage;
