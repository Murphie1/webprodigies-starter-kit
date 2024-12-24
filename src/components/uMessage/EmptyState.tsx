import Image from "next/image"
import React from "react"

const EmptyStateTwo = () => {
    return (
        <div
            className="
        px-4
        py-10
        sm:px-6
        lg:px-8
        h-full
        w-full 
        max-w-screen
        flex
        flex-col-1
        justify-center
        items-center
        bg-gray-100
       dark:bg-gray-800
      "
        >
            <Image
                src="/icons/emptyState.svg"
                width={250}
                height={250}
                alt="empty state"
            />
            
            <div className="text-center items-center flex flex-col">
                
                <h3
                    className="
            mt-2
            text-2xl
            font-semibold
            text-gray-900
          "
                >
                    Select a chat or start a new conversation
                </h3>
            </div>
        </div>
    )
}

export default EmptyStateTwo
