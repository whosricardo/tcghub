'use client'

import { motion } from 'motion/react'
import { smooth } from '@/motion/transitions';
import { AnimatePresence } from 'motion/react';
import { ModalSharedEmail } from './shared/modal-shared-email';
import { useState } from 'react';
import { ModalSharedValidation } from './shared/modal-shared-validation';



interface ModalForgotPasswordProps {
    isOpen: boolean;
    isClose: () => void;
}

export function ModalForgotPassword ({isOpen , isClose} : ModalForgotPasswordProps){
    const [step , setStep] = useState(1);

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
                        className="w-full h-full p-8 lg:max-w-lg lg:max-h-[70vh] bg-gray-100 rounded-xl border border-gray-300 shadow-2xl z-60"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity:0}}
                        transition={smooth}
                        onClick={e => e.stopPropagation()}
                        >
                        
                        
                        {step === 1 && <ModalSharedEmail isClosed={isClose} setStep={setStep}/>}
                        {step === 2 && <ModalSharedValidation/> }
                        
                        

                    </motion.section>
                </motion.section>
            )}
        </AnimatePresence>
        
    )
}