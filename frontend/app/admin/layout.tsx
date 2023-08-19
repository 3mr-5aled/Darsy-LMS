import "@/app/globals.css"
import { WebsiteDetails } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AdminOnlyRoute from "@/components/Routes/AdminOnlyRoutes"
import AdminSideBar from "@/components/admin/AdminSideBar"

export const metadata = {
  title: WebsiteDetails.name,
  description: WebsiteDetails.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminOnlyRoute>
      <ToastContainer />

      <AdminSideBar children={children} />
    </AdminOnlyRoute>
  )
}
