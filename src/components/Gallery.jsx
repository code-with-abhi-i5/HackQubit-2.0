import React, { useState } from 'react';
import { motion } from 'framer-motion';
import femalePirateLookout from "../assets/images/female_pirate_lookout.webp";
import bgStoryGallery from "../assets/images/bg_story_gallery.webp";
import GoldRainParticles from "./GoldRainParticles";

const Gallery = () => {
  const topRow = [
    { id: 1, src: '/memory-1.jpeg' },
    { id: 2, src: '/memory-2.jpeg' },
    { id: 3, src: '/memory-3.jpeg' },
    { id: 4, src: '/memory-4.jpeg' },
  ];

  const bottomRow = [
    { id: 5, src: '/memory-5.jpeg' },
    { id: 6, src: '/memory-6.jpeg' },
    { id: 7, src: '/memory-7.jpg' },
  ];

  const [activeId, setActiveId] = useState(null);

  const renderRow = (row, direction, duration) => {
    // Duplicate the row so the loop feels seamless
    const looped = [...row, ...row];
    return (
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
        >
          {looped.map((img, i) => {
            const isActive = activeId === `${img.id}-${i}`;
            return (
              <div
                key={`${img.id}-${i}`}
                onMouseEnter={() => setActiveId(`${img.id}-${i}`)}
                onMouseLeave={() => setActiveId(null)}
                onTouchStart={() => setActiveId(`${img.id}-${i}`)}
                onTouchEnd={() => setActiveId(null)}
                className="w-56 sm:w-72 h-40 sm:h-52 rounded-xl overflow-hidden shadow-xl shrink-0 cursor-pointer"
              >
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isActive ? 'grayscale-0' : 'grayscale'
                  }`}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      <GoldRainParticles />

      <div className="absolute inset-x-0 bottom-0 h-[450px] sm:h-[550px] pointer-events-none z-0 overflow-hidden">
        <img
          src={bgStoryGallery}
          alt="Pirate Beach Campfire Story"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pirate-bg/40 to-pirate-bg" />
      </div>

      <div className="absolute top-2 right-2 sm:right-6 z-30 pointer-events-none block">
        <img
          src={femalePirateLookout}
          alt="Female Pirate Lookout with Spyglass"
          loading="lazy"
          decoding="async"
          className="w-36 sm:w-48 lg:w-56 h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="text-center mb-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-['Trade_Winds'] text-slate-800 mb-4"
        >
          Memories of the Sea
        </motion.h2>
        <p className="text-lg text-slate-600">Glimpses from our previous adventures.</p>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        {renderRow(topRow, 'left', 18)}
        {renderRow(bottomRow, 'right', 16)}
      </div>
    </section>
  );
};

export default Gallery;
