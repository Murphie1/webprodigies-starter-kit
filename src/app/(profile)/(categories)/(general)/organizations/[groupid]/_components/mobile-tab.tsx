"use client";

import { useState } from "react";
import { Notification } from "@/components/global/user-widget/notification"
import { UserAvatar } from "@/components/global/user-widget/user"
import { LayoutGrid, MessageSquare, Compass, ChevronsRight, X} from "lucide-react"
import Link from "next/link"


type Props = {
  groupId: string;
  image: string;
};

const Tab = ({ groupId, image }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false); // Correct type: boolean

  return (
    isOpen ? (
       <div className="bg-white dark:bg-[#1A1A1D] space-x-7 w-auto overflow-x-auto whitespace-nowrap py-3 fixed bottom-[100px] z-50 md:hidden justify-between items-center flex">
            <Link href={`/organizations/${groupId}/groupspaces`}>
                <LayoutGrid />
            </Link>
            <Notification />
            <Link href={`/organizations/${groupId}/messages`}>
                <MessageSquare />
            </Link>
            <Link href={`/organizations/explore`}>
                <Compass />
            </Link>
            <UserAvatar image={image} groupid={groupId} />
         <X
          size="30"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu" // Optional: Improve accessibility
        />
        </div>
    ) : (
      <div
        className="h-[50px] w-[50px] rounded-full bg-white dark:bg-black border-2 border-black dark:border-white items-center fixed bottom-[100px]"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu" // Optional: Improve accessibility
      >
        <ChevronsRight size="30" className="justify-center pl-2 pt-1.5"/>
      </div>
    )
  );
};

export default Tab;
