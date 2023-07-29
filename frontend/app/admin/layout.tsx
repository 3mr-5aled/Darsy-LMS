import "@/app/globals.css"
import { AdminNavLinks, WebsiteDetails } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"
import AdminOnlyRoute from "@/components/AdminOnlyRoutes"
import DarkModeButton from "@/components/DarkModeButton"
import {
  BsPeople,
  BsPlusCircle,
  BsStack,
  BsHouseDoorFill,
} from "react-icons/bs"

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
          <ul className="h-full p-4 menu w-80 bg-base-200 text-base-content">
            <div className="flex flex-row items-center justify-between mb-5">
              <div className="text-2xl font-bold">
                <Link href="/">{WebsiteDetails.name}</Link>
              </div>
              <DarkModeButton />
            </div>
            {/* Sidebar content here */}
            {AdminNavLinks.map((link) => (
              <li>
                <Link
                  href={link.href}
                  key={link.key}
                  className="flex flex-row gap-3"
                >
                  <link.icon />
                  <span>{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* <div className="p-4">
            <UserComponent />
          </div> */}
        </div>
      </div>
    </AdminOnlyRoute>
  )
}
