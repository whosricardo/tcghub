"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"
import { useEffect, useState } from "react"

export default function CartButton (){
    const { getItemCount } = useCartStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const itemCount = mounted ? getItemCount() : 0

    return (
        <Link href="/cart" className="relative cursor-pointer flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ShoppingCart size={24} className="text-gray-700 dark:text-gray-300" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-blue-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </Link>
    )
}