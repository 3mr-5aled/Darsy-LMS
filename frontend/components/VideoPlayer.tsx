import Plyr from "plyr-react"
import "plyr-react/plyr.css"

type Props = {
  videoId: string
}

export default function VideoPlayer({ videoId }: Props) {
  return (
    <>
      {videoId && (
        <div key={videoId} className="w-full h-full">
          <Plyr
            id={videoId}
            source={{
              type: "video",
              sources: [{ src: videoId, provider: "youtube" }],
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
      )}
    </>
  )
}
