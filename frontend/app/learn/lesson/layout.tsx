import "@/app/globals.css"
import Navbar from "@/components/Nav/Navbar"
import Footer from "@/components/Nav/Footer"
import { WebsiteDetails } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from "@/contexts/userContext"
import ClientOnlyRoute from "@/components/Routes/ClientOnlyRoute"
import { Suspense } from "react"
import Loading from "@/app/loading"
import LearnPageSideDrawer from "@/components/learn/LearnPageSideDrawer"
import LearnPageAppMenu from "@/components/learn/LearnPageAppMenu"

export const metadata = {
  title: WebsiteDetails.name,
  description: WebsiteDetails.description,
}

interface RootLayoutProps {
  children: React.ReactElement
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Suspense fallback={<Loading />}>
      <main>
        <LearnPageAppMenu />
        <div className="z-50 drawer lg:drawer-open">
          <input
            title="drawer-toggle"
            id="my-drawer-2"
            type="checkbox"
            className="drawer-toggle"
          />

          <div className="flex flex-col items-center drawer-content">
            {children}
          </div>

          <div className="drawer-side">
            <LearnPageSideDrawer />
          </div>
        </div>
      </main>
    </Suspense>
  )
}
