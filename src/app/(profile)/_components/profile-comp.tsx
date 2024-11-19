import { InitialProfile } from "@/lib/initial-profile";
import { client } from "@/lib/prisma";
import { InitialUser } from "@/lib/initial-user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ProfileComp = async () => {
    const profile = await InitialProfile();
    const localUser = await InitialUser();

    return <h5>
    Profiles
    </h5>
};

export default ProfileComp
