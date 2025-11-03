// page.tsx
'use client';

import { useState, useEffect } from 'react';
import { GiHourglass, GiLaurelCrown, GiCrystalBars } from "react-icons/gi";
import { FaSpinner, FaBalanceScale, FaSyncAlt, FaMask, FaRedoAlt, FaSpa, FaSeedling, FaGem, FaBook, FaHandHoldingHeart, FaBullseye, FaFileAlt, FaVideo, FaGift, FaMagic } from "react-icons/fa";
import { ChevronDown } from 'lucide-react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { 
      question: 'Do I need prior experience with shadow work?', 
      answer: 'No experience necessary. This workshop is designed to meet you exactly where you are, whether you\'re new to this work or looking to go deeper.' 
    },
    { 
      question: 'Is this workshop recorded?', 
      answer: 'Yes! You\'ll have access to the replay for 7 days after the live session, so you can revisit and integrate at your own pace.' 
    },
    { 
      question: 'What if I can\'t attend live?', 
      answer: 'While the live experience is most powerful, the replay allows you to do the work on your own time. You\'ll still receive all materials and bonuses.' 
    },
    { 
      question: 'Is this work triggering or emotionally intense?', 
      answer: 'Shadow work can bring up emotions, but you\'ll be held in a safe, guided container. You\'re always in control of how deep you go, and support is available throughout.' 
    },
    { 
      question: 'Will I need to share in front of others?', 
      answer: 'Sharing is optional and encouraged but never required. This is your journey, and you get to choose your level of participation.' 
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="rounded-xl bg-white/90 backdrop-blur-sm border border-[#DDC48B]/40 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full px-5 sm:px-6 py-5 flex items-center justify-between text-left group"
            aria-expanded={openIndex === index}
          >
            <span className="text-base sm:text-lg font-semibold text-dark-brown transition-colors duration-200">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-dark-brown flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`h-px w-full bg-gradient-to-r from-transparent via-[#DDC48B]/40 to-transparent transition-opacity duration-300 ${
              openIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
              openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-5 sm:px-6 py-4">
                <p className="text-base leading-relaxed text-dark-brown">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ShadowWorkLanding() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEnroll = () => {
    document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-dark-brown">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F4EDE4] to-[#E8DFD3] py-20 px-6 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-dark-brown leading-tight">
            Heal the Wound of Not-Enoughness
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-dark-brown font-light">
            A 90-minute somatic shadow-work workshop for women ready to release guilt, shame, and self-criticism
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-primary text-lg" onClick={scrollToEnroll}>
              Reserve Your Seat
            </button>
            <button className="btn-secondary" onClick={scrollToAbout}>
              Learn More
            </button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="card rounded-3xl bg-white/70 backdrop-blur-lg border border-[#C2A570]/30 shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#C2A570]/20 to-[#D4B882]/10 rounded-full blur-2xl"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center text-4xl shadow-lg mx-auto mb-5 border-[3px] border-[#e7debe] group-hover:shadow-2xl transition-shadow duration-300">
                <GiHourglass className="text-brown drop-shadow-xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-dark-brown tracking-wide">90 Minutes</h3>
              <p className="text-dark-brown/70">Deep transformative work</p>
            </div>

            {/* Card 2 */}
            <div className="card rounded-3xl bg-white/70 backdrop-blur-lg border border-[#C2A570]/30 shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-tl from-[#D4B882]/40 to-[#C2A570]/10 rounded-full blur-2xl"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center text-4xl shadow-lg mx-auto mb-5 border-[3px] border-[#e7debe] group-hover:shadow-2xl transition-shadow duration-300">
                <GiLaurelCrown className="text-brown drop-shadow-xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-dark-brown tracking-wide">Live Workshop</h3>
              <p className="text-dark-brown/70">Interactive & guided</p>
            </div>

            {/* Card 3 */}
            <div className="card rounded-3xl bg-white/70 backdrop-blur-lg border border-[#C2A570]/30 shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-gradient-to-tr from-[#D4B882]/30 to-[#C2A570]/10 rounded-full blur-2xl"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center text-4xl shadow-lg mx-auto mb-5 border-[3px] border-[#e7debe] group-hover:shadow-2xl transition-shadow duration-300">
                <GiCrystalBars className="text-brown drop-shadow-xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-dark-brown tracking-wide">Bonus Resources</h3>
              <p className="text-dark-brown/70">Guides & replay access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-beige">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
            If You've Been Feeling...
          </h2>
          <div className="space-y-6 mb-12">
            {[
              { icon: <FaSpinner className="text-3xl" />, text: 'Constantly over-giving and still feeling unseen' },
              { icon: <FaBalanceScale className="text-3xl" />, text: 'Stuck between wanting peace and craving control' },
              { icon: <FaSyncAlt className="text-3xl" />, text: 'Tired of healing but still spiraling back into the same story' },
              { icon: <FaMask className="text-3xl" />, text: 'Performing worthiness instead of feeling it' },
              { icon: <FaRedoAlt className="text-3xl" />, text: 'Caught in patterns you can see but can\'t seem to break' }
            ].map((pain, idx) => (
              <div key={idx} className="card flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center shadow-lg border-[3px] border-[#e7debe] flex-shrink-0 group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-brown drop-shadow-xl">{pain.icon}</div>
                </div>
                <p className="text-xl text-dark-brown">{pain.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-3xl border-l-4 border-amber-600">
            <p className="text-2xl font-semibold text-dark-brown italic">
              "You don't need more mindset hacks. You need to feel safe enough to live differently."
            </p>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#F4EDE4] to-[#FFF8F0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-dark-brown">
            Imagine Feeling...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { emoji: '✨', title: 'Grounded, clear, unapologetic', desc: 'No more second-guessing every decision' },
              { emoji: '🕊️', title: 'Calm inside your body', desc: 'Instead of constantly fighting it' },
              { emoji: '💎', title: 'Free from proving your worth', desc: 'Simply knowing you\'re enough' },
              { emoji: '🌸', title: 'At home in yourself', desc: 'Safe to be seen and take up space' }
            ].map((item, idx) => (
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
          <button className="btn-primary text-lg" onClick={scrollToEnroll}>
            Begin Your Transformation
          </button>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-20 px-6 bg-beige" id="offer">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-dark-brown">
              The Shadow Work Workshop
            </h2>
            <p className="text-2xl text-dark-brown/70 font-light">
              A guided deep-dive into your shadow to reclaim your self-worth and power
            </p>
          </div>
          
          <div className="card max-w-3xl mx-auto mb-12 bg-gradient-to-br from-white to-amber-50">
            <p className="text-lg text-dark-brown leading-relaxed mb-6">
              This 90-minute immersive experience blends guided somatic practices, shadow work inquiry, and the SPACE™ Method to help you release the emotional charge of old wounds and step into your wholeness. You'll leave with clarity, tools, and a deeper sense of safety in your own body.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                { icon: <GiHourglass className="text-2xl" />, title: 'Duration', desc: '90 minutes of deep work' },
                { icon: <FaVideo className="text-2xl" />, title: 'Location', desc: 'Live on Zoom' },
                { icon: <FaBullseye className="text-2xl" />, title: 'Format', desc: 'Interactive & guided' },
                { icon: <FaGift className="text-2xl" />, title: 'Bonus', desc: '7-day replay access' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-xl flex items-center justify-center shadow-lg border-[2px] border-[#e7debe] flex-shrink-0">
                    <div className="text-brown drop-shadow-lg">{item.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-dark-brown">{item.title}</h4>
                    <p className="text-dark-brown/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button className="btn-primary text-xl" onClick={scrollToEnroll}>
              Join Now
            </button>
          </div>
        </div>
      </section>

      {/* What You'll Experience */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#FFF8F0] to-[#F4EDE4]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
            What You'll Experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <FaMagic className="text-3xl" />, title: 'Release Emotional Charge', desc: 'From old triggers that keep you stuck in reactive patterns' },
              { icon: <FaSpa className="text-3xl" />, title: 'Somatic Grounding Tool', desc: 'Learn a practice you can use anytime you feel overwhelmed' },
              { icon: <FaSeedling className="text-3xl" />, title: 'Meet Your Inner Parts', desc: 'Understand the part of you that learned to shrink and protect' },
              { icon: <FaGem className="text-3xl" />, title: 'Reclaim Your Golden Shadow', desc: 'Reconnect with your power, creativity, and inherent worth' },
              { icon: <FaBook className="text-3xl" />, title: 'SPACE™ Journaling', desc: 'Guided reflection to integrate your insights' },
              { icon: <FaHandHoldingHeart className="text-3xl" />, title: 'Safe Container', desc: 'Held space to explore without judgment or pressure' }
            ].map((item, idx) => (
              <div key={idx} className="card group hover:scale-[1.02] transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center shadow-lg border-[3px] border-[#e7debe] mb-4 mx-auto group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-brown drop-shadow-xl">{item.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dark-brown text-center">{item.title}</h3>
                <p className="text-dark-brown/70 text-center">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="card max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-white">
            <p className="text-lg text-dark-brown leading-relaxed">
              The experience blends guided meditation, somatic inquiry, and SPACE™ journaling to create lasting shifts in how you relate to yourself and your worthiness.
            </p>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20 px-6 bg-beige">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
            Why This Isn't Another Feel-Good Session
          </h2>
          
          <div className="space-y-8">
            {[
              { title: 'Most healing work stays in the mind.', desc: 'This takes you into the body, the nervous system, and the subconscious stories where patterns actually live.' },
              { title: 'It\'s not about affirming you\'re enough.', desc: 'It\'s about feeling it in every cell—shifting from knowing intellectually to embodying deeply.' },
              { title: 'This isn\'t surface-level self-care.', desc: 'It\'s a courageous meeting with the parts of you that have been waiting to be seen, heard, and integrated.' }
            ].map((item, idx) => (
              <div key={idx} className="card border-l-4 border-[#C2A570]">
                <h3 className="text-2xl font-semibold mb-4 text-dark-brown">{item.title}</h3>
                <p className="text-lg text-dark-brown/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#F4EDE4] to-[#E8DFD3]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
            Is This For You?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 text-green-800">✓ For You If:</h3>
              <ul className="space-y-4">
                {[
                  'You\'re ready to meet your emotions without bypassing them',
                  'You\'ve done therapy or coaching and want to go deeper',
                  'You crave a safe space to understand your patterns',
                  'You\'re committed to your healing journey'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">•</span>
                    <span className="text-dark-brown">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 text-red-800">✗ Not For You If:</h3>
              <ul className="space-y-4">
                {[
                  'You want a quick fix or instant results',
                  'You\'re not ready to sit with discomfort',
                  'You prefer to stay in your comfort zone',
                  'You\'re looking for someone to fix you'
                ].map((item, idx) => (
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

      {/* About Manika */}
      <section className="py-20 px-6 bg-beige" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
            Meet Manika
          </h2>
          
          <div className="card bg-gradient-to-br from-white to-amber-50">
            <p className="text-lg text-dark-brown leading-relaxed mb-6">
              Manika is an Inner Child and Shadow Work Healer and creator of the SPACE™ Method. She has guided women across the world to heal core wounds, rewire survival patterns, and reclaim their golden shadow.
            </p>
            <p className="text-lg text-dark-brown leading-relaxed">
              With a deep understanding of the nervous system, somatic practices, and transformational psychology, Manika creates safe containers for women to do the courageous work of coming home to themselves.
            </p>
          </div>

          <div className="mt-12 card bg-gradient-to-r from-white to-[#F9F6F1] border-l-4 border-[#C2A570]">
            <p className="text-xl italic text-dark-brown mb-4">
              "After one session I felt more safety in my body than years of therapy. Manika has a gift for creating space where healing happens naturally."
            </p>
            <p className="font-semibold text-dark-brown/70">— R.S.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#FFF8F0] to-[#F4EDE4]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
            What Women Are Saying
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { text: 'This work changed the way I relate to myself forever. I finally understand why I\'ve been running from my own worth.', author: 'A.K.' },
              { text: 'I\'ve done years of personal development, but this was the first time I felt the shift in my body. It\'s not just intellectual anymore.', author: 'M.T.' },
              { text: 'Manika held space in a way I\'ve never experienced. I felt safe enough to go to places I\'ve been avoiding for years.', author: 'S.L.' },
              { text: 'The SPACE™ Method gave me tools I use daily. This workshop was the beginning of my real healing journey.', author: 'J.R.' }
            ].map((testimonial, idx) => (
              <div key={idx} className="card bg-gradient-to-r from-white to-[#F9F6F1] border-l-4 border-[#C2A570]">
                <p className="text-lg italic text-dark-brown mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-dark-brown/70">— {testimonial.author}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-primary" onClick={scrollToEnroll}>
              Book Your Spot
            </button>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-6 bg-beige" id="enroll">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-dark-brown">
            What's Included
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <FaBullseye className="text-3xl" />, title: 'Live 90-Minute Workshop', desc: 'Fully guided somatic shadow work experience' },
              { icon: <FaFileAlt className="text-3xl" />, title: 'SPACE™ Reflection Guide PDF', desc: 'Downloadable workbook for continued integration' },
              { icon: <FaVideo className="text-3xl" />, title: '7-Day Replay Access', desc: 'Revisit the workshop and deepen your practice' },
              { icon: <FaGift className="text-3xl" />, title: 'Bonus Grounding Meditation', desc: 'Exclusive audio for daily nervous system regulation' }
            ].map((item, idx) => (
              <div key={idx} className="card group hover:scale-[1.02] transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-2xl flex items-center justify-center shadow-lg border-[3px] border-[#e7debe] mb-4 mx-auto group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-brown drop-shadow-xl">{item.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dark-brown text-center">{item.title}</h3>
                <p className="text-dark-brown/70 text-center">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 card bg-gradient-to-br from-amber-100 to-yellow-50 text-center">
            <p className="text-2xl font-bold text-dark-brown mb-2">🎉 Early Bird Bonus</p>
            <p className="text-lg text-dark-brown">Register in the next 48 hours and receive a free 15-minute integration call</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container bg-beige mx-auto px-4 sm:px-8 md:px-10 lg:px-28 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[#FBF9F1] via-[#FAF9EC] to-[#F6F0DE] border border-[#DDC48B]/40 shadow-[0_6px_24px_rgba(0,0,0,.06)] p-5 sm:p-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brown mb-3">
              Questions & Answers
            </h2>
            <p className="text-base sm:text-lg text-brown max-w-2xl mx-auto">
              Everything you need to know about the journey ahead
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#DDC48B]/50 to-transparent mb-6" />

          <FAQAccordion />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-[#2D2A26] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            You're Not Here By Chance
          </h2>
          <p className="text-2xl mb-8 font-light">Your healing has been calling.</p>
          
          <button className="btn-primary text-xl mb-8">
            Reserve Your Seat Now
          </button>
          
          <p className="text-xl italic opacity-90">
            You were always enough. You always mattered. It's time to remember.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">© 2024 Manika - Shadow Work & Inner Child Healing</p>
          <div className="flex justify-center gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#2D2A26] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-50 animate-[slideUp_0.5s_ease]">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[#F4EDE4] font-semibold">Ready to begin your transformation?</span>
            <button className="btn-primary" onClick={scrollToEnroll}>
              Reserve Your Seat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}