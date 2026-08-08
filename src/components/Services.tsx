import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '../data';

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section id="services" className="py-24 md:py-36 bg-noir-dark" ref={ref} aria-label="Услуги барбершопа NOIR">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            Прайс
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display-heading text-4xl md:text-5xl lg:text-6xl text-noir-text"
            >
              Услуги
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-noir-secondary font-body text-sm md:text-base max-w-xs"
            >
              Всё необходимое для безупречного образа.
            </motion.p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-noir-border">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 * i }}
              className="bg-noir-dark group relative overflow-hidden cursor-default"
            >
              <div className="p-8 md:p-10 h-full flex flex-col">
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-noir-accent group-hover:w-full transition-all duration-500 ease-out" />

                <div className="flex-1">
                  <p className="font-body text-[10px] tracking-widest3 text-noir-accent uppercase mb-3">
                    {service.duration}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-noir-text mb-3 group-hover:text-noir-accent transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="font-body text-sm text-noir-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-end justify-between">
                  <span className="font-display text-3xl md:text-4xl font-light text-noir-text">
                    {service.price}
                  </span>
                  <button
                    onClick={() => {
                      const el = document.querySelector('#booking');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[10px] tracking-widest uppercase text-noir-secondary hover:text-noir-accent transition-colors font-body"
                    aria-label={`Записаться на ${service.name}`}
                  >
                    Записаться →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
