export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthContextType {
  token: string | null
  loading: boolean
  login: (token: string) => void
  logout: () => void
}

