"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

type CopyButtonProps = {
    content: string
}

export const CopyButton = ({ content }: CopyButtonProps) => {
    return (
        <Button
            onClick={() => {
                navigator.clipboard.writeText(content)
                toast("Copied", {
                    description: "Affiliate link copied to clipboard",
                })
            }}
            className="bg-white dark:bg-black border-black dark:border-themeGray flex hover:bg-sky dark:hover:bg-themeDarkGray gap-x-3"
            variant="outline"
        >
            <Copy size={20} />
            Copy Link
        </Button>
    )
}
