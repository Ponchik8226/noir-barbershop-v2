import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { reviews } from '../data';

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section className="py-24 md:py-36 bg-noir-dark" ref={ref} aria-label="Отзывы гостей NOIR">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            Отзывы
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-heading text-4xl md:text-5xl lg:text-6xl text-noir-text"
          >
            Что говорят гости
          </motion.h2>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 gap-px bg-noir-border">
          {reviews.map((review, i) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i }}
              className="bg-noir-dark p-8 md:p-10 flex flex-col justify-between gap-8"
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label={`Оценка: ${review.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill={j < review.rating ? '#C9A96E' : 'none'} stroke="#C9A96E" strokeWidth="1.2">
                    <path d="M7 1l1.6 3.3L12 4.9l-2.5 2.4.6 3.4L7 9.1l-3.1 1.6.6-3.4L2 4.9l3.4-.6z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="font-display text-xl md:text-2xl font-light text-noir-text leading-snug italic flex-1">
                «{review.text}»
              </p>

              {/* Author */}
              <div className="flex items-center justify-between border-t border-noir-border pt-6">
                <div>
                  <p className="font-body text-sm text-noir-text font-500">— {review.author}</p>
                  {review.service && (
                    <p className="font-body text-xs text-noir-accent mt-0.5">{review.service}</p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
