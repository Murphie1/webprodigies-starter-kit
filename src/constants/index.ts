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
