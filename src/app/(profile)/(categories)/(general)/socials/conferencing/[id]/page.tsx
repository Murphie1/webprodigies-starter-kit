'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/stream/useGetCallById';
import Alert from '@/components/conference/Alert';
import MeetingSetup from '@/components/conference/MeetingSetup';
import MeetingRoom from '@/components/conference/MeetingRoom';

// Define the IParams interface
interface IParams {
  id: string;
}

const MeetingPage = () => {
  // Type the params with IParams
  const params = useParams() as unknown as IParams; // Explicitly cast useParams() to IParams
  const { id } = params;
  
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold">
        Call Not Found
      </p>
    );

  // Check if the user is allowed to join the call
  const notAllowed =
    call.type === 'invited' &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
