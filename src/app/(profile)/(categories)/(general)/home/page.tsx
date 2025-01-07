import Grids from "./_components/grids"
import { uploadGroupFile } from "@/lib/actions/file.actions";


const Homepage = async () => {
    const file = await uploadGroupFile({ file: "1234", ownerId: "123", clerkId: "123", groupId: "123", accountId: "123", path: "1234" });
    
    return (
        <div className="flex flex-col pt-6 space-y-2 items-center justify-center md:grid md:grid-cols-2 md:space-y-0 md:space-x-8">
            {/* Card 1 */}
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-1 border-black dark:border-themeBlack rounded-2xl w-[350px] h-[175px] shadow-sm hover:scale-105 transition-transform duration-300">
                <p className="text-2xl text-center">Text</p>
            </div>

            {/* Card 2 */}
            <div className="hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-1 border-black dark:border-themeBlack rounded-2xl w-[350px] h-[175px] shadow-sm hover:scale-105 transition-transform duration-300">
                <p className="text-2xl text-center">Text</p>
            </div>
            <Grids />
        </div>
    )
}

export default Homepage
