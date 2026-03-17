import { SidebarProvider , SidebarInset , SidebarTrigger} from "@/components/ui/sidebar"
import { AdminSidebar } from "../../../../components/admin/layout/admin-sidebar"
import { AdminMobileSidebar } from "@/components/admin/layout/admin-mobile-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="w-full flex flex-col"> 
        <header className="flex md:hidden items-center justify-between h-16 px-4 border-b bg-background">
          <AdminMobileSidebar/>
        </header>
        <main className="p-4 md:p-8 flex-1 overflow-auto">
          {children}
        </main>
        
      </SidebarInset>
    </SidebarProvider>
  )
}