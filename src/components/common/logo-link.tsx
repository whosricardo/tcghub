import { LandPlot } from 'lucide-react'
import Link from 'next/link'

export function LogoLink() {
    return (
        <section>
            <Link
                href={'/'}
                className="flex flex-row justify-center items-center gap-2 text-sm"
            >
                <LandPlot
                    size={30}
                    className="aspect-square bg-sky-600 shadow-2xl rounded-sm p-1"
                />
                <p className="text-lg text-shadow-sm font-semibold">TCGhub</p>
            </Link>
        </section>
    )
}
