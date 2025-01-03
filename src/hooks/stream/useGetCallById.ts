import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient, StreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';


const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;


export const useGetCallById = (id: string | string[]) => {
  const { user, isLoaded } = useUser();
  const [call, setCall] = useState<Call>();
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  
useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.firstName || user?.lastName || user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);
  //const client = useStreamVideoClient();

  useEffect(() => {
    if (!videoClient) return;
    
    const loadCall = async () => {
      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await videoClient.queryCalls({ filter_conditions: { id } });

        if (calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false);
      } catch (error) {
        console.error(error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [videoClient, id]);

  return { call, isCallLoading };
};
