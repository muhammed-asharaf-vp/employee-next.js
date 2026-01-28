"use client"

import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthContextType } from "@/src/types/auth"

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  //  rehydrate token on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
    setLoading(false)
  }, [])

  //  login: save token to localStorage 
  const login = (token: string) => {
    localStorage.setItem("token", token)
  //  sessionStorage.setItem("token", token)
    setToken(token)
    router.replace("/departments")
  }

  // logout: clear token everywhere
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    router.replace("/login")
  }

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
