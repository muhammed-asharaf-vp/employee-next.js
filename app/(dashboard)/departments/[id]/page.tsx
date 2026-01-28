"use client"

import { useEffect, useState } from "react"
import { getDepartment } from "@/src/services/department.service"

export default function DepartmentPage({ params }: { params: { id: string } }) {
  const [dept, setDept] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getDepartment(params.id)
      .then(res => setDept(res.data))
      .catch(() => setError("Failed to load department"))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>
  if (!dept) return <p>Department not found</p>

  return (
    <div>
      <h2>{dept.dept_name}</h2>
      <p>{dept.description}</p>
    </div>
  )
}
