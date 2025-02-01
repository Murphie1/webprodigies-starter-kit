import Footer from '@/components/clarion/footer'
import Header from '@/components/clarion/header'
import { Sidebar } from '@/components/clarion/sidebar'
import { Toaster } from '@/components/ui/sonner'
import type { Viewport } from 'next'




export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const enableSaveChatHistory =
    process.env.NEXT_PUBLIC_ENABLE_SAVE_CHAT_HISTORY === 'true'
  return (
    <main>
          <Header />
          {children}
          {enableSaveChatHistory && <Sidebar />}
          <Footer />
          <Toaster />
      </main>
  )
        }
