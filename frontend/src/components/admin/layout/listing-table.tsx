'use client'

import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { AlertTriangle, Pencil, Trash2 } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Pagination } from '@/components/common/pagination'
import { useQueryListings } from '../hooks/useQueryListings'
import { useDeleteListing } from '../hooks/useDeleteListing'
import { useUpdateListing } from '../hooks/useUpdateListing'
import { ListingResponse } from '@/types/api'
import { Modal } from '@/shared/modal'

export function ListingTable() {
    const [page, setPage] = useState(1)
    const limit = 10

    const { data, isLoading, isError, isFetching } = useQueryListings(
        page,
        limit
    )
    const deleteMutation = useDeleteListing()
    const patchMutation = useUpdateListing()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedListing, setSelectedListing] = useState<ListingResponse | null>(null)
    const [editPrice, setEditPrice] = useState<number>(0)
    const [editQuantity, setEditQuantity] = useState<number>(0)
    const [editCondition, setEditCondition] = useState<string>('')
    const [editLanguage, setEditLanguage] = useState<string>('')

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [listingToDelete, setListingToDelete] = useState<ListingResponse | null>(null)

    const openEditModal = (listing: ListingResponse) => {
        setSelectedListing(listing)
        setEditPrice(listing.currentPrice)
        setEditQuantity(listing.availableQuantity)
        setEditCondition(listing.itemCondition)
        setEditLanguage(listing.productLanguage)
        setIsModalOpen(true)
    }

    const openDeleteModal = (listing: ListingResponse) => {
        setListingToDelete(listing)
        setIsDeleteModalOpen(true)
    }

    const handleSaveListing = () => {
        if (selectedListing) {
            patchMutation.mutate(
                {
                    id: selectedListing.id,
                    data: {
                        currentPrice: Number(editPrice),
                        availableQuantity: Number(editQuantity),
                        itemCondition: editCondition,
                        productLanguage: editLanguage,
                    }
                },
                {
                    onSuccess: () => {
                        setIsModalOpen(false)
                        setSelectedListing(null)
                    },
                }
            )
        }
    }

    const handleConfirmDelete = () => {
        if (listingToDelete) {
            deleteMutation.mutate(listingToDelete.id, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false)
                    setListingToDelete(null)
                },
            })
        }
    }

    if (isLoading)
        return <Spinner className="h-15 w-15 text-sky-600 mx-auto mt-10" />

    if (isError)
        return (
            <section className="text-sm text-red-500 p-4">
                Erro ao carregar dados dos anúncios
            </section>
        )

    if (!data || data.content.length === 0) {
        return (
            <section className="text-sm text-gray-400 p-4">
                Sem anúncios cadastrados no momento. Adicione um!
            </section>
        )
    }

    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm relative">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                <p className="font-semibold text-md">Tabela de Anúncios</p>
            </section>

            <section className="overflow-x-auto relative px-6 pt-6 pb-4">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>ID</TableHead>
                            <TableHead>Carta (ID)</TableHead>
                            <TableHead>Fornecedor (ID)</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Condição</TableHead>
                            <TableHead>Idioma</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.content?.map((listing: ListingResponse) => (
                            <TableRow
                                key={listing.id}
                                className="whitespace-nowrap"
                            >
                                <TableCell className="font-medium">
                                    #{listing.id}
                                </TableCell>
                                <TableCell>#{listing.productId}</TableCell>
                                <TableCell>#{listing.supplierId}</TableCell>
                                <TableCell>{listing.availableQuantity}</TableCell>
                                <TableCell>R$ {listing.currentPrice.toFixed(2)}</TableCell>
                                <TableCell>{listing.itemCondition}</TableCell>
                                <TableCell>{listing.productLanguage}</TableCell>

                                <TableCell className="flex justify-center gap-3">
                                    <button
                                        onClick={() => openEditModal(listing)}
                                        className="text-sky-500 hover:text-sky-700 transition-colors"
                                        title="Editar Anúncio"
                                    >
                                        <Pencil
                                            className="cursor-pointer"
                                            size={18}
                                        />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(listing)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Deletar Anúncio"
                                        disabled={deleteMutation.isPending}
                                    >
                                        <Trash2
                                            className="cursor-pointer"
                                            size={18}
                                        />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            <section className="flex justify-end p-4 border-t border-t-gray-100">
                <Pagination
                    currentPage={page}
                    setPage={setPage}
                    limit={limit}
                    isFetching={isFetching}
                    data={data}
                    totalElements={data?.totalElements || 0}
                    totalPages={data?.totalPages || 1}
                />
            </section>

            <Modal isOpen={isModalOpen} isClose={() => setIsModalOpen(false)}>
                <h1 className="text-xl font-semibold pb-2">
                    Atualizar Anúncio
                </h1>

                <div className="flex flex-col gap-4 w-full mt-2">
                    <p className="text-sm text-gray-500">
                        Editando anúncio:{' '}
                        <span className="font-medium text-sky-600">
                            #{selectedListing?.id}
                        </span>{' '}
                        para Carta ID:{' '}
                        <span className="font-medium text-sky-600">
                            #{selectedListing?.productId}
                        </span>
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Preço (R$)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Quantidade</label>
                            <input
                                type="number"
                                min="0"
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Condição</label>
                            <select
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={editCondition}
                                onChange={(e) => setEditCondition(e.target.value)}
                            >
                                <option value="NEAR_MINT">Near Mint</option>
                                <option value="LIGHTLY_PLAYED">Lightly Played</option>
                                <option value="MODERATELY_PLAYED">Moderately Played</option>
                                <option value="HEAVILY_PLAYED">Heavily Played</option>
                                <option value="DAMAGED">Damaged</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Idioma</label>
                            <select
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={editLanguage}
                                onChange={(e) => setEditLanguage(e.target.value)}
                            >
                                <option value="PORTUGUÊS">Português</option>
                                <option value="ENGLISH">English</option>
                                <option value="JAPANESE">Japanese</option>
                                <option value="KOREAN">Korean</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            disabled={patchMutation.isPending}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveListing}
                            className="px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors flex items-center gap-2"
                            disabled={patchMutation.isPending}
                        >
                            {patchMutation.isPending
                                ? 'Salvando...'
                                : 'Confirmar'}
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                isClose={() => setIsDeleteModalOpen(false)}
            >
                <div className="flex items-center gap-2 pb-2 text-red-600">
                    <AlertTriangle size={24} />
                    <h1 className="text-xl font-semibold">
                        Confirmar Exclusão
                    </h1>
                </div>

                <div className="flex h-full justify-around flex-col gap-4 w-full mt-2">
                    <section className='flex flex-col'>
                        <p className="text-gray-700">
                            Tem certeza que deseja deletar o anúncio{' '}
                            <span className="font-bold">
                                #{listingToDelete?.id}
                            </span>
                            ?
                        </p>
                        <p className="text-sm text-gray-500">
                            Esta ação não poderá ser desfeita.
                        </p>
                    </section>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            disabled={deleteMutation.isPending}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2"
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending
                                ? 'Deletando...'
                                : 'Sim, deletar anúncio'}
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    )
}
