import React from 'react';

interface PromiseItem {
  emoji: string;
  title: string;
  desc: string;
}

interface PromiseSectionViewProps {
  promises: PromiseItem[];
  enrollLink?: string;
}

export default function PromiseSectionView({ promises, enrollLink }: PromiseSectionViewProps) {
  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-dark-brown">
          Imagine Feeling...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {promises.map((item, idx) => (
            <div key={idx} className="card text-left">
              <h3 className="text-2xl font-semibold mb-3 text-dark-brown flex items-center gap-3">
                <span>{item.emoji}</span> {item.title}
              </h3>
              <p className="text-dark-brown/70">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-2xl font-semibold text-dark-brown mb-8">
          That's what this workshop is designed to create for you.
        </p>
        {enrollLink &&
          <a
  className="btn-primary text-lg block w-full max-w-xs mx-auto py-3 px-6 rounded-lg text-center sm:inline-block sm:w-auto"
  href={enrollLink}
  target="_blank"
  rel="noopener noreferrer"
>
  Begin Your Transformation
</a>

        }
      </div>
    </section>
  );
}
