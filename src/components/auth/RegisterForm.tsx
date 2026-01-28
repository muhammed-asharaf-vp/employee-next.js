
"use client"

import { useState, useEffect, useRef } from "react"
import { registerApi } from "@/src/services/auth.service"
import { useRouter } from "next/navigation"
import Link from "next/link"
import gsap from "gsap"

export default function RegisterForm() {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // entrance animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
    )
  }, [])

  const submit = async () => {
  setError("")

  if (!form.name || !form.email || !form.password) {
    setError("All fields are required")
    return
  }

  if (!form.email.includes("@")) {
    setError("Please enter a valid email")
    return
  }

  if (form.password.length < 3) {
    setError("Password must be at least 3 characters")
    return
  }

  try {
    setLoading(true)
    await registerApi(form)
    router.push("/login")
  } catch (err: any) {
    setError(err.response?.data?.message || "Registration failed")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div
        ref={cardRef}
        className="w-full max-w-md rounded-2xl bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8"
      >
        {/* header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-black">
            Create account
          </h2>
          <p className="text-black/60 mt-1 text-sm">
            Get started in a few seconds
          </p>
        </div>

        {/* error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}

              {/* Name */}
              <div className="mb-5">
                <label className="text-sm text-black/70">Name</label>
                <input
        placeholder="Your full name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="
          mt-1 w-full rounded-xl border border-black/10
          px-4 py-2.5 text-black
          placeholder:text-black/40
          focus:outline-none focus:border-[#2563EB]
          focus:ring-2 focus:ring-[#2563EB]/20
        "
       />
        </div>
        
                {/* email */}
                <div className="mb-5">
                  <label className="text-sm text-black/70">Email</label>
                  <input
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="
            mt-1 w-full rounded-xl border border-black/10
            px-4 py-2.5 text-black
            placeholder:text-black/40
            focus:outline-none focus:border-[#2563EB]
            focus:ring-2 focus:ring-[#2563EB]/20
          "
        />
        
        </div>

        {/* password */}
        <div className="mb-7">
          <label className="text-sm text-black/70">Password</label>

                     <div className="relative mt-1">
                      <input
             type={showPassword ? "text" : "password"}
             placeholder="••••••••"
             value={form.password}
             onChange={(e) =>
               setForm({ ...form, password: e.target.value })
             }
             className="
               w-full rounded-xl border border-black/10
               px-4 py-2.5 pr-12 text-black
               placeholder:text-black/40
               focus:outline-none focus:border-[#2563EB]
               focus:ring-2 focus:ring-[#2563EB]/20
             "
           />


            {/* eye */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute inset-y-0 right-3 flex items-center
                text-black/50 hover:text-[#2563EB]
                transition-transform duration-150
                hover:scale-110 active:scale-95
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
            transition-all duration-300 hover:bg-[#1E4FD8]
            active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {/* footer */}
        <p className="mt-7 text-center text-sm text-black/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#2563EB] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
