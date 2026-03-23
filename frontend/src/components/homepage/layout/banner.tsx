import Image from 'next/image'
import bannerImage from '../../../../public/bannerImage.jpeg'
import { RedirectButton } from '../common/redirect-button'
import { ScrollButton } from '../common/scroll-button'

export default function Banner() {
    return (
        <section className="relative w-full h-[85dvh] bg-gray-500 overflow-hidden">
            <Image
                src={bannerImage}
                fill
                className="object-cover object-[20%_30%]"
                alt="OP15 one piece"
                quality={75}
                priority
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-black opacity-70"></div>

            <section className="relative z-10 flex w-full h-full max-w-7xl mx-auto px-6 md:px-12">
                <section className="flex flex-col justify-center w-full  md:w-[65vw] text-white gap-5">
                    <h2 className="text-5xl break-after-all w-[70%] font-bold text-shadow-lg">
                        Conjunto Sensação do Momento <span className='font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#0070c9] to-[#60a5fa]'>Chegou!</span>
                    </h2>
                    <p className='break-after-all w-[70%] text-[#D1D5DB]'>
                        Garanta os boosters e displays que estão definindo o
                        meta atual. Não fique para trás na corrida pelo One
                        Piece.
                    </p>
                    
                    <section className='flex flex-row items-center gap-4 mt-4'>
                        <RedirectButton/>
                        <ScrollButton/>
                    </section>
                </section>

                <section></section>
            </section>
        </section>
    )
}
