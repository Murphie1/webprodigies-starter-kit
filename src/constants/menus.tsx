import {
    AffiliateDuoToneBlack,
    Buisness,
    Calculator,
    Chat,
    Categories,
    Courses,
    CreditCard,
    Dictionary,
    Document,
    Explore,
    GlobeDuoToneBlack,
    Home,
    IDuotoneBlack,
    Notes,
    PersonalDevelopment,
    ZapDouToneBlack,
} from "@/icons"

export type MenuProps = {
    id: number
    label: string
    icon: JSX.Element
    path: string
    section?: boolean
    integration?: boolean
}

export const ORGANIZATION_MENU: MenuProps[] = [
    {
        id: 0,
        label: "Notes",
        icon: <Notes />,
        path: "/",
        section: true,
    },
    {
        id: 1,
        label: "Calculator",
        icon: <Calculator />,
        path: "#pricing",
        section: true,
    },
    {
        id: 2,
        label: "Dictionary",
        icon: <Dictionary />,
        path: "/explore",
    },
    {
        id: 3,
        label: "Tasks",
        icon: <PersonalDevelopment />,
        path: "/explore",
    },
]
