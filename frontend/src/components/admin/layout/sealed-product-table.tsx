'use client'

import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { Pencil, Trash2, AlertTriangle } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Pagination } from '@/components/common/pagination'

import { useQuerySealedProduct } from '../hooks/useQuerySealedProduct'
import { useUpdateSealedProducts } from '../hooks/useUpdateSealedProducts'
import { useDeleteSealedProduct } from '../hooks/useDeleteSealedProduct'
import {
    SealedProductSearchParams,
    SealedProductProps,
} from '../services/getAllSealedProduct'
import { Modal } from '@/shared/modal'

export function SealedProductTable() {
    const [page, setPage] = useState(1)
    const limit = 10

    const [params, setParams] = useState<SealedProductSearchParams>({})

    const { data, isLoading, isError, isFetching } = useQuerySealedProduct(
        params,
        page,
        limit
    )
    const deleteMutation = useDeleteSealedProduct()
    const patchMutation = useUpdateSealedProducts()

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] =
        useState<SealedProductProps | null>(null)
    const [editDescription, setEditDescription] = useState('')

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [productToDelete, setProductToDelete] =
        useState<SealedProductProps | null>(null)

    const openEditModal = (product: SealedProductProps) => {
        setSelectedProduct(product)
        setEditDescription(product.description || '')
        setIsEditModalOpen(true)
    }

    const handleSaveDescription = () => {
        if (selectedProduct) {
            patchMutation.mutate(
                { id: selectedProduct.id, description: editDescription },
                {
                    onSuccess: () => {
                        setIsEditModalOpen(false)
                        setSelectedProduct(null)
                    },
                }
            )
        }
    }

    const openDeleteModal = (product: SealedProductProps) => {
        setProductToDelete(product)
        setIsDeleteModalOpen(true)
    }

    const handleConfirmDelete = () => {
        if (productToDelete) {
            deleteMutation.mutate(productToDelete.id, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false)
                    setProductToDelete(null)
                },
            })
        }
    }

    if (isLoading)
        return <Spinner className="h-15 w-15 text-sky-600 mx-auto mt-10" />

    if (isError)
        return (
            <section className="text-sm text-red-500 p-4">
                Erro ao carregar dados
            </section>
        )

    if (!data || data.content.length === 0) {
        return (
            <section className="text-sm text-gray-400 p-4">
                Sem dados no momento, adicione!
            </section>
        )
    }

    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm relative">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                <p className="font-semibold text-md">
                    Tabela de Produtos Selados
                </p>
            </section>

            <section className="overflow-x-auto relative px-6 pt-6 pb-4">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>Nome</TableHead>
                            <TableHead>Coleção</TableHead>
                            <TableHead>Tipo de Selado</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.content?.map((product: SealedProductProps) => (
                            <TableRow
                                key={product.id}
                                className="whitespace-nowrap"
                            >
                                <TableCell className="font-medium">
                                    {product.name}
                                </TableCell>
                                <TableCell>{product.collection}</TableCell>
                                <TableCell>
                                    {product.sealedType || '-'}
                                </TableCell>
                                <TableCell
                                    className="max-w-62.5 truncate"
                                    title={product.description}
                                >
                                    {product.description}
                                </TableCell>

                                <TableCell className="flex justify-center gap-3">
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="text-sky-500 hover:text-sky-700 transition-colors"
                                        title="Editar Descrição"
                                    >
                                        <Pencil
                                            className="cursor-pointer"
                                            size={18}
                                        />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(product)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Deletar Produto"
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

            <Modal
                isOpen={isEditModalOpen}
                isClose={() => setIsEditModalOpen(false)}
            >
                <h1 className="text-xl font-semibold pb-2">
                    Atualizar Descrição
                </h1>

                <div className="flex flex-col gap-4 w-full mt-2">
                    <p className="text-sm text-gray-500">
                        Editando:{' '}
                        <span className="font-medium text-sky-600">
                            {selectedProduct?.name}
                        </span>
                    </p>

                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none h-32"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Insira a nova descrição aqui..."
                    />

                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            disabled={patchMutation.isPending}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveDescription}
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
                            Tem certeza que deseja deletar o produto selado{' '}
                            <span className="font-bold">
                                {productToDelete?.name}
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
                                : 'Sim, deletar produto'}
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    )
}
