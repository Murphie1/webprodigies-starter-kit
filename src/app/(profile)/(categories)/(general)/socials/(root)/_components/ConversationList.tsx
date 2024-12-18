"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useConversation from "@/hooks/uMessage/useConversation";
import { FullConversationType } from "@/type";

import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { Friend } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: Friend[]
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const { session } = useUser();
  if (!session || !session.primartEmailAddress?.emailAddress)  return redirect("/sign-in");

  const [items, setItems] = useState(initialItems);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.primaryEmailAddress?.emailAddress;
  }, [session.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.chats
          }
        }

        return currentConversation;
      }))
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });

      if (conversationId === conversation.id) {
        router.push('/socials');
      }
    };

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    }
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <aside
        className={cn(`
          fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-80
          lg:block
          overflow-y-auto
          border-r
          border-gray-200
          dark:border-themeBlack
        `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="
              text-2xl
              font-bold
              text-neutral-800
              dark:text-white
            ">
              uMessages
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="
                rounded-full
                p-2
                bg-gray-100
                dark:bg-gray-900
                text-gray-600
                cursor-pointer
                hover:opacity-75
                transition
              "
            >
              <GroupChatModal
            users={users}
                  />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
   );
}
 
export default ConversationList;
