import "@/app/globals.css"
import { WebsiteDetails } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AdminOnlyRoute from "@/components/AdminOnlyRoutes"
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
      <div className="drawer lg:drawer-open">
        <input
          title="toggler"
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="flex flex-col items-center justify-center drawer-content">
          <div className="w-11/12 m-5 card bg-base-300">
            <label
              htmlFor="my-drawer-2"
              className="lg:hidden btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            {children}
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <AdminSideBar />
        </div>
      </div>
    </AdminOnlyRoute>
  )
}
