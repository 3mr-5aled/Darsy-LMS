import SocialMediaIcons from "@/components/static/SocialMediaIcons"

const Contact = () => {
  return (
    <div className="flexCenter min-h-[calc(100vh-250px)] m-5 p-5">
      <div className="bg-base-300 card p-10 flex flex-col gap-5">
        <h2 className="text-4xl font-bold text-center">Contact us</h2>

        <SocialMediaIcons type="button" />
      </div>
    </div>
  )
}

export default Contact
