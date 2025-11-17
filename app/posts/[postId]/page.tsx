"use client";
import { notFound } from "next/navigation";
import { 
  GiHourglass, 
  GiLaurelCrown, 
  GiCrystalBars 
} from "react-icons/gi";

import {
  FaSpinner,
  FaBalanceScale,
  FaSyncAlt,
  FaMask,
  FaRedoAlt,
  FaQuoteLeft
} from "react-icons/fa";
import ProblemSection from "@/components/posts/problemSection";
import PromiseSectionView from "@/components/posts/promiseSection";
import OfferSectionView from "@/components/posts/offerSection";
import ExperienceSection from "@/components/posts/ExperienceSection";
import WhySectionUser from "@/components/posts/WhySection";
import WhoSection from "@/components/posts/WhoSection";
import IncludedSectionUI from "@/components/posts/IncludedSection";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import StickyCTA from "@/components/posts/StickyCTA";
import StickyCTAWrapped from "@/components/posts/StickyCTAWrapped";

  




export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/posts/${postId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const post = await res.json();

  console.log("STICKY CTA DATA:", JSON.stringify(post.stickyCTA, null, 2));

  // Icons used in the cards
  const cardIcons = [GiHourglass, GiLaurelCrown, GiCrystalBars];

  // Icons for the problem section
  const problemIcons = [
    <FaSpinner className="text-3xl" />,
    <FaBalanceScale className="text-3xl" />,
    <FaSyncAlt className="text-3xl" />,
    <FaMask className="text-3xl" />,
    <FaRedoAlt className="text-3xl" />,
  ];

  return (
    <>

      {/* HERO + IMAGE SECTION */}
      <section className="bg-beige py-20 px-6 flex flex-col items-center text-dark-brown">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT — Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-dark-brown">
              {post.title}
            </h1>

            <h2 className="text-2xl md:text-3xl mb-8 font-light text-dark-brown">
              {post.subtitle}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              {post.buttons && post.buttons.length > 0 ? (
                post.buttons.map(
                  (btn: { label: string; url: string }, i: number) => (
                    <a
                      key={i}
                      href={btn.url}
                      className={i === 0 ? "btn-primary text-lg" : "btn-secondary"}
                    >
                      {btn.label}
                    </a>
                  )
                )
              ) : (
                <a href="/" className="btn-primary text-lg">
                  Back to Home
                </a>
              )}
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-[1.75rem] bg-gradient-to-br from-[#F6F0DE] via-[#F4F0CD] to-[#ECDFBC] p-4 md:p-6 shadow-2xl sm:rounded-[2rem] sm:p-6 lg:p-10">

              <div className="relative rounded-[1.25rem] bg-white p-3 md:p-5 shadow-inner sm:rounded-[1.5rem] sm:p-6 lg:p-8">
                <div className="relative overflow-hidden rounded-xl shadow-lg sm:rounded-[1rem]">
                  <img
                    src={post.imageUrl || "/fallback.jpg"}
                    alt={post.title}
                    className="h-[440px] md:h-[600px] w-full object-cover transition-all duration-500 hover:scale-105 sm:h-[350px] lg:h-[580px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
              </div>

              {/* Golden Dots */}
              <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gradient-to-br from-[#C79348] to-[#C8A030] shadow-lg sm:-top-3 sm:-right-3 sm:h-6 sm:w-6" />
              <div className="absolute -bottom-2 -left-2 h-5 w-5 rounded-full bg-gradient-to-br from-[#DEC966] to-[#EADF9E] shadow-lg sm:-bottom-3 sm:-left-3 sm:h-6 sm:w-6" />

              {/* Accents */}
              <div className="absolute top-3 right-3 h-0.5 w-6 bg-gradient-to-r from-[#C79348] to-transparent sm:w-8" />
              <div className="absolute top-3 right-3 h-6 w-0.5 bg-gradient-to-b from-[#C79348] to-transparent sm:h-8" />
              <div className="absolute bottom-3 left-3 h-0.5 w-6 bg-gradient-to-l from-[#DEC966] to-transparent sm:w-8" />
              <div className="absolute bottom-3 left-3 h-6 w-0.5 bg-gradient-to-t from-[#DEC966] to-transparent sm:h-8" />

            </div>

            {/* Floating Quote */}
            <div className="absolute left-1/2 -bottom-6 w-[92%] md:w-[88%] max-w-sm -translate-x-1/2">
              <div className="rounded-2xl border border-[#DDC48B]/20 bg-white/95 p-3 shadow-2xl backdrop-blur-md sm:p-4">
                <p className="text-center text-sm font-medium leading-relaxed italic text-brown sm:text-base">
                  Inspired Guidance for Inner Transformation
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CARDS SECTION */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
          {post.cards && post.cards.length > 0 &&
            post.cards.map(
              (card: { title: string; description: string }, i: number) => {
                const IconComp = cardIcons[i % cardIcons.length];
                return (
                  <div
                    key={i}
                    className="rounded-3xl bg-beige backdrop-blur-lg border border-[#C2A570]/30 shadow-xl hover:scale-105 transition-all duration-300 p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center text-4xl shadow-lg mx-auto mb-5 border-[3px] border-[#e7debe]">
                      <IconComp className="text-brown drop-shadow-xl" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-dark-brown">
                      {card.title}
                    </h3>
                    <p className="text-dark-brown/70">{card.description}</p>
                  </div>
                );
              }
            )}
        </div>
{/* ⭐⭐⭐ PROBLEM SECTION (FULLY DYNAMIC) ⭐⭐⭐ */}
<ProblemSection problems={post.problems} />

<PromiseSectionView promises={post.promises} enrollLink={post.enrollLink} />

<OfferSectionView
  title={post.offer.title}
  subtitle={post.offer.subtitle}
  description={post.offer.description}
  details={post.offer.details}
  ctaLabel={post.offer.ctaLabel}
  ctaLink={post.offer.ctaLink}
/>

      <ExperienceSection experience={post.experience} />

<WhySectionUser whySection={post.whySection} />

<WhoSection whoSection={post.whoSection} />

 {/* About Manika */}
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

 {/* Testimonials */}
   <section className="py-20 px-6 bg-beige">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold mb-14 text-center text-dark-brown font-inter tracking-tight uppercase">
      What Women Are Saying
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
      {[
        {
          text: "This work changed the way I relate to myself forever. I finally understand why I've been running from my own worth.",
          author: "A.K.",
        },
        {
          text: "I've done years of personal development, but this was the first time I felt the shift in my body. It's not just intellectual anymore.",
          author: "M.T.",
        },
        {
          text: "Manika held space in a way I've never experienced. I felt safe enough to go to places I've been avoiding for years.",
          author: "S.L.",
        },
        {
          text: "The SPACE™ Method gave me tools I use daily. This workshop was the beginning of my real healing journey.",
          author: "J.R.",
        },
      ].map((testimonial, idx) => (
        <div
          key={idx}
          className="flex-1 rounded-2xl bg-beige shadow-lg p-8 border-l-8 border-[#C2A570] hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Quote Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-[#e7debe]">
            <FaQuoteLeft className="text-xl text-brown drop-shadow-lg" />
          </div>

          <p className="text-lg leading-relaxed text-dark-brown italic mb-6">
            {testimonial.text}
          </p>

          <p className="text-right font-semibold text-dark-brown/70 tracking-wide">
            - {testimonial.author}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<IncludedSectionUI includedSection={post.includedSection} />






      </section>
   <footer className="w-full bg-[#2D2A26] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#F4EDE4]">
            You're Not Here By Chance
          </h2>
          <p className="text-2xl mb-8 font-light text-[#F4EDE4]">Your healing has been calling.</p>
          <p className="text-xl italic opacity-90 text-[#F4EDE4]">
            You were always enough. You always mattered. It's time to remember.
          </p>
        </div>
      </footer>

      <StickyCTAWrapped stickyCTA={post.stickyCTA} />

    </>
  );
}
