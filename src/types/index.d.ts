/* eslint-disable no-unused-vars */
declare type SearchParamProps = {
    params: { [key: string]: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

declare type AccessType = ["room:write"] | ["room:read", "room:presence:write"]

declare type RoomAccesses = Record<string, AccessType>

declare type UserType = "creator" | "editor" | "viewer"

declare type RoomMetadata = {
    creatorId: string
    email: string
    title: string
}

declare type CreateDocumentParams = {
    userId: string
    email: string
}

declare type User = {
    id: string
    name: string
    email: string
    avatar: string
    color: string
    userType?: UserType
}

declare type ShareDocumentParams = {
    roomId: string
    email: string
    userType: UserType
    updatedBy: User
}

declare type UserTypeSelectorParams = {
    userType: string
    setUserType: React.Dispatch<React.SetStateAction<UserType>>
    onClickHandler?: (value: string) => void
}

declare type ShareDocumentDialogProps = {
    roomId: string
    collaborators: User[]
    creatorId: string
    currentUserType: UserType
}

declare type HeaderProps = {
    children: React.ReactNode
    className?: string
}

declare type CollaboratorProps = {
    roomId: string
    email: string
    creatorId: string
    collaborator: User
    user: User
}

declare type CollaborativeRoomProps = {
    roomId: string
    roomMetadata: RoomMetadata
    users: User[]
    currentUserType: UserType
}

declare type AddDocumentBtnProps = {
    userId: string
    email: string
}

declare type DeleteModalProps = { roomId: string }

declare type ThreadWrapperProps = { thread: ThreadData<BaseMetadata> }

declare type FileType = "document" | "image" | "video" | "audio" | "other";

declare interface ActionType {
  label: string;
  icon: string;
  value: string;
}

declare interface SearchParamsProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface UploadFileProps {
  file: File;
  ownerId: string;
  clerkId: string;
  accountId: string;
  path: string;
}
declare interface UploadGroupFileProps {
  file: string;//File;
  ownerId: string;
  clerkId: string;
  groupId: string;
  accountId: string;
  path: string;
    }
declare interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}
declare interface GetGroupFilesProps {
  types: FileType[];
  groupId: string;
  searchText?: string;
  sort?: string;
  limit?: number;
    }
declare interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}
declare interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}
declare interface UpdateFileGroupsProps {
  fileId: string;
  groupIds: string[];
  path: string;
    }
declare interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}

declare interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

declare interface MobileNavigationProps {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}
declare interface SidebarProps {
  fullName: string;
  avatar: string;
  email: string;
}

declare interface ThumbnailProps {
  type: string;
  extension: string;
  url: string;
  className?: string;
  imageClassName?: string;
}

declare interface ShareInputProps {
  file: Models.Document;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (email: string) => void;
    }
