'use client'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { LayoutGrid, Database, Users, WalletCards, Menu, User, LogOut, Box } from 'lucide-react'
import Link from 'next/link'
import { AvatarAdmin } from './avatarAdmin'
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

export function AdminMobileSidebar() {
    const isUser = true; 
    const path = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="p-2 mr-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Menu className="size-6" />
                    <span className="sr-only">Abrir menu</span>
                </button>
            </SheetTrigger>
            
            <SheetContent side="left" className="w-70 p-0 flex flex-col">
                <SheetHeader className="p-6 border-b text-left">
                    <SheetTitle className="flex items-center gap-4">
                        <WalletCards className="size-6 text-blue-700" />
                        <span className="text-xl font-semibold text-black">
                            TCGhub
                        </span>
                    </SheetTitle>
                </SheetHeader>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-2">
                        {navItems.map((item) => (
                            <li key={item.title}>
                                <Link
                                    href={item.url}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-gray-700  hover:bg-sky-600/10 hover:text-gray-900 transition-colors 
                                        ${path === item.url ? 'bg-sky-600/10' : ''}
                                    `}
                                >
                                    <item.icon className="size-5" />
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">        
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                {isUser ? (
                                    <AvatarAdmin /> 
                                ) : (
                                    <User size={18} />
                                )}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-gray-900">Thiago Medeiros</span>
                                <span className="truncate text-xs text-gray-500">thiago22@gmail.com</span>
                            </div>
                        </div>
                        <Link 
                            href="/"
                            title="Sair"
                            className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                        >
                            <LogOut size={18} />
                        </Link>
                        
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}