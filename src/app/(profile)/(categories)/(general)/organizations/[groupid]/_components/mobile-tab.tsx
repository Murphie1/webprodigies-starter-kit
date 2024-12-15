"use client"

import { useState } from "react"
import MobileNav from "../../_components/mobile-nav"
import { ChevronsRight, X } from "lucide-react"

type Props = {
  groupId: string
}

const Tab = ({ groupId } : Props) => {
    const [ isOpen, setIsOpen] = useState("false")

        return (
          {isOpen ? (
            <div className="flex w-screen space-y-4 justify-center bg-white dark:bg-black border-2 border-black dark:border-white">
              <MobileNav groupid={groupId} />
                <X 
                  size="30" 
                  onClick={() => setIsOpen(false)}
                  />
            </div>
        ) : ( 
          <div 
            className="h-[50px] w-[50px] rounded-full bg-white dark:bg-black border-2 border-black dark:border-white"
            onClick={() => setIsOpen(true)}
            >
            <ChevronsRight size="30" />
        </div>
             )}
)
}
export default Tab
