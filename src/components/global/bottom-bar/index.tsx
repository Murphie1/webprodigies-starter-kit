"use client";

import { usePathname } from "next/navigation";
import {
  SquareLibrary,
  MessageCircle,
  Lightbulb,
  Telescope,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

type Route = {
  label: string;
  icon: LucideIcon;
  href: string;
};

// Define route groups
const routeGroups: Record<string, Route[]> = {
  home: [
    { label: "Home", icon: Telescope, href: "/home" },
    { label: "Updates", icon: Lightbulb, href: "/updates" },
    { label: "Library", icon: SquareLibrary, href: "/library" },
    { label: "Socials", icon: MessageCircle, href: "/socials" },
  ],
  teacher: [
    { label: "Dashboard", icon: Lightbulb, href: "/dashboard" },
    { label: "Classes", icon: Telescope, href: "/classes" },
    { label: "Library", icon: SquareLibrary, href: "/teacher-library" },
    { label: "Messages", icon: MessageCircle, href: "/teacher-messages" },
  ],
  socials: [
    { label: "Home", icon: Telescope, href: "/home" },
    { label: "uMessages", icon: MessageCircle, href: "/socials" },
    { label: "catchUp", icon: Lightbulb, href: "/socials/catchup" },
    { label: "Friends", icon: SquareLibrary, href: "/socials/friends" },
    { label: "Conferencing", icon: Telescope, href: "/socials/conferencing" },
  ],
  // Add more route groups here.
};

const BottomBar = () => {
  const pathname = usePathname();

  // Dynamically determine which routes to use based on the pathname
  const routes =
    Object.keys(routeGroups).find((key) =>
      pathname.startsWith(`/${key}`)
    )
      ? routeGroups[pathname.split("/")[1]]
      : routeGroups["home"]; // Default to 'home' routes

  return (
    <div className="bg-gray-100 space-x-4 h-[60px] w-[calc(100vw-20px)] shadow-lg fixed bottom-[10px] left-[10px] z-50 justify-between items-center flex dark:bg-themeBlack rounded-xl overflow-x-auto md:h-[calc(100vh-20px)] md:w-[60px] md:justify-align md:space-x-0 md:gap-y-4 md:grid-col-1 md:overflow-hidden">
      {routes.map((route) => {
        const isActive = pathname === route.href; // || pathname?.includes(route.href);

        return (
          <Link key={route.href} href={route.href}>
            <div
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive ? "rounded-lg px-2 py-1" : ""
              }`}
            >
              <div className={`w-full rounded-2xl items-center justify-center h-auto ${
              isActive ? "bg-green-200" : ""
                }`}
                >
              <route.icon size={20} className="justify-center" />
                </div>
              <p className={`text-sm text-bold truncate md:hidden ${
              isActive ? "underline" : ""
              }`}
                >
            {route.label}
                </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar
