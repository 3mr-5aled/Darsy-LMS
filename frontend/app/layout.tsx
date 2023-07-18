import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { WebsiteDetails } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from "@/contexts/userContext"
import ClientOnlyRoute from "@/components/ClientOnlyRoute"

export const metadata = {
  title: WebsiteDetails.name,
  description: WebsiteDetails.description,
}

interface RootLayoutProps {
  children: React.ReactElement
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar">
      <body>
        <ToastContainer />
        <UserProvider>
          <ClientOnlyRoute>
            <Navbar />
          </ClientOnlyRoute>
          <main>{children}</main>
        </UserProvider>
        <ClientOnlyRoute>
          <Footer />
        </ClientOnlyRoute>
      </body>
    </html>
  )
}
