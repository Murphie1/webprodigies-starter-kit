import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Heart,
  BookOpen
} from "lucide-react";

import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: 'uMessages',
      href: '/socials',
      icon: Heart,
      active: pathname?.includes('/socials')
    },
    {
      label: 'CatchUp',
      href: '/socials/catchup',
      icon: Heart,
      active: pathname?.includes('/socials/catchup')
    },
    {
      label: 'Open Chats',
      href: '/socials/open',
      icon: Heart,
      active: pathname?.includes('/socials/open')
    },
    {
      label: 'Friends',
      href: '/socials/friends',
      active: pathname === '/socials/friends',
      icon: Heart
    },
    {
      label: 'Events',
      href: '/socials/events',
      icon: Heart,
      active: pathname?.includes('/socials/events')
    },
    {
      label: 'Conferencing',
      href: '/socials/conferencing',
      icon: Heart,
      active: pathname?.includes('/socials/conferencing')
    },
    {
      label: 'SEL',
      href: '/socials/sel',
      icon: Heart,
      active: pathname === '/socials/sel'
    }
  ], [pathname, conversationId]);

  return routes;
}

export default useRoutes;
