import { useEffect, useState } from 'react';
import { useStreamClient } from "@/providers/StreamProvider";
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';


export const useGetCallById = (id: string | string[]) => {
  const { user, isLoaded } = useUser();
  const { client, isUserConnected } = useStreamClient();
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  
  useEffect(() => {
    if (!client || !id) return;

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
  }, [client, id, user, isUserConnected]);

  return { call, isCallLoading };
};
