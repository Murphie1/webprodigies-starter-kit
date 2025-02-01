//"use client";

import Spinner from "@/components/hakima/loading-spinner";
import { redirect } from "next/navigation"
import { generateId } from 'ai'

export default function Page() {
  const id = generateId()
  if (id) redirect(`/clarion/${id}`)
  
  return <Spinner />
}
