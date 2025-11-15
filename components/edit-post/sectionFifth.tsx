import React from "react";
import { FaMagic, FaSpa, FaSeedling, FaGem, FaBook, FaHandHoldingHeart } from "react-icons/fa";

const ICON_MAP = {
  magic: <FaMagic className="text-3xl" />,
  spa: <FaSpa className="text-3xl" />,
  seedling: <FaSeedling className="text-3xl" />,
  gem: <FaGem className="text-3xl" />,
  book: <FaBook className="text-3xl" />,
  heart: <FaHandHoldingHeart className="text-3xl" />,
} as const;

type IconKey = keyof typeof ICON_MAP;

interface ExperienceItem {
  icon: IconKey;
  title: string;
  desc: string;
}

interface Experience {
  title: string;
  description: string;
  items: ExperienceItem[];
}

export default function ExperienceSectionEdit({
  experience,
  setExperience,
}: {
  experience: Experience;
  setExperience: React.Dispatch<React.SetStateAction<Experience>>;
}) {
  const updateItem = (index: number, field: "title" | "desc", value: string) => {
    const updatedItems = [...experience.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setExperience({ ...experience, items: updatedItems });
  };

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-6xl mx-auto">
        <input
          type="text"
          value={experience.title}
          onChange={(e) => setExperience({ ...experience, title: e.target.value })}
          className="text-4xl md:text-5xl font-bold mb-12 w-full text-center bg-transparent border-b border-[#C2A570]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experience.items.map((item: ExperienceItem, idx: number) => (
            <div key={idx} className="card group hover:scale-[1.02] transition-transform duration-300 p-5">
              <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl mx-auto flex items-center justify-center shadow-lg border-[3px] border-[#e7debe] mb-4">
                {ICON_MAP[item.icon]}
              </div>

              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(idx, "title", e.target.value)}
                className="text-xl font-semibold mb-3 w-full text-center bg-transparent border-b border-[#C2A570]"
              />

              <textarea
                value={item.desc}
                onChange={(e) => updateItem(idx, "desc", e.target.value)}
                className="w-full bg-transparent text-center border border-[#C2A570] rounded p-2"
                rows={2}
              />
            </div>
          ))}
        </div>
        <textarea
          value={experience.description}
          onChange={(e) => setExperience({ ...experience, description: e.target.value })}
          className="w-full text-center bg-transparent border-b border-[#C2A570] mb-10"
          rows={3}
        />
      </div>
    </section>
  );
}
