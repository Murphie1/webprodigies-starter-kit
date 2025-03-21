import { initialUser } from "@/lib/initial-user"
import { ProfileCard } from "@/components/user-profile-card"
import { Separator } from "@/components/ui/separator"

const UserComp = async () => {
    const localUser = await initialUser()
    if (localUser) {
        return (
            <div className="flex flex-col space-y-3 md:space-x-3 md:grid grid-col-2">
                <h2>User Account</h2>
                <ProfileCard
                    name={localUser.name}
                    imageUrl={localUser?.imageUrl || "@/app/favicon.ico"}
                    type="User Account"
                    email={localUser?.email || null}
                />
                <div className="text-center justify-center font-bold space-y-0">
                    <Separator className="bg-black dark:bg-white md:hidden" />
                    <span className="justify-center">OR</span>
                    <Separator className="hidden md:flex bg-black dark: bg-white" />
                </div>
            </div>
        )
    }
    return null
}

export default UserComp
