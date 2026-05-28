import Link from "next/link"

export function RedirectButton (){
    return (
        <Link href="/marketplace" className="flex items-center justify-center w-60 h-14 bg-sky-600 hover:bg-[#005a9e] text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer">
            Visualizar Cartas
        </Link>
    )
}