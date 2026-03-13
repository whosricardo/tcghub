'use client'

import { Logout } from "@/app/api/auth/logout/route"

export function LogoutButton() {
  return (
    <button 
      onClick={() => Logout()}
      className="className='text-accent-foreground hover:font-medium transition-all duration-200 ease-in-out cursor-pointer"
    >
      Sair
    </button>
  )
}