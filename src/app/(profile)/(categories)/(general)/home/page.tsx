import Grids from "./_components/grids"

const Homepage = () => {
    return (
        <div className="flex flex-col pt-6 space-y-3 items-center justify-center md:grid md:grid-cols-2 md:space-y-0 md:space-x-8">
            {/* Card 1 */}
            <div className="flex items-center justify-center bg-gray-50 dark:bg-themeGray border-2 border-black dark:border-themeBlack rounded-2xl w-[350px] h-[175px] hover:scale-105 transition-transform duration-300">
                <p className="text-2xl text-center">Text</p>
            </div>

            {/* Card 2 */}
            <div className="hidden md:flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-2xl w-[500px] h-[300px] hover:scale-105 transition-transform duration-300">
                <p className="text-2xl text-center">Text</p>
            </div>
            <Grids />
        </div>
    );
};

export default Homepage;
