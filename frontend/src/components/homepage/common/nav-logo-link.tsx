import { LandPlot } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils';

interface NavbarProps {
    className?: string; 
}

export function NavLogoLink({className}: NavbarProps) {
    return (
        <section className= { cn ("text-black" , className)}>
            <Link
                href={'/'}
                className="flex flex-row justify-center items-center gap-2 text-sm"
            >
                <LandPlot
                    size={30}
                    className=" text-white aspect-square bg-sky-600 shadow-2xl rounded-sm p-1 hover:bg-sky-700 hover:text-gray-300 transition-all ease-in-out delay-200"
                />
                <p className="text-lg text-shadow-sm font-semibold transition-all ease-in-out delay-200">
                    TCGhub
                </p>
            </Link>
        </section>
    )
}
