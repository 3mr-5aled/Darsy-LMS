import Plyr from "plyr-react"
import "plyr-react/plyr.css"

type Props = {
  source: string
  provider: "youtube" | "normal" // Add other supported video providers here
}

export default function VideoPlayer({ source, provider }: Props) {
  const getYouTubeVideoId = (url: string): string | null => {
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    const match = url.match(videoIdRegex)
    return match ? match[1] : null
  }

  // Extract the video ID from the YouTube URL
  const videoId = provider === "youtube" ? getYouTubeVideoId(source) : null

  if (provider === "youtube" && !videoId) {
    // Handle the case when the video is from YouTube but the video ID could not be extracted
    return <div>Error: Invalid YouTube video URL</div>
  }

  return (
    <>
      {provider && (
        <div key={provider} className="w-full h-full">
          <Plyr
            id={provider}
            source={
              provider === "youtube"
                ? {
                    type: "video",
                    sources: [{ src: videoId || "", provider: "youtube" }],
                  }
                : {
                    type: "video",
                    sources: [{ src: source, type: "video/mp4", size: 720 }],
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
