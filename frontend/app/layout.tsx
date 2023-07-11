import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { WebsiteDetails } from "@/constant"

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
    <html lang="ar">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
