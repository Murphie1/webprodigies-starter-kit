//"use client"

import LeftPanel from "@/components/uMessage/home/left-panel"
//import { usePathname } from "next/navigation"

export const MobileLeftPanel = () => {

//  const pathname = usePathname()
	//const isHome = pathname === "/socials/new"
  
  


return (
  <section>
	  {/*{isHome && (*/}
     <div className="w-full h-full relative md:hidden">
       <LeftPanel />
       </div>{/*)}*/}
</section>
  )
}
