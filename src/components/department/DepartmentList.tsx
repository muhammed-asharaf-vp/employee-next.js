"use client"

import { useEffect, useState } from "react"
import { getDepartments,deleteDepartment } from "@/src/services/department.service"
import { useRouter } from "next/navigation"
import { Department } from "@/src/types/department"
import DepartmentCard from "./DepartmentCard"
import ConfirmModal from "@/src/components/common/ConfirmModal"
import Loader from "../common/Loader"

export default function DepartmentList() {
  const [data, setData] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const router = useRouter()

  /* fetch departments */
  const fetchDepartments = async () => {
    try {
      setLoading(true)
      const res = await getDepartments()
      setData(res.data)
      setError("")
    } catch {
      setError("Failed to load departments")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  /* trigger delete modal */
  const remove = (id: string) => {
    setDeleteId(id)
  }

  /* confirm delete */
  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      setDeleting(true)
      await deleteDepartment(deleteId)
      setData((prev) => prev.filter((d) => d._id !== deleteId))
    } catch {
      alert("Delete failed")
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  /* loading state */
  if (loading)
    return (
     <div className="py-10 text-center text-sm text-black/60">
  <Loader />
</div>

    )

  /* error state */
  if (error)
    return (
      <p className="py-10 text-center text-sm text-red-600">
        {error}
      </p>
    )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-#ffffff">
            Departments
          </h2>
          <p className="mt-1 text-sm text-#fff/60">
            Manage all company departments
          </p>
        </div>

        {/* add button */}
        <button
          onClick={() => router.push("/departments/add")}
          className="
            rounded-lg bg-[#2563EB]
            px-4 py-2 text-sm font-medium text-white
            transition-all duration-200
            hover:bg-[#1E4FD8]
            active:scale-95
          "
        >
          Add department
        </button>
      </div>

      {/* empty state */}
      {data.length === 0 ? (
        <div className="rounded-xl border border-black/10 bg-white p-10 text-center">
          <p className="text-sm text-black/60">
            No departments found.
          </p>
        </div>
      ) : (
        /* grid */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((dep) => (
            <DepartmentCard
              key={dep._id}
              department={dep}
              onDelete={remove}
              onView={(id) =>
                router.push(`/departments/${id}`)
              }
            />
          ))}
        </div>
      )}

      {/* delete confirmation modal */}
      {deleteId && (
        <ConfirmModal
          title="Delete Department"
          message="Are you sure you want to delete this department?"
          confirmText={deleting ? "Deleting..." : "Delete"}
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}
