'use client';

export default function AboutManika() {
  return (
    <section className="py-20 px-6 bg-beige" id="about">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
          Meet Manika
        </h2>
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start bg-white/80 card rounded-3xl p-8 shadow-lg border border-[#E5DDD5]/70">
          {/* Manika's Photo with golden accents */}
          <div className="relative flex-shrink-0 w-56 h-56">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C2A570]/20 to-[#D4B882]/20 rounded-full blur-xl"></div>
            <div className="relative rounded-full overflow-hidden border-4 border-[#C2A570] shadow-2xl w-56 h-56" style={{boxShadow: '0 6px 48px rgba(200, 160, 48, 0.3)'}}>
              <img 
                src="/image1.jpg"
                alt="Manika, Shadow Work Healer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-[#D4B882] to-[#C2A570] rounded-full border-2 border-white shadow-lg"></div>
          </div>
          {/* Bio */}
          <div className="flex-1">
            <p className="text-lg text-dark-brown leading-relaxed mb-6">
              Manika is an Inner Child and Shadow Work Healer and creator of the SPACE™ Method. She has guided women across the world to heal core wounds, rewire survival patterns, and reclaim their golden shadow.
            </p>
            <p className="text-lg text-dark-brown leading-relaxed">
              With a deep understanding of the nervous system, somatic practices, and transformational psychology, Manika creates safe containers for women to do the courageous work of coming home to themselves.
            </p>
            <button
              className="btn-primary mt-4"
              onClick={() => window.open("http://manikaaggarwal.com/", "_blank")}
              type="button"
            >
              Meet Manika
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
