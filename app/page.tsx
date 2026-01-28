"use client"

import { useEffect } from "react"
import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/navigation"
import Loader from "@/src/components/common/Loader"

export default function HomePage() {
  const { token, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (token) {
      router.replace("/departments")
    } else {
      router.replace("/login")
    }
  }, [token, loading, router])
  return <Loader/>
}
