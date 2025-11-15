import React from "react";
import { FaMagic, FaSpa, FaSeedling, FaGem, FaBook, FaHandHoldingHeart } from "react-icons/fa";

const ICON_MAP: any = {
  magic: <FaMagic className="text-3xl" />,
  spa: <FaSpa className="text-3xl" />,
  seedling: <FaSeedling className="text-3xl" />,
  gem: <FaGem className="text-3xl" />,
  book: <FaBook className="text-3xl" />,
  heart: <FaHandHoldingHeart className="text-3xl" />,
};

export default function ExperienceSection({
  experience,
  setExperience,
}: {
  experience: any;
  setExperience: any;
}) {

  const updateItem = (index: number, field: "title" | "desc", value: string) => {
    const updated = [...experience.items];
    updated[index][field] = value;

    setExperience({
      ...experience,
      items: updated,
    });
  };

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-6xl mx-auto">

        {/* Editable title */}
        <input
          type="text"
          value={experience.title}
          onChange={(e) => setExperience({ ...experience, title: e.target.value })}
          className="w-full text-4xl md:text-5xl font-bold mb-12 text-center bg-transparent border-b border-[#C2A570]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experience.items.map((item: any, idx: number) => (
            <div key={idx} className="card group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center shadow-lg border-[3px] border-[#e7debe] mx-auto">
                {ICON_MAP[item.icon]}
              </div>

              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(idx, "title", e.target.value)}
                className="text-xl font-semibold text-center mt-4 mb-3 bg-transparent border-b border-[#C2A570]"
              />

              <textarea
                rows={2}
                value={item.desc}
                onChange={(e) => updateItem(idx, "desc", e.target.value)}
                className="text-dark-brown/70 text-center bg-transparent border border-[#C2A570] rounded p-2 w-full"
              />
            </div>
          ))}
        </div>

        {/* Editable bottom text */}
        <textarea
          value={experience.description}
          onChange={(e) =>
            setExperience({ ...experience, description: e.target.value })
          }
          className="card max-w-3xl mx-auto bg-beige p-4 text-lg text-center border border-[#C2A570]"
          rows={4}
        />
      </div>
    </section>
  );
}
