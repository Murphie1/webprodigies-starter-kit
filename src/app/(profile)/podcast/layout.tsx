
import { Toaster } from "@/components/ui/toaster"
import  AudioProvider  from "@/providers/AudioProvider"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="relative flex flex-col mx-auto pb-5 max-w-(calc[100hw-80px])">
             <AudioProvider>
               <Toaster />
               {children}
             </AudioProvider>
      </main>
  );
};
