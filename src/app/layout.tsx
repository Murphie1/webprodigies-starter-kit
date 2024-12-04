import { ThemeProvider } from "@/components/theme"
import { ReactQueryProvider } from "@/react-query/provider"
import { ReduxProvider } from "@/redux/provider"
//import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import {
    // IBM_Plex_Serif,
    Inter,
    //  Plus_Jakarta_Sans,
    //  Open_Sans,
} from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
//import { dark } from "@clerk/themes"
import Provider from "./Provider"
import ConvexClerkProvider from "@/providers/ConvexClerkProvider"

//const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
//const ibmPlexSerif = IBM_Plex_Serif({
// subsets: ["latin"],
//weight: ["400", "700"],
//variable: "--font-ibm-plex-serif",
//})

export const metadata: Metadata = {
    title: "YouLearn",
    description: "Learning just as you want it to be",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        // <ClerkProvider>
        <ConvexClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={`${inter.className} bg-white dark:bg-black`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={true}
                        storageKey="ylthemes"
                    >
                        <ReduxProvider>
                            <ReactQueryProvider>
                                <Provider>{children}</Provider>
                            </ReactQueryProvider>
                        </ReduxProvider>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ConvexClerkProvider>
        //</ClerkProvider>
    )
}
