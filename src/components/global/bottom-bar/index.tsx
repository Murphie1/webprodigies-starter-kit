import {
    SquareLibrary,
    MessageCircle,
    Lightbulb,
    Telescope,
} from "lucide-react"
import Link from "next/link"

const BottomBar = () => {
    return (
        <div className="bg-white space-x-2 h-[70px] w-[calc(100vw-20px)] shadow-md fixed bottom-[10px] left-[10px] z-50 justify-between items-center flex dark:bg-gray-900 rounded-2xl">
            <Link href={`/home`}>
                <Telescope size={20} />
                <p className="text-bold text-md">Home</p>
            </Link>
            <Link href={`/updates`}>
                <Lightbulb size={20} />
                <p className="text-md text-bold">Updates</p>
            </Link>
            <Link href={`/library`}>
                <SquareLibrary size={20} />
                <p className="text-md text-bold">Library</p>
            </Link>
            <Link href={`/socials`}>
                <MessageCircle size={20} />
                <p className="text-md text-bold">Socials</p>
            </Link>
        </div>
    )
}

export default BottomBar
