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
import VideoPlayer from "@/components/posts/VideoPlayer";
import AboutManika from "@/components/posts/AboutManika";
import StickyCTAWrapped from "@/components/posts/StickyCTAWrapped";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Note the Promise<>
}) {
  const { slug } = await params; // await the params Promise here

  // 🔥 Fetch by slug (server-side)
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");


  const res = await fetch(`${baseUrl}/api/posts/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const post = await res.json();

  // Icons
  const cardIcons = [GiHourglass, GiLaurelCrown, GiCrystalBars];
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
                <a href="/" className="btn-primary text-lg">Back to Home</a>
              )}
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-[1.75rem] bg-gradient-to-br from-[#F6F0DE] via-[#F4F0CD] to-[#ECDFBC] p-4 md:p-6 shadow-2xl sm:rounded-[2rem] sm:p-6 lg:p-10">
              <div className="relative rounded-[1.25rem] bg-white p-3 md:p-5 shadow-inner sm:rounded-[1.5rem] sm:p-6 lg:p-8">
                <VideoPlayer videoUrl={post.videoUrl} />
              </div>

              {/* Golden Dots */}
              <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gradient-to-br from-[#C79348] to-[#C8A030] shadow-lg sm:-top-3 sm:-right-3 sm:h-6 sm:w-6" />
              <div className="absolute -bottom-2 -left-2 h-5 w-5 rounded-full bg-gradient-to-br from-[#DEC966] to-[#EADF9E] shadow-lg sm:-bottom-3 sm:-left-3 sm:h-6 sm:w-6" />
            </div>
          </div>

        </div>

        {/* CARDS SECTION */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
          {post.cards?.map((card: any, i: number) => {
            const IconComp = cardIcons[i % cardIcons.length];
            return (
              <div key={i} className="rounded-3xl bg-beige p-6 shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5 border-[3px] border-[#e7debe]">
                  <IconComp />
                </div>
                <h3 className="font-semibold text-xl mb-2 text-dark-brown">
                  {card.title}
                </h3>
                <p className="text-dark-brown/70">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Remaining Sections */}
        <ProblemSection problems={post.problems} />
        <PromiseSectionView promises={post.promises} enrollLink={post.enrollLink} />
        <OfferSectionView {...post.offer} />
        <ExperienceSection experience={post.experience} />
        <WhySectionUser whySection={post.whySection} />
        <WhoSection whoSection={post.whoSection} />
        <AboutManika />
        <IncludedSectionUI includedSection={post.includedSection} />
<StickyCTAWrapped stickyCTA={post.stickyCTA} />

      </section>
<footer className="w-full bg-beige py-25 px-6">
  <div className="max-w-4xl mx-auto text-center px-6 pb-24">  {/* Added pb-24 here */}
    <h2 className="text-4xl md:text-6xl font-bold mb-6">
      You're Not Here By Chance
    </h2>
    <p className="text-2xl mb-8 font-light">Your healing has been calling.</p>
    {/* <button className="btn-primary text-xl mb-8">
      Reserve Your Seat Now
    </button> */}
    <p className="text-xl italic opacity-90">
      You were always enough. You always mattered. It's time to remember.
    </p>
  </div>
</footer>
    </>
  );
}