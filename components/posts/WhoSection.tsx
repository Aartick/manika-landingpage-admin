import React from "react";

interface WhoSectionProps {
  whoSection: {
    title: string;
    forYou: string[];
    notForYou: string[];
  };
}

export default function WhoSection({ whoSection }: WhoSectionProps) {
  if (!whoSection) return null;

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
          {whoSection.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* FOR YOU LIST */}
          <div className="card p-6">
            <h3 className="text-2xl font-bold mb-6 text-green-800">✓ For You If:</h3>

            <ul className="space-y-4">
              {whoSection.forYou?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">•</span>
                  <span className="text-dark-brown">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NOT FOR YOU LIST */}
          <div className="card p-6">
            <h3 className="text-2xl font-bold mb-6 text-red-800">✗ Not For You If:</h3>

            <ul className="space-y-4">
              {whoSection.notForYou?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-red-600 font-bold text-xl">•</span>
                  <span className="text-dark-brown">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
