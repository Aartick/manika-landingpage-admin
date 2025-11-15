"use client";
import React from "react";

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
  setIncludedSection: React.Dispatch<
    React.SetStateAction<{
      title: string;
      items: IncludedItem[];
      bonusTitle: string;
      bonusDesc: string;
    }>
  >;
}

export default function IncludedSectionCreate({
  includedSection,
  setIncludedSection,
}: IncludedSectionProps) {
  const updateItem = (index: number, field: "title" | "desc", value: string) => {
    const updated = [...includedSection.items];
    updated[index][field] = value;
    setIncludedSection({ ...includedSection, items: updated });
  };

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <input
          value={includedSection.title}
          onChange={(e) =>
            setIncludedSection({ ...includedSection, title: e.target.value })
          }
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown
          bg-transparent border-b border-[#C2A570] w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {includedSection.items.map((item, idx) => (
            <div
              key={idx}
              className="card p-6 border border-[#C2A570]/30 rounded-2xl"
            >
              <p className="font-semibold text-dark-brown mb-2">{item.icon}</p>

              <input
                value={item.title}
                onChange={(e) => updateItem(idx, "title", e.target.value)}
                className="text-xl font-semibold mb-3 w-full bg-transparent border-b border-[#C2A570]"
              />

              <textarea
                value={item.desc}
                onChange={(e) => updateItem(idx, "desc", e.target.value)}
                className="w-full bg-transparent border border-[#C2A570] rounded p-2 text-dark-brown/70"
                rows={3}
              />
            </div>
          ))}
        </div>

        {/* Bonus Box */}
        <div className="mt-12 card bg-amber-50 p-6 rounded-2xl border border-[#C2A570]/30">
          <input
            value={includedSection.bonusTitle}
            onChange={(e) =>
              setIncludedSection({ ...includedSection, bonusTitle: e.target.value })
            }
            className="text-2xl font-bold text-dark-brown mb-2 
            bg-transparent border-b border-[#C2A570] w-full"
          />

          <textarea
            value={includedSection.bonusDesc}
            onChange={(e) =>
              setIncludedSection({ ...includedSection, bonusDesc: e.target.value })
            }
            rows={2}
            className="w-full bg-transparent border border-[#C2A570] rounded p-2 text-dark-brown"
          />
        </div>
      </div>
    </section>
  );
}
