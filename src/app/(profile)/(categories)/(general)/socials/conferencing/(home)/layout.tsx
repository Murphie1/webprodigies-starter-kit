import { NavBar } from "@/components/navbar"
import { SideBar } from "@/components/sidebar"
import { Phone, Plus } from "lucide-react"

type Props = {
    children: React.ReactNode
}

const ConferenceLayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            {/* Navbar */}
            <div className="h-[50px] md:h-[75px] md:pl-56 fixed inset-y-0 w-full z-50">
                <NavBar />
            </div>

            {/* Sidebar */}
            <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
                <SideBar />
            </div>

            {/* Main Content */}
            <main className="h-full flex flex-col md:pl-64 pt-[50px] md:pt-[75px]">
                <div className="flex justify-center space-x-4 pt-3 pb-6">
                    <a
                        href="/socials/conferencing/calls"
                        className="px-4 py-2 flex flex-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                       <Phone size={25} /> Your Calls
                    </a>
                    <a
                        href="/socials/conferencing/room"
                        className="px-4 py-2 flex flex-1 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                    >
                        <Plus size={25} /> Create a Call
                    </a>
                </div>
                <div className="px-6 pb-6 flex max-md:pb-14 sm:px-14">
                {children}
                </div>
            </main>
        </div>
    )
}

export default ConferenceLayout
