'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { smooth } from '@/motion/transitions'
import { Spinner } from '@/components/ui/spinner'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Pagination } from '@/components/common/pagination'
import { 
    useQueryActiveListingsDetail, 
    useQueryAboveAvgCommissionSuppliers 
} from '@/hooks/useViews'
import { 
    ActiveListingDetailViewResponse, 
    AboveAvgCommissionSupplierViewResponse 
} from '@/types/api'
import { Search, Tag, User, Store, Mail, Percent, Box, AlertCircle } from 'lucide-react'

// Helper de debounce leve e de alta performance que evita renders no onChange enquanto o usuário digita
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// Função utilitária para renderizar badges de condição esteticamente atraentes
function getConditionBadge(condition: string) {
    const normalized = condition.toUpperCase().replace(/\s+/g, '_');
    
    let style = "bg-gray-100 text-gray-800 border-gray-200";
    let label = condition;

    switch (normalized) {
        case 'NEAR_MINT':
        case 'NM':
            style = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
            label = "Near Mint";
            break;
        case 'LIGHTLY_PLAYED':
        case 'LP':
            style = "bg-teal-50 text-teal-700 border-teal-200/60";
            label = "Lightly Played";
            break;
        case 'MODERATELY_PLAYED':
        case 'MP':
            style = "bg-amber-50 text-amber-700 border-amber-200/60";
            label = "Moderately Played";
            break;
        case 'HEAVILY_PLAYED':
        case 'HP':
            style = "bg-orange-50 text-orange-700 border-orange-200/60";
            label = "Heavily Played";
            break;
        case 'DAMAGED':
        case 'DMG':
            style = "bg-rose-50 text-rose-700 border-rose-200/60";
            label = "Damaged";
            break;
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
            {label}
        </span>
    );
}

// Função utilitária para renderizar badges de idioma
function getLanguageBadge(language: string) {
    const normalized = language.toUpperCase();
    
    let style = "bg-indigo-50 text-indigo-700 border-indigo-200/60";
    
    if (normalized === 'PORTUGUÊS' || normalized === 'PT') {
        style = "bg-blue-50 text-blue-700 border-blue-200/60";
    } else if (normalized === 'ENGLISH' || normalized === 'EN') {
        style = "bg-violet-50 text-violet-700 border-violet-200/60";
    } else if (normalized === 'JAPANESE' || normalized === 'JP') {
        style = "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/60";
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${style}`}>
            {language}
        </span>
    );
}

/**
 * Tabela da View 01: Detalhes de Anúncios Ativos (vw_active_listings_detail)
 */
export function ActiveListingsDetailTable() {
    // Filtros de Pesquisa consolidados
    const [filters, setFilters] = useState({ productName: '', supplierName: '', collection: '' });
    const [page, setPage] = useState(1);
    const limit = 5;

    // Callbacks debounced persistidos com useMemo para evitar re-criações durante re-renders
    const debouncedSetProductName = useMemo(() => 
        debounce((value: string) => {
            setFilters(prev => ({ ...prev, productName: value }));
            setPage(1); // Reinicia para a página 1 ao filtrar
        }, 500), 
    []);

    const debouncedSetSupplierName = useMemo(() => 
        debounce((value: string) => {
            setFilters(prev => ({ ...prev, supplierName: value }));
            setPage(1);
        }, 500), 
    []);

    const debouncedSetCollection = useMemo(() => 
        debounce((value: string) => {
            setFilters(prev => ({ ...prev, collection: value }));
            setPage(1);
        }, 500), 
    []);

    // A query agora se beneficia dos filtros centralizados e debounced
    const { data, isLoading, isError, isFetching } = useQueryActiveListingsDetail({
        productName: filters.productName || undefined,
        supplierName: filters.supplierName || undefined,
        collection: filters.collection || undefined
    });

    const paginatedData = useMemo(() => {
        if (!data) return [];
        const start = (page - 1) * limit;
        return data.slice(start, start + limit);
    }, [data, page]);

    const totalElements = data?.length || 0;
    const totalPages = Math.ceil(totalElements / limit) || 1;

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="flex flex-col gap-6"
        >
            {/* Seção de Filtros Reativos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/50 p-4 border border-gray-200 rounded-xl">
                {/* Produto (Uncontrolled Input + Debounced Callback) */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Search size={16} />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por produto..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        onChange={(e) => debouncedSetProductName(e.target.value)}
                    />
                </div>

                {/* Fornecedor (Uncontrolled Input + Debounced Callback) */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <User size={16} />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por fornecedor..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        onChange={(e) => debouncedSetSupplierName(e.target.value)}
                    />
                </div>

                {/* Coleção (Uncontrolled Input + Debounced Callback) */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Tag size={16} />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por coleção..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        onChange={(e) => debouncedSetCollection(e.target.value)}
                    />
                </div>
            </div>

            {/* Conteúdo da Tabela */}
            <section className="overflow-x-auto min-h-[300px] border border-gray-200 rounded-xl relative bg-white">
                <Table>
                    <TableHeader className="bg-gray-50/75">
                        <TableRow className="whitespace-nowrap">
                            <TableHead className="font-semibold text-gray-600">ID Anúncio</TableHead>
                            <TableHead className="font-semibold text-gray-600">Produto</TableHead>
                            <TableHead className="font-semibold text-gray-600">Coleção</TableHead>
                            <TableHead className="font-semibold text-gray-600">Fornecedor</TableHead>
                            <TableHead className="font-semibold text-gray-600">Preço</TableHead>
                            <TableHead className="font-semibold text-gray-600">Estoque Disp.</TableHead>
                            <TableHead className="font-semibold text-gray-600">Condição</TableHead>
                            <TableHead className="font-semibold text-gray-600">Idioma</TableHead>
                            <TableHead className="font-semibold text-gray-600 text-right">Comissão</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-48 text-center">
                                        <Spinner className="h-8 w-8 text-sky-600 mx-auto" />
                                        <p className="text-xs text-gray-400 mt-2">Consultando View SQL...</p>
                                    </TableCell>
                                </TableRow>
                            ) : isError ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-48 text-center text-red-500 font-medium">
                                        Erro ao carregar dados da View de Anúncios Ativos.
                                    </TableCell>
                                </TableRow>
                            ) : paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-48 text-center text-gray-400 text-sm">
                                        Nenhum anúncio ativo encontrado para os filtros informados.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((item: ActiveListingDetailViewResponse) => (
                                    <TableRow key={item.listingId} className="whitespace-nowrap hover:bg-gray-50/60 transition-colors">
                                        <TableCell className="font-medium text-gray-500">#{item.listingId}</TableCell>
                                        <TableCell className="font-semibold text-gray-900">{item.productName}</TableCell>
                                        <TableCell>{item.collection}</TableCell>
                                        <TableCell className="text-gray-700">{item.supplierName}</TableCell>
                                        <TableCell className="font-medium text-sky-600">R$ {item.currentPrice?.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`font-semibold ${item.availableQuantity < 5 ? 'text-amber-600' : 'text-gray-900'}`}>
                                                    {item.availableQuantity}
                                                </span>
                                                {item.availableQuantity < 5 && (
                                                    <span title="Estoque crítico!">
                                                        <AlertCircle size={14} className="text-amber-500" />
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getConditionBadge(item.itemCondition)}</TableCell>
                                        <TableCell>{getLanguageBadge(item.productLanguage)}</TableCell>
                                        <TableCell className="text-right font-medium text-gray-600">
                                            {(item.commissionRate * 100).toFixed(1)}%
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </section>

            {/* Seção de Paginação */}
            {!isLoading && !isError && totalPages > 1 && (
                <div className="mt-2 border-t border-t-gray-100 pt-4">
                    <Pagination
                        currentPage={page}
                        setPage={setPage}
                        limit={limit}
                        isFetching={isFetching}
                        data={paginatedData}
                        totalElements={totalElements}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </motion.section>
    )
}

/**
 * Tabela da View 02: Fornecedores com Comissão acima da Média (vw_above_avg_commission_suppliers)
 */
export function AboveAvgCommissionSuppliersTable() {
    // Filtro de Pesquisa por Loja
    const [storeNameFilter, setStoreNameFilter] = useState('');
    const [page, setPage] = useState(1);
    const limit = 5;

    // Callback debounced persistido com useMemo
    const debouncedSetStoreName = useMemo(() => 
        debounce((value: string) => {
            setStoreNameFilter(value);
            setPage(1);
        }, 500), 
    []);

    // Query enviando filtro de loja debounced
    const { data, isLoading, isError, isFetching } = useQueryAboveAvgCommissionSuppliers({
        storeName: storeNameFilter || undefined
    });

    const paginatedData = useMemo(() => {
        if (!data) return [];
        const start = (page - 1) * limit;
        return data.slice(start, start + limit);
    }, [data, page]);

    const totalElements = data?.length || 0;
    const totalPages = Math.ceil(totalElements / limit) || 1;

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="flex flex-col gap-6"
        >
            {/* Seção de Filtro (Uncontrolled Input + Debounced Callback) */}
            <div className="flex bg-gray-50/50 p-4 border border-gray-200 rounded-xl max-w-md">
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Store size={16} />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por nome da loja..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        onChange={(e) => debouncedSetStoreName(e.target.value)}
                    />
                </div>
            </div>

            {/* Conteúdo da Tabela */}
            <section className="overflow-x-auto min-h-[300px] border border-gray-200 rounded-xl relative bg-white">
                <Table>
                    <TableHeader className="bg-gray-50/75">
                        <TableRow className="whitespace-nowrap">
                            <TableHead className="font-semibold text-gray-600">ID Fornecedor</TableHead>
                            <TableHead className="font-semibold text-gray-600">Nome da Loja</TableHead>
                            <TableHead className="font-semibold text-gray-600">E-mail de Contato</TableHead>
                            <TableHead className="font-semibold text-gray-600">Taxa de Comissão</TableHead>
                            <TableHead className="font-semibold text-gray-600 text-right">Total Produtos Anunciados</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center">
                                        <Spinner className="h-8 w-8 text-sky-600 mx-auto" />
                                        <p className="text-xs text-gray-400 mt-2">Consultando View SQL...</p>
                                    </TableCell>
                                </TableRow>
                            ) : isError ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-red-500 font-medium">
                                        Erro ao carregar dados da View de Fornecedores.
                                    </TableCell>
                                </TableRow>
                            ) : paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-gray-400 text-sm">
                                        Nenhum fornecedor acima da média geral encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((item: AboveAvgCommissionSupplierViewResponse) => (
                                    <TableRow key={item.supplierId} className="whitespace-nowrap hover:bg-gray-50/60 transition-colors">
                                        <TableCell className="font-medium text-gray-500">#{item.supplierId}</TableCell>
                                        <TableCell className="font-bold text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <Store size={15} className="text-sky-600 shrink-0" />
                                                {item.storeName}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-700">
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={13} className="text-gray-400" />
                                                <span>{item.contactEmail}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold text-emerald-600">
                                            <div className="flex items-center gap-1">
                                                <Percent size={13} />
                                                <span>{(item.commissionRate * 100).toFixed(1)}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center gap-1.5 justify-end">
                                                <Box size={14} className="text-gray-400" />
                                                <span className="font-bold text-gray-900">{item.totalProductsListed}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </section>

            {/* Seção de Paginação */}
            {!isLoading && !isError && totalPages > 1 && (
                <div className="mt-2 border-t border-t-gray-100 pt-4">
                    <Pagination
                        currentPage={page}
                        setPage={setPage}
                        limit={limit}
                        isFetching={isFetching}
                        data={paginatedData}
                        totalElements={totalElements}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </motion.section>
    )
}
