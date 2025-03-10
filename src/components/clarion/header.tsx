import React from 'react'
import Link from "next/link"
import { ModeToggle } from '@/components/mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import HistoryContainer from './history-container'

export const Header: React.FC = async () => {
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <Link href="/">
          <IconLogo className={cn('w-5 h-5')} />
          <span className="sr-only">Clarion: Virtual Tutor</span>
        </Link>
      </div>
      <div className="flex gap-0.5">
        <ModeToggle />
         <HistoryContainer location="header" /> 
      </div>
    </header>
  )
}

export default Header
