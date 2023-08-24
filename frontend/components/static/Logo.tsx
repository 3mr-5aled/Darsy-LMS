import { Owner } from "@/constant"
import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/" className="p-2 bg-white rounded-md">
      <Image
        src="/images/logo.svg"
        // src={Owner.WebsiteDetails.logo}
        width={150}
        height={65}
        alt={Owner.WebsiteDetails.name}
      />
    </Link>
  )
}

export default Logo
