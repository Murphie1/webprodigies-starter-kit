"use client";

import { useState } from "react";
import MobileNav from "../../_components/mobile-nav";
import { ChevronsRight, X } from "lucide-react";

type Props = {
  groupId: string;
  image: string;
};

const Tab = ({ groupId, image }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false); // Correct type: boolean

  return (
    isOpen ? (
      <div className="flex w-screen space-y-4 justify-center bg-white dark:bg-black border-2 border-black dark:border-white">
        <MobileNav groupid={groupId} imageUrl={image} /> {/* Fix prop casing */}
        <X
          size="30"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu" // Optional: Improve accessibility
        />
      </div>
    ) : (
      <div
        className="h-[50px] w-[50px] rounded-full bg-white dark:bg-black border-2 border-black dark:border-white"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu" // Optional: Improve accessibility
      >
        <ChevronsRight size="30" />
      </div>
    )
  );
};

export default Tab;
