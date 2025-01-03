
import { StreamClientProvider } from '@/providers/StreamProvider';

export default function ConferenceLayout({ children }: { children: React.ReactNode }) {
  return (
      <body>
        <StreamClientProvider>
          {children}
        </StreamClientProvider>
      </body>
  );
          }
