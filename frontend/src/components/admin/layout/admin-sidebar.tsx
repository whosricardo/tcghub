import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutGrid,
  Database,
  Users,
  WalletCards 
} from "lucide-react"
import Link from "next/link"

const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutGrid,
    isActive: false,
  },
  {
    title: "Catálogo",
    url: "/admin/catalog",
    icon: Database,
    isActive: true, 
  },
  {
    title: "Usuários",
    url: "/admin/users",
    icon: Users,
    isActive: false,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
        <section className="flex justify-end group-data-[collapsible=icon]:justify-center">
            <SidebarTrigger />
        </section>
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 overflow-hidden">
        <section className="flex items-center justify-between w-full group-data-[collapsible=icon]:justify-center">
          <section className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
            <section className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-600"> 
              <WalletCards className="h-6 w-6 text-white"/>
            </section>
            <section className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900">TCGhub</span>
              <span className="text-sm font-medium text-slate-500">Portal do adm</span>
            </section>
          </section>
        </section>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-4 mx-auto">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                    className={`h-11 rounded-lg px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center  text-base transition-colors ${
                      item.isActive
                        ? "bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 hover:text-sky-600"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-8 w-8 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}