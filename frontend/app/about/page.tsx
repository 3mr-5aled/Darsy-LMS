import { WebsiteDetails } from "@/constant"

const About = () => {
  return (
    <div className="flexCenter m-5 h-[calc(100vh-250px)]">
      <div className="p-4 bg-base-300 rounded-md shadow-md">
        <div className="mb-4">
          <h2 className="text-4xl text-center font-bold">About</h2>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Website:</span> {WebsiteDetails.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Author:</span> {WebsiteDetails.author}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Description:</span>{" "}
          {WebsiteDetails.description}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {WebsiteDetails.phone}
        </div>
      </div>
    </div>
  )
}

export default About
