import Menu from "./menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "@/icons"
import { MenuIcon } from "lucide-react"
import GlassSheet from "@/components/global/glass-sheet"

type Props = {}

const OrganizationNavbar = (props: Props) => {
    return (
        <div className="py-2">
            <div className="w-full flex justify-between sticky top-0 items-center z-50 pr-2">
                <p className="font-bold text-2xl pl-2">Syncro</p>
                <div className="md:hidden">
                    <Menu orientation="mobile" />
                </div>
                <Menu orientation="desktop" />
                <div className="hidden md:flex gap-2">
                    <Link href="/create">
                        <Button
                            variant="outline"
                            className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
                        >
                            <CirclePlus />
                            Create
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrganizationNavbar
