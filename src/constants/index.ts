import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms"
import {
    GROUP_PAGE_MENU,
    GroupMenuProps,
    MenuProps,
    ORGANIZATION_MENU,
} from "./menus"
import {
    CREATE_GROUP_PLACEHOLDER,
    CreateGroupPlaceholderProps,
} from "./placeholder"
import { GROUP_LIST, GroupListProps } from "./slider"

type GroupleConstantsProps = {
    OrganizationMenu: MenuProps[]
    signUpForm: AuthFormProps[]
    signInForm: AuthFormProps[]
    groupList: GroupListProps[]
    createGroupPlaceholder: CreateGroupPlaceholderProps[]
    groupPageMenu: GroupMenuProps[]
}

export const GROUPLE_CONSTANTS: GroupleConstantsProps = {
    OrganizationMenu: ORGANIZATION_MENU,
    signUpForm: SIGN_UP_FORM,
    signInForm: SIGN_IN_FORM,
    groupList: GROUP_LIST,
    createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER,
    groupPageMenu: GROUP_PAGE_MENU,
}
export const sidebarLinks = [
    {
        imgURL: "/icons/microphone.svg",
        route: "/podcast/create",
        label: "Create Podcast",
    },
]

export const voiceDetails = [
    {
        id: 1,
        name: "alloy",
    },
    {
        id: 2,
        name: "echo",
    },
    {
        id: 3,
        name: "fable",
    },
    {
        id: 4,
        name: "onyx",
    },
    {
        id: 5,
        name: "nova",
    },
    {
        id: 6,
        name: "shimmer",
    },
]

export const avatarImages = [
  '/images/avatar-1.jpeg',
  '/images/avatar-2.jpeg',
  '/images/avatar-3.png',
  '/images/avatar-4.png',
  '/images/avatar-5.png',
];
export const navItems = [
  {
    name: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    url: "/",
  },
  {
    name: "Documents",
    icon: "/assets/icons/documents.svg",
    url: "/documents",
  },
  {
    name: "Images",
    icon: "/assets/icons/images.svg",
    url: "/images",
  },
  {
    name: "Media",
    icon: "/assets/icons/video.svg",
    url: "/media",
  },
  {
    name: "Others",
    icon: "/assets/icons/others.svg",
    url: "/others",
  },
];

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
