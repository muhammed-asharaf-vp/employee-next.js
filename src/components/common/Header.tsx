
"use client"

import { useState } from "react"
import { useAuth } from "@/src/hooks/useAuth"
import LogoutModal from "@/src/components/common/LogoutModal"

export default function Header() {
  const { token, logout } = useAuth()
  const [showModal, setShowModal] = useState(false)

  // show header only if logged in
  if (!token) return null

  return (
    <>
      <header className="w-full border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">
            Employee App
          </h3>
          <button
            onClick={() => setShowModal(true)}
            className="
              rounded-lg border border-black/10 px-4 py-1.5
              text-sm font-medium text-black/70
              transition-all duration-200
              hover:border-[#2563EB]
              hover:text-[#2563EB]
              active:scale-95
            "
          >
            Logout
          </button>
        </div>
      </header>

      {showModal && (
        <LogoutModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false)
            logout()
          }}
        />
      )}
    </>
  )
}
