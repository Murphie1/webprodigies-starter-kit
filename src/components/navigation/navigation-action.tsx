"use client"
import { ActionTooltip } from "@/components/action-tooltip"
import { Plus } from "lucide-react"

export const NavigationAction = () => {
    return (
        <div>
            <ActionTooltip
                side="right"
                align="center"
                label="Create a new Groupspace"
            >
                <button className="group flex items-center">
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-indigo-500">
                        <Plus className="group-hover:text-white transition text-emerald-500 size={25}" />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}
