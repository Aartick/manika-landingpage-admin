"use client";

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
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&playsinline=1`;
  } catch {
    return "";
  }
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const embedUrl = transformYoutubeUrl(videoUrl);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg sm:rounded-[1rem]">
      {embedUrl ? (
        <iframe
  src={embedUrl}
  title="YouTube Shorts Player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="h-[440px] md:h-[600px] w-full rounded-xl"
/>

      ) : (
        <div className="text-center py-20 text-gray-500">Video Not Available</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
