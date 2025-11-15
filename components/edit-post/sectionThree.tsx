import React from 'react';

interface PromiseItem {
  emoji: string;
  title: string;
  desc: string;
}

interface PromiseSectionProps {
  promises: PromiseItem[];
  setPromises: React.Dispatch<React.SetStateAction<PromiseItem[]>>;
  enrollLink: string;
  setEnrollLink: React.Dispatch<React.SetStateAction<string>>;
  scrollToEnroll: () => void;
}

export default function PromiseSection({ promises, setPromises, enrollLink, setEnrollLink, scrollToEnroll }: PromiseSectionProps) {
  const updateTitle = (index: number, value: string) => {
    const newPromises = [...promises];
    newPromises[index].title = value;
    setPromises(newPromises);
  };

  const updateDesc = (index: number, value: string) => {
    const newPromises = [...promises];
    newPromises[index].desc = value;
    setPromises(newPromises);
  };

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-dark-brown">Imagine Feeling...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {promises.map((item, idx) => (
            <div key={idx} className="card text-left">
              <h3 className="text-2xl font-semibold mb-3 text-dark-brown flex items-center gap-3">
                <span>{item.emoji}</span>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateTitle(idx, e.target.value)}
                  className="bg-transparent border-b border-transparent focus:border-b-amber-500 w-full"
                />
              </h3>
              <textarea
                value={item.desc}
                onChange={(e) => updateDesc(idx, e.target.value)}
                className="text-dark-brown/70 w-full resize-none bg-transparent border border-transparent focus:border-amber-500 rounded p-2"
                rows={3}
              />
            </div>
          ))}
        </div>

        {/* Editable button link input */}
        <label className="block mb-2 font-semibold text-left max-w-4xl mx-auto">Transformation Button Link</label>
        <input
          type="text"
          value={enrollLink}
          onChange={(e) => setEnrollLink(e.target.value)}
          placeholder="Enter URL for button"
          className="max-w-4xl w-full p-2 rounded border border-[#C2A570] mb-8"
        />

        <button className="btn-primary text-lg" onClick={scrollToEnroll}>
          Begin Your Transformation
        </button>
      </div>
    </section>
  );
}
