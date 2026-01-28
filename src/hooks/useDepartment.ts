import { useEffect, useState } from "react"
import { getDepartments,deleteDepartment } from "@/src/services/department.service"
import { Department } from "@/src/types/department"

export const useDepartment = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(false)

  const fetchDepartments = async () => {
    setLoading(true)
    const res = await getDepartments()
    setDepartments(res.data)
    setLoading(false)
  }

  const removeDepartment = async (id: string) => {
    await deleteDepartment(id)
    setDepartments(prev => prev.filter(dep => dep._id !== id))
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  return { departments, loading, removeDepartment }
}
