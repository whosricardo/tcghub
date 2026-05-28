'use client'

import { motion } from 'motion/react'
import { smooth } from '@/motion/transitions';
import { AnimatePresence } from 'motion/react';


interface ModalProps {
    isOpen: boolean;
    isClose: () => void;
    children?: React.ReactNode;
}

export function Modal ({isOpen , isClose, children} : ModalProps){

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section 
                    onClick={isClose} 
                    className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50"
                    initial={{opacity:0 ,  y: -50}}
                    animate={{opacity:1 , y: 0}}
                    exit={{opacity: 0 , y: 50}}
                    transition={{duration: 0.3}}
                >
                    <motion.section 
                        className="w-[95%] sm:w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 md:p-8 bg-gray-100 rounded-xl border border-gray-300 shadow-2xl z-60"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity:0}}
                        transition={smooth}
                        onClick={e => e.stopPropagation()}
                        >
                        
                        {children}
                    </motion.section>
                </motion.section>
            )}
        </AnimatePresence>
        
    )
}