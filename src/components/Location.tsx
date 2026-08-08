import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function Location() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section id="location" className="py-24 md:py-36 bg-noir-dark" ref={ref} aria-label="Адрес и контакты NOIR">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            Контакты
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-heading text-4xl md:text-5xl lg:text-6xl text-noir-text"
          >
            Мы в Алматы
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Address */}
            <div className="flex gap-5 items-start border-b border-noir-border pb-8">
              <MapPin size={20} className="text-noir-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-noir-secondary mb-2">Адрес</p>
                <p className="font-display text-xl md:text-2xl font-light text-noir-text">Алматы</p>
                <p className="font-body text-sm text-noir-secondary mt-1">ул. Панфилова, 123</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-5 items-start border-b border-noir-border pb-8">
              <Clock size={20} className="text-noir-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-noir-secondary mb-2">Время работы</p>
                <p className="font-display text-xl md:text-2xl font-light text-noir-text">Пн–Вс</p>
                <p className="font-body text-sm text-noir-secondary mt-1">10:00 — 22:00</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-5 items-start border-b border-noir-border pb-8">
              <Phone size={20} className="text-noir-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-noir-secondary mb-2">Телефон</p>
                <a
                  href="tel:+77001234567"
                  className="font-display text-xl md:text-2xl font-light text-noir-text hover:text-noir-accent transition-colors"
                >
                  +7 (700) 123-45-67
                </a>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 justify-center"
                aria-label="Построить маршрут"
              >
                <Navigation size={15} />
                Маршрут
              </a>
              <a
                href="tel:+77001234567"
                className="btn-outline inline-flex items-center gap-2 justify-center"
                aria-label="Позвонить в NOIR"
              >
                <Phone size={15} />
                Позвонить
              </a>
            </div>
          </motion.div>

          {/* Mock map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] bg-noir-card border border-noir-border overflow-hidden"
            aria-label="Карта расположения NOIR Barbershop"
          >
            {/* SVG mock map */}
            <svg viewBox="0 0 480 360" className="w-full h-full" aria-hidden="true">
              {/* Background */}
              <rect width="480" height="360" fill="#181818"/>

              {/* Block fills */}
              <rect x="0" y="0" width="140" height="100" fill="#1e1e1e"/>
              <rect x="160" y="0" width="160" height="80" fill="#1e1e1e"/>
              <rect x="340" y="0" width="140" height="120" fill="#1e1e1e"/>
              <rect x="0" y="120" width="100" height="120" fill="#1e1e1e"/>
              <rect x="120" y="100" width="120" height="100" fill="#1e1e1e"/>
              <rect x="260" y="140" width="100" height="80" fill="#1e1e1e"/>
              <rect x="370" y="130" width="110" height="100" fill="#1e1e1e"/>
              <rect x="0" y="260" width="160" height="100" fill="#1e1e1e"/>
              <rect x="180" y="240" width="140" height="120" fill="#1e1e1e"/>
              <rect x="340" y="250" width="140" height="110" fill="#1e1e1e"/>

              {/* Streets */}
              <rect x="140" y="0" width="20" height="360" fill="#242424"/>
              <rect x="320" y="0" width="20" height="360" fill="#242424"/>
              <rect x="0" y="100" width="480" height="20" fill="#242424"/>
              <rect x="0" y="230" width="480" height="20" fill="#242424"/>

              {/* Street labels */}
              <text x="148" y="65" font-family="sans-serif" font-size="8" fill="#3a3a3a" writing-mode="tb">ул. Панфилова</text>
              <text x="328" y="60" font-family="sans-serif" font-size="8" fill="#3a3a3a" writing-mode="tb">ул. Байсеитовой</text>
              <text x="60" y="114" font-family="sans-serif" font-size="8" fill="#3a3a3a">пр. Достык</text>
              <text x="370" y="244" font-family="sans-serif" font-size="8" fill="#3a3a3a">ул. Кабанбай батыра</text>

              {/* Marker */}
              <circle cx="150" cy="110" r="18" fill="#C9A96E22" stroke="#C9A96E" strokeWidth="1.5"/>
              <circle cx="150" cy="110" r="5" fill="#C9A96E"/>

              {/* Label */}
              <rect x="162" y="94" width="80" height="32" rx="2" fill="#0A0A0A" stroke="#2a2a2a" strokeWidth="1"/>
              <text x="170" y="107" font-family="sans-serif" font-size="9" font-weight="600" fill="#C9A96E">NOIR</text>
              <text x="170" y="120" font-family="sans-serif" font-size="7" fill="#8A8680">ул. Панфилова, 123</text>
            </svg>

            {/* Subtle vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(10,10,10,0.6)] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
