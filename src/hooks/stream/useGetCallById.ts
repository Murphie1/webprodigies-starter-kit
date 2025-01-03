import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { tokenProvider } from '@/actions/stream.actions';

export const useGetCallById = (id: string | string[]) => {
  const { user, isLoaded } = useUser();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const [isUserConnected, setIsUserConnected] = useState(false); // Track if the user is connected

  useEffect(() => {
    if (!isLoaded || !user || !client || isUserConnected) return;

    const initializeClient = async () => {
      try {
        await client.connectUser(
          {
            id: user.id,
            name: user.firstName || user.lastName || user.username || user.id,
            image: user.imageUrl,
          },
          tokenProvider
        );
        setIsUserConnected(true); // Mark the user as connected
      } catch (error) {
        console.error('Error connecting user:', error);
      }
    };

    initializeClient();
  }, [user, isLoaded, client, isUserConnected]);

  useEffect(() => {
    if (!client || !id || !isUserConnected) return;

    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

        if (calls.length > 0) setCall(calls[0]);
        setIsCallLoading(false);
      } catch (error) {
        console.error(error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id, isUserConnected]);

  return { call, isCallLoading };
};
