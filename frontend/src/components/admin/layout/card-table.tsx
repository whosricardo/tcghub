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
import { useQueryCard } from '../hooks/useQueryCard'
import { useDeleteCard } from '../hooks/useDeleteCard'
import { useUpdateCard } from '../hooks/useUpdateCard'
import { CardSearchParams, CardProps } from '../services/getAllCardList'
import { Modal } from '@/shared/modal'

export function CardTable() {
    const [page, setPage] = useState(1)
    const limit = 10
    const [params, setParams] = useState<CardSearchParams>({})

    const { data, isLoading, isError, isFetching } = useQueryCard(
        params,
        page,
        limit
    )
    const deleteMutation = useDeleteCard()
    const patchMutation = useUpdateCard()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null)
    const [editDescription, setEditDescription] = useState('')

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [cardToDelete, setCardToDelete] = useState<CardProps | null>(null)

    const handleDelete = (id: string | number) => {
        deleteMutation.mutate(id)
    }

    const openEditModal = (card: CardProps) => {
        setSelectedCard(card)
        setEditDescription(card.description || '')
        setIsModalOpen(true)
    }

    const openDeleteModal = (card: CardProps) => {
        setCardToDelete(card)
        setIsDeleteModalOpen(true)
    }

    const handleSaveDescription = () => {
        if (selectedCard) {
            patchMutation.mutate(
                { id: selectedCard.id, description: editDescription },
                {
                    onSuccess: () => {
                        setIsModalOpen(false)
                        setSelectedCard(null)
                    },
                }
            )
        }
    }

    const handleConfirmDelete = () => {
        if (cardToDelete) {
            deleteMutation.mutate(cardToDelete.id, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false)
                    setCardToDelete(null)
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
                <p className="font-semibold text-md">Tabela de Cartas</p>
            </section>

            <section className="overflow-x-auto relative px-6 pt-6 pb-4">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>Nome</TableHead>
                            <TableHead>Coleção</TableHead>
                            <TableHead>Nº da Carta</TableHead>
                            <TableHead>Raridade</TableHead>
                            <TableHead>Tratamento</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Custo</TableHead>
                            <TableHead>Poder</TableHead>
                            <TableHead>Counter</TableHead>
                            <TableHead>Atributo</TableHead>
                            <TableHead>Cor</TableHead>
                            <TableHead>Subtipos</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.content?.map((card: any) => (
                            <TableRow
                                key={card.id}
                                className="whitespace-nowrap"
                            >
                                <TableCell className="font-medium">
                                    {card.name}
                                </TableCell>
                                <TableCell>{card.collection}</TableCell>
                                <TableCell>{card.cardNumber}</TableCell>
                                <TableCell>{card.rarity}</TableCell>
                                <TableCell>{card.treatment}</TableCell>
                                <TableCell>{card.cardType}</TableCell>
                                <TableCell>{card.cost}</TableCell>
                                <TableCell>{card.power}</TableCell>
                                <TableCell>{card.counter || '-'}</TableCell>
                                <TableCell>{card.combatAttribute}</TableCell>
                                <TableCell>{card.colors + ', '}</TableCell>
                                <TableCell
                                    className="max-w-62.5 truncate"
                                    title={card.subtypes}
                                >
                                    {card.subtypes}
                                </TableCell>
                                <TableCell
                                    className="max-w-62.5 truncate"
                                    title={card.description}
                                >
                                    {card.description}
                                </TableCell>

                                <TableCell className="flex justify-center gap-3">
                                    <button
                                        onClick={() => openEditModal(card)}
                                        className="text-sky-500 hover:text-sky-700 transition-colors"
                                        title="Editar Descrição"
                                    >
                                        <Pencil
                                            className="cursor-pointer"
                                            size={18}
                                        />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(card)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Deletar Carta"
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
                    Atualizar Descrição
                </h1>

                <div className="flex flex-col gap-4 w-full mt-2">
                    <p className="text-sm text-gray-500">
                        Editando:{' '}
                        <span className="font-medium text-sky-600">
                            {selectedCard?.name}
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
                            onClick={() => setIsModalOpen(false)}
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
                            Tem certeza que deseja deletar a carta{' '}
                            <span className="font-bold">
                                {cardToDelete?.name}
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
                                : 'Sim, deletar carta'}
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    )
}
