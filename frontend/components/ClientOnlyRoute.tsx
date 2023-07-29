"use client"
import React from "react"
import { usePathname } from "next/navigation"

const ClientOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  if (
    pathname.includes("admin") ||
    (pathname.includes("learn") && !pathname.includes("learn/lesson"))
  ) {
    return null
  } else {
    return children
  }
}

export default ClientOnlyRoute
