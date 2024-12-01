import { Empty } from "@/icons"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"

export const NoResult = () => {
    return (
        <div className="lg:col-span-3 md:col-span-2 flex flex-col items-center gap-y-16 sm:px-2">
            <Link
                href="/organizations/explore"
                className="flex gap-3 text-black dark:text-themeTextGray"
            >
                <RefreshCcw />
                Refresh
            </Link>
            <Empty />
            <div>
                <p className="text-xl font-semibold text-black dark:text-themeTextGray">
                    Hmm... Its quiet in here
                </p>
                <p className="text-sm text-black dark:text-themeTextGray">
                    No Results Found...
                </p>
            </div>
        </div>
    )
}
