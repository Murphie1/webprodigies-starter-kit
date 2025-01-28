"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

// Dynamically import the session context with SSR disabled
const useSessionsContext = dynamic(() => import("@/context").then(mod => mod.useSessionsContext), {
  ssr: false, // Ensure it only runs on the client
});

// Spinner component
import Spinner from "@/components/hakima/loading-spinner";

export default function Home() {
  // Dynamically loaded hook
  const { createSession } = useSessionsContext();

  useEffect(() => {
    if (createSession) {
      createSession({ redirect: true });
    }
  }, [createSession]);

  return (
    <main className="flex flex-col gap-2 h-[100dvh] w-screen items-center justify-center">
      <Spinner />
    </main>
  );
}
{/*"use client";

import Spinner from "@/components/hakima/loading-spinner";
import { useSessionsContext } from "@/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { createSession } = useSessionsContext();
  useEffect(() => {
    createSession({ redirect: true });
  }, []);
  
  return (
    <main className="flex flex-col gap-2 h-[100dvh] w-screen items-center justify-center">
    <Spinner />
    </main>
  );
    }
*/}
