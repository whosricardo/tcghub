import { create } from 'zustand';
import { AddressType, PaymentType } from '@/types/checkoutSchemas';

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

interface CheckoutState {
    step: number;
    address: AddressType | null;
    payment: PaymentType | null;
    submissionStatus: SubmissionStatus;
    error: string | null;
    orderId: number | null;
    
    // Actions
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    setAddress: (address: AddressType) => void;
    setPayment: (payment: PaymentType) => void;
    setSubmissionStatus: (status: SubmissionStatus) => void;
    setCheckoutSuccess: (orderId: number) => void;
    setCheckoutError: (errorMessage: string) => void;
    resetCheckout: () => void;
}

const initialCheckoutState = {
    step: 1,
    address: null,
    payment: null,
    submissionStatus: 'idle' as SubmissionStatus,
    error: null,
    orderId: null,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
    ...initialCheckoutState,

    setStep: (step) => set({ step: Math.min(Math.max(step, 1), 4) }),
    
    nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
    
    prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
    
    setAddress: (address) => set({ address }),
    
    setPayment: (payment) => set({ payment }),
    
    setSubmissionStatus: (submissionStatus) => set({ submissionStatus }),
    
    setCheckoutSuccess: (orderId) => set({ 
        submissionStatus: 'success', 
        orderId, 
        error: null 
    }),
    
    setCheckoutError: (error) => set({ 
        submissionStatus: 'error', 
        error 
    }),
    
    resetCheckout: () => set(initialCheckoutState),
}));
