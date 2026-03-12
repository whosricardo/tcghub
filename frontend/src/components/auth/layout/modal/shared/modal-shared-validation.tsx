import { AnimatePresence, motion } from 'motion/react'
import { smooth } from '@/motion/transitions'

interface ModalSharedValidationProps {
    isClosed: () => void
    setStep: any
}

export function ModalSharedValidation({
    isClosed,
    setStep,
}: ModalSharedValidationProps) {
    return (
        <AnimatePresence>
            <motion.section
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={smooth}
            >
                <p>sasasaas</p>
            </motion.section>
        </AnimatePresence>
    )
}
