//"use client";

import Sidebar from "@/components/bobb/Sidebar";
import Header from "@/components/bobb/Header";
import { NavigationProvider } from "@/lib/bobb/context/navigation";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  
  return (
    <NavigationProvider>
      <div className="flex h-screen">
          <Sidebar clerkId={userId} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </NavigationProvider>
  );
          }
export default DashboardLayout;
