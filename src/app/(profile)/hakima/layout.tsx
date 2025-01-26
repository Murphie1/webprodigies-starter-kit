import { TooltipProvider } from "@/components/ui/tooltip";
import type { Viewport } from "next";
import { MainLayout } from "@/components/hakima/layout/main-layout";
import React from "react";
import {
AssistantsProvider,
  ChatProvider,
  FiltersProvider,
  PromptsProvider,
  ConfirmProvider,
  PreferenceProvider,
  //ReactQueryProvider,
  SessionsProvider,
  SettingsProvider,
} from "@/context";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
            <TooltipProvider>
              <ConfirmProvider>
                <PreferenceProvider>
                  <SessionsProvider>
                    <SettingsProvider>
                      <ChatProvider>
                        <FiltersProvider>
                         <AssistantsProvider>
                          <PromptsProvider>
                           <MainLayout>
                           {children}
                           </MainLayout>
                         </PromptsProvider>
                       </AssistantsProvider>
                      </FiltersProvider>
                     </ChatProvider>
                    </SettingsProvider>
                  </SessionsProvider>
                </PreferenceProvider>
              </ConfirmProvider>
            </TooltipProvider>
  );
  }
