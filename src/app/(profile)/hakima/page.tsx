//"use client";

//import Spinner from "@/components/hakima/loading-spinner";
//import { useSessionsContext } from "@/context";
//import { Navbar } from "@/components/hakima/layout/navbar";
//import { useEffect } from "react";

//export const dynamic = 'force-dynamic';
//export const revalidate = 0;
//export const fetchCache = 'force-no-store';
//export const runtime = 'edge'; // Optional: forces edge runtime

export default function Home() {
  return (
    <main className="flex flex-col gap-2 h-[100dvh] w-screen items-center justify-center">
      <h2>HI</h2>
    </main>
  );
}
  {/*const { createSession } = useSessionsContext();

  useEffect(() => {
    createSession({ redirect: true });
  }, [createSession]);

  return (
    <main className="flex flex-col gap-2 h-[100dvh] w-screen items-center justify-center">
      <Spinner />
    </main>
  );
}
*/}
