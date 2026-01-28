import "./globals.css"
import Header from "@/src/components/common/Header"
import { AuthProvider } from "@/src/context/AuthContext"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
