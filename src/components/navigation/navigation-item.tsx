"use client"

import { ActionTooltip } from "@/components/action-tooltip"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

interface NavigationItemProps {
    id: string
    imageUrl: string
    name: string
    groupId: string
}

export const NavigationItem = ({
    id,
    imageUrl,
    name,
    groupId,
}: NavigationItemProps) => {
    const params = useParams()
    const router = useRouter()

    const onClick = () => {
        router.push(`/organizations/${groupId}/groupspaces/${id}`)
    }
    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div
                    className={cn(
                        "absolute eft-0 bg-primary rounded-r-full transition-all w-[4px]",
                        params?.groupspaceId !== id && "group-hover:h-[20px]",
                        params?.groupspaceId === id ? "h-[36px]" : "h-[8px]",
                    )}
                />
                <div
                    className={cn(
                        "relative group flex mx-3 h-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                        params?.groupspaceId === id &&
                            "bg-primary/10 text-primary rounded-[16px]",
                    )}
                >
                    <Image fill src={imageUrl} alt="Gspaces" />
                </div>
            </button>
        </ActionTooltip>
    )
}
