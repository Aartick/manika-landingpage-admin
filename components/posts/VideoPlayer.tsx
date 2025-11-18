"use client";

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg sm:rounded-[1rem]">
      {videoUrl ? (
        <video
          controls
          preload="metadata"
          playsInline
          className="h-[440px] md:h-[600px] w-full object-cover rounded-xl"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="text-center py-20 text-gray-500">Video Not Available</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}