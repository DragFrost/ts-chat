import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

import { Darkmode } from "@/components/Darkmode";
import SideNav from "@/components/SideNav";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";
const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "TS - AI Chatbot",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", publicSans.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>

            <Sidebar variant="inset" collapsible="icon">
              <SidebarHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/red-dragon-head-on-transparent-background-free-png.webp"
                      alt="Logo"
                      width={50}
                      height={50}
                      className="object-cover rounded-full"
                      placeholder="blur"
                      blurDataURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-VE8dBa2FDQ4pWgcHCuIxio47LxdnCplW-PIYJfuFcQ6mHgtGslK35_0&s=10"
                    />
                    <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">TS Chat</span>
                  </div>
                </div>
              </SidebarHeader>
              <SideNav className="p-2 mt-5" />
              <SidebarFooter>
                <Darkmode />
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="group-data-[collapsible=icon]:p-0!">
                      <Image
                        src="/my-img.png"
                        alt="Anurag"
                        width={30}
                        height={30}
                        className="object-cover rounded-full group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10"
                      />
                      Anurag
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <SidebarTrigger className="ml-7 mt-7 cursor-pointer" />
              <div className="p-10 pb-0 h-full overflow-hidden">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
