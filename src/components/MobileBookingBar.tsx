import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('#home');
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom < 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-noir-dark/95 backdrop-blur border-t border-noir-border"
        >
          <button
            onClick={() => {
              const el = document.querySelector('#booking');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary w-full justify-center"
            aria-label="Записаться на услугу"
          >
            Записаться
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
