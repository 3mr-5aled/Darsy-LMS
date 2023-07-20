import {
  BsFillArrowUpCircleFill,
  BsFingerprint,
  BsFillLockFill,
} from "react-icons/bs"
import { FaRoute } from "react-icons/fa"

export const WebsiteDetails = {
  name: "Darsy" as string,
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
  { href: "/about", key: "About", text: "About" },
  { href: "/contact", key: "Contact", text: "Contact" },
]
export const AdminNavLinks = [
  { href: "/admin/students", key: "Manage Students", text: "Manage Students" },
  { href: "/admin/create-course", key: "Create Course", text: "Create Course" },
  { href: "/admin/courses", key: "Manage Courses", text: "Manage Courses" },
  { href: "/", key: "Back to Homepage", text: "Back to Homepage" },
]
export const GenderOption = {
  title: "النوع" as string,
  options: ["ذكر", "أنثى"] as Array<string>,
}
export const CityOption = {
  title: "المدينة" as string,
  options: [
    "مدينة نصر",
    "الزيتون",
    "المهندسين",
    "المعادي",
    "الزمالك",
  ] as Array<string>,
}
export const GradeOption = {
  title: "الصف الدراسي" as string,
  options: ["أولى ثانوي", "تانية ثانوي", "تالتة ثانوي"] as Array<string>,
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

export const categoryFilters = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "Mobile",
  "UI/UX",
  "Game Dev",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "E-commerce",
  "Chatbots",
]

export const footerLinks = [
  {
    title: "For developers",
    links: [
      "Go Pro!",
      "Explore development work",
      "Development blog",
      "Code podcast",
      "Open-source projects",
      "Refer a Friend",
      "Code of conduct",
    ],
  },
  {
    title: "Hire developers",
    links: [
      "Post a job opening",
      "Post a freelance project",
      "Search for developers",
    ],
  },
  {
    title: "Brands",
    links: ["Advertise with us"],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Support",
      "Media kit",
      "Testimonials",
      "API",
      "Terms of service",
      "Privacy policy",
      "Cookie policy",
    ],
  },
  {
    title: "Directories",
    links: [
      "Development jobs",
      "Developers for hire",
      "Freelance developers for hire",
      "Tags",
      "Places",
    ],
  },
  {
    title: "Development assets",
    links: [
      "Code Marketplace",
      "GitHub Marketplace",
      "NPM Registry",
      "Packagephobia",
    ],
  },
  {
    title: "Development Resources",
    links: [
      "Freelancing",
      "Development Hiring",
      "Development Portfolio",
      "Development Education",
      "Creative Process",
      "Development Industry Trends",
    ],
  },
]
