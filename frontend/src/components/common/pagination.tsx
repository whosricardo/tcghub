import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePagination } from '../../hooks/use-pagination' 

interface PaginationProps {
    currentPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: any; 
    limit?: number;
    isFetching?: boolean;
    totalElements: number;
    totalPages: number;
}

export function Pagination({ currentPage, setPage, limit = 10, isFetching, totalElements, totalPages }: PaginationProps) {

    const { startItem, endItem } = usePagination({ 
        totalElements, 
        page: currentPage, 
        limit 
    })
    
    return (
        <section className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <section className="text-sm text-gray-500">
                Mostrando{' '}
                <span className="font-medium text-gray-900">{startItem}</span>{' '}
                de <span className="font-medium text-gray-900">{endItem}</span>{' '}
                de{' '}
                <span className="font-medium text-gray-900">
                    {totalElements}
                </span>{' '}
                usuários
            </section>

            <section className="flex items-center gap-1">
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={currentPage === 1 || isFetching} 
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={16} />
                </button>
                
                {Array.from(
                    { length: Math.min(3, totalPages) },
                    (_, i) => i + 1
                ).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                                ${
                                    currentPage === pageNum 
                                        ? 'bg-sky-100 text-sky-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }
                            `}
                    >
                        {pageNum}
                    </button>
                ))}

                {totalPages > 3 && (
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400 tracking-widest">
                        ...
                    </span>
                )}

                {totalPages > 3 && (
                    <button
                        onClick={() => setPage(totalPages)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                                ${
                                    currentPage === totalPages 
                                        ? 'bg-sky-100 text-sky-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }
                            `}
                    >
                        {totalPages}
                    </button>
                )}

                <button
                    onClick={() => setPage((old) => old + 1)}
                    disabled={currentPage === totalPages || isFetching} 
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={16} />
                </button>
            </section>
        </section>
    )
}