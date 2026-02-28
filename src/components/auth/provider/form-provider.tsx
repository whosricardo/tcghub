'use client'

import { LogoLink } from '@/components/common/logo-link'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface FormproviderProps {
    children: React.ReactNode
    className?: string
}

export function Formprovider({ children, className }: FormproviderProps) {
    const pathName = usePathname()
    const isLoginPage = pathName === '/login'

    return (
        <>
            <section
                className={cn(
                    `flex w-full h-full max-w-md flex-col justify-between`,
                    className
                )}
            >
                <header className="flex flex-row justify-between">
                    <LogoLink />

                    {isLoginPage ? (
                        <div className="flex flex-row items-center justify-center gap-1 text-xs">
                            <div className="font-light text-gray-300">
                                Ainda não tem uma conta?
                            </div>
                            <Link
                                href={'/cadastro'}
                                className="cursor-pointer text-sky-600 font-medium text-shadow-2xs"
                            >
                                Cadastre-se
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center justify-center gap-1 text-xs">
                            <div className="font-light text-gray-300">
                                Já tem uma conta?
                            </div>
                            <Link
                                href={'/login'}
                                className="cursor-pointer text-sky-600 font-medium text-shadow-2xs"
                            >
                                Faça o Login
                            </Link>
                        </div>
                    )}
                </header>

                <section className="flex-1 py-8 flex flex-col justify-center">
                    {children}
                </section>

                <footer className="flex justify-center items-center pt-4 border-t border-zinc-800">
                    <p className="text-xs text-gray-300 font-light">
                        Desenvolvido por Lucas , Ricardo e Thiago :)
                    </p>
                </footer>
            </section>
        </>
    )
}
