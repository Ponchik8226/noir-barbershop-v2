import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const makeAnim = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Главная секция NOIR Barbershop"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1800&q=90"
          alt="Интерьер NOIR Barbershop"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-black via-noir-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-black via-transparent to-noir-black/40" />
        <div className="absolute inset-0 bg-noir-black/20" />
      </div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[8vw] top-[20%] bottom-[20%] w-px bg-noir-accent/30 origin-top hidden lg:block"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-20 md:pt-24 pb-24 w-full">
        <div className="max-w-2xl">
          <motion.p {...makeAnim(0.4)} className="section-label mb-6 md:mb-8">
            Almaty · Premium Barbershop
          </motion.p>

          <h1 className="display-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-noir-text mb-6 md:mb-8">
            <motion.span className="block" {...makeAnim(0.5)}>Стиль,</motion.span>
            <motion.span className="block" {...makeAnim(0.6)}>который</motion.span>
            <motion.span className="block" {...makeAnim(0.7)}>говорит</motion.span>
            <motion.span className="block text-noir-accent italic" {...makeAnim(0.8)}>за тебя.</motion.span>
          </h1>

          <motion.p
            {...makeAnim(0.95)}
            className="text-noir-secondary font-body font-light text-base md:text-lg max-w-md leading-relaxed mb-10"
          >
            Стрижки, бритьё и уход, созданные для тех, кто ценит детали.
          </motion.p>

          <motion.div {...makeAnim(1.1)} className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => scrollTo('#booking')} className="btn-primary" aria-label="Записаться на стрижку">
              Записаться
            </button>
            <button onClick={() => scrollTo('#gallery')} className="btn-outline">
              Посмотреть работы
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-noir-secondary hover:text-noir-accent transition-colors"
        aria-label="Прокрутить вниз"
      >
        <span className="font-body text-[10px] tracking-widest3 uppercase">Scroll to discover</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
