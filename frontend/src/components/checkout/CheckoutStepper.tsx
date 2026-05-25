"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { smooth } from '@/motion/transitions';
import { cn } from '@/lib/utils';

interface Step {
    number: number;
    title: string;
}

interface CheckoutStepperProps {
    currentStep: number;
}

const steps: Step[] = [
    { number: 1, title: 'Revisão' },
    { number: 2, title: 'Entrega' },
    { number: 3, title: 'Pagamento' },
    { number: 4, title: 'Confirmação' },
];

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
    const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

    return (
        <div className="w-full py-6 md:py-8">
            <div className="relative flex items-center justify-between w-full">
                {/* Progress bar background line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-gray-200 dark:bg-gray-800 rounded-full -z-10" />
                
                {/* Animated progress bar line */}
                <motion.div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-sky-600 rounded-full -z-10"
                    initial={{ width: '0%' }}
                    animate={{ width: progressWidth }}
                    transition={smooth}
                />

                {/* Steps circles */}
                {steps.map((step) => {
                    const isCompleted = currentStep > step.number;
                    const isActive = currentStep === step.number;

                    return (
                        <div key={step.number} className="flex flex-col items-center gap-2">
                            <motion.div
                                layout
                                className={cn(
                                    "flex items-center justify-center rounded-full font-semibold select-none border-2",
                                    "size-8 md:size-10 text-xs md:text-sm",
                                    isCompleted 
                                        ? "bg-sky-600 border-sky-600 text-white" 
                                        : isActive 
                                            ? "bg-white dark:bg-gray-900 border-sky-600 text-sky-600 shadow-[0_0_12px_rgba(2,132,199,0.3)]" 
                                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600"
                                )}
                                animate={isActive ? { scale: 1.1 } : { scale: 1.0 }}
                                transition={smooth}
                            >
                                {isCompleted ? (
                                    <Check className="size-4 md:size-5" strokeWidth={3} />
                                ) : (
                                    <span>{step.number}</span>
                                )}
                            </motion.div>
                            
                            <span 
                                className={cn(
                                    "text-[10px] md:text-xs font-bold uppercase tracking-wider text-center transition-colors duration-200",
                                    isActive 
                                        ? "text-sky-600" 
                                        : isCompleted 
                                            ? "text-gray-700 dark:text-gray-300 font-semibold" 
                                            : "text-gray-400 dark:text-gray-600"
                                )}
                            >
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
