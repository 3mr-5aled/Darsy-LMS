import { Owner } from "@/constant"
import Image from "next/image"
import Link from "next/link"
import SocialMediaIcons from "../static/SocialMediaIcons"

type ColumnProps = {
  title: string
  links: Array<string>
}

// const FooterColumn = ({ title, links }: ColumnProps) => (
//   <div className="footer_column">
//     <h4 className="font-semibold">{title}</h4>
//     <ul className="flex flex-col gap-2 font-normal">
//       {links.map((link) => (
//         <Link href={"/"} key={link}>
//           {link}
//         </Link>
//       ))}
//     </ul>
//   </div>
// )

const Footer = async () => {
  return (
    <footer className="footer">
      <div>
        <Link href="/" className="p-3 prose bg-white rounded-md">
          <Image
            src="/next.svg"
            // src={Owner.WebsiteDetails.logo}
            width={115}
            height={38}
            alt={Owner.WebsiteDetails.name}
          />
        </Link>
        <div className="transition-all">
          <span className="font-extrabold text-secondary">
            {Owner.WebsiteDetails.name}
          </span>
          <br />
          <div className="transition-all">
            Developed by{" "}
            <a
              href="https://github.com/3mr-5aled"
              className="transition-all text-accent hover:text-secondary"
            >
              3mr 5aled
            </a>
            {" & "}
            <a
              href="https://github.com/AbdelrhmanEbian"
              className="transition-all text-accent hover:text-secondary"
            >
              Abdelrahman Ebain
            </a>
          </div>
        </div>
      </div>
      <div className="transition-all">
        <span className="footer-title ">Social</span>
        <SocialMediaIcons type="icon" />
      </div>
    </footer>
  )
}

export default Footer
