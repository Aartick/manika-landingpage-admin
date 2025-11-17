import React from 'react';
import { GiHourglass } from 'react-icons/gi';
import { FaVideo, FaGift, FaRegCalendarAlt, FaRegClock, FaDollarSign } from 'react-icons/fa';

interface OfferSectionViewProps {
  title: string;
  subtitle: string;
  description: string;
  details: { title: string; desc: string }[];
  ctaLabel: string;
  ctaLink: string;
}

export default function OfferSectionView({
  title,
  subtitle,
  description,
  details,
  ctaLabel,
  ctaLink,
}: OfferSectionViewProps) {
  // Use matching icons for grid (must match order from backend)
  const icons = [
    <GiHourglass className="text-2xl" />,
    <FaVideo className="text-2xl" />,
    <FaGift className="text-2xl" />,
    <FaRegCalendarAlt className="text-2xl" />,
    <FaRegClock className="text-2xl" />,
    <FaDollarSign className="text-2xl text-center" />,
  ];

  return (
    <section className="py-20 px-6 bg-beige" id="offer">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-dark-brown">{title}</h2>
          <p className="text-2xl text-dark-brown/70 font-light">{subtitle}</p>
        </div>
        <div className="card max-w-3xl mx-auto mb-12 bg-beige rounded-3xl border border-[#C2A570]/30 shadow-xl p-8 md:p-10 backdrop-blur-lg">
          <p className="text-lg text-dark-brown leading-relaxed mb-8">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {details && details.length > 0 &&
              details.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-xl flex items-center justify-center shadow-lg border-[2px] border-[#e7debe] flex-shrink-0">
                    <div className="text-brown drop-shadow-lg">{icons[idx]}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-dark-brown">{item.title}</h4>
                    <p className="text-dark-brown/70">{item.desc}</p>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="text-center">
            <a
              className="btn-primary text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 inline-block"
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaLabel || "Join Now"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
