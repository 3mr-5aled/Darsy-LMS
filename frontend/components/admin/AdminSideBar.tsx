"use client"
import { Owner, Navigation } from "@/constant"
import Link from "next/link"
import DarkModeButton from "../Nav/DarkModeButton"
import { usePathname } from "next/navigation"
import UserComponent from "../static/UserComponent"
import { BsHouseDoorFill } from "react-icons/bs"

const AdminSideBar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isMembershipEnabled = Owner.premium.membership // Check if membership feature is enabled

  // Filter out the "Membership" link if it's not enabled
  const filteredNavLinks = Navigation.AdminNavLinks.filter(
    (section) => section.name !== "Memberships" || isMembershipEnabled
  )

  // Function to close the mobile sidebar
  const closeMobileSidebar = () => {
    const checkbox = document.getElementById("my-drawer-2") as HTMLInputElement
    if (window.innerWidth <= 768) {
      if (checkbox) {
        checkbox.checked = false
      }
    }
  }

  return (
    <div className="drawer lg:drawer-open">
      <input
        title="toggler"
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="flex flex-col items-center justify-center drawer-content">
        <div className="my-5 w-11/12 card bg-base-300">
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
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="h-full flex flex-col p-4 menu z-50 w-80 bg-base-200 text-base-content">
          <div className="flex flex-row items-center justify-between mb-5">
            <div className="text-2xl font-bold">
              <Link href="/">{Owner.WebsiteDetails.name}</Link>
            </div>
            <DarkModeButton />
          </div>
          {/* Sidebar content here */}
          <div>
            {filteredNavLinks.map((section) => (
              <div key={section.name}>
                <p className="font-bold text-gray-600 my-2">{section.name}</p>
                <ul>
                  {section.links?.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        onClick={closeMobileSidebar}
                        className={`${
                          pathname === link.href
                            ? "bg-base-content bg-opacity-10"
                            : ""
                        } flex flex-row gap-3 pl-4`}
                      >
                        <link.icon />
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex-grow"></div> {/* Spacer */}
          <div className=" flex flex-row justify-between">
            <Link className="flex flex-row gap-3 btn" href="/">
              <BsHouseDoorFill />
              <span>Back to Homepage</span>
            </Link>
            <div className="self-end">
              <UserComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSideBar
