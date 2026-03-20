import { UserTable } from "@/components/admin/layout/user-table";

export default function Users (){
    return (
        <section className="p-8 space-y-6">
            <header className="flex flex-col w-full">
                <h1>Gestão de usuários</h1>
                <h2>Visualize e gerencie os usuário do sistema</h2>
            </header>

            <section className="w-full flex justify-center items-center">
                <UserTable/>
            </section>
        </section>
    )
}