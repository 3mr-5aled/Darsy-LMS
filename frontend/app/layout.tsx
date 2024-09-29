import "./globals.css";
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Nav/Footer";
import { Owner } from "@/constant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/contexts/userContext";
import ClientOnlyRoute from "@/components/Routes/ClientOnlyRoute";
import { Suspense } from "react";
import Loading from "./loading";
import FetchUserOnLoad from "@/components/Features/FetchUserOnLoad";
import TawkToWidget from "@/components/Features/TawkToWidget";
import TawkOnlyRoute from "@/components/Routes/TawkOnlyRoute";
import { Metadata } from "next";
import Head from "next/head";
import DownloadManagerDetectionWrapper from "@/components/Features/DownloadManagerDetectionWrapper";

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

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

interface RootLayoutProps {
  children: React.ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link
          href="splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
      </Head>
      <body>
        <DownloadManagerDetectionWrapper>
          <>
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
          </>
        </DownloadManagerDetectionWrapper>
      </body>
    </html>
  );
}
