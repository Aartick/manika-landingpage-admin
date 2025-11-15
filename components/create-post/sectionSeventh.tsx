import React from "react";

interface WhoSectionProps {
  whoSection: {
    title: string;
    forYou: string[];
    notForYou: string[];
  };
  setWhoSection: React.Dispatch<
    React.SetStateAction<{
      title: string;
      forYou: string[];
      notForYou: string[];
    }>
  >;
}

export default function WhoSectionCreate({ whoSection, setWhoSection }: WhoSectionProps) {
  
  const updateListItem = (list: "forYou" | "notForYou", index: number, value: string) => {
    const updated = [...whoSection[list]];
    updated[index] = value;
    setWhoSection({ ...whoSection, [list]: updated });
  };

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <input
          type="text"
          value={whoSection.title}
          onChange={e => setWhoSection({ ...whoSection, title: e.target.value })}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown bg-transparent w-full border-b border-[#C2A570]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* FOR YOU */}
          <div className="card p-6">
            <h3 className="text-2xl font-bold mb-6 text-green-800">✓ For You If:</h3>

            {whoSection.forYou.map((item, idx) => (
              <input
                key={idx}
                type="text"
                value={item}
                onChange={e => updateListItem("forYou", idx, e.target.value)}
                className="w-full mb-4 p-2 border border-[#C2A570] rounded bg-transparent"
              />
            ))}
          </div>

          {/* NOT FOR YOU */}
          <div className="card p-6">
            <h3 className="text-2xl font-bold mb-6 text-red-800">✗ Not For You If:</h3>

            {whoSection.notForYou.map((item, idx) => (
              <input
                key={idx}
                type="text"
                value={item}
                onChange={e => updateListItem("notForYou", idx, e.target.value)}
                className="w-full mb-4 p-2 border border-[#C2A570] rounded bg-transparent"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
