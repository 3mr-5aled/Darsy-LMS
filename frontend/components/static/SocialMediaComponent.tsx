import React from "react"
import { Owner } from "@/constant"
import {
  BsWhatsapp,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsLinkedin,
  BsGithub,
  BsTelegram,
  BsThreeDots,
  BsMessenger,
  BsYoutube,
} from "react-icons/bs"
import Link from "next/link"

const SocialMediaComponent = ({ type }: { type: "button" | "icon" }) => {
  // Extract the social media links
  const {
    whatsappLink,
    facebookLink,
    instagramLink,
    twitterLink,
    linkedinLink,
    githubLink,
    telegramLink,
    messengerLink,
    youtubeLink,
  } = Owner.WebsiteDetails

  // Create an array of objects for each social media icon and link
  const numberOfIcons = 4 as number
  const socialMediaLinks = [
    {
      icon: <BsWhatsapp />,
      link: whatsappLink,
      name: "WhatsApp",
      follow: "Contact",
      color: "#4aeb67",
    },
    {
      icon: <BsFacebook />,
      link: facebookLink,
      name: "Facebook",
      follow: "Follow",
      color: "#0000ff", // Blue
    },
    {
      icon: <BsYoutube />,
      link: youtubeLink,
      name: "Youtube",
      follow: "Follow",
      color: "#ff0000", // Red
    },
    {
      icon: <BsMessenger />,
      link: messengerLink,
      name: "Messenger",
      follow: "Contact",
      color: "#ff1493", // DeepPink
    },
    {
      icon: <BsInstagram />,
      link: instagramLink,
      name: "Instagram",
      follow: "Follow",
      color: "#ffa500", // Orange
    },
    {
      icon: <BsTwitter />,
      link: twitterLink,
      name: "Twitter",
      follow: "Follow",
      color: "#00ced1", // DarkTurquoise
    },
    {
      icon: <BsLinkedin />,
      link: linkedinLink,
      name: "LinkedIn",
      follow: "Follow",
      color: "#0000c8", // Blue
    },
    {
      icon: <BsGithub />,
      link: githubLink,
      name: "GitHub",
      follow: "Follow",
      color: "#000000", // Black
    },
    {
      icon: <BsTelegram />,
      link: telegramLink,
      name: "Telegram",
      follow: "Contact",
      color: "#00c0c8", // Teal
    },
  ]

  // Filter out links that are empty strings
  const filteredLinks = socialMediaLinks.filter((item) => !!item.link)

  // Render the buttons
  const renderedButtons = filteredLinks.map((item, index) => (
    <Link
      key={index}
      href={item.link}
      className={`btn font-bold p-3 flex flex-row items-center justify-between gap-3`}
    >
      <span>
        {item.follow} us on {item.name}
      </span>
      <span style={{ color: item.color }}>{item.icon}</span>
    </Link>
  ))

  // Render the icons, limiting to the first three
  const renderedIcons = filteredLinks
    .slice(0, numberOfIcons)
    .map((item, index) => (
      <Link
        key={index}
        href={item.link}
        className="text-xl transition-all hover:text-secondary rounded-full"
      >
        {item.icon}
      </Link>
    ))

  // Render a dropdown if there are more than three links
  const dropdown = filteredLinks.length > numberOfIcons && (
    <div className="dropdown dropdown-hover dropdown-top dropdown-end">
      <label tabIndex={0} className="btn btn-circle">
        <BsThreeDots />
      </label>
      <ul className="dropdown-content mb-1 text-xl z-[1] menu menu-horizontal bg-base-200 rounded-box p-2 shadow w-max">
        {filteredLinks.slice(numberOfIcons).map((item, index) => (
          <li key={index}>
            <Link href={item.link}>{item.icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      {type === "icon" ? (
        <div className="flex space-x-4 items-center">
          {renderedIcons}
          {dropdown}
        </div>
      ) : (
        <>{renderedButtons}</>
      )}
    </>
  )
}

export default SocialMediaComponent
