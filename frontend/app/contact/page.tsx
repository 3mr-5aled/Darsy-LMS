import { Owner} from "@/constant"
import { BsFacebook, BsWhatsapp } from "react-icons/bs"

const Contact = () => {
  return (
    <div className="flexCenter h-[calc(100vh-250px)] m-5 p-5">
      <div className="bg-base-300 card p-10 flex flex-col gap-5">
        <h2 className="text-4xl font-bold text-center">Contact us</h2>
        <a
          href={Owner.WebsiteDetails.whatsappLink}
          className="text-white bg-green-500 border-2 rounded-md font-bold p-3 flex flex-row items-center gap-3"
        >
          <span>Contact us on whatsapp</span>
          <BsWhatsapp size={20} />
        </a>
        <a
          href={Owner.WebsiteDetails.facebookLink}
          className="text-white bg-blue-600 border-2 rounded-md font-bold p-3 flex flex-row items-center gap-3"
        >
          <span>Contact us on Facebook</span>
          <BsFacebook size={20} />
        </a>
      </div>
    </div>
  )
}

export default Contact
