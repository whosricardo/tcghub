import FormLogin from '@/components/auth/layout/form-login'
import { Formprovider } from '@/components/auth/provider/form-provider'

export default function Login() {
    return (
        <section className="w-full h-full">
            <Formprovider>
                <FormLogin />
            </Formprovider>
        </section>
    )
}
