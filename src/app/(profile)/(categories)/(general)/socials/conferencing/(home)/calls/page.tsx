"use client"

import CallList from '@/components/CallList';
import { useState } from "react"

type Variant = 'upcoming' | 'recordings' | 'ended';


const CallsPage = () => {

  const [variant, setVariant] = useState<Variant>('upcoming');

  
  return (
    <section className="flex size-full flex-col gap-10">
      <div className="flex flex-1 overflow-x-auto h-[45px] w-[calc(100vw-80px)] pl-[16px] items-center justify-between gap-x-4">
        <div onClick={setVariant('upcoming')}>
        <p>Upcoming Meetings</p>
        </div>
        <div onClick={setVariant('endes')}>
        <p>Previous Meetings</p>
        </div>
        <div onClick={setVariant('recordings')}>
        <p>Call Recordings</p>
        </div>
      </div>
      <h1 className="text-3xl font-bold">Your Meetings</h1>

      <CallList type={variant} />
    </section>
  );
};

export default CallsPage;
