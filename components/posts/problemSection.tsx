
import {
  FaSpinner,
  FaBalanceScale,
  FaSyncAlt,
  FaMask,
  FaRedoAlt,
} from "react-icons/fa";

interface Problem {
  text: string;
}

export default function ProblemSection({ problems }: { problems: Problem[] }) {
  if (!problems || problems.length === 0) return null;

  const problemIcons = [
    <FaSpinner className="text-3xl" />,
    <FaBalanceScale className="text-3xl" />,
    <FaSyncAlt className="text-3xl" />,
    <FaMask className="text-3xl" />,
    <FaRedoAlt className="text-3xl" />,
  ];

  return (
    <div className="py-20 px-6 bg-beige w-full mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
          If You've Been Feeling...
        </h2>

        <div className="space-y-6 mb-12">
          {problems.map((problem, idx) => (
            <div
              key={idx}
              className="card flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center shadow-lg border-[3px] border-[#e7debe] flex-shrink-0 group-hover:shadow-2xl transition-shadow duration-300">
                <div className="text-brown drop-shadow-xl">
                  {problemIcons[idx % problemIcons.length]}
                </div>
              </div>

              <p className="text-xl text-dark-brown">{problem.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-3xl border-l-4 border-amber-600">
          <p className="text-2xl font-semibold text-dark-brown italic">
            "You don't need more mindset hacks. You need to feel safe enough to
            live differently."
          </p>
        </div>
      </div>
    </div>
  );
}
