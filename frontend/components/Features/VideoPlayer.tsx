"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useUserContext } from "@/contexts/userContext";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

type Props = {
  video: {
    publicId: string;
    fileName: string;
    src: string;
    provider: "youtube" | "local"; // Add other supported video providers here
  };
};
type YoutubeType = {
  // publicId: video.provider,
  // fileName: video.src,
  src: string;
  provider: string;
};

export default function VideoPlayer({ video }: Props) {
  const getYouTubeVideoId = (url: string): string | null => {
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  };

  const getYoutubeSource = async (): Promise<YoutubeType | null> => {
    if (video.provider === "youtube" && video.src) {
      const videoId = getYouTubeVideoId(video.src);
      if (videoId) {
        return {
          // publicId: video.provider,
          // fileName: video.src,
          src: videoId,
          provider: "youtube",
        };
      }
    }
    return null;
  };

  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [youtubeSource, setYoutubeSource] = useState<YoutubeType | null>(null);

  const loadVideoBlob = async (url: string): Promise<Blob | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error loading video blob:", error);
      return null;
    }
  };
  const videoSrc = process.env.NEXT_PUBLIC_CLOUDFRONT_URL + video.fileName;
  useEffect(() => {
    if (video.provider === "local" && videoSrc) {
      loadVideoBlob(videoSrc).then((blob) => {
        if (blob) {
          setVideoBlob(blob);
        }
      });
    }
    if (video.provider === "youtube") {
      getYoutubeSource().then((source) => {
        setYoutubeSource(source);
      });
    }
  }, [videoSrc, video.provider]);

  // const [blobUrl, setBlobUrl] = useState(""); // State to hold the Blob URL

  // useEffect(() => {
  //   // Create an async function to fetch and set the Blob URL
  //   async function fetchBlobUrl() {
  //     try {
  //       const response = await fetch(
  //         process.env.NEXT_PUBLIC_CLOUDFRONT_URL + video.fileName,
  //       );
  //       if (!response.ok) {
  //         throw new Error(`Network response was not ok: ${response.status}`);
  //       }
  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);
  //       setBlobUrl(url);
  //     } catch (error) {
  //       console.error("Error fetching video:", error);
  //     }
  //   }

  //   fetchBlobUrl(); // Call the async function

  //   return () => {
  //     // Clean up the Blob URL when the component unmounts
  //     if (blobUrl) {
  //       URL.revokeObjectURL(blobUrl);
  //     }
  //   };
  // }, [video.fileName, blobUrl]); // Include blobUrl as a dependency to ensure cleanup

  const { state } = useUserContext();
  const { user } = state;

  const [watermarkPosition, setWatermarkPosition] = useState({
    top: "50%", // Initial vertical position
    left: "50%", // Initial horizontal position
  });
  const overlayRef = useRef(null); // Ref for the overlay

  const watermarkRef = overlayRef;
  const intervalDurationInSeconds = 20; // Interval duration in seconds

  const updateWatermarkPosition = () => {
    if (watermarkRef.current) {
      // @ts-ignore

      const container = watermarkRef.current.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Calculate random position within container boundaries
        const randomTop = Math.floor(Math.random() * (containerHeight - 100)); // Adjust 100 as needed
        const randomLeft = Math.floor(Math.random() * (containerWidth - 100)); // Adjust 100 as needed

        // Update watermark position
        setWatermarkPosition({
          top: `${randomTop}px`,
          left: `${randomLeft}px`,
        });
      }
    }
  };

  useEffect(() => {
    const watermarkInterval = setInterval(() => {
      updateWatermarkPosition();
    }, intervalDurationInSeconds * 1000);

    return () => {
      clearInterval(watermarkInterval);
    };
  }, []);

  const getPlyrComponent = useMemo(() => {
    const key = video.src; // Unique key based on video source, change this if necessary

    if (video.provider === "youtube" && youtubeSource) {
      return (
        <Plyr
          key={key}
          id={video.provider}
          source={{
            type: "video",
            sources: [
              {
                src: youtubeSource.src,
                provider: "youtube",
              },
            ],
          }}
          options={{
            controls: [
              "play-large",
              "rewind",
              "play",
              "fast-forward",
              "progress",
              "current-time",
              "duration",
              "mute",
              "volume",
              "captions",
              "settings",
              "pip",
              "airplay",
              "download",
              "fullscreen",
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
      );
    } else if (video.provider === "local" && videoBlob) {
      return (
        <Plyr
          preload="none"
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
              "fullscreen", // Toggle fullscreen
            ],
            ratio: "16:9",
            fullscreen: {
              enabled: true,
              fallback: true,
              iosNative: true,
            },
            settings: ["quality", "speed", "loop"],
            seekTime: 10,
          }}
        />
      );
    } else {
      return <p>No Videos exists</p>;
    }
  }, [video.src, video.provider, videoBlob]);

  // ... your other code ...

  // useEffect(() => {
  //   if (overlayRef.current) {
  //     const plyrContainer = document.querySelector(".plyr"); // Find the Plyr container
  //     if (plyrContainer) {
  //       // Append the overlay to the Plyr container
  //       plyrContainer.appendChild(overlayRef.current);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // Wait for Plyr to be available in the DOM
    const waitForPlyrContainer = setInterval(() => {
      const plyrContainer = document.querySelector(".plyr"); // Find the Plyr container
      if (plyrContainer) {
        // Append the overlay to the Plyr container
        // @ts-ignore
        plyrContainer.appendChild(overlayRef.current);
        clearInterval(waitForPlyrContainer);
      }
    }, 100); // Check every 100 milliseconds

    return () => {
      clearInterval(waitForPlyrContainer);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="watermark absolute z-[99999999] flex select-none flex-col items-center justify-center gap-2 text-red-500 opacity-50"
        style={watermarkPosition}
        ref={overlayRef} // Assign the overlayRef to the ref attribute
      >
        <span>{user?.name}</span>
        <span>{user?.phone}</span>
      </div>
      {getPlyrComponent}
    </div>
  );
}
