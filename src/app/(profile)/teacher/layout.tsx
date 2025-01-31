import { NavBar } from "./_components/navbar"
import { SideBar } from "./_components/sidebar"

type Props = {
    children: React.ReactNode
}

const HomeLayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            {/* Navbar */}
            <div className="h-[50px] md:h-[75px] md:pl-64 fixed inset-y-0 w-full z-50">
                <NavBar />
            </div>

            {/* Sidebar */}
            <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
                <SideBar />
            </div>

            {/* Main Content */}
            <main className="h-full md:pl-64 pt-[50px] md:pt-[75px]">
                {children}
            </main>
        </div>
    )
}

export default HomeLayout
