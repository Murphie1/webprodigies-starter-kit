"use client"
import { Input } from "@/components/ui/input"
import { SIDEBAR_SETTINGS_MENU } from "@/constants/menus"
import { useChannelInfo } from "@/hooks/channels"
import { cn } from "@/lib/utils"
import { Trash } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IChannels } from "."
import { IconRenderer } from "../icon-renderer"
import IconDropDown from "./icon-dropdown"

type Props = {
    channels: IChannels[]
    optimisticChannel:
        | {
              id: string
              name: string
              icon: string
              createdAt: Date
              groupId: string | null
          }
        | undefined
    loading: boolean
    groupid: string
    groupUserId: string
    userId: string
}
const SideBarMenu = ({
    channels,
    groupUserId,
    groupid,
    loading,
    optimisticChannel,
    userId,
}: Props) => {
    const pathname = usePathname()
    const currentPage = pathname.split("/").pop()

    const {
        channel: current,
        onEditChannel,
        channelRef,
        inputRef,
        variables,
        isPending,
        edit,
        triggerRef,
        onSetIcon,
        icon,
        onChannelDetele,
        deleteVariables,
    } = useChannelInfo()

    // Render specific sidebar for "groupspaces"
    if (pathname.includes("groupspaces")) {
        return <div className="hidden md:flex h-full w-[3px]" />
    }

    // Render settings menu for "settings"
    if (pathname.includes("settings")) {
        return (
            <div className="flex flex-col">
                {SIDEBAR_SETTINGS_MENU.map((item) =>
                    item.integration ? (
                        userId === groupUserId && (
                            <Link
                                className={cn(
                                    "flex gap-x-2 items-center font-semibold rounded-xl text-black hover:bg-themeGray p-2 dark:text-themeTextGray",
                                    currentPage === "settings"
                                        ? !item.path &&
                                              "text-black dark:text-white"
                                        : currentPage === item.path &&
                                              "text-black dark:text-white",
                                )}
                                href={`/organizations/${groupid}/settings/${item.path}`}
                                key={item.id}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        )
                    ) : (
                        <Link
                            className={cn(
                                "flex gap-x-2 items-center font-semibold rounded-xl text-black hover:bg-themeGray p-2 dark:text-themeTextGray",
                                currentPage === "settings"
                                    ? !item.path && "text-black dark:text-white"
                                    : currentPage === item.path &&
                                          "text-black dark:text-white",
                            )}
                            href={`/organizations/${groupid}/settings/${item.path}`}
                            key={item.id}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ),
                )}
            </div>
        )
    }

    // Render default sidebar for channels
    return (
        <div className="flex flex-col">
            {channels && channels.length > 0 ? (
                <>
                    {channels.map(
                        (channel) =>
                            channel.id !== deleteVariables?.id && (
                                <Link
                                    id="channel-link"
                                    key={channel.id}
                                    className={cn(
                                        "flex justify-between hover:bg-black hover:text-white p-2 group rounded-lg items-center dark:hover:bg-themeGray",
                                        channel.id === current &&
                                            edit &&
                                            "bg-gray dark:bg-themeGray",
                                    )}
                                    href={`/organizations/${channel.groupId}/channel/${channel.id}`}
                                    {...(channel.name !== "general" &&
                                        channel.name !== "announcements" && {
                                            onDoubleClick: () =>
                                                onEditChannel(channel.id),
                                            ref: channelRef,
                                        })}
                                >
                                    <div className="flex gap-x-2 items-center">
                                        {channel.id === current && edit ? (
                                            <IconDropDown
                                                ref={triggerRef}
                                                page={currentPage}
                                                onSetIcon={onSetIcon}
                                                channelid={channel.id}
                                                icon={channel.icon}
                                                currentIcon={icon}
                                            />
                                        ) : (
                                            <IconRenderer
                                                icon={channel.icon}
                                                mode={
                                                    currentPage === channel.id
                                                        ? "LIGHT"
                                                        : "DARK"
                                                }
                                            />
                                        )}
                                        {channel.id === current && edit ? (
                                            <Input
                                                type="text"
                                                ref={inputRef}
                                                className="bg-transparent p-0 text-lg m-0 h-full"
                                            />
                                        ) : (
                                            <p
                                                className={cn(
                                                    "text-lg capitalize",
                                                    currentPage === channel.id
                                                        ? "text-black dark:text-white"
                                                        : "text-gray-800 text-themeTextGray",
                                                )}
                                            >
                                                {isPending &&
                                                variables &&
                                                current === channel.id
                                                    ? variables.name
                                                    : channel.name}
                                            </p>
                                        )}
                                    </div>
                                    {channel.name !== "general" &&
                                        channel.name !== "announcements" &&
                                        userId === groupUserId && (
                                            <Trash
                                                onClick={() =>
                                                    onChannelDetele(channel.id)
                                                }
                                                className="group-hover:inline hidden content-end text-black hover:text-gray-400 dark:text-themeTextGray"
                                                size={16}
                                            />
                                        )}
                                </Link>
                            ),
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default SideBarMenu
