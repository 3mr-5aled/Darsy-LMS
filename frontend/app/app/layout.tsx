import "@/app/globals.css"
import { Owner } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from "@/contexts/userContext"
import { Suspense } from "react"
import Loading from "@/app/loading"
import FetchUserOnLoad from "@/components/Features/FetchUserOnLoad"
import React from "react"
import AppNav from "@/components/learn/AppNav"

export const metadata = {
  title: Owner.WebsiteDetails.name,
  description: Owner.WebsiteDetails.description,
}

interface RootLayoutProps {
  children: React.ReactElement
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative">
      <AppNav />
      <main>{children}</main>
    </div>
  )
}
