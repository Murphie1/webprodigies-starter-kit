import { InitialProfile } from "@/lib/initial-profile";
import { client } from "@/lib/prisma";
import { InitialUser } from "@/lib/initial-user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const profile = await InitialProfile();
    const localUser = await InitialUser();
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const clerkId = user.id;
    const kidsprofile = await client.kidsProfile.findUnique({
        where: {
            clerkId: clerkId, // Use clerkId to find the profile
        },
    });

    if (kidsprofile) {
        return (
            <div>
                <h1>Welcome, {user.firstName}</h1>
                <p>Profile exists: {JSON.stringify(kidsprofile)}</p>
            </div>
        );
    }

    return <div className="justify-end pt-5 pr-5">Create a Kids Profile</div>;
};

export default ProfilePage;
