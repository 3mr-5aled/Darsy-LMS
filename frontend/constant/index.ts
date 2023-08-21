import {
  BsFillArrowUpCircleFill,
  BsFingerprint,
  BsFillLockFill,
  BsPeople,
  BsPlusCircle,
  BsStack,
  BsPersonBadgeFill,
  BsPersonFillAdd,
  BsMenuButtonWideFill,
  BsBox,
} from "react-icons/bs"
import { FaRoute } from "react-icons/fa"

// owner website data

export const Owner = {
  name: "Mr Mohammed",
  OwnerName: "mr-mohammed",
  description: "Mr Mohammed the best teacher",
  WebsiteDetails: {
    name: "Darsy LMS" as string,
    theme: {
      light: {
        primaryColor: "#38bdf8",
        secondaryColor: "#2dd4bf",
        accentColor: "#f471b5",
      },
      dark: {
        primaryColor: "#5616c5",
        secondaryColor: "#db2777",
        accentColor: "#1fa475",
      },
    },
    url: "https://darsy-lms-beta.vercel.app/" as string,
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
    testimonials: {
      heading1: "Don't just take our word for it...",
      heading2: "Read reviews from our customers",
      description:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas veritatis illo placeat harum porro optio fugit a culpa sunt id!",
      testimonialsData: [
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
      ],
    },
    hero: {
      heading: "Darsy LMS Platform is the Best Ever.",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores repellat perspiciatis aspernatur quis voluptatum porro incidunt, libero sequi quos eos velit",
      image: "",
      button: "Get started",
    },
    features: {
      heading: "Deploy faster",
      paragraph1: "Everything you need to deploy your app",
      paragraph2:
        "Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.",
      featuresData: [
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
      ],
    },
  },
  premium: {
    membership: true,
  },
  plugins: {
    // example data not real
    paytabs: {
      profileId: 598623,
      serverKey: "SJ5468LJWDDR-J6NJ9G4846D-MJ2asd53G",
    },
    tawkChat: {
      embedUrl: "https://embed.tawk.to/64dca6e894cf5d49dc6ab457/1h7uunv78",
    },
  },
}

// navigation in the website

export const Navigation = {
  NavLinks: [
    { href: "/courses", key: "Courses", text: "Courses" },
    { href: "/membership", key: "Membership", text: "Membership" },
    { href: "/about", key: "About", text: "About" },
    { href: "/contact", key: "Contact", text: "Contact" },
  ],
  AdminNavLinks: [
    {
      name: "Dashboard",
      links: [
        {
          href: "/admin/dashboard",
          icon: BsMenuButtonWideFill,
          key: "Dashboard",
          text: "Dashboard",
        },
      ],
    },
    {
      name: "Students",
      links: [
        {
          href: "/admin/students",
          icon: BsPeople,
          key: "Manage Students",
          text: "Manage Students",
        },
      ],
    },
    {
      name: "Courses",
      links: [
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
      ],
    },
    {
      name: "Memberships",
      links: [
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
      ],
    },
    {
      name: "Orders",
      links: [
        {
          href: "/admin/orders",
          icon: BsBox,
          key: "View Orders",
          text: "View Orders",
        },
      ],
    },
  ],
}

// multi-options in the website

export const Options = {
  GenderOption: {
    title: "النوع" as string,
    options: ["ذكر", "أنثى"] as Array<string>,
  },
  RoleOption: {
    title: "role" as string,
    options: ["student", "tutor", "owner"] as Array<string>,
  },
  CityOption: {
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
  },
  GradeOption: {
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
  },
}
