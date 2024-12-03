import { Calculator, Dictionary, Notes, Library } from "@/icons"

import {
    AffiliateDuoToneBlack,
    Buisness,
    Chat,
    Courses,
    CreditCard,
    Document,
    GlobeDuoToneBlack,
    Home,
    IDuotoneBlack,
    PersonalDevelopment,
    ZapDouToneBlack,
} from "@/icons"
import { BotMessageSquare } from "lucide-react"

export type MenuProps = {
    id: number
    label: string
    icon: JSX.Element
    path: string
    section?: boolean
    integration?: boolean
}

export type GroupMenuProps = {
    id: number
    label: string
    icon: JSX.Element
    path: string
}
export const ORGANIZATION_MENU: MenuProps[] = [
    {
        id: 0,
        label: "Notes",
        icon: <Notes />,
        path: "#notes",
        section: true,
    },
    {
        id: 1,
        label: "Calculator",
        icon: <Calculator />,
        path: "#calculator",
        section: true,
    },
    {
        id: 2,
        label: "Dictionary",
        icon: <Dictionary />,
        path: "#dictionary",
    },
    {
        id: 3,
        label: "V.Tutor",
        icon: <BotMessageSquare />,
        path: "#virtualtutor",
    },
]
export const GROUP_PAGE_MENU: MenuProps[] = [
    {
        id: 0,
        label: "Groupspaces",
        icon: <Home />,
        path: "groupspaces",
        section: true,
    },
    {
        id: 1,
        label: "Courses",
        icon: <Courses />,
        path: "courses",
        section: true,
    },
    {
        id: 2,
        label: "Events",
        icon: <Buisness />,
        path: "events",
    },
    {
        id: 3,
        label: "Analysis",
        icon: <PersonalDevelopment />,
        path: "members",
    },
    //{
    // id: 4,
    // label: "About",
    // icon: <Document />,
    // path: "/organizations/about",
    //},
    {
        id: 4,
        label: "Chat",
        icon: <Chat />,
        path: "messages",
    },
    {
        id: 5,
        label: "Library",
        icon: <Library />,
        path: "library",
    },
]

export const SIDEBAR_SETTINGS_MENU: MenuProps[] = [
    {
        id: 0,
        label: "General",
        icon: <IDuotoneBlack />,
        path: "",
    },
    {
        id: 1,
        label: "Subscriptions",
        icon: <CreditCard />,
        path: "subscriptions/stripe",
    },
    {
        id: 2,
        label: "Affiliates",
        icon: <AffiliateDuoToneBlack />,
        path: "affiliates",
    },
    {
        id: 3,
        label: "Domain Config",
        icon: <GlobeDuoToneBlack />,
        path: "domains",
    },
    {
        id: 4,
        label: "Integration",
        icon: <ZapDouToneBlack />,
        path: "integrations",
        integration: true,
    },
]

type IntegrationsListItemProps = {
    id: string
    name: "stripe"
    logo: string
    description: string
    title: string
    modalDescription: string
}

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
    {
        id: "1",
        name: "stripe",
        description:
            "Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.",
        logo: "914be637-39bf-47e6-bb81-37b553163945",
        title: "Connect Stripe Account",
        modalDescription:
            "The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.",
    },
]
