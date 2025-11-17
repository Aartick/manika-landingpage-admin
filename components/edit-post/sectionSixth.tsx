"use client";

interface WhyItem {
  title: string;
  desc: string;
}

interface WhySectionProps {
  whySection: { title: string; items: WhyItem[] };
  setWhySection: React.Dispatch<
    React.SetStateAction<{ title: string; items: WhyItem[] }>
  >;
}

export default function WhySection({ whySection, setWhySection }: WhySectionProps) {
  const updateItem = (index: number, field: "title" | "desc", value: string) => {
    const updated = [...whySection.items];
    updated[index][field] = value;
    setWhySection({ ...whySection, items: updated });
  };

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <input
          type="text"
          value={whySection.title}
          onChange={(e) =>
            setWhySection({ ...whySection, title: e.target.value })
          }
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown bg-transparent border-b border-[#C2A570] w-full"
        />

        {/* Items */}
        <div className="space-y-8">
          {whySection.items.map((item, idx) => (
            <div
              key={idx}
              className="card border-l-4 border-[#C2A570] p-6"
            >
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(idx, "title", e.target.value)}
                className="text-2xl font-semibold mb-4 text-dark-brown bg-transparent border-b border-[#C2A570] w-full"
              />

              <textarea
                value={item.desc}
                onChange={(e) => updateItem(idx, "desc", e.target.value)}
                rows={3}
                className="text-lg text-dark-brown/70 bg-transparent border border-[#C2A570] p-3 rounded w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
