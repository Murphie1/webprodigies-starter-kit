// pages/homepage.js

const Homepage = () => {
    return (
        <div className="flex pl-8 pt-8 items-center md:grid grid-cols-2 mx-auto">
        <div className="justify-center items-center bg-sky-300 dark:bg-themeGray border-2 rounded-lg w-[350px] h-[175px] hover:scale-310 transition-200">
           <p className="text-2xl justify-center">Text</p> 
        </div>
            <div className="hidden md:bg-themeWhite dark:bg-themeBlack border-2 rounded-lg w-[500px] h-[300px]">
           <p className="text-2xl">Text</p> 
        </div>
            </div>
        )
}

export default Homepage
