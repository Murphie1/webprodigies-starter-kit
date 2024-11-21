import { InitialProfile } from "@/lib/initial-profile";
import { ProfileCard } from "@/components/user-profile-card";
import { CreateProfile } from "@/components/modals/create-profile";

const ProfileComp = async () => {
    const profile = await InitialProfile();

    if (profile) {
        return (
            <div className="flex overflow-x-auto whitespace-nowrap w-full">
                <h2>Continue with another Profile</h2>
                <ProfileCard
                    name={profile.name}
                    imageUrl={profile.imageUrl || null}
                    type={profile.type || null}
                    email={profile.email || null}
                />
            </div>
        );
    }

    return <CreateProfile />;
};

export default ProfileComp;
