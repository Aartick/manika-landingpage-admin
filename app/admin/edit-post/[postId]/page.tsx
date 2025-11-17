'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GiHourglass, GiLaurelCrown, GiCrystalBars } from 'react-icons/gi';
import { FaVideo, FaGift, FaRegCalendarAlt, FaRegClock, FaDollarSign } from 'react-icons/fa';
import ProblemSection from '@/components/edit-post/sectionTwo';
import PromiseSection from '@/components/edit-post/sectionThree';
import OfferSection from '@/components/edit-post/sectionFourth';
import ExperienceSectionEdit from '@/components/edit-post/sectionFifth';
import WhySectionEdit from '@/components/edit-post/sectionSixth';
import WhoSectionEdit from '@/components/edit-post/sectionSeventh';
import IncludedSectionEdit from '@/components/edit-post/sectionEight';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();

  const [headline, setHeadline] = useState('');
  const [subheading, setSubheading] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Buttons
  const [btn1Label, setBtn1Label] = useState('Reserve Your Seat');
  const [btn1Url, setBtn1Url] = useState('#enroll');
  const [btn2Label, setBtn2Label] = useState('Learn More');
  const [btn2Url, setBtn2Url] = useState('#about');

  const [cards, setCards] = useState([
    { title: '90 Minutes', description: 'Deep transformative work' },
    { title: 'Live Workshop', description: 'Interactive & guided' },
    { title: 'Bonus Resources', description: 'Guides & replay access' },
  ]);

  const [problems, setProblems] = useState([
    { text: 'Constantly over-giving and still feeling unseen' },
    { text: 'Stuck between wanting peace and craving control' },
    { text: 'Tired of healing but still spiraling back into the same story' },
    { text: 'Performing worthiness instead of feeling it' },
    { text: "Caught in patterns you can see but can't seem to break" },
  ]);

  const [promises, setPromises] = useState([
    { emoji: '✨', title: 'Grounded, clear, unapologetic', desc: 'No more second-guessing every decision' },
    { emoji: '🕊️', title: 'Calm inside your body', desc: 'Instead of constantly fighting it' },
    { emoji: '💎', title: 'Free from proving your worth', desc: "Simply knowing you're enough" },
    { emoji: '🌸', title: 'At home in yourself', desc: 'Safe to be seen and take up space' },
  ]);

  const [enrollLink, setEnrollLink] = useState("#enroll");

  // Offer Section State
  const [offerTitle, setOfferTitle] = useState('');
  const [offerSubtitle, setOfferSubtitle] = useState('');
  const [mainCardDesc, setMainCardDesc] = useState('');

  const [detailItems, setDetailItems] = useState([
    { icon: <GiHourglass className="text-2xl" />, title: 'Duration', desc: '' },
    { icon: <FaVideo className="text-2xl" />, title: 'Location', desc: '' },
    { icon: <FaGift className="text-2xl" />, title: 'Bonus', desc: '' },
    { icon: <FaRegCalendarAlt className="text-2xl" />, title: 'Date', desc: '' },
    { icon: <FaRegClock className="text-2xl" />, title: 'Time', desc: '' },
    { icon: <FaDollarSign className="text-2xl text-center" />, title: 'Price', desc: '' },
  ]);
  const [ctaLabel, setCtaLabel] = useState('');
  const [ctaLink, setCtaLink] = useState('');

  interface ExperienceItem {
    icon: 'magic' | 'spa' | 'seedling' | 'gem' | 'book' | 'heart';
    title: string;
    desc: string;
  }
  interface Experience {
    title: string;
    description: string;
    items: ExperienceItem[];
  }
  const [experience, setExperience] = useState<Experience>({
    title: "",
    description: "",
    items: [],
  });

  const [whoSection, setWhoSection] = useState<{ title: string; forYou: string[]; notForYou: string[] }>({
    title: "",
    forYou: [],
    notForYou: []
  });

  const [whySection, setWhySection] = useState<{ title: string; items: any[] }>({
    title: "",
    items: [],
  });

  interface IncludedItem {
    icon: string;
    title: string;
    desc: string;
  }

  const [includedSection, setIncludedSection] = useState<{
    title: string;
    items: IncludedItem[];
    bonusTitle: string;
    bonusDesc: string;
  }>({
    title: "",
    items: [],
    bonusTitle: "",
    bonusDesc: "",
  });

  // **MISSING: Sticky CTA State**
  const [stickyCTA, setStickyCTA] = useState({
    text: "Ready to begin your transformation?",
    buttonLabel: "Reserve Your Seat",
    buttonLink: "#enroll"
  });

  // -------------- fetch existing post ---------------
  useEffect(() => {
    console.log("Params from useParams:", params);

    async function fetchPost() {
      const postId = params?.postId;

if (!postId) {
  console.error("No postId param provided");
  return;
}

setIsLoading(true);

try {
  const res = await fetch(`/api/posts/${postId}`);

        if (!res.ok) {
          console.error('Failed to fetch post:', res.statusText);
          alert('Failed to fetch post');
          router.push('/admin/dashboard');
          return;
        }
        const data = await res.json();

        // Basic fields
        setHeadline(data.title || '');
        setSubheading(data.subtitle || '');
        setImagePreview(data.imageUrl || '/heroimage1.jpg');

        // Load buttons
        if (Array.isArray(data.buttons)) {
          setBtn1Label(data.buttons[0]?.label || 'Reserve Your Seat');
          setBtn1Url(data.buttons[0]?.url || '#enroll');
          setBtn2Label(data.buttons[1]?.label || 'Learn More');
          setBtn2Url(data.buttons[1]?.url || '#about');
        }

        // Cards
        if (Array.isArray(data.cards)) setCards(data.cards);

        // Problems, promises, enroll link
        if (Array.isArray(data.problems)) setProblems(data.problems);
        if (Array.isArray(data.promises)) setPromises(data.promises);
        if (data.enrollLink) setEnrollLink(data.enrollLink);

        // Experience
        if (data.experience) {
          setExperience({
            title: data.experience.title || "",
            description: data.experience.description || "",
            items: data.experience.items || []
          });
        }

        // Why section
        if (data.whySection) {
          setWhySection({
            title: data.whySection.title || "",
            items: Array.isArray(data.whySection.items) ? data.whySection.items : [],
          });
        }

        // Who section
        if (data.whoSection) {
          setWhoSection({
            title: data.whoSection.title || "",
            forYou: data.whoSection.forYou || [],
            notForYou: data.whoSection.notForYou || []
          });
        }

        // Included section
        if (data.includedSection) {
          setIncludedSection({
            title: data.includedSection.title || "",
            items: data.includedSection.items || [],
            bonusTitle: data.includedSection.bonusTitle || "",
            bonusDesc: data.includedSection.bonusDesc || "",
          });
        }

        // **MISSING: Load stickyCTA**
        if (data.stickyCTA) {
          setStickyCTA({
            text: data.stickyCTA.text || "Ready to begin your transformation?",
            buttonLabel: data.stickyCTA.buttonLabel || "Reserve Your Seat",
            buttonLink: data.stickyCTA.buttonLink || "#enroll"
          });
        }

        // Offer: map incoming saved details -> our detailItems format
        if (data.offer) {
          setOfferTitle(data.offer.title || '');
          setOfferSubtitle(data.offer.subtitle || '');
          setMainCardDesc(data.offer.description || '');
          setCtaLabel(data.offer.ctaLabel || '');
          setCtaLink(data.offer.ctaLink || '');

          const dbDetails = data.offer.details || [];
          const mapped = [
            dbDetails[0]?.desc || '',
            dbDetails[1]?.desc || '',
            dbDetails[2]?.desc || '',
            dbDetails[3]?.desc || '',
            dbDetails[4]?.desc || '',
            dbDetails[5]?.desc || '',
          ];

          setDetailItems([
            { icon: <GiHourglass className="text-2xl" />, title: 'Duration', desc: mapped[0] || '' },
            { icon: <FaVideo className="text-2xl" />, title: 'Location', desc: mapped[1] || '' },
            { icon: <FaGift className="text-2xl" />, title: 'Bonus', desc: mapped[2] || '' },
            { icon: <FaRegCalendarAlt className="text-2xl" />, title: 'Date', desc: mapped[3] || '' },
            { icon: <FaRegClock className="text-2xl" />, title: 'Time', desc: mapped[4] || '' },
            { icon: <FaDollarSign className="text-2xl text-center" />, title: 'Price', desc: mapped[5] || '' },
          ]);
        }

      } catch (err) {
        console.error('Error fetching post:', err);
        alert('Error fetching post');
        router.push('/admin/dashboard');
        return;
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [params?.postId]);

  // image preview for newly selected file
  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        typeof reader.result === 'string' ? resolve(reader.result) : reject('Error reading file');
      reader.onerror = (error) => reject(error);
    });
  };

  const updateCard = (index: number, field: 'title' | 'description', value: string) => {
    setCards((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleCancel = () => router.push('/admin/dashboard');

  // Helper: convert JSX icon to a string ID for saving
  const mapIconToId = (icon: any): string => {
    if (typeof icon === 'string') return icon;

    const typeName = icon && (icon.type?.displayName || icon.type?.name);
    switch (typeName) {
      case 'GiHourglass':
        return 'hourglass';
      case 'FaVideo':
      case 'IconVideo':
        return 'video';
      case 'FaGift':
        return 'gift';
      case 'FaRegCalendarAlt':
        return 'calendar';
      case 'FaRegClock':
        return 'clock';
      case 'FaDollarSign':
        return 'price';
      default:
        return 'unknown';
    }
  };

  const handleSave = async () => {
    setLoading(true);
    let imageBase64 = imagePreview;
    if (imageFile) {
      try {
        imageBase64 = await getBase64(imageFile);
      } catch {
        alert('Failed to process image.');
        setLoading(false);
        return;
      }
    }

    const buttons = [
      { label: btn1Label, url: btn1Url },
      { label: btn2Label, url: btn2Url }
    ];

    const savedDetails = detailItems.map((item) => ({
      icon: mapIconToId(item.icon),
      title: item.title,
      desc: item.desc,
    }));

    const postData = {
      title: headline,
      subtitle: subheading,
      imageUrl: imageBase64,
      buttons,
      cards,
      problems,
      promises,
      enrollLink,
      offer: {
        title: offerTitle,
        subtitle: offerSubtitle,
        description: mainCardDesc,
        details: savedDetails,
        ctaLabel,
        ctaLink,
      },
      experience,
      whySection: {
        title: whySection.title,
        items: whySection.items,
      },
      whoSection,
      includedSection,
      stickyCTA, // **MISSING: Include stickyCTA in save**
    };

    try {
      const res = await fetch(`/api/posts/${params.postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!res.ok) throw new Error('Save failed');
      alert('Post updated successfully');
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Error saving post.');
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background bg-beige min-h-screen flex items-center justify-center text-dark-brown">
        Loading post data...
      </div>
    );
  }

  return (
    <div className="bg-background bg-beige min-h-screen text-dark-brown">
      {/* **MISSING: Sticky Navbar (matching create-post style)** */}
      <nav className="sticky top-0 z-50 bg-beige shadow-md border-b-2 border-[#C2A570]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-dark-brown">Edit Post</h1>
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
                  onChange={e => setHeadline(e.target.value)} 
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
                  <img 
                    src={imagePreview} 
                    alt="Hero Image Preview" 
                    className="rounded-xl w-full object-cover h-64" 
                  />
                  <div className="mt-4">
                    <label className="block mb-2 font-semibold text-dark-brown">Upload Image</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#C2A570] file:text-white hover:file:bg-[#B09560] file:cursor-pointer" 
                      onChange={e => {
                        if (e.target.files && e.target.files.length > 0) setImageFile(e.target.files[0]);
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

          <ExperienceSectionEdit experience={experience} setExperience={setExperience} />

          <WhySectionEdit whySection={whySection} setWhySection={setWhySection} />

          <WhoSectionEdit
            whoSection={whoSection}
            setWhoSection={setWhoSection}
          />

          <IncludedSectionEdit
            includedSection={includedSection}
            setIncludedSection={setIncludedSection}
          />

          {/* **MISSING: Sticky CTA Section** */}
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

        {/* **MISSING: Bottom padding for better scroll** */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}