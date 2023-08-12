"use client"
import { WebsiteDetails, AdminNavLinks } from "@/constant"
import Link from "next/link"
import DarkModeButton from "../Nav/DarkModeButton"
import { usePathname } from "next/navigation"
import UserComponent from "../static/UserComponent"
import { BsHouseDoorFill } from "react-icons/bs"

const AdminSideBar = () => {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col p-4 menu z-50 w-80 bg-base-200 text-base-content">
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="text-2xl font-bold">
          <Link href="/">{WebsiteDetails.name}</Link>
        </div>
        <DarkModeButton />
      </div>
      {/* Sidebar content here */}
      <div>
        {AdminNavLinks.map((section, sectionIndex) => (
          <div key={section.name}>
            <p className="font-bold text-gray-600 my-2">{section.name}</p>
            <ul>
              {section.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
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
  )
}

export default AdminSideBar
