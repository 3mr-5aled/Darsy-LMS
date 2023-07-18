"use client"
import React from "react"
import useUser from "@/lib/FetchUser"
import { usePathname } from "next/navigation"

const ClientOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, isLoading] = useUser()
  const pathname = usePathname()
  if (pathname.includes("admin")) {
    return null
  } else {
    return children
  }
}

export default ClientOnlyRoute
