import Image from 'next/image'
import BackgroundImage from '../../../public/background2.png'

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex h-screen w-full overflow-hidden bg-slate-950">
            <section className="relative hidden lg:block lg:w-[65%] h-full">
                <Image
                    fill
                    src={BackgroundImage}
                    className="object-cover object-center"
                    alt="Imagem da carta do luffy gear 4"
                    sizes="(min-width: 1024px) 65vw, 100vw"
                    quality={100}
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-20"></div>
            </section>

            <section className="flex w-full lg:w-[35%] flex-col items-center justify-center p-8 md:p-6 lg:p-10">
                <div className="w-full max-w-md h-full mx-auto">{children}</div>
            </section>
        </main>
    )
}
