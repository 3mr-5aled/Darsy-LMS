import "./globals.css"
import Navbar from "@/components/Nav/Navbar"
import Footer from "@/components/Nav/Footer"
import { Owner } from "@/constant"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from "@/contexts/userContext"
import ClientOnlyRoute from "@/components/Routes/ClientOnlyRoute"
import { Suspense } from "react"
import Loading from "./loading"
import FetchUserOnLoad from "@/components/Features/FetchUserOnLoad"
import TawkToWidget from "@/components/Features/TawkToWidget"
import TawkOnlyRoute from "@/components/Routes/TawkOnlyRoute"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: Owner.WebsiteDetails.name,
  description: Owner.WebsiteDetails.description,
  category: "education",
  manifest: "/manifest.json",
  icons: { apple: "/icons/apple-icon-180.png" },
  openGraph: {
    title: Owner.WebsiteDetails.name,
    description: Owner.WebsiteDetails.description,
    url: Owner.WebsiteDetails.url,
    siteName: Owner.WebsiteDetails.name,
    images: [
      {
        url: "https://darsy-lms-beta.vercel.app/images/logo.png",
        width: 250,
        height: 80,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "app",
    title: Owner.WebsiteDetails.name,
    description: Owner.WebsiteDetails.description,
    siteId: "1467725550533754880",
    creator: "@taskedo",
    creatorId: "1467725550533754880",
    images: {
      url: "https://darsy-lms-beta.vercel.app/images/logo.png",
      alt: "Site Logo",
    },
    // app: {
    //   name: "twitter_app",
    //   id: {
    //     iphone: "twitter_app://iphone",
    //     ipad: "twitter_app://ipad",
    //     googleplay: "twitter_app://googleplay",
    //   },
    //   url: {
    //     iphone: "https://iphone_url",
    //     ipad: "https://ipad_url",
    //   },
    // },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
}

interface RootLayoutProps {
  children: React.ReactElement
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar">
      <body>
        <TawkOnlyRoute>
          <TawkToWidget />
        </TawkOnlyRoute>
        <ToastContainer />
        <UserProvider>
          <ClientOnlyRoute>
            <Navbar />
          </ClientOnlyRoute>
          <Suspense fallback={<Loading />}>
            <main>{children}</main>
          </Suspense>
          <FetchUserOnLoad />
        </UserProvider>
        <ClientOnlyRoute>
          <Footer />
        </ClientOnlyRoute>
      </body>
    </html>
  )
}
