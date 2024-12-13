import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"
import { ReactNode } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <SidebarProvider className="w-[20vw]">
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
