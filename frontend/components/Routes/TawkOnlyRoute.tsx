"use client"
import React from "react"
import { usePathname } from "next/navigation"

const TawkOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  if (
    pathname.includes("admin") ||
    pathname.includes("quiz") ||
    pathname.includes("lesson") ||
    pathname.includes("exam-results") ||
    pathname.match(/^\/app\/lesson\/\d+\/quiz$/) ||
    pathname.match(/^\/app\/lesson\/\d+\/exam-results$/)
  ) {
    return null
  } else {
    return children
  }
}

export default TawkOnlyRoute
