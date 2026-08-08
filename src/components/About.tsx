import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '10+', label: 'Лет опыта' },
  { value: '4.9', label: 'Средняя оценка' },
  { value: '5000+', label: 'Гостей' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="about" className="py-24 md:py-36 bg-noir-black" ref={ref} aria-label="О барбершопе NOIR">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="section-label mb-6"
            >
              О нас
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display-heading text-4xl md:text-5xl lg:text-6xl text-noir-text mb-8 leading-tight"
            >
              Не просто стрижка.
              <br />
              <span className="text-noir-accent italic">Твой стиль.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-noir-secondary font-body font-light text-base md:text-lg leading-relaxed max-w-lg"
            >
              NOIR — пространство мужского стиля в центре Алматы. Мы соединяем
              классические техники барберинга с современным подходом к форме,
              деталям и индивидуальности.
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col border-t border-noir-border pt-6"
              >
                <span className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-noir-text">
                  {stat.value}
                </span>
                <span className="font-body text-[10px] md:text-xs tracking-widest uppercase text-noir-secondary mt-2 leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-noir-border to-transparent origin-left"
        />
      </div>
    </section>
  );
}
