import React from 'react';
import { GiHourglass } from 'react-icons/gi';
import { FaVideo, FaGift, FaRegCalendarAlt, FaRegClock, FaDollarSign } from 'react-icons/fa';

const detailItemsDefault = [
  { icon: "hourglass", title: "Duration", desc: "90 minutes of deep work" },
  { icon: "video", title: "Location", desc: "Live on Zoom" },
  { icon: "gift", title: "Bonus", desc: "7-day replay access" },
  { icon: "calendar", title: "Date", desc: "Nov 25, 2025" },
  { icon: "clock", title: "Time", desc: "7:00 PM - 8:30 PM" },
  { icon: "price", title: "Price", desc: "$49" },
];

const ICON_MAP: any = {
  hourglass: <GiHourglass className="text-2xl" />,
  video: <FaVideo className="text-2xl" />,
  gift: <FaGift className="text-2xl" />,
  calendar: <FaRegCalendarAlt className="text-2xl" />,
  clock: <FaRegClock className="text-2xl" />,
  price: <FaDollarSign className="text-2xl" />,
};


export default function OfferSection({
  offerTitle,
  setOfferTitle,
  offerSubtitle,
  setOfferSubtitle,
  mainCardDesc,
  setMainCardDesc,
  detailItems,
  setDetailItems,
  ctaLink,
  setCtaLink,
  ctaLabel,
  setCtaLabel,
}: {
  offerTitle: string;
  setOfferTitle: (v: string) => void;
  offerSubtitle: string;
  setOfferSubtitle: (v: string) => void;
  mainCardDesc: string;
  setMainCardDesc: (v: string) => void;
  detailItems: { icon: any; title: string; desc: string }[];
  setDetailItems: (items: { icon: any; title: string; desc: string }[]) => void;
  ctaLink: string;
  setCtaLink: (v: string) => void;
  ctaLabel: string;
  setCtaLabel: (v: string) => void;
}) {
  // Handler for changing descriptions in details grid
  const handleDetailDescChange = (idx: number, value: string) => {
    const updated = detailItems.map((item, i) =>
      i === idx ? { ...item, desc: value } : item
    );
    setDetailItems(updated);
  };

  return (
    <section className="py-20 px-6 bg-beige" id="offer">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <input
            type="text"
            value={offerTitle}
            onChange={e => setOfferTitle(e.target.value)}
            className="w-full text-5xl font-bold mb-4 text-dark-brown bg-transparent border-b border-[#C2A570] text-center"
          />
          <textarea
            value={offerSubtitle}
            onChange={e => setOfferSubtitle(e.target.value)}
            rows={2}
            className="w-full text-2xl text-dark-brown/70 font-light bg-transparent border-b border-[#C2A570] text-center"
          />
        </div>
        <div className="card max-w-3xl mx-auto mb-12 bg-beige rounded-3xl border border-[#C2A570]/30 shadow-xl p-8 md:p-10 backdrop-blur-lg">
          <textarea
            value={mainCardDesc}
            onChange={e => setMainCardDesc(e.target.value)}
            rows={4}
            className="text-lg text-dark-brown leading-relaxed mb-8 w-full bg-transparent border-b border-[#C2A570]"
          />
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {detailItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-xl flex items-center justify-center shadow-lg border-[2px] border-[#e7debe] flex-shrink-0">
<div className="text-brown drop-shadow-lg">{ICON_MAP[item.icon]}</div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-dark-brown">{item.title}</h4>
                  <input
                    type="text"
                    value={item.desc}
                    onChange={e => handleDetailDescChange(idx, e.target.value)}
                    className="text-dark-brown/70 w-full bg-transparent border-b border-[#C2A570]"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* CTA Button and link */}
          <div className="text-center">
            <input
              type="text"
              value={ctaLabel}
              onChange={e => setCtaLabel(e.target.value)}
              placeholder="Button text"
              className="text-xl font-semibold px-5 py-2 rounded-full mb-2 bg-white border border-[#C2A570]"
            />
            <input
              type="text"
              value={ctaLink}
              onChange={e => setCtaLink(e.target.value)}
              placeholder="Button link"
              className="text-lg px-5 py-2 rounded-full mb-4 bg-white border border-[#C2A570]"
            />
            <button
              className="btn-primary text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => window.location.href = ctaLink}
            >
              {ctaLabel || "Join Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
