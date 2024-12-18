"use client";

import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/hooks/uMessage/useOtherUser";
import { useMemo } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Avatar from "@/components/uMessage/Avatar";
import AvatarGroup from "@/components/uMessage/AvatarGroup";

import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/hooks/uMessage/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
};

const Header: React.FC<HeaderProps> = ({
  conversation
}) => {
  const otherUser = useOtherUser(conversation);
  
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    
    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return ( 
    <>
      <div
        className="
          bg-themeWhite
          dark:bg-themeBlack
          w-full
          flex
          border-b-[1px]
          sm:px-4
          py-3
          px-4
          lg:px-6
          justify-between
          items-center
          shadow-sm
        "
      >
        <div className="flex gap-3 items-center">
          <Link 
            className="
              lg:hidden
              block
              text-sky-500
              dark:text-themeGray
              hover:text-sky-600
              transition
              cursor-pointer
            "
            href="/socials"
          >
            <ChevronLeft size={22} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup
              conversation={conversation}
              users={conversation.users}
              />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>
              {conversation.name || otherUser.name}
            </div>
            <div
              className="
                text-sm
                font-light
                text-neutral-500
              "
            >
              {statusText}
            </div>
          </div>
        </div>
        <ProfileDrawer
        data={conversation}
      />
      </div>
    </>
   );
}
 
export default Header;
