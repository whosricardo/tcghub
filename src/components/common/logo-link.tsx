import { LandPlot } from 'lucide-react'
import Link from 'next/link'

export function LogoLink() {
    return (
        <section className="text-white">
            <Link
                href={'/'}
                className="flex flex-row justify-center items-center gap-2 text-sm"
            >
                <LandPlot
                    size={30}
                    className="aspect-square bg-sky-600 shadow-2xl rounded-sm p-1  hover:bg-sky-700 hover:text-gray-300 transition-all ease-in-out delay-200"
                />
                <p className="text-lg text-shadow-sm font-semibold hover:text-gray-200 transition-all ease-in-out delay-200">
                    TCGhub
                </p>
            </Link>
        </section>
    )
}
