// pages/homepage.js

const Homepage = () => {
    return (
        <div className="flex pt-8 md:grid grid-cols-2 mx-auto">
        <div className="justify-center bg-sky-300 dark:bg-themeGray border-2 rounded-lg w-[300px] h-[150px] hover:scale-310 transition-all">
           <p className="text-2xl justify-center">Text</p> 
        </div>
            <div className="hidden md:bg-themeWhite dark:bg-themeBlack border-2 rounded-lg w-[500px] h-[300px]">
           <p className="text-2xl">Text</p> 
        </div>
            </div>
        )
}

export default Homepage
