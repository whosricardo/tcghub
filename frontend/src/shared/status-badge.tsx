import React from 'react';

type StatusType = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'APPROVED' | 'REJECTED' | 'REFUNDED' | string;

interface StatusBadgeProps {
    status: StatusType;
}

const statusColorMap: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    PAID: 'bg-blue-100 text-blue-800 border-blue-200',
    APPROVED: 'bg-blue-100 text-blue-800 border-blue-200',
    SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    DELIVERED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
    REFUNDED: 'bg-purple-100 text-purple-800 border-purple-200',
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const defaultColor = 'bg-gray-100 text-gray-800 border-gray-200';
    const colorClass = statusColorMap[status] || defaultColor;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
            {status}
        </span>
    );
}
