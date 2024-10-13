"use client"

import { BellDot } from "lucide-react"
import GlassSheet from "../glass-sheet"

export const Notification = () => {
    return (
        <GlassSheet
            trigger={
                <span className="cursor-pointer">
                    <BellDot />
                </span>
            }
        >
            <div>You</div>
        </GlassSheet>
    )
}
