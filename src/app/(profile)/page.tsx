import ProfileComp from "./_components/profile-comp"
import UserComp from "./_components/user-comp"
import { ProfileBottom } from "./_components/profile-bottom"
import ProfileTop from "./_components/profile-top"

const Home = () => {
    return (
        <div className="flex flex-col items-center space-y-8 h-auto min-h-screen justify-center">
            <div className="pb-10">
                <ProfileTop />
            </div>
            <div className="relative md:flex grid grid-cols-2">
            <UserComp />
            <div className="overflow-x-auto whitespace-nowrap">
                <ProfileComp />
            </div>
                </div>
            <ProfileBottom />
        </div>
    )
}

export default Home
