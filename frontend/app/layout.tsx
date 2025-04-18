import "./globals.css"
import Navbar from "@/components/Nav/Navbar"
import Footer from "@/components/Nav/Footer"
import { Owner } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from "@/contexts/userContext"
import ClientOnlyRoute from "@/components/Routes/ClientOnlyRoute"
import { Suspense } from "react"
import Loading from "./loading"
import FetchUserOnLoad from "@/components/Features/FetchUserOnLoad"
import TawkToWidget from "@/components/Features/TawkToWidget"
import TawkOnlyRoute from "@/components/Routes/TawkOnlyRoute"

export const metadata = {
  title: Owner.WebsiteDetails.name,
  description: Owner.WebsiteDetails.description,
}

interface RootLayoutProps {
  children: React.ReactElement
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar">
      <body>
        <TawkOnlyRoute>
          <TawkToWidget />
        </TawkOnlyRoute>
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
