import "./globals.css"
import Navbar from "@/components/Nav/Navbar"
import Footer from "@/components/Nav/Footer"
import { WebsiteDetails } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from "@/contexts/userContext"
import ClientOnlyRoute from "@/components/Routes/ClientOnlyRoute"
import { Suspense } from "react"
import Loading from "./loading"
import FetchUserOnLoad from "@/components/Features/FetchUserOnLoad"

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
          <Suspense fallback={<Loading />}>
            <main>{children}</main>
          </Suspense>
          <FetchUserOnLoad />
        </UserProvider>
        <ClientOnlyRoute>
          <Footer />
        </ClientOnlyRoute>
      </body>
    </html>
  )
}
