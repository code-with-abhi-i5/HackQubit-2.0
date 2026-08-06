import React from 'react';
import { motion } from 'framer-motion';

const PastSponsors = () => {
  // Placeholder array since we don't have images yet
  const sponsors = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="py-20 relative bg-sky-50 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-['Trade_Winds'] text-slate-800 mb-12"
        >
          Our Past Allies
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {sponsors.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 h-32"
            >
              <div className="text-slate-400 font-bold text-xl">Sponsor {i}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastSponsors;
