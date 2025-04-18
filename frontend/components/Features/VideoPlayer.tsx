"use client"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { useState, useEffect } from "react"

type Props = {
  video: {
    publicId: string
    fileName: string
    src: string
    provider: "youtube" | "normal" // Add other supported video providers here
  }
}

export default function VideoPlayer({ video }: Props) {
  const getYouTubeVideoId = (url: string): string | null => {
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    const match = url.match(videoIdRegex)
    return match ? match[1] : null
  }

  const getYoutubeSource = async (): Promise<any[]> => {
    if (video.provider === "youtube" && video.src) {
      const videoId = getYouTubeVideoId(video.src)
      if (videoId) {
        return [
          {
            // publicId: video.provider,
            // fileName: video.src,
            src: videoId,
            provider: "youtube",
          },
        ]
      }
    }
    return []
  }

  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [youtubeSource, setYoutubeSource] = useState<any[]>([])

  const loadVideoBlob = async (url: string): Promise<Blob | null> => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return blob
    } catch (error) {
      console.error("Error loading video blob:", error)
      return null
    }
  }

  useEffect(() => {
    if (video.provider === "normal" && video.src) {
      loadVideoBlob(video.src).then((blob) => {
        if (blob) {
          setVideoBlob(blob)
        }
      })
    }
    if (video.provider === "youtube") {
      getYoutubeSource().then((source) => {
        setYoutubeSource(source)
      })
    }
  }, [video.src, video.provider])

  return (
    <div className="w-full h-full">
      {video.provider === "youtube" ? (
        <Plyr
          id={video.provider}
          source={{
            type: "video",
            sources: youtubeSource,
          }}
          options={{
            controls: [
              "play-large", // The large play button in the center
              // "restart", // Restart playback
              "rewind", // Rewind by the seek time (default 10 seconds)
              "play", // Play/pause playback
              "fast-forward", // Fast forward by the seek time (default 10 seconds)
              "progress", // The progress bar and scrubber for playback and buffering
              "current-time", // The current time of playback
              "duration", // The full duration of the media
              "mute", // Toggle mute
              "volume", // Volume control
              "captions", // Toggle captions
              "settings", // Settings menu
              "pip", // Picture-in-picture (currently Safari only)
              "airplay", // Airplay (currently Safari only)
              "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
              "fullscreen", // Toggle fullscreen
            ],
            settings: ["quality", "speed", "loop"],
            seekTime: 10,
            youtube: {
              noCookie: true,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              modestbranding: 1,
            },
          }}
        />
      ) : (
        videoBlob && (
          <Plyr
            id={video.provider}
            source={{
              type: "video",
              sources: [
                {
                  src: URL.createObjectURL(videoBlob),
                  type: "video/mp4",
                },
              ],
            }}
            options={{
              controls: [
                "play-large", // The large play button in the center
                // "restart", // Restart playback
                "rewind", // Rewind by the seek time (default 10 seconds)
                "play", // Play/pause playback
                "fast-forward", // Fast forward by the seek time (default 10 seconds)
                "progress", // The progress bar and scrubber for playback and buffering
                "current-time", // The current time of playback
                "duration", // The full duration of the media
                "mute", // Toggle mute
                "volume", // Volume control
                "captions", // Toggle captions
                "settings", // Settings menu
                "pip", // Picture-in-picture (currently Safari only)
                "airplay", // Airplay (currently Safari only)
                "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
                "fullscreen", // Toggle fullscreen
              ],
              settings: ["quality", "speed", "loop"],
              seekTime: 10,
            }}
          />
        )
      )}
    </div>
  )
}
