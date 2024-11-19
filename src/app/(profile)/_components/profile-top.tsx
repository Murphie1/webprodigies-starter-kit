import { ModeToggle } from "@/components/mode-toggle"
import { UserButton } from "@clerk/nextjs"


const ProfileTop = () => {

  return <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-5 py-3 bg-transparent backdrop-blur-md hover:bg-grey dark:hover:bg-themeBlack">
  <UserButton
   afterSignOutUrl="/sign-in"
                />
  <ModeToggle />
  </div>;

};



export default ProfileTop;
