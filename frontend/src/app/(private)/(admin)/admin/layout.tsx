import { SidebarProvider , SidebarInset , SidebarTrigger} from "@/components/ui/sidebar"
import { AdminSidebar } from "../../../../components/admin/layout/admin-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="w-full"> 
        <div className="p-8">
          {children}
        </div>
        
      </SidebarInset>
    </SidebarProvider>
  )
}