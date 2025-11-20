"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
}

// Helper to convert YouTube URL (with shorts) to embed URL with autoplay
function transformYoutubeUrl(url: string) {
  try {
    const urlObj = new URL(url);
    let videoId = "";
    if (urlObj.hostname.includes("youtube.com")) {
      const paths = urlObj.pathname.split("/");
      if (paths[1] === "shorts" && paths[2]) {
        videoId = paths[2];
      } else if (urlObj.searchParams.get("v")) {
        videoId = urlObj.searchParams.get("v") || "";
      }
    } else if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    }
    if (!videoId) return "";
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&playsinline=1&loop=1&playlist=${videoId}&enablejsapi=1`;
  } catch {
    return "";
  }
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const embedUrl = transformYoutubeUrl(videoUrl);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Attempt to unmute after a short delay
    const timer = setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"unMute","args":""}',
          "*"
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [embedUrl]);

  return (
    <div className="flex justify-center">
      <div className="p-2 sm:p-4">
        {embedUrl ? (
          <div className="bg-black rounded-3xl overflow-hidden relative shadow-2xl w-[360px] sm:w-[420px] aspect-[9/16]">
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title="YouTube Shorts Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="w-[360px] sm:w-[420px] aspect-[9/16] rounded-3xl bg-black flex items-center justify-center text-gray-400">
            Video Not Available
          </div>
        )}
      </div>
    </div>
  );
}
