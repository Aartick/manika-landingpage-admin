import React from "react";
import {
  FaMagic,
  FaSpa,
  FaSeedling,
  FaGem,
  FaBook,
  FaHandHoldingHeart,
} from "react-icons/fa";

const ICON_MAP: Record<string, React.ReactElement> = {
  magic: <FaMagic className="text-3xl" />,
  spa: <FaSpa className="text-3xl" />,
  seedling: <FaSeedling className="text-3xl" />,
  gem: <FaGem className="text-3xl" />,
  book: <FaBook className="text-3xl" />,
  heart: <FaHandHoldingHeart className="text-3xl" />,
};

interface ExperienceItem {
  icon: string;
  title: string;
  desc: string;
}

interface ExperienceData {
  title: string;
  description: string;
  items: ExperienceItem[];
}

export default function ExperienceSection({ experience }: { experience: ExperienceData }) {
  if (!experience) return null;

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
          {experience.title}
        </h2>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experience.items.map((item, idx) => (
            <div
              key={idx}
              className="card group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center shadow-lg border-[3px] border-[#e7debe] mb-4 mx-auto group-hover:shadow-2xl transition-shadow duration-300">
                <div className="text-brown drop-shadow-xl">
                  {ICON_MAP[item.icon] ?? ICON_MAP["magic"]}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-brown text-center">
                {item.title}
              </h3>
              <p className="text-dark-brown/70 text-center">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Description */}
        <div className="card max-w-3xl mx-auto bg-beige p-6 rounded-2xl shadow border border-[#C2A570]/30">
          <p className="text-lg text-dark-brown leading-relaxed text-center">
            {experience.description}
          </p>
        </div>
      </div>
    </section>
  );
}
