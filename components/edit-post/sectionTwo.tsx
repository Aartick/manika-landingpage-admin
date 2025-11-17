import React from 'react';
import { FaSpinner, FaBalanceScale, FaSyncAlt, FaMask, FaRedoAlt } from 'react-icons/fa';

interface Problem {
  text: string;
}

interface ProblemSectionProps {
  problems: Problem[];
  setProblems: React.Dispatch<React.SetStateAction<Problem[]>>;
}

export default function ProblemSection({ problems, setProblems }: ProblemSectionProps) {
  const icons = [FaSpinner, FaBalanceScale, FaSyncAlt, FaMask, FaRedoAlt];

  const updateProblemText = (index: number, text: string) => {
    const newProblems = [...problems];
    newProblems[index].text = text;
    setProblems(newProblems);
  };

  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
          If You've Been Feeling...
        </h2>
        <div className="space-y-6 mb-12">
          {problems.map((problem, idx) => {
            const IconComp = icons[idx];
            return (
              <div
                key={idx}
                className="card flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center shadow-lg border-[3px] border-[#e7debe] flex-shrink-0 group-hover:shadow-2xl transition-shadow duration-300">
                  <IconComp className="text-brown drop-shadow-xl" />
                </div>
                <textarea
                  value={problem.text}
                  onChange={(e) => updateProblemText(idx, e.target.value)}
                  className="text-xl text-dark-brown w-full resize-none border border-[#C2A570] rounded py-2 px-3"
                  rows={2}
                />
              </div>
            );
          })}
        </div>
        <div className="text-center bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-3xl border-l-4 border-amber-600">
          <p className="text-2xl font-semibold text-dark-brown italic">
            "You don't need more mindset hacks. You need to feel safe enough to live differently."
          </p>
        </div>
      </div>
    </section>
  );
}

