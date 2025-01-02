import {
    SquareLibrary,
    MessageCircle,
    Lightbulb,
    Telescope,
} from "lucide-react"
import Link from "next/link"

const BottomBar = () => {
    return (
        <div className="bg-gray-100 space-x-1 h-[70px] w-[calc(100vw-20px)] shadow-lg fixed bottom-[10px] left-[10px] z-50 justify-between items-center flex dark:bg-themeBlack rounded-2xl">
            <Link href={`/home`}>
                <Telescope size={20} className="justify-center" />
                <p className="text-bold text-sm">Home</p>
            </Link>
            <Link href={`/updates`}>
                <Lightbulb size={20} className="justify-center" />
                <p className="text-sm text-bold">Updates</p>
            </Link>
            <Link href={`/library`}>
                <SquareLibrary size={20} className="justify-center" />
                <p className="text-sm text-bold">Library</p>
            </Link>
            <Link href={`/socials`}>
                <MessageCircle size={20} className="justify-center" />
                <p className="text-sm text-bold">Socials</p>
            </Link>
        </div>
    )
}

export default BottomBar
