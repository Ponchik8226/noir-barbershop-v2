import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { masters } from '../data';

export default function Masters() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section id="masters" className="py-24 md:py-36 bg-noir-black" ref={ref} aria-label="Мастера барбершопа NOIR">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            Команда
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-heading text-4xl md:text-5xl lg:text-6xl text-noir-text"
          >
            Наши мастера
          </motion.h2>
        </div>

        {/* Masters grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {masters.map((master, i) => (
            <motion.article
              key={master.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden bg-noir-card mb-4">
                <img
                  src={master.photo}
                  alt={`Мастер ${master.name} — ${master.role}`}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-noir-black/0 group-hover:bg-noir-black/20 transition-all duration-500" />
                {/* Specialty tag */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-noir-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-body text-[10px] tracking-widest uppercase text-noir-accent">
                    {master.specialty}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-display text-xl md:text-2xl font-light text-noir-text group-hover:text-noir-accent transition-colors duration-300">
                  {master.name}
                </h3>
                <p className="font-body text-xs text-noir-secondary mt-1">{master.role}</p>
                <p className="font-body text-xs text-noir-accent/70 mt-0.5">{master.experience}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
