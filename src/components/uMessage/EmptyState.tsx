import Image from "next/image"
import React from "react"

const EmptyStateTwo = () => {
    return (
        <div
            className="
        gap-y-4
        h-full
        w-screen
        md:w-full
        flex
        flex-col-1
        justify-center
        items-center
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
            dark:text-gray-300
          "
                >
                    Select a chat or start a new conversation
                </h3>
            </div>
        </div>
    )
}

export default EmptyStateTwo
