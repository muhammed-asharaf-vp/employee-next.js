"use client"

import { useState } from "react"
import { addDepartment } from "@/src/services/department.service"
import { useRouter } from "next/navigation"

export default function DepartmentForm() {
  const router = useRouter()

  const [dept_name, setName] = useState("")
  const [description, setDesc] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!dept_name || !description) return

    try {
      setLoading(true)
      await addDepartment({ dept_name, description })
      router.push("/departments")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      {/* card */}
      <div
        className="
          rounded-2xl bg-white
          border border-black/10
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          p-8
        "
      >
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black">
            Add department
          </h2>
          <p className="mt-1 text-sm text-black/60">
            Create a new department for your organization
          </p>
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-sm text-black/70">
            Department name
          </label>
          <input
            placeholder="e.g. Human Resources"
            value={dept_name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full rounded-xl border border-black/10
              px-4 py-2.5 text-black
              placeholder:text-black/40
              focus:outline-none focus:border-[#2563EB]
              focus:ring-2 focus:ring-[#2563EB]/20
            "
          />
        </div>

        <div className="mb-8">
          <label className="mb-1 block text-sm text-black/70">
            Description
          </label>
          <input
            placeholder="Short description about the department"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            className="
              w-full rounded-xl border border-black/10
              px-4 py-2.5 text-black
              placeholder:text-black/40
              focus:outline-none focus:border-[#2563EB]
              focus:ring-2 focus:ring-[#2563EB]/20
            "
          />
        </div>

        {/* actions */}
        <div className="flex justify-end gap-3">
          {/* cancel */}
          <button
            onClick={() => router.push("/departments")}
            className="
              rounded-lg border border-black/10
              px-4 py-2 text-sm font-medium
              text-black/70
              transition-all duration-200
              hover:border-black/30
              hover:text-black
            "
          >
            Cancel
          </button>

          {/* save */}
          <button
            onClick={submit}
            disabled={loading}
            className="
              rounded-lg bg-[#2563EB]
              px-5 py-2 text-sm font-medium text-white
              transition-all duration-200
              hover:bg-[#1E4FD8]
              active:scale-95
              disabled:opacity-60
            "
          >
            {loading ? "Saving..." : "Save department"}
          </button>
        </div>
      </div>
    </div>
  )
}
