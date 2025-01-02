import Image from "next/image";
import React from "react";

const EmptyStateTwo = () => {
  return (
    <div
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        h-screen
        overflow-y-auto
        overflow-x-hidden
        px-4
      "
    >
      <Image
        src="/icons/emptyState.svg"
        width={250}
        height={250}
        alt="empty state"
        className="mb-4"
      />
      <div className="text-center">
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
  );
};

export default EmptyStateTwo;
