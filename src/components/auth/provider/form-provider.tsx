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
                    `flex w-full h-full max-w-md flex-col justify-between p-2`,
                    className
                )}
            >
                <header className="flex flex-row justify-between">
                    <LogoLink />

                    {isLoginPage ? (
                        <div className="flex flex-col md:flex-row items-center justify-center gap-1 text-xs">
                            <div className="font-light text-gray-300">
                                Ainda não tem uma conta?
                            </div>
                            <Link
                                href={'/cadastro'}
                                className="cursor-pointer text-sky-600  hover:text-sky-700 transition-all ease-in-out delay-200 font-medium text-shadow-2xs"
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
                                className="cursor-pointer text-sky-600  hover:text-sky-700 transition-all ease-in-out delay-200 font-medium text-shadow-2xs"
                            >
                                Faça o Login
                            </Link>
                        </div>
                    )}
                </header>

                <section className="flex-1 py-8 flex flex-col justify-center">
                    {children}
                </section>
            </section>
        </>
    )
}
