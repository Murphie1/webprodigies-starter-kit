"use client";
import { ChatInput } from "@/components/hakima/chat-input";
import { ChatMessages } from "@/components/hakima/messages/chat-messages";
import { Navbar } from "@/components/hakima/layout/navbar";
import Spinner from "@/components/hakima/loading-spinner";
import { useSessionsContext } from "@/context";

const ChatSessionPage = () => {
  const { isCurrentSessionLoading, isAllSessionLoading } = useSessionsContext();

  const renderLoader = () => {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  };

  const isLoading = isCurrentSessionLoading || isAllSessionLoading;
  return (
    <div className="w-full h-[100%] bg-white dark:bg-zinc-800 rounded-xl flex flex-row relative overflow-hidden">
      <Navbar />
      {isLoading && renderLoader()}
      {!isLoading && (
        <>
          <ChatMessages />
          <ChatInput />
        </>
      )}
    </div>
  );
};

export default ChatSessionPage;
