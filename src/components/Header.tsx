import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуги', href: '#services' },
  { label: 'Мастера', href: '#masters' },
  { label: 'Работы', href: '#gallery' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#location' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-noir-black/95 backdrop-blur-md border-b border-noir-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex flex-col leading-none group"
            aria-label="NOIR Barbershop — на главную"
          >
            <span className="font-display text-2xl md:text-3xl font-light text-noir-text tracking-widest group-hover:text-noir-accent transition-colors duration-300">
              NOIR
            </span>
            <span className="font-body text-[9px] tracking-widest3 text-noir-secondary uppercase mt-0.5">
              Barbershop
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-body text-xs tracking-widest text-noir-secondary uppercase hover:text-noir-text transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#booking')}
              className="btn-primary text-xs py-2.5 px-5 hidden sm:flex"
            >
              Записаться
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 text-noir-text hover:text-noir-accent transition-colors"
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-noir-black/80 z-50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-noir-dark z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-noir-border">
                <span className="font-display text-xl font-light text-noir-accent tracking-widest">NOIR</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-noir-secondary hover:text-noir-text transition-colors"
                  aria-label="Закрыть меню"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col px-6 pt-8 gap-1 flex-1" aria-label="Мобильная навигация">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(link.href)}
                    className="text-left py-4 font-display text-2xl font-light text-noir-text hover:text-noir-accent transition-colors border-b border-noir-border/40"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="px-6 pb-10">
                <button
                  onClick={() => scrollTo('#booking')}
                  className="btn-primary w-full justify-center"
                >
                  Записаться
                </button>
                <p className="text-center text-noir-secondary text-xs mt-4">
                  +7 (700) 123-45-67
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
