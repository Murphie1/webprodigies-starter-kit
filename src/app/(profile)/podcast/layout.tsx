//import LeftSidebar from "@/components/LeftSidebar";
//import MobileNav from "@/components/MobileNav";
//import RightSidebar from "@/components/RightSidebar";
//import { Toaster } from "@/components/ui/toaster"
//import PodcastPlayer from "@/components/PodcastPlayer";
import  AudioProvider  from "@/providers/AudioProvider"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="relative flex flex-col pl-5 pb-5">
             <AudioProvider>{children}</AudioProvider>
      </main>
  );
};
