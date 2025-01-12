// providers/StreamClientProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";

// Context definition
const StreamClientContext = createContext<{
  client: StreamVideoClient | null;
  isUserConnected: boolean;
}>({
  client: null,
  isUserConnected: false,
});

export const StreamClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [isUserConnected, setIsUserConnected] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user || isUserConnected) return;

    const initializeClient = async () => {
      try {
        let newClient = client;

        if (!client) {
          // Create a new StreamVideoClient if none exists
          newClient = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
            tokenProvider,
          });
          setClient(newClient);
        }

        // Connect the user to the Stream client
        if (newClient) {
          await newClient.connectUser(
            {
              id: user.id,
              name: user.firstName || user.lastName || user.username || user.id,
              image: user.imageUrl,
            },
            tokenProvider
          );
          setIsUserConnected(true);
        }
      } catch (error) {
        console.error("Error initializing Stream client:", error);
      }
    };

    initializeClient();

    // Cleanup to disconnect user on unmount
    return () => {
      if (client) {
        client.disconnectUser();
        setIsUserConnected(false);
      }
    };
  }, [user, isLoaded, isUserConnected]); // Removed `client` from dependencies to prevent unnecessary re-runs

  return (
    <StreamClientContext.Provider value={{ client, isUserConnected }}>
      {children}
    </StreamClientContext.Provider>
  );
};

export const useStreamClient = () => useContext(StreamClientContext);
