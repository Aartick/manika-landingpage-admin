import React from "react";
import {
  FaBullseye,
  FaFileAlt,
  FaVideo,
  FaGift,
} from "react-icons/fa";

interface IncludedItem {
  icon: string;
  title: string;
  desc: string;
}

interface IncludedSectionProps {
  includedSection: {
    title: string;
    items: IncludedItem[];
    bonusTitle: string;
    bonusDesc: string;
  };
}

const ICON_MAP: any = {
  bullseye: <FaBullseye className="text-3xl" />,
  file: <FaFileAlt className="text-3xl" />,
  video: <FaVideo className="text-3xl" />,
  gift: <FaGift className="text-3xl" />,
};

export default function IncludedSectionUI({ includedSection }: IncludedSectionProps) {
  return (
    <section className="py-20 px-6 bg-beige" id="enroll">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
          {includedSection.title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {includedSection.items.map((item, idx) => (
            <div
              key={idx}
              className="card group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] 
              rounded-2xl flex items-center justify-center shadow-lg 
              border-[3px] border-[#e7debe] mb-4 mx-auto 
              group-hover:shadow-2xl transition-shadow duration-300">

                {/* icon from mapped string */}
                <div className="text-brown drop-shadow-xl">
                  {ICON_MAP[item.icon] || null}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-dark-brown text-center">
                {item.title}
              </h3>

              <p className="text-dark-brown/70 text-center">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bonus Box */}
        <div className="mt-12 card bg-gradient-to-br from-amber-100 to-yellow-50 text-center p-6 rounded-2xl">
          <p className="text-2xl font-bold text-dark-brown mb-2">
            {includedSection.bonusTitle}
          </p>
          <p className="text-lg text-dark-brown">
            {includedSection.bonusDesc}
          </p>
        </div>

      </div>
    </section>
  );
}
