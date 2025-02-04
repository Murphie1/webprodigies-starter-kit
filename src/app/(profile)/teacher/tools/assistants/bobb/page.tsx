//"use client";

import Spinner from "@/components/hakima/loading-spinner";
import { api } from "~/convex/_generated/api";
import { getConvexClient } from "@/lib/bobb/convex";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


const Page = async () => {

  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }
  
  const convex = getConvexClient();
  
  const chat = await convex.mutation(api.chats.createChat, {
      title: "New Chat",
      clerkId: userId,
    });
  
  if (chat) redirect(`/teacher/tools/assistants/bobb/${chat._id}`)
  
  return <Spinner />
}
export default Page;
