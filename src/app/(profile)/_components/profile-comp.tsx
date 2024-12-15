import { InitialProfile } from "@/lib/initial-profile"
import { ProfileCard } from "@/components/user-profile-card"
import { CreateProfile } from "@/components/modals/create-profile"

const ProfileComp = async () => {
    const profiles = await InitialProfile()

    if (profiles && profiles.length > 0) {
        return (
            <div className="flex flex-col w-full space-y-4">
                <h2>Continue with another Profile</h2>
                <div className="flex overflow-x-auto whitespace-nowrap w-full">
                    {profiles.map((profile) => (
                        <ProfileCard
                            key={profile.id}
                            name={profile.name}
                            imageUrl={profile.imageUrl}
                            type={profile.type || null}
                            email={profile.email || null}
                        />
                    ))}
                </div>
            </div>
        )
    }
    return null

    return 
    {profiles.length < 3 ? ( 
        <CreateProfile /> 
    ) : (
        <div/>
    )}
}

export default ProfileComp
