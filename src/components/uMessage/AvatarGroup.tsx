"use client";

import { User, Conversation } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[],
  conversation?: Conversation
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  conversation,
  users = []
}) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0'
  };

  return ( 
    {conversation.imageUrl ? (
      <div
          className="
            absolute
            inline-block
            rounded-full
            overflow-hidden
            h-[21px]
            w-[21px]
          "
        >
          <Image
            alt="Avatar"
            fill
            src={conversation.imageUrl!}
          />
        </div>
      ) : (
    <div
      className="
        relative
        h-11
        w-11
      "
    >
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block
            rounded-full
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image
            alt="Avatar"
            fill
            src={user?.image || '/next.svg'}
          />
        </div>
      ))}
    </div>
        )};
   );
}
 
export default AvatarGroup;
