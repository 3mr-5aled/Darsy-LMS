import {
  BsFillArrowUpCircleFill,
  BsFingerprint,
  BsFillLockFill,
  BsPeople,
  BsPlusCircle,
  BsStack,
  BsHouseDoorFill,
  BsPersonBadgeFill,
  BsPersonFillAdd,
  BsMenuButtonWideFill,
} from "react-icons/bs"
import { FaRoute } from "react-icons/fa"

export const WebsiteDetails = {
  name: "Darsy" as string,
  url: "http://localhost:8080" as string,
  description:
    "this is the description for the website where you can find all you need" as string,
  logo: "Logo" as string,
  keywords: "" as string,
  author: "Mr.Unknown" as string,
  email: "test@gmail.com" as string,
  phone: "0101234568" as string,
  whatsappLink: "https://wa.me/phoneNumber" as string,
  youtubeLink: "https://www.youtube.com/@UserName" as string,
  facebookLink: "https://www.facebook.com/UserName" as string,
  instagramLink: "https://www.instagram.com/UserName" as string,
  twitterLink: "https://www.twitter.com/UserName" as string,
  linkedinLink: "https://www.linkedin.com/UserName" as string,
  githubLink: "https://www.github.com/UserName" as string,
}

export const NavLinks = [
  { href: "/courses", key: "Courses", text: "Courses" },
  { href: "/membership", key: "Membership", text: "Membership" },
  { href: "/about", key: "About", text: "About" },
  { href: "/contact", key: "Contact", text: "Contact" },
]
export const AdminNavLinks = [
  {
    href: "/admin/dashboard",
    icon: BsMenuButtonWideFill,
    key: "Dashboard",
    text: "Dashboard",
  },
  {
    href: "/admin/students",
    icon: BsPeople,
    key: "Manage Students",
    text: "Manage Students",
  },
  {
    href: "/admin/courses/create-course",
    icon: BsPlusCircle,
    key: "Create Course",
    text: "Create Course",
  },

  {
    href: "/admin/courses",
    icon: BsStack,
    key: "Manage Courses",
    text: "Manage Courses",
  },
  {
    href: "/admin/memberships",
    icon: BsPersonBadgeFill,
    key: "Manage Memberships",
    text: "Manage Memberships",
  },
  {
    href: "/admin/memberships/create-membership",
    icon: BsPersonFillAdd,
    key: "Create Memberships",
    text: "Create Memberships",
  },
  {
    href: "/",
    icon: BsHouseDoorFill,
    key: "Back to Homepage",
    text: "Back to Homepage",
  },
]
export const GenderOption = {
  title: "النوع" as string,
  options: ["ذكر", "أنثى"] as Array<string>,
}
export const RoleOption = {
  title: "role" as string,
  options: ["student", "tutor"] as Array<string>,
}
export const CityOption = {
  title: "المدينة" as string,
  options: [
    "الإسكندرية",
    "أسوان",
    "أسيوط",
    "البحيرة",
    "بني سويف",
    "القاهرة",
    "الدقهلية",
    "دمياط",
    "الفيوم",
    "الغربية",
    "الجيزة",
    "الإسماعيلية",
    "كفر الشيخ",
    "الأقصر",
    "مطروح",
    "المنيا",
    "المنوفية",
    "الوادي الجديد",
    "شمال سيناء",
    "بورسعيد",
    "القليوبية",
    "قنا",
    "البحر الأحمر",
    "الشرقية",
    "سوهاج",
    "جنوب سيناء",
    "السويس",
  ] as Array<string>,
}
export const GradeOption = {
  title: "الصف الدراسي" as string,
  options: [
    {
      title: "أولي إعدادي",
      value: "prep-1",
    },
    {
      title: "تانية إعدادي",
      value: "prep-2",
    },
    {
      title: "تالتة إعدادي",
      value: "prep-3",
    },
    {
      title: "أولي ثانوي",
      value: "sec-1",
    },
    {
      title: "تانية ثانوي",
      value: "sec-2",
    },
    {
      title: "تالتة ثانوي",
      value: "sec-3",
    },
  ] as Array<{ title: string; value: string }>,
}
export const features = [
  {
    name: "Push to deploy",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: BsFillArrowUpCircleFill,
  },
  {
    name: "SSL certificates",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: BsFillLockFill,
  },
  {
    name: "Simple queues",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: FaRoute,
  },
  {
    name: "Advanced security",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: BsFingerprint,
  },
]

export const testimonialsData = [
  {
    name: "Mohamed Yasser",
    subject: "Best Platform ever",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officia ipsam minus provident repellendus repudiandae voluptate facilis, reprehenderit quam amet ab aperiam dolorem quos accusantium iure aliquam omnis incidunt sint.",
    rating: 5,
  },
  {
    name: "Omar Elmodather",
    subject: "Best Platform ever",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officia ipsam minus provident repellendus repudiandae voluptate facilis, reprehenderit quam amet ab aperiam dolorem quos accusantium iure aliquam omnis incidunt sint.",
    rating: 4,
  },
  {
    name: "Saif Eldin Mohammed",
    subject: "Best Platform ever",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officia ipsam minus provident repellendus repudiandae voluptate facilis, reprehenderit quam amet ab aperiam dolorem quos accusantium iure aliquam omnis incidunt sint.",
    rating: 5,
  },
]
