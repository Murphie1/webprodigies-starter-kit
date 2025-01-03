// providers/StreamClientProvider.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { tokenProvider } from '@/actions/stream.actions';

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
        // Check if a client already exists
        if (!client) {
          const newClient = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
            tokenProvider,
          });
          setClient(newClient); // Save the client instance
        }

        // Connect the user
        if (client) {
          await client.connectUser(
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
        console.error('Error initializing Stream client:', error);
      }
    };

    initializeClient();
  }, [user, isLoaded, client, isUserConnected]);

  return (
    <StreamClientContext.Provider value={{ client, isUserConnected }}>
      {children}
    </StreamClientContext.Provider>
  );
};

export const useStreamClient = () => useContext(StreamClientContext);
