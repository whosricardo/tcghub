'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface FilterInputProps {
    placeholder: string
    icon: LucideIcon
    value?: string | number
    onChange: (val: string) => void
    type?: string
    className?: string
}

export function FilterInput({
    placeholder,
    icon: Icon,
    value,
    onChange,
    type = 'text',
    className = '',
}: FilterInputProps) {
    return (
        <div className={`relative w-full ${className}`}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Icon size={16} />
            </span>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-gray-400 text-black outline-none"
            />
        </div>
    )
}
