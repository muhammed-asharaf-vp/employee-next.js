import api from "./api"

export const registerApi = (data: {
  name: string
  email: string
  password: string
}) => api.post("/register", data)

export const loginApi = (data: {
  email: string
  password: string
}) => api.post("/login", data)
