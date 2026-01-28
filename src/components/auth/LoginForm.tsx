
"use client"

import { useState, useEffect, useRef } from "react"
import { loginApi } from "@/src/services/auth.service"
import { useAuth } from "@/src/hooks/useAuth"
import Link from "next/link"
import gsap from "gsap"

export default function LoginForm() {
  const { login } = useAuth()

  const cardRef = useRef<HTMLDivElement>(null)
  const eyeRef = useRef<HTMLButtonElement>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // cardentrance
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
    )
  }, [])

  // eyetoggle
  const togglePassword = () => {
    setShowPassword((prev) => !prev)

    gsap.fromTo(
      eyeRef.current,
      { scale: 0.9 },
      { scale: 1, duration: 0.2, ease: "power2.out" }
    )
  }

  const submit = async () => {
    setError("")

    if (!email || !password) {
    setError("Email and password are required")
    return
  }

    try {
      setLoading(true)
      const res = await loginApi({ email, password })

      if (res.data?.token) {
        login(res.data.token)
      } else {
        setError("Invalid server response")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div
        ref={cardRef}
        className="w-full max-w-md rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8"
      >
        {/* header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-black">
            Welcome 
          </h2>
          <p className="text-black/60 mt-1 text-sm">
            Sign in to your account
          </p>
        </div>

        {/* error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        {/* email */}
        <div className="mb-5">
          <label className="text-sm text-black/70">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-black/10 px-4 py-2.5 text-black
                  focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              />
                </div>
        
                {/* password */}
                <div className="mb-7">
                  <label className="text-sm text-black/70">Password</label>
           <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 pr-12 text-black
              focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
             />
        
          {/* eye toggle */}
          <button
            ref={eyeRef}
            type="button"
            onClick={togglePassword}
            className="
              absolute inset-y-0 right-3
              flex items-center
              text-black/50 hover:text-[#2563EB]
              transition
            "
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        </div>

         {/* button */}
               <button
          onClick={submit}
          disabled={loading}
          className="w-full rounded-xl bg-[#2563EB] text-white py-2.5 font-medium
            transition-all duration-300 hover:bg-[#1E4FD8] active:scale-[0.98]
            disabled:opacity-60"
           >
          {loading ? "Signing in..." : "Sign in"}
           </button>

        {/* footer */}
        <p className="mt-7 text-center text-sm text-black/60">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-[#2563EB] font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
