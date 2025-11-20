"use client";
import { useEffect, useState } from "react";

interface StickyCTAProps {
  stickyCTA: {
    text: string;
    buttonLabel: string;
    buttonLink: string;
  };
}

export default function StickyCTA({ stickyCTA }: StickyCTAProps) {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Debugging - remove after testing
  useEffect(() => {
    console.log('StickyCTA mounted with data:', stickyCTA);
  }, [stickyCTA]);

  // Show sticky CTA once user scrolls down 400px
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;
      console.log('Scroll position:', window.scrollY, 'Should show:', shouldShow);
      setShowStickyCTA(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToEnroll = () => {
    if (!stickyCTA?.buttonLink) return;

    // Scroll inside page (#section)
    if (stickyCTA.buttonLink.startsWith("#")) {
      const el = document.querySelector(stickyCTA.buttonLink);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // External URL
      window.location.href = stickyCTA.buttonLink;
    }
  };

  // Do not render if empty or incomplete
  if (
    !stickyCTA ||
    !stickyCTA.text ||
    !stickyCTA.buttonLabel ||
    !stickyCTA.buttonLink
  ) {
    console.log('StickyCTA not rendering - missing data:', {
      hasStickyCTA: !!stickyCTA,
      hasText: !!stickyCTA?.text,
      hasButtonLabel: !!stickyCTA?.buttonLabel,
      hasButtonLink: !!stickyCTA?.buttonLink
    });
    return null;
  }

  console.log('StickyCTA render state:', { showStickyCTA });

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-[#2D2A26] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[9999] transition-transform duration-500 ${
        showStickyCTA ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[#F4EDE4] font-semibold">
          {stickyCTA.text}
        </span>

        <button className="btn-primary" onClick={scrollToEnroll}>
          {stickyCTA.buttonLabel}
        </button>
      </div>
    </div>
  );
}