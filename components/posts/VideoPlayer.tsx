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
return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&playsinline=1`;
  } catch {
    return "";
  }
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const embedUrl = transformYoutubeUrl(videoUrl);

  return (
<div className="relative overflow-hidden rounded-2xl p-2 sm:p-4">
        {embedUrl ? (
          <div className="relative h-[440px] md:h-[600px] overflow-hidden rounded-lg">
            <iframe
              src={embedUrl}
              title="YouTube Shorts Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-1/2 left-1/2 w-full h-full"
              style={{ 
                transform: 'translate(-50%, -50%) scale(1.15)',
                minHeight: '120%'
              }}
            />
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">Video Not Available</div>
        )}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}


