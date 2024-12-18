"use client";

import axios from "axios";
import { Friend, User } from "@prisma/client";
import { FullFriendType } from "@/type";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import useOtherUser from "@/hooks/uMessage/useOtherUser;
import Avatar from "@/components/uMessage/Avatar";

interface UserBoxProps {
  data: FullFriendType
}

const UserBox: React.FC<UserBoxProps> = ({
  data
}) => {
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { 
      userId: otherUser.id
    })
    .then((data) => {
      router.push(`/socials/${otherUser.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [otherUser, router]);

  return (
    <>
      {isLoading && (
      <p className="justify-center">Loading...</p>
      )}
      <div
        onClick={handleClick}
        className="
          w-full
          relative
          flex
          items-center
          space-x-3
          bg-white
          p-3
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar user={otherUser} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div
              className="
                flex
                justify-between
                items-center
                mb-1
              "
            >
              <p 
                className="
                  text-sm
                  font-medium
                  text-gray-900
                "
              >
                {otherUser.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default FriendBox;
