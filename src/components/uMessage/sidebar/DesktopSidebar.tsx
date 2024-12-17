'use client';

import { useState } from "react";
import { User } from "@prisma/client";

import useRoutes from "@/hooks/uMessage/useRoutes";

import DesktopItem from "./DesktopItem";
import SettingsModal from "./SettingsModal";

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes();


  console.log({ currentUser })

  return (
    <>
      <div
        className="
          hidden
          lg:h-[calc(100vh-30px)]
          lg:fixed
          lg:inset-y-0
          lg:left-2
          lg:z-40
          lg:justify-center
          lg:rounded-xl
          lg:w-20
          xl:px-6
          lg:overflow-y-auto
          lg:bg-white
          dark:lg:bg-black
          lg:border-[1px]
          lg:pb-4
          lg:flex
          lg:flex-col
          justify-between
        "
      >
        <nav
          className="
            mt-4
            flex
            flex-col
            justify-between
          "
        >
          <ul
            role="list"
            className="
              flex
              flex-col
              items-center
              space-y-1
            "
          >
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </ul>
        </nav>
        <nav
          className="
            mt-4
            flex
            flex-col
            justify-between
            items-center
          "
        >
          <div
            onClick={() => setIsOpen(true)}
            className="
              cursor-pointer
              hover:opacity-75
              transition
            "
          >
            <SettingsModal
        currentUser={currentUser}
      />
          </div>
        </nav>
      </div>
    </>
   );
}
 
export default DesktopSidebar;
