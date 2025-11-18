'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GiHourglass, GiLaurelCrown, GiCrystalBars } from 'react-icons/gi';
import ProblemSection from '@/components/create-post/sectionTwo';
import PromiseSection from '@/components/create-post/sectionThree';
import OfferSection from '@/components/create-post/sectionFourth';
import ExperienceSection from '@/components/create-post/sectionFifth';
import WhySection from '@/components/create-post/sectionSixth';
import WhoSectionCreate from '@/components/create-post/sectionSeventh';
import IncludedSectionCreate from '@/components/create-post/sectionEight';

export default function NewPostPage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");


  // Hero
  const [headline, setHeadline] = useState('Heal the Wound of Not-Enoughness');
  const [subheading, setSubheading] = useState(
    'A 90-minute somatic shadow-work workshop for women ready to release guilt, shame, and self-criticism'
  );
const [videoFile, setVideoFile] = useState<File | null>(null);
const [videoPreview, setVideoPreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Buttons
  const [btn1Label, setBtn1Label] = useState('Reserve Your Seat');
  const [btn1Url, setBtn1Url] = useState('#enroll');
  const [btn2Label, setBtn2Label] = useState('Learn More');
  const [btn2Url, setBtn2Url] = useState('#about');

  // Cards
  const [cards, setCards] = useState([
    { title: '90 Minutes', description: 'Deep transformative work' },
    { title: 'Live Workshop', description: 'Interactive & guided' },
    { title: 'Bonus Resources', description: 'Guides & replay access' },
  ]);

  // Problems (same shape)
  const [problems, setProblems] = useState([
    { text: 'Constantly over-giving and still feeling unseen' },
    { text: 'Stuck between wanting peace and craving control' },
    { text: 'Tired of healing but still spiraling back into the same story' },
    { text: 'Performing worthiness instead of feeling it' },
    { text: 'Caught in patterns you can see but can\'t seem to break' },
  ]);

  // Promises
  const [promises, setPromises] = useState([
    { emoji: '✨', title: 'Grounded, clear, unapologetic', desc: 'No more second-guessing every decision' },
    { emoji: '🕊️', title: 'Calm inside your body', desc: 'Instead of constantly fighting it' },
    { emoji: '💎', title: 'Free from proving your worth', desc: "Simply knowing you're enough" },
    { emoji: '🌸', title: 'At home in yourself', desc: 'Safe to be seen and take up space' },
  ]);
  const [enrollLink, setEnrollLink] = useState('#');

  // Offer section state
  const [offerTitle, setOfferTitle] = useState("The Shadow Work Workshop");
  const [offerSubtitle, setOfferSubtitle] = useState("A guided deep-dive into your shadow to reclaim your self-worth and power");
  const [mainCardDesc, setMainCardDesc] = useState("This 90-minute immersive experience ...");

  // IMPORTANT — icons are stored as STRING IDs here (not JSX). OfferSection maps to JSX.
  const [detailItems, setDetailItems] = useState([
    { icon: "hourglass", title: 'Duration', desc: '90 minutes of deep work' },
    { icon: "video", title: 'Location', desc: 'Live on Zoom' },
    { icon: "gift", title: 'Bonus', desc: '7-day replay access' },
    { icon: "calendar", title: 'Date', desc: 'Nov 25, 2025' },
    { icon: "clock", title: 'Time', desc: '7:00 PM - 8:30 PM' },
    { icon: "price", title: 'Price', desc: '$49' },
  ]);

  const [ctaLink, setCtaLink] = useState("#offer");
  const [ctaLabel, setCtaLabel] = useState("Join Now");

  const [experience, setExperience] = useState({
  title: "What You'll Experience",
  description: "The experience blends guided meditation...",
  items: [
    { icon: "magic", title: "Release Emotional Charge", desc: "From old triggers..." },
    { icon: "spa", title: "Somatic Grounding Tool", desc: "Learn a practice..." },
    { icon: "seedling", title: "Meet Your Inner Parts", desc: "Understand the part..." },
    { icon: "gem", title: "Reclaim Your Golden Shadow", desc: "Reconnect..." },
    { icon: "book", title: "SPACE™ Journaling", desc: "Guided reflection..." },
    { icon: "heart", title: "Safe Container", desc: "Held space..." },
  ],
});

const [whySection, setWhySection] = useState({
  title: "Why This Isn't Another Feel-Good Session",
  items: [
    {
      title: "Most healing work stays in the mind.",
      desc: "This takes you into the body, the nervous system, and the subconscious stories where patterns actually live.",
    },
    {
      title: "It's not about affirming you're enough.",
      desc: "It's about feeling it in every cell—shifting from knowing intellectually to embodying deeply.",
    },
    {
      title: "This isn't surface-level self-care.",
      desc: "It's a courageous meeting with the parts of you that have been waiting to be seen, heard, and integrated.",
    },
  ],
});

const [whoSection, setWhoSection] = useState({
  title: "Is This For You?",
  forYou: [
    "You're ready to meet your emotions without bypassing them",
    "You've done therapy or coaching and want to go deeper",
    "You crave a safe space to understand your patterns",
    "You're committed to your healing journey"
  ],
  notForYou: [
    "You want a quick fix or instant results",
    "You're not ready to sit with discomfort",
    "You prefer to stay in your comfort zone",
    "You're looking for someone to fix you"
  ]
});

const [includedSection, setIncludedSection] = useState({
  title: "What's Included",
  items: [
    { icon: "bullseye", title: "Live 90-Minute Workshop", desc: "Fully guided somatic shadow work experience" },
    { icon: "file", title: "SPACE™ Reflection Guide PDF", desc: "Downloadable workbook for continued integration" },
    { icon: "video", title: "7-Day Replay Access", desc: "Revisit workshop" },
    { icon: "gift", title: "Bonus Grounding Meditation", desc: "Exclusive audio" },
  ],
  bonusTitle: "🎉 Early Bird Bonus",
  bonusDesc: "Register in the next 48 hours and receive a free 15-minute integration call",
});

const [stickyCTA, setStickyCTA] = useState({
  text: "Ready to begin your transformation?",
  buttonLabel: "Reserve Your Seat",
  buttonLink: "#enroll"
});



  // Save handler
const handleSave = async () => {
  setLoading(true);

  let videoBase64 = '';

  // Validate video presence
  if (!videoFile && !videoPreview) {
    alert('Please upload a video before saving.');
    setLoading(false);
    return;
  }


  if (videoFile) {
    try {
      videoBase64 = await getBase64(videoFile);
    } catch (e) {
      alert('Failed to process the video. Please try again.');
      setLoading(false);
      return;
    }
  } else {
    videoBase64 = videoPreview;
  }

  if (!slug.trim()) {
    alert('Slug is required! Please enter a slug.');
    setLoading(false);
    return;
  }


  // Continue saving data as usual
  const postData = {
    title: headline,
    subtitle: subheading,
    videoUrl: videoBase64 || videoPreview || '',
    buttons: [
      { label: btn1Label, url: btn1Url },
      { label: btn2Label, url: btn2Url },
    ],
    cards,
    problems,
    promises,
    enrollLink,
    offer: {
      title: offerTitle,
      subtitle: offerSubtitle,
      description: mainCardDesc,
      details: detailItems.map((item) => ({
        icon: item.icon,
        title: item.title,
        desc: item.desc,
      })),
      ctaLabel,
      ctaLink,
    },
    experience,
    whySection,
    whoSection,
    includedSection,
    stickyCTA,
    slug,
  };

  // proceed with save API call as before
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error('Save failed response:', res.status, errText);
      alert('Failed to save post. Please try again.');
      setLoading(false);
      return;
    }
    alert('Post saved successfully!');
    router.push('/admin/dashboard');
  } catch (error) {
    console.error('Error saving post:', error);
    alert('Error saving post. Please try again.');
    setLoading(false);
  }
};


useEffect(() => {
  if (!videoFile) return;

  const objectUrl = URL.createObjectURL(videoFile);
  setVideoPreview(objectUrl) ;

  return () => URL.revokeObjectURL(objectUrl);
}, [videoFile]);


const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      let result = reader.result as string;

      // Force proper MIME type for video
      if (!result.startsWith("data:video")) {
        const base64 = result.split(",")[1];
        result = `data:video/mp4;base64,${base64}`;
      }

      resolve(result);
    };

    reader.onerror = (error) => reject(error);
  });
};


  const updateCard = (index: number, field: 'title' | 'description', value: string) => {
    setCards(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

  return (
    <div className="bg-background bg-beige min-h-screen text-dark-brown">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-beige shadow-md border-b-2 border-[#C2A570]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-dark-brown">Create New Post</h1>
          <div className="flex gap-3">
            <button 
              className="btn-secondary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all" 
              onClick={handleCancel} 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              className="btn-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all" 
              onClick={handleSave} 
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        <div>
  <label className="block mb-2 font-bold text-dark-brown">Slug (URL)</label>
  <input
    type="text"
    value={slug}
    onChange={(e) => setSlug(e.target.value)}
    onBlur={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""))}
    placeholder="enter-custom-slug"
    className="w-full p-3 rounded-lg border-2 border-[#C2A570] text-dark-brown focus:ring-2 focus:ring-[#C2A570] focus:outline-none"
  />
  <p className="text-sm text-dark-brown/70 mt-1">
    Example: shadow-work-session → final URL will be /shadow-work-session
  </p>
</div>

        {/* Hero Section */}
        <section className="bg-beige py-12 px-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-dark-brown border-b-2 border-[#C2A570] pb-3">Hero Section</h2>
          
          <div className="flex flex-col lg:flex-row items-start gap-10">
            <div className="flex-1 space-y-6">
              <div>
                <label className="block mb-2 font-bold text-dark-brown" htmlFor="headline">Headline</label>
<input 
  id="headline" 
  type="text" 
  value={headline} 
  onChange={(e) => {
    const val = e.target.value;
    setHeadline(val);
    setSlug(prev => prev ? prev : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  }} 
  className="w-full p-3 rounded-lg border-2 border-[#C2A570] text-dark-brown focus:ring-2 focus:ring-[#C2A570] focus:outline-none" 
/>
              </div>
              
              <div>
                <label className="block mb-2 font-bold text-dark-brown" htmlFor="subheading">Subheading</label>
                <textarea 
                  id="subheading" 
                  value={subheading} 
                  onChange={e => setSubheading(e.target.value)} 
                  className="w-full p-3 rounded-lg border-2 border-[#C2A570] text-dark-brown focus:ring-2 focus:ring-[#C2A570] focus:outline-none" 
                  rows={4} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3">
                  <label className="block font-semibold text-dark-brown">Button 1 Label</label>
                  <input 
                    type="text" 
                    value={btn1Label} 
                    onChange={e => setBtn1Label(e.target.value)} 
                    className="w-full p-2.5 rounded-lg border-2 border-[#C2A570] focus:ring-2 focus:ring-[#C2A570] focus:outline-none" 
                  />
                  <label className="block font-semibold text-dark-brown">Button 1 Link/Url</label>
                  <input 
                    type="text" 
                    value={btn1Url} 
                    onChange={e => setBtn1Url(e.target.value)} 
                    className="w-full p-2.5 rounded-lg border-2 border-[#C2A570] focus:ring-2 focus:ring-[#C2A570] focus:outline-none" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="block font-semibold text-dark-brown">Button 2 Label</label>
                  <input 
                    type="text" 
                    value={btn2Label} 
                    onChange={e => setBtn2Label(e.target.value)} 
                    className="w-full p-2.5 rounded-lg border-2 border-[#C2A570] focus:ring-2 focus:ring-[#C2A570] focus:outline-none" 
                  />
                  <label className="block font-semibold text-dark-brown">Button 2 Link/Url</label>
                  <input 
                    type="text" 
                    value={btn2Url} 
                    onChange={e => setBtn2Url(e.target.value)} 
                    className="w-full p-2.5 rounded-lg border-2 border-[#C2A570] focus:ring-2 focus:ring-[#C2A570] focus:outline-none" 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href={btn1Url} className="btn-primary text-lg px-6 py-3 text-center rounded-lg">{btn1Label}</a>
                <a href={btn2Url} className="btn-secondary px-6 py-3 text-center rounded-lg">{btn2Label}</a>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 max-w-md w-full">
              <div className="relative rounded-[1.75rem] bg-gradient-to-br from-[#F6F0DE] via-[#F4F0CD] to-[#ECDFBC] p-4 shadow-2xl">
                <div className="rounded-[1.25rem] bg-white p-4 shadow-inner">
                  {videoPreview ? (
  <video
    src={videoPreview}
    controls
    className="rounded-xl w-full h-80 object-cover"
  />
) : (
  <div className="rounded-xl w-full h-80 bg-gray-200 flex items-center justify-center text-dark-brown/50">
    No video selected
  </div>
)}


                  <div className="mt-4">
<label className="block mb-2 font-semibold text-dark-brown">Upload Video</label>
                   <input 
  type="file"
  accept="video/mp4,video/webm,video/ogg"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) setVideoFile(e.target.files[0]);
  }}
/>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="bg-beige py-12 px-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-8 text-dark-brown border-b-2 border-[#C2A570] pb-3">Feature Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => {
              const icons = [GiHourglass, GiLaurelCrown, GiCrystalBars];
              const IconComp = icons[index];
              return (
                <div key={index} className="rounded-3xl bg-white backdrop-blur-lg border-2 border-[#C2A570]/30 shadow-xl hover:scale-105 transition-all duration-300 p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center text-4xl shadow-lg mx-auto mb-5 border-[3px] border-[#e7debe]">
                    <IconComp className="text-brown drop-shadow-xl" />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-dark-brown/70">Card Title</label>
                    <input 
                      type="text" 
                      value={card.title} 
                      onChange={e => updateCard(index, 'title', e.target.value)} 
                      className="font-semibold text-lg text-dark-brown bg-transparent border-2 border-[#C2A570] w-full text-center rounded-lg p-2 focus:ring-2 focus:ring-[#C2A570] focus:outline-none" 
                    />
                    <label className="block text-xs font-semibold text-dark-brown/70">Card Description</label>
                    <textarea 
                      rows={2} 
                      value={card.description} 
                      onChange={e => updateCard(index, 'description', e.target.value)} 
                      className="text-dark-brown/70 w-full resize-none bg-transparent border-2 border-[#C2A570] rounded-lg text-center p-2 focus:ring-2 focus:ring-[#C2A570] focus:outline-none" 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Other Sections with proper spacing */}
        <div className="space-y-12">
          <ProblemSection problems={problems} setProblems={setProblems} />

          <PromiseSection
            promises={promises}
            setPromises={setPromises}
            enrollLink={enrollLink}
            setEnrollLink={setEnrollLink}
            scrollToEnroll={() => {
              const el = document.getElementById('enroll');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <OfferSection
            offerTitle={offerTitle}
            setOfferTitle={setOfferTitle}
            offerSubtitle={offerSubtitle}
            setOfferSubtitle={setOfferSubtitle}
            mainCardDesc={mainCardDesc}
            setMainCardDesc={setMainCardDesc}
            detailItems={detailItems}
            setDetailItems={setDetailItems}
            ctaLink={ctaLink}
            setCtaLink={setCtaLink}
            ctaLabel={ctaLabel}
            setCtaLabel={setCtaLabel}
          />

          <ExperienceSection experience={experience} setExperience={setExperience} />

          <WhySection whySection={whySection} setWhySection={setWhySection} />

          <WhoSectionCreate
            whoSection={whoSection}
            setWhoSection={setWhoSection}
          />

          <IncludedSectionCreate
            includedSection={includedSection}
            setIncludedSection={setIncludedSection}
          />

          {/* Sticky CTA Section */}
          <section className="bg-beige py-12 px-8 rounded-2xl shadow-xl border-2 border-[#C2A570]/30">
            <h2 className="text-2xl font-bold mb-6 text-dark-brown border-b-2 border-[#C2A570] pb-3">Sticky CTA Section</h2>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold text-dark-brown">Text</label>
                <input
                  className="w-full p-3 rounded-lg border-2 border-[#C2A570] text-dark-brown focus:ring-2 focus:ring-[#C2A570] focus:outline-none"
                  value={stickyCTA.text}
                  onChange={(e) =>
                    setStickyCTA({ ...stickyCTA, text: e.target.value })
                  }
                  placeholder="Ready to begin your transformation?"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-dark-brown">Button Label</label>
                <input
                  className="w-full p-3 rounded-lg border-2 border-[#C2A570] text-dark-brown focus:ring-2 focus:ring-[#C2A570] focus:outline-none"
                  value={stickyCTA.buttonLabel}
                  onChange={(e) =>
                    setStickyCTA({ ...stickyCTA, buttonLabel: e.target.value })
                  }
                  placeholder="Reserve Your Seat"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-dark-brown">Button Link</label>
                <input
                  className="w-full p-3 rounded-lg border-2 border-[#C2A570] text-dark-brown focus:ring-2 focus:ring-[#C2A570] focus:outline-none"
                  value={stickyCTA.buttonLink}
                  onChange={(e) =>
                    setStickyCTA({ ...stickyCTA, buttonLink: e.target.value })
                  }
                  placeholder="#enroll"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Bottom padding for better scroll */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}