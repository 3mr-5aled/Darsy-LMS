import "@/app/globals.css"
import { AdminNavLinks, WebsiteDetails } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"
import AdminOnlyRoute from "@/components/AdminOnlyRoutes"
import DarkModeButton from "@/components/DarkModeButton"

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
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <div className="card bg-base-300">{children}</div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <div className="flex  flex-row justify-between items-center mb-5">
              <div className="text-2xl font-bold">{WebsiteDetails.name}</div>
              <DarkModeButton />
            </div>
            {/* Sidebar content here */}
            {AdminNavLinks.map((link) => (
              <li>
                <Link href={link.href} key={link.key}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminOnlyRoute>
  )
}
