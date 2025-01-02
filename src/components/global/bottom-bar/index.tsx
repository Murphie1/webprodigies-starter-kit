import {
    SquareLibrary,
    MessageCircle,
    Lightbulb,
    Telescope,
} from "lucide-react"
import Link from "next/link"

const BottomBar = () => {
    return (
        <div className="bg-white space-x-4 h-[70px] w-[calc(100vw-10px)] pl-[5px] overflow-hidden fixed bottom-2 z-50 justify-between items-center flex dark:bg-black">
            <Link href={`/home`}>
                <Telescope />
                <p className="text-bold text-md">Home</p>
            </Link>
            <Link href={`/updates`}>
                <Lightbulb />
                <p className="text-md text-bold">Updates</p>
            </Link>
            <Link href={`/library`}>
                <SquareLibrary />
                <p className="text-md text-bold">Library</p>
            </Link>
            <Link href={`/socials`}>
                <MessageCircle />
                <p className="text-md text-bold">Socials</p>
            </Link>
        </div>
    )
}

export default BottomBar
