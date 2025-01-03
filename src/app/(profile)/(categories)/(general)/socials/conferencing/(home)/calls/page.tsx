"use client";

import CallList from '@/components/conference/CallList';
import { useState } from "react";

type Variant = 'upcoming' | 'recordings' | 'ended';

const CallsPage = () => {
  const [variant, setVariant] = useState<Variant>('upcoming');

  const handleClick = (newVariant: Variant) => () => {
    setVariant(newVariant);
  };

  return (
    <section className="flex flex-col items-center gap-y-10 sm:max-w-screen">
      {/* Navigation Bar */}
      <nav className="flex w-full max-w-4xl overflow-x-auto rounded-md bg-gray-100 dark:bg-gray-800 shadow-lg">
        {[
          { label: "Upcoming Meetings", value: "upcoming" },
          { label: "Previous Meetings", value: "ended" },
          { label: "Call Recordings", value: "recordings" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={handleClick(tab.value as Variant)}
            className={`flex-1 px-2 py-2 text-center transition-all 
              ${variant === tab.value
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold dark:text-gray-100">Your Meetings</h1>

      {/* Call List */}
      <CallList type={variant} />
    </section>
  );
};

export default CallsPage;
