"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MobileItemProps {
  href: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
}) => {
  

  return ( 
    <Link 
      href={href}
      className={cn(`
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        dark:text-themeTextWhite
        hover:text-black
        dark:hover:text-white
        hover:bg-gray-100
        dark:hover:bg-sky-700
      `,
        active && "bg-gray-100 text-black dark:bg-sky-700 dark:text-white"
      )}
    >
      <Icon className="h-10 w-10" />
    </Link>
   );
}
 
export default MobileItem;
