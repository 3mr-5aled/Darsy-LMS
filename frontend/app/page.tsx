"use client"
import { features } from "@/constant"
import Link from "next/link"
import Hero from "@/components/static/Hero"
import { useUserContext } from "@/contexts/userContext"
import { useRouter } from "next/navigation"
import Testimonials from "@/components/static/Testimonials"

const Home = () => {
  const { state, setUser, clearUser } = useUserContext()
  const { user } = state
  const router = useRouter()
  if (user?.role === "student") {
    router.push("/app")
  }
  return (
    <div className="flexCenter ">
      <div className="container flex flex-col">
        <main className="flex flex-col justify-center overflow-hidden gap-y-5 md:gap-y-8">
          <Hero />
        </main>
        <div className="py-24 bg-base-100 sm:py-32">
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <div className="max-w-2xl mx-auto lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">
                Deploy faster
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to deploy your app
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
                Suspendisse eget egestas a elementum pulvinar et feugiat blandit
                at. In mi viverra elit nunc.
              </p>
            </div>
            <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 ">
                      <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                        <feature.icon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        {/* testimonials */}
        <Testimonials />
      </div>
    </div>
  )
}

export default Home
