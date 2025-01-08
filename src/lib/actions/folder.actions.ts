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
}: CreateFolderProps) => {
  const { databases } = await createAdminClient();

  try {
    const folderDocument = {
      name,
      authId,
      ownerId,
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
}: CreateGroupFolderProps) => {
  const { databases } = await createAdminClient();

  try {
    const folderDocument = {
      name,
      ownerId,
      clerkId,
      groupId,
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

export const createSubFolder = async ({
  name,
  folderId,
  ownerId,
  clerkId,
}: CreateSubFolderProps) => {
  const { databases } = await createAdminClient();

  try {
    const folderDocument = {
      name,
      folderId,
      ownerId,
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

const createQueries = (
  authId: string,
  email: string,
  searchText: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("authId", [authId]),
      Query.contains("users", [email]),
    ]),
  ];

  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

  return queries;
};

const createGroupQueries = (
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

  return queries;
};

const createSubQueries = (
  folderId: string,
  searchText: string,
  limit?: number,
) => {
  const queries = [
      Query.equal("folderId", [folderId]),
  ];

  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

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

    const queries = createGroupQueries(groupId, searchText, limit);

    const folders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      queries,
    );

    console.log({ folders });
    return parseStringify(folders);
  } catch (error) {
    handleError(error, "Failed to get folders");
  }
};

export const getFolders = async ({
  searchText = "",
  email,
  authId,
  limit,
}: GetFoldersProps) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = createQueries(email, authId, searchText, limit);

    const folders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      queries,
    );

    console.log({ folders });
    return parseStringify(folders);
  } catch (error) {
    handleError(error, "Failed to get folders");
  }
};

export const getSubFolders = async ({
  searchText = "",
  folderId,
  limit,
}: GetSubFoldersProps) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = createSubQueries(folderId, searchText, limit);

    const folders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.foldersCollectionId,
      queries,
    );

    console.log({ folders });
    return parseStringify(folders);
  } catch (error) {
    handleError(error, "Failed to get folders");
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
