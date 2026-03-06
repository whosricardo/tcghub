import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Usercredentials = {
    username: string | null
    email: string | null
    password: string | null
}

interface AuthProps {
    user: Usercredentials
    currentRegisterStep: number
    updateUserCredentials: (credentials: Partial<Usercredentials>) => void
    resetUser: () => void
    incrementStep: () => void
    decrementStep: () => void
    setStep: (step: number) => void
    resetStep: () => void
}

const initialUserState: Usercredentials = {
    username: null,
    email: null,
    password: null,
}

const initialStepState: number = 1

export const useAuth = create<AuthProps>()(
    persist(
        (set) => ({
            user: initialUserState,
            currentRegisterStep: 1,

            updateUserCredentials: (credentials) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        ...credentials,
                    },
                })),

            resetUser: () =>
                set(() => ({
                    user: initialUserState,
                })),

            incrementStep: () =>
                set((state) => ({
                    currentRegisterStep: state.currentRegisterStep + 1,
                })),

            decrementStep: () =>
                set((state) => ({
                    currentRegisterStep: state.currentRegisterStep - 1,
                })),

            setStep: (step) =>
                set(() => ({
                    currentRegisterStep: step,
                })),

            resetStep: () =>
                set(() => ({
                    currentRegisterStep: initialStepState,
                })),
        }),
        {
            name: 'register-auth-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
