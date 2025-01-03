'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { useStreamClient } from "./StreamProvider";

import Loader from '@/components/conference/Loader';

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  
  const { user, isLoaded } = useUser();

    const { client } = useStreamClient();

  if (!client) return <Loader />;

  return <StreamVideo client={client}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
