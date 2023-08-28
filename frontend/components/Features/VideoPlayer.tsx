"use client";
import { useUserContext } from "@/contexts/userContext";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
type Props = {
  video: {
    publicId: string;
    fileName: string;
    src: string;
    provider: "youtube" | "local"; // Add other supported video providers here
  };
};

export default function VideoPlayer({ video }: Props) {
  const getYouTubeVideoId = (url: string): string | null => {
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  };
  const [VideoPlayer, setVideo] = useState<any>(true);

  // ! put it in .env
  const videoSrc = `https://d978tnwvgt47t.cloudfront.net/${video.fileName}`;

  const getYoutubeSource = async (): Promise<any[]> => {
    if (video.provider === "youtube" && video.src) {
      const videoId = getYouTubeVideoId(video.src);
      if (videoId) {
        return [
          {
            // publicId: video.provider,
            // fileName: video.src,
            src: videoId,
            provider: "youtube",
          },
        ];
      }
    }
    return [];
  };

  const [videoBlob, setVideoBlob] = useState<Blob | MediaSource | undefined>();
  const [youtubeSource, setYoutubeSource] = useState<any[]>([]);

  // const loadVideoBlob = async (url: string): Promise<Blob | null> => {
  //   try {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     return blob;
  //   } catch (error) {
  //     console.error("Error loading video blob:", error);
  //     return null;
  //   }
  // };

  useEffect(() => {
    // if (video.provider === "local" && videoSrc) {
    //   loadVideoBlob(videoSrc).then((blob) => {
    //     if (blob) {
    //       setVideoBlob(blob);
    //     }
    //   });
    // }
    if (video.provider === "youtube") {
      getYoutubeSource().then((source) => {
        setYoutubeSource(source);
      });
    }
  }, [videoSrc, video.provider]);

  // watermark config
  const { state } = useUserContext();
  const { user } = state;
  const [showNoVideoMessage, setShowNoVideoMessage] = useState(false);
  // useEffect(() => {
  //   // Check if the video URL is empty or not working
  //   if (!videoSrc || videoBlob === null) {
  //     setShowNoVideoMessage(true);
  //   }
  // }, [videoSrc, videoBlob]);

  // const [watermarkPosition, setWatermarkPosition] = useState({
  //   top: "50%", // Initial vertical position
  //   left: "50%", // Initial horizontal position
  // });

  // // Function to update watermark position randomly
  // const updateWatermarkPosition = () => {
  //   const container = document.querySelector(".video-container");

  //   if (container) {
  //     const containerWidth = container.clientWidth;
  //     const containerHeight = container.clientHeight;

  //     // Calculate random position within container boundaries
  //     const randomTop = Math.floor(Math.random() * (containerHeight - 100)); // Adjust 100 as needed
  //     const randomLeft = Math.floor(Math.random() * (containerWidth - 100)); // Adjust 100 as needed

  //     // Update watermark position
  //     setWatermarkPosition({
  //       top: `${randomTop}px`,
  //       left: `${randomLeft}px`,
  //     });
  //   }
  // };

  // // Use useEffect to trigger watermark position updates
  // // Function to handle the fade-in and fade-out effect of the watermark
  // const fadeInOutWatermark = () => {
  //   const watermarkElement = document.querySelector(".watermark");

  //   if (watermarkElement) {
  //     // Apply fade-in effect
  //     watermarkElement.style.opacity = "1";

  //     // Wait for a few seconds (adjust the duration as needed)
  //     setTimeout(() => {
  //       // Apply fade-out effect
  //       watermarkElement.style.opacity = "0";
  //     }, 3000); // 3 seconds (adjust as needed)
  //   }
  // };

  // // Use useEffect to trigger watermark position updates and fade effects
  // useEffect(() => {
  //   // Update watermark position at a regular interval (e.g., every 5 seconds)
  //   const watermarkInterval = setInterval(() => {
  //     updateWatermarkPosition();
  //   }, 5000);

  //   // Apply fade-in and fade-out effects when the watermark position updates
  //   updateWatermarkPosition();
  //   fadeInOutWatermark();

  //   // Clear the interval when the component unmounts
  //   return () => {
  //     clearInterval(watermarkInterval);
  //   };
  // }, []);

  // useEffect(() => {
  //   videoBlob &&
  //     setVideo(
  //       <ReactPlayer url={URL.createObjectURL(videoBlob)} controls={true} />,
  //     );
  // }, [videoBlob]);
  return (
    <div className="relative aspect-video w-full">
      <div className="video-container">
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
          VideoPlayer && (
            <div>
              {/* {showNoVideoMessage ? (
                <p>No video for this lesson.</p>
              ) : ( */}
              <>
                <Plyr
                  preload="none"
                  id={video.provider}
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: videoSrc,
                        // type: "video/mp4",
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
                      "fullscreen", // Toggle fullscreen
                    ],
                    ratio: "16:9",
                    fullscreen: {
                      enabled: true,
                      fallback: true,
                      iosNative: true,
                      container: null,
                    },
                    settings: ["quality", "speed", "loop"],
                    seekTime: 10,
                  }}
                />
                {/* <div>{VideoPlayer}</div> */}
              </>
              {/* )} */}
            </div>
          )
        )}
      </div>
      {/* <div
        style={watermarkPosition}
        className="absolute flex flex-col justify-center gap-2 opacity-50"
      >
        <span>{user?.name}</span>
        <span>{user?.phone}</span>
      </div> 
      */}
    </div>
  );
}
