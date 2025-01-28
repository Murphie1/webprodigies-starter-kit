"use client";

import Spinner from "@/components/hakima/loading-spinner";
import { useSessionsContext } from "@/context";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  const { createSession } = useSessionsContext();

  useEffect(() => {
    createSession({ redirect: true });
  }, [createSession]);

  return (
    <main className="flex flex-col gap-2 h-[100dvh] w-screen items-center justify-center">
      <Spinner />
    </main>
  );
}
