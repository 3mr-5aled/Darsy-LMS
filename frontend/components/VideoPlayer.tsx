import Plyr from "plyr-react"
import "plyr-react/plyr.css"

type Props = {
  video: {
    src: string
    provider: "youtube" | "normal" // Add other supported video providers here
  }
}

export default function VideoPlayer({ video }: Props) {
  const getYouTubeVideoId = (url: string): string | null => {
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    // /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(videoIdRegex)
    return match ? match[1] : null
  }

  // Extract the video ID from the YouTube URL
  const videoId =
    video.provider === "youtube" ? getYouTubeVideoId(video.src) : null

  return (
    <>
      {video && (
        <div key={video.provider} className="w-full h-full">
          <Plyr
            id={video.provider}
            source={
              video.provider === "youtube"
                ? {
                    type: "video",
                    sources: [{ src: videoId || "", provider: "youtube" }],
                  }
                : {
                    type: "video",
                    sources: [{ src: video.src, type: "video/mp4", size: 720 }],
                  }
            }
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
      )}
    </>
  )
}
