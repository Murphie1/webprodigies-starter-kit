import { InitialProfile } from "@/lib/initial-profile";
import { client } from "@/lib/prisma";
import { InitialUser } from "@/lib/initial-user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const profile = await InitialProfile();
    const localUser = await InitialUser();

    return <div className="justify-end pt-5 pr-5">Create a Kids Profile</div>;
};

export default ProfilePage;
