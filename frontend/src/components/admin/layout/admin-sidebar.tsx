'use client'

import { Button } from '@/components/ui/button'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { LayoutGrid, Database, Users, WalletCards , User , LogOut, Box} from 'lucide-react'
import Link from 'next/link'
import { AvatarAdmin } from './avatarAdmin'
import AvatarImage from '../../../../public/bolsonaro_png.png'
import { usePathname } from 'next/navigation'

const navItems = [
    {
        title: 'Dashboard',
        url: '/admin',
        icon: LayoutGrid,
        isActive: false,
    },
    {
        title: 'Catálogo',
        url: '/admin/catalogo',
        icon: Database,
        isActive: true,
    },
    {
        title: 'Produto selado',
        url: '/admin/sealed-product',
        icon: Box,
        isActive: true,
    },
    {
        title: 'Usuários',
        url: '/admin/users',
        icon: Users,
        isActive: false,
    },
]
const isUser = true


export function AdminSidebar() {
    const path = usePathname();
    console.log (path)
    console.log (navItems[1].url)
    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="py-4">
                <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:justify-center">
                    <section className="flex items-center gap-4 group-data-[collapsible=icon]:hidden">
                        <WalletCards className="size-6 text-blue-700" />
                        <p className="text-xl font-semibold text-black">
                            TCGhub
                        </p>
                    </section>

                    <SidebarTrigger className="hover:bg-gray-100" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className='space-y-1 mt-4'>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.title} className="group-data-[state=expanded]:px-2">
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <Link
                                    href={item.url}
                                    className={`w-full py-6 text-gray-700 flex items-center hover:bg-sky-600/10 gap-3 ${path === item.url ? 'bg-sky-600/10' : ''} transition-colors`}
                                >
                                    <section className="text-xl">
                                        <item.icon size={17} className='group-data-[collapsible=icon]:ml-2'/>
                                    </section>
                                    <span className="text-md font-medium">
                                        {item.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:p-0">
                            <div className="flex items-center gap-3 overflow-hidden group-data-[collapsible=icon]:hidden">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                    { isUser ? 
                                        (
                                            <AvatarAdmin image={AvatarImage}/>
                                        )
                                        :
                                        (
                                            <User size={18} />
                                        )
                                        
                                    }
                                    <User size={18} />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold text-gray-900">Thiago Medeiros</span>
                                    <span className="truncate text-xs text-gray-500">thiago22@gmail.com</span>
                                </div>
                            </div>

                            <SidebarMenuButton 
                                asChild 
                                tooltip="Sair" 
                                className="w-fit hover:bg-red-50 hover:text-red-600 transition-colors group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center"
                            >
                                <Link href="/">
                                    <LogOut size={18} />
                                </Link>
                            </SidebarMenuButton>
                            
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
