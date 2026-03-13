import Link from 'next/link'

export default function LoginButton (){
    return (
        <Link href={'/login'} className='text-accent-foreground hover:font-medium transition-all duration-200 ease-in-out cursor-pointer'>
            Entrar
        </Link>
    )
}