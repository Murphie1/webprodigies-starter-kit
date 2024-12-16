// pages/homepage.js

const Homepage = () => {
    return (
        <div className="flex md:grid grid-cols-2 mx-auto">
        <div className="justify-center bg-themeWhite dark:bg-themeBlack border-2 rounded-md w-[500px] h-[300px]">
           <p className="text-2xl">Text</p> 
        </div>
            <div className="hidden md:bg-themeWhite dark:bg-themeBlack border-2 rounded-md w-[500px] h-[300px]">
           <p className="text-2xl">Text</p> 
        </div>
            </div>
        )
}

export default Homepage
