import StreamVideoProvider from "@/providers/StreamClientProvider";
import { StreamClientProvider } from '@/providers/StreamProvider';

export default function ConferenceLayout({ children }: { children: React.ReactNode }) {
  return (
      <body>
        <StreamClientProvider>
          <StreamVideoProvider>
          {children}
            </StreamVideoProvider>
        </StreamClientProvider>
      </body>
  );
          }
