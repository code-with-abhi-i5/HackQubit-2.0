import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Anchor } from 'lucide-react';
import bgStoryFaq from '../assets/images/bg_story_faq.webp';
import GoldRainParticles from './GoldRainParticles';

const faqs = [
  {
    question: "Who can participate?",
    answer: "Both school and college students can participate! Whether you're a high schooler with big ideas or a college coder ready to conquer — all skill levels and institutions are welcome aboard the HackQubit ship. A valid student ID is required at check-in."
  },
  {
    question: "Is there a registration fee?",
    answer: "Yes, there is a registration fee of ₹600 per team. This covers your workspace, meals during the 24-hour hackathon, swag kit, and access to all workshops and mentorship sessions."
  },
  {
    question: "What is the team size?",
    answer: "Teams must have a minimum of 2 members and a maximum of 4 members. Solo participation is not allowed — every great pirate crew needs a team! You can form your crew beforehand or find teammates during our team-building session."
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, student ID, and a pirate's spirit! We recommend comfortable clothes and a sleeping bag if you plan to rest overnight. All meals and snacks are provided throughout the 24-hour voyage."
  },
  {
    question: "Do I need to know how to code?",
    answer: "Coding knowledge is helpful but not mandatory! Hackathons also need designers, product managers, storytellers, and presenters. Beginner workshops will also be held to help first-timers get started."
  },
  {
    question: "When are problem statements revealed?",
    answer: "Problem statements are revealed live on the spot at the start of the event — no prior knowledge or pre-built code allowed. This ensures fair competition and tests real-time problem-solving skills under pressure!"
  },
  {
    question: "What happens after the hackathon?",
    answer: "After the 24 hours, teams present their projects to a panel of judges. Winners are announced at the Grand Finale ceremony. All participants receive certificates, and top projects get featured in our post-event showcase."
  },
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
                    <div className="px-6 py-4 font-cinzel text-amber-900 font-bold text-sm leading-relaxed border-t border-amber-200/60 bg-amber-50/50">
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
