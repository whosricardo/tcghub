import type{ Transition } from "motion"

// Snappy — buttons, toggles, small elements
export const snappy:Transition = { type: "spring", stiffness: 500, damping: 30 }

// Smooth — cards, panels, modals
export const smooth:Transition = { type: "spring", stiffness: 300, damping: 25 }

// Gentle — page transitions, large elements
export const gentle:Transition = { type: "spring", stiffness: 200, damping: 20 }

// Bouncy — playful UI, notifications, badges
export const bouncy:Transition = { type: "spring", stiffness: 400, damping: 15 }


// Maior rigidez = animação mais rápida
// Menor amortecimento = mais oscilação
// Taxa de amortecimento < 1 = irá ultrapassar o ponto morto (ressalto)
// Para evitar ressaltos , defina o amortecimento como ≥ 2 × √rigidez.