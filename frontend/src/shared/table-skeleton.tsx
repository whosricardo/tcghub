import { TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton' 

export default function TableSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className="h-4 w-12" /> 
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-48" /> 
            </TableCell>
        </TableRow>
    )
}