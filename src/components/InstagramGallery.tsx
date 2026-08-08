import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Share2, X } from 'lucide-react';
import { instagramPosts } from '../data';

export default function InstagramGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const [preview, setPreview] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-36 bg-noir-black" ref={ref} aria-label="Instagram NOIR Barbershop">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-4"
            >
              Следи за NOIR
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display-heading text-4xl md:text-5xl text-noir-text"
            >
              @noir.barbershop
            </motion.h2>
          </div>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="btn-outline inline-flex items-center gap-2 self-start md:self-auto"
            aria-label="Перейти в Instagram NOIR"
          >
            <Share2 size={16} />
            Instagram →
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 md:gap-2">
          {instagramPosts.map((post, i) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.06 * i }}
              onClick={() => setPreview(i)}
              className="relative aspect-square overflow-hidden group focus:outline-none focus-visible:ring-1 focus-visible:ring-noir-accent"
              aria-label={`Открыть публикацию ${i + 1}`}
            >
              <img
                src={post.src}
                alt={post.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-noir-black/0 group-hover:bg-noir-black/20 transition-all duration-400 flex items-center justify-center">
                <Share2 size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <AnimatePresence>
        {preview !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-noir-black/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setPreview(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute top-5 right-5 p-2 text-noir-secondary hover:text-noir-text transition-colors"
              aria-label="Закрыть"
            >
              <X size={24} />
            </button>
            <motion.img
              key={preview}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              src={instagramPosts[preview].src.replace('w=500', 'w=900')}
              alt={instagramPosts[preview].alt}
              className="max-w-lg max-h-[80vh] w-full object-contain"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
