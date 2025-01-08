"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/actions/user.actions";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const createFolder = async ({
  name,
  ownerId,
  authId,
  clerkId,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    const fileDocument = {
      name,
      authId,
      owner: ownerId,
      clerkId,
      groupIds: [],
      users: [],
    };

    const newFolder = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.foldersCollectionId,
        ID.unique(),
        folderDocument,
      )
      .catch(async (error: unknown) => {
        handleError(error, "Failed to create file document");
      });
    return parseStringify(newFolder);
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};
export const createGroupFolder = async ({
  groupId,
  name,
  clerkId,
  ownerId,
  authId,
}: UploadGroupFolderProps) => {
  const { databases } = await createAdminClient();

  try {
    const folderDocument = {
      name,
      ownerId,
      clerkId,
      groupId,
      groupIds: [],
      users: [],
      authId,
    };

    const newFolder = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.foldersCollectionId,
        ID.unique(),
        folderDocument,
      )
      .catch(async (error: unknown) => {
        handleError(error, "Failed to create file document");
      });
    return parseStringify(newFolder);
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};

const createQueries = (
  currentUser: Models.Document,
  searchText: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queries;
};

const createGroupQueries = (
  currentUser: Models.Document,
  groupId: string,
  searchText: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("groupId", [groupId]),
      Query.contains("groupIds", [groupId]),
    ]),
  ];

  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queries;
};


export const getGroupFolders = async ({
  groupId,
  searchText = "",
  limit,
}: GetGroupFoldersProps) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = createGroupQueries(currentUser, groupId, searchText, limit);

    const folders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      queries,
    );

    console.log({ folders });
    return parseStringify(files);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};

export const getFolders = async ({
  searchText = "",
  limit,
}: GetFilesProps) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = createQueries(currentUser, searchText, limit);

    const folders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      queries,
    );

    console.log({ folders });
    return parseStringify(folders);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};

export const renameFolder = async ({
  folderId,
  name,
}: RenameFolderProps) => {
  const { databases } = await createAdminClient();

  try {
    const newName = `${name}`;
    const updatedFolder = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      folderId,
      {
        name: newName,
      },
    );
    return parseStringify(updatedFolder);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};
export const updateFolderGroups = async ({
  folderId,
  groupIds,
}: UpdateFolderGroupsProps) => {
  const { databases } = await createAdminClient();

  try {
    const updatedFolder = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      folderId,
      {
        groupIds: groupIds,
      },
    );
    return parseStringify(updatedFolder);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};

export const updateFolderUsers = async ({
  folderId,
  emails,
}: UpdateFolderUsersProps) => {
  const { databases } = await createAdminClient();

  try {
    const updatedFolder = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      folderId,
      {
        users: emails,
      },
    );
    return parseStringify(updatedFolder);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};

export const deleteFolder = async ({
  folderId,
}: DeleteFolderProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deletedFolder = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      folderId,
    );
    return parseStringify({ status: "success" });
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};
