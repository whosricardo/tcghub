import FormCadastro from '@/components/auth/layout/form-cadastro'
import { Formprovider } from '@/components/auth/provider/form-provider'

export default function Cadastro() {
    return (
        <section className="w-full h-full text-white">
            <Formprovider>
                <FormCadastro />
            </Formprovider>
        </section>
    )
}
