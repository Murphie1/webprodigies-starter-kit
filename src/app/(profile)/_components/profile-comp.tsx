import { initialProfile } from "@/lib/initial-profile";
import { ProfileCard } from "@/components/user-profile-card";
import { CreateProfile } from "@/components/modals/create-profile";

const ProfileComp = async () => {
    const profiles = await initialProfile();

    // Handle null or undefined profiles
    if (!profiles) {
        return (
            <div className="flex flex-col w-full space-y-4 font-bold justify-center">
                <h2 className="justify-center">Create your first profile</h2>
                <CreateProfile />
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="justify-center">Continue with your profiles</h2>
            <div className="flex overflow-x-auto whitespace-nowrap w-auto max-w-screen space-x-6">
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
            {/* Show CreateProfile if profiles are fewer than 3 */}
        {profiles.length < 3 && <CreateProfile />}
        </div>
    );
};

export default ProfileComp;
