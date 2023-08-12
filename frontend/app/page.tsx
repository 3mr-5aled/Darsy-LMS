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
    router.push("/learn")
  }
  return (
    <div className="flexCenter ">
      <div className="flex flex-col container">
        <main className="flex flex-col justify-center gap-y-5 md:gap-y-8 overflow-hidden">
          <Hero />
        </main>
        <div className="bg-base-100 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">
                Deploy faster
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                Everything you need to deploy your app
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
                Suspendisse eget egestas a elementum pulvinar et feugiat blandit
                at. In mi viverra elit nunc.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 ">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <feature.icon
                          className="h-6 w-6 text-white"
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
