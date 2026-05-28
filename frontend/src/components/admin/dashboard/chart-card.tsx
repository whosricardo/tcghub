'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { smooth } from '@/motion/transitions'
import { Skeleton } from '@/components/ui/skeleton'

interface ChartCardProps {
    title: string
    description?: string
    isLoading?: boolean
    isError?: boolean
    errorText?: string
    headerActions?: React.ReactNode
    children: React.ReactNode
}

export function ChartCard({
    title,
    description,
    isLoading = false,
    isError = false,
    errorText = 'Ocorreu um erro ao carregar os dados.',
    headerActions,
    children,
}: ChartCardProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden h-full"
        >
            <div className="bg-gray-50 border-b border-b-gray-300 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <h3 className="font-semibold text-md text-black">{title}</h3>
                    {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
                </div>
                {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center min-h-[300px]">
                {!mounted || isLoading ? (
                    <div className="space-y-3 w-full p-2">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-[220px] w-full" />
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <span className="text-red-500 text-sm font-medium">{errorText}</span>
                    </div>
                ) : (
                    children
                )}
            </div>
        </motion.div>
    )
}
