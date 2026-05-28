'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import bannerImage from '../../../../public/bannerImage.jpeg'
import { RedirectButton } from '../common/redirect-button'
import { ScrollButton } from '../common/scroll-button'
import { Volume2, VolumeX } from 'lucide-react'

export default function Banner() {
    const [isHovered, setIsHovered] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [videoUrl, setVideoUrl] = useState('')
    const videoRef = useRef<HTMLVideoElement>(null)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const storedMute = localStorage.getItem('tcghub-banner-muted')
        if (storedMute !== null) {
            setIsMuted(storedMute === 'true')
        } else {
            setIsMuted(true)
        }
    }, [])

    useEffect(() => {
        const fetchAnimeOpening = async () => {
            try {
                const params = new URLSearchParams({
                    'filter[name]': 'One Piece',
                    'include': 'images,animethemes.animethemeentries.videos',
                })
                const res = await fetch(`https://api.animethemes.moe/anime?${params.toString()}`)
                if (!res.ok) return
                
                const json = await res.json()
                const animeList = json.anime || json.data || []
                const anime = animeList[0]
                if (!anime) return

                let link = ''
                const op15 = anime.animethemes?.find((t: any) => t.slug === 'OP15')
                if (op15) {
                    link = op15.animethemeentries?.[0]?.videos?.[0]?.link || ''
                }

                if (!link) {
                    link = anime.animethemes
                        ?.flatMap((theme: any) => theme.animethemeentries || [])
                        ?.flatMap((entry: any) => entry.videos || [])
                        ?.find((video: any) => video.link)?.link || ''
                }

                if (link) {
                    setVideoUrl(link)
                }
            } catch (err) {
                console.error('Erro ao buscar abertura de anime:', err)
            }
        }

        fetchAnimeOpening()
    }, [])

    useEffect(() => {
        const videoElement = videoRef.current
        if (!videoElement) return

        if (isHovered && videoUrl) {
            videoElement.play().catch((err) => {
                console.warn('Autoplay bloqueado pelo navegador:', err)
            })
        } else {
            videoElement.pause()
            videoElement.currentTime = 0
        }
    }, [isHovered, videoUrl])

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }
        }
    }, [])

    const handleMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(true)
        }, 2000)
    }

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
        }
        setIsHovered(false)
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newMutedState = !isMuted
        setIsMuted(newMutedState)
        localStorage.setItem('tcghub-banner-muted', String(newMutedState))
    }

    return (
        <section 
            className="relative w-full h-[92dvh] bg-gray-900 overflow-hidden group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image
                src={bannerImage}
                fill
                className={`object-cover object-[20%_30%] transition-opacity duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHovered && videoUrl ? 'opacity-20' : 'opacity-100'
                }`}
                alt="OP15 one piece"
                quality={75}
                priority
                sizes="100vw"
            />
            
            <div className={`absolute inset-0 transition-all duration-2000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered && videoUrl ? 'bg-black/85' : 'bg-black/60'
            }`}></div>

            {videoUrl && (
                <video
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isHovered ? 'opacity-65' : 'opacity-0 pointer-events-none'
                    }`}
                    src={videoUrl}
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                />
            )}

            <section className="relative z-10 flex w-full h-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">
                <section className="flex flex-col justify-center w-full md:w-[65vw] text-white gap-5 pointer-events-auto">
                    <h2 className={`text-5xl break-after-all w-[70%] font-bold leading-tight transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isHovered && videoUrl
                            ? 'scale-[1.02] origin-left text-white drop-shadow-[0_4px_20px_rgba(96,165,250,0.7)] text-shadow-none'
                            : 'text-white text-shadow-lg'
                    }`}>
                        Conjunto Sensação do Momento{' '}
                        <span className={`font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#0070c9] to-[#60a5fa] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered && videoUrl ? 'brightness-125 saturate-200' : ''
                        }`}>
                            Chegou!
                        </span>
                    </h2>

                    <p className={`break-after-all w-[70%] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] leading-relaxed ${
                        isHovered && videoUrl 
                            ? 'text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]' 
                            : 'text-[#D1D5DB]'
                    }`}>
                        Garanta os boosters e displays que estão definindo o
                        meta atual. Não fique para trás na corrida pelo One
                        Piece.
                    </p>
                    
                    <section className="flex flex-row items-center gap-4 mt-4">
                        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered && videoUrl ? 'scale-[1.04] drop-shadow-[0_0_20px_rgba(2,132,199,0.85)]' : ''
                        }`}>
                            <RedirectButton />
                        </div>
                        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered && videoUrl ? 'scale-[1.04] drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]' : ''
                        }`}>
                            <ScrollButton />
                        </div>
                    </section>
                </section>
            </section>

            <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 z-30 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center pointer-events-auto animate-in fade-in zoom-in duration-300"
                title={isMuted ? 'Ativar som' : 'Mutar som'}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </section>
    )
}
