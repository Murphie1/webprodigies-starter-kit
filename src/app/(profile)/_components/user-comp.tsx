import { InitialUser } from "@/lib/initial-user"
import { ProfileCard } from "@/components/user-profile-card"
import { Separator } from "@/components/ui/separator"

const UserComp = async () => {
    const localUser = await InitialUser();
    if (localUser) {
    return (
<div className="flex flex-col md:grid grid-col-2">
                <h2>User Account</h2>
                <ProfileCard
                    name={localUser.name}
                    imageUrl={localUser.image || null}
                    type="User Account"
                    email={localUser.email || null}
                />
                <div>
                    <Separator className="md:hidden" />
                    <Separator className="hidden md:flex" />
                    <h5>OR</h5>
                </div>
            </div>
        )
}
    return null
}

export default UserComp