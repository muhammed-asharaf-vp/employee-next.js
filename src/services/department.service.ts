import api from "./api"

export const getDepartments = () => api.get("/departments")

export const addDepartment = (data: {
  dept_name: string
  description: string
}) => api.post("/add-department", data)

export const getDepartment = (id: string) =>
  api.get(`/department/${id}`)

export const deleteDepartment = (id: string) =>
  api.delete(`/delete-department/${id}`)
