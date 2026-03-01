import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Usercredentials = {
    userName: string | null
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
    resetStep: () => void
}

const initialUserState: Usercredentials = {
    userName: null,
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
