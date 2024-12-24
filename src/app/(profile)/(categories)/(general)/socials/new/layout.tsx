import LeftPanel from "@/components/uMessage/home/left-panel"
import { MobileLeftPanel } from "./_components/navigation"

type Props = {
    children: React.ReactNode
}

const SocialLayout = ({ children }: Props) => {

     return (
      <div className="flex flex-1 pt-[50px]">
			<div className='flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel'>
            <div className="hidden md:fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30" />
                <LeftPanel />
            </div>
	      <MobileLeftPanel />
            <div className="h-full md:pl-1/3">
                {children}
            </div>
        </div>
  
    )
}
