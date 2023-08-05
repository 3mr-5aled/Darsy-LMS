"use client"
import { WebsiteDetails } from "@/constant"
import { CldVideoPlayer } from "next-cloudinary"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

type Props = {
  video: {
    publicId: string
    fileName: string
    src: string
    provider: "youtube" | "normal" //Add other supported video providers here
  }
}

export default function VideoPlayer({ video }: Props) {
  const getYouTubeVideoId = (url: string): string | null => {
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    const match = url.match(videoIdRegex)
    return match ? match[1] : null
  }

  // Extract the video ID from the YouTube URL
  const videoId =
    video?.provider === "youtube" && video?.src
      ? getYouTubeVideoId(video.src)
      : null

  if (video.provider === "youtube" && !videoId) {
    // Handle the case when the video is from YouTube but the video ID could not be extracted
    return <div>Error: Invalid YouTube video URL</div>
  }

  return (
    <>
      {video.provider === "youtube" ? (
        <div key={video.provider} className="w-full h-full">
          <Plyr
            id={video.provider}
            source={{
              type: "video",
              sources: [{ src: videoId || "", provider: "youtube" }],
            }}
            options={{
              // You can add any additional Plyr options here
              controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "speed",
                "fullscreen",
              ],
              youtube: { noCookie: true }, // Use YouTube's privacy-enhanced mode (optional)
            }}
          />
        </div>
      ) : (
        <div key={video.provider} className="w-full h-full">
          <Plyr
            id={video.provider}
            source={{
              type: "video",
              sources: [{ src: video.src || "", type: "video/mp4" }],
            }}
            options={{
              // You can add any additional Plyr options here
              controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "speed",
                "fullscreen",
              ],
              youtube: { noCookie: true }, // Use YouTube's privacy-enhanced mode (optional)
            }}
          />
        </div>
        // <div key={video.provider} className="w-full h-full">
        //   <CldVideoPlayer
        //     className="cld-video-player cld-video-player-skin-dark cld-fluid"
        //     id={video.publicId}
        //     width="720"
        //     height="360"
        //     src={"Assets/xdzbnfr47ya6cjkni1w6"}
        //   />
        // </div>
      )}
    </>
  )
}
