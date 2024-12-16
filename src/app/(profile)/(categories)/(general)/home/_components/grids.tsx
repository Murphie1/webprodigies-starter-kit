const Grids = () => {
    const categories = [
        { name: "Action", icon: "🎮" },
        { name: "Simulation", icon: "🕶️" },
        { name: "Puzzle", icon: "🧩" },
        { name: "Adventure", icon: "🧭" },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 p-4">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between w-[170px] h-[80px] bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
                >
                    <span className="text-lg text-blue-500 mb-2">{category.icon}</span>
                    <p className="text-lg font-medium text-gray-800 dark:text-white">
                        {category.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Grids;
