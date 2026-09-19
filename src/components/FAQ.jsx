import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Anchor } from 'lucide-react';
import bgStoryFaq from '../assets/images/bg_story_faq.webp';
import GoldRainParticles from './GoldRainParticles';

const faqs = [
  {
    question: "What should I bring to the hackathon?",
    answer: "Bring your laptop, charger, required accessories, college ID/student ID, and any other essentials you may need during the 24-hour event."
  },
  {
    question: "Are there any costs to participate?",
    answer: "Yes, participants need to pay the applicable registration fee.\n\nImportant: Once registration is completed, the registration fee is non-refundable. Refunds will not be possible after registration."
  },
  {
    question: "What are the judging criteria?",
    answer: "Projects will be evaluated based on:\n• Innovation & Creativity — 30%\n• Technical Implementation — 25%\n• User Experience & Design — 20%\n• Business Viability — 15%\n• Presentation Quality — 10%"
  },
  {
    question: "Can I work on a pre-existing project?",
    answer: "No. All projects must be started from scratch during the hackathon.\n\nHowever, you can use existing APIs, frameworks, and open-source libraries."
  },
  {
    question: "What technologies can I use?",
    answer: "You're free to use any programming languages, frameworks, APIs, and tools you're comfortable with."
  },
  {
    question: "Can I attend the hackathon remotely?",
    answer: "No. The hackathon is an offline event and will be conducted at RVS College of Engineering and Technology."
  },
  {
    question: "What happens if I can't stay for the full 24 hours?",
    answer: "Participants are expected to participate throughout the 24-hour hackathon. If someone cannot stay for the full duration, they should coordinate with the organizers regarding their situation."
  },
  {
    question: "Whom can I contact for additional queries?",
    answer: "For additional queries, participants can contact the HackQubit/HELIX organizing team through the official contact details provided by the organizers."
  },
  {
    question: "What prizes can I win?",
    answer: "The total prize pool is over ₹30,000, along with exciting goodies worth thousands.\n\n🥇 1st Place — ₹15,000\n🥈 2nd Place — ₹10,000\n🥉 3rd Place — ₹5,000"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 bg-pirate-bg relative z-10 overflow-hidden">
      <GoldRainParticles />

      {/* ── LANDSCAPE ANIME STORY BACKGROUND AT BOTTOM WITH TOP GRADIENT BLEND ── */}
      <div className="absolute inset-x-0 bottom-0 h-[450px] sm:h-[550px] pointer-events-none z-0 overflow-hidden">
        <img
          src={bgStoryFaq}
          alt="Pirate Captain Library Story"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pirate-bg/40 to-pirate-bg" />
      </div>

      {/* Decorative blurred ambient blobs */}
      <div className="pointer-events-none absolute top-10 left-10 w-64 h-40 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-64 h-40 rounded-full bg-sky-300/20 blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-900/30 bg-amber-500/20 mb-4"
          >
            <Anchor className="w-4 h-4 text-amber-900" />
            <span className="font-cinzel text-xs tracking-widest text-amber-950 uppercase font-extrabold">
              Crew Questions Answered
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-cinzel text-4xl md:text-5xl font-black text-amber-950 mb-3"
          >
            Captain's Queries <span className="text-amber-800">(FAQ)</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-amber-900 font-bold text-base"
          >
            Got questions? We have answers — straight from the captain's log.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="rounded-2xl overflow-hidden border border-amber-900/20 bg-white/90 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-amber-50/80 transition-colors duration-200 group"
              >
                <span className="font-cinzel font-extrabold text-amber-950 text-base pr-4 group-hover:text-amber-800 transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 font-cinzel text-amber-900 font-bold text-sm leading-relaxed border-t border-amber-200/60 bg-amber-50/50 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
