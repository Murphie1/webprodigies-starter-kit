"use client"

import useConversation from "@/hooks/uMessage/useConversation"
import useRoutes from "@/hooks/uMessage/useRoutes"

import MobileItem from "./MobileItem"

const MobileHeader = () => {
    const routes = useRoutes()
    const { isOpen } = useConversation()

    if (isOpen) {
        return null
    }

    return (
        <div
            className="
        fixed
        justify-between
        overflow-x-auto
        whitespace-nowrap
        w-screen
        top-0
        z-40
        flex
        h-[68px]
        items-center
        bg-white
        dark:bg-black
        border-b-[1px]
        lg:hidden
      "
        >
            {routes.map((route) => (
                <MobileItem
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                />
            ))}
        </div>
    )
}

export default MobileHeader
