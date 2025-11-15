import React from "react";

interface WhyItem {
  title: string;
  desc: string;
}

interface WhySectionProps {
  whySection: {
    title: string;
    items: WhyItem[];
  };
}

export default function WhySectionUser({ whySection }: WhySectionProps) {
  if (!whySection) return null;

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
          {whySection.title}
        </h2>

        <div className="space-y-8">
          {whySection.items?.map((item, idx) => (
            <div
              key={idx}
              className="card border-l-4 border-[#C2A570] p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 text-dark-brown">
                {item.title}
              </h3>
              <p className="text-lg text-dark-brown/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
