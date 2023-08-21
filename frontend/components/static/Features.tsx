import { Owner } from "@/constant"

const Features = () => {
  return (
    <div className="px-6 mx-auto max-w-7xl lg:px-8">
      <div className="max-w-2xl mx-auto lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          {Owner.WebsiteDetails.features.heading}
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {Owner.WebsiteDetails.features.paragraph1}
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {Owner.WebsiteDetails.features.paragraph2}
        </p>
      </div>
      <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {Owner.WebsiteDetails.features.featuresData.map((feature) => (
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
  )
}

export default Features
