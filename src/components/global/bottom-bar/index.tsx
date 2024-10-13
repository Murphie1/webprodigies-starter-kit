import {
    SquareLibrary,
    MessageCircle,
    Lightbulb,
    Telescope,
} from "lucide-react"
import Link from "next/link"

const BottomBar = () => {
    return (
        <div className="bg-[#1A1A1D] space-x-7 h-auto w-screen overflow-x-auto whitespace-nowrap py-3 px-11 fixed bottom-0 z-50 justify-between items-center flex">
            <Link href={`/home`}>
                <Telescope />
                <p className="text-bold text-grey">Home</p>
            </Link>
            <Link href={`/updates`}>
                <Lightbulb />
                <p className="text-grey text-bold">Updates</p>
            </Link>
            <Link href={`/library`}>
                <SquareLibrary />
                <p className="text-grey text-bold">Library</p>
            </Link>
            <Link href={`/socials`}>
                <MessageCircle />
                <p className="text-grey text-bold">Socials</p>
            </Link>
        </div>
    )
}

export default BottomBar
