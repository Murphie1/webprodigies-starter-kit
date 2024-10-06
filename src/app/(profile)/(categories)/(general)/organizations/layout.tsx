import OrganizationNavbar from "./_components/navbar"

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <OrganizationNavbar />
            {children}
        </div>
    )
}

export default OrganizationLayout
