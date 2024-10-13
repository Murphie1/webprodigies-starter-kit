import Menu from "./menu"

type Props = {}

const OrganizationNavbar = (props: Props) => {
    return (
        <div className="pb-2 pt-0 bg-black">
            <div className="w-full flex justify-between sticky top-0 items-center z-50 pr-2 fixed overflow-x-auto whitespace-nowrap">
                <p className="font-bold text-2xl pl-2">Syncro</p>
                <div className="md:hidden">
                    <Menu orientation="mobile" />
                </div>
                <Menu orientation="desktop" />
            </div>
        </div>
    )
}

export default OrganizationNavbar
