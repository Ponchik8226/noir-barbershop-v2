import { Share2, Send, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуги', href: '#services' },
  { label: 'Мастера', href: '#masters' },
  { label: 'Работы', href: '#gallery' },
  { label: 'Контакты', href: '#location' },
];

const socials = [
  { icon: Share2, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Send, label: 'Telegram', href: 'https://t.me' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/77001234567' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-noir-dark border-t border-noir-border" aria-label="Подвал сайта NOIR">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="py-16 md:py-20 grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo('#home')}
              className="flex flex-col leading-none mb-5 group"
              aria-label="NOIR — на главную"
            >
              <span className="font-display text-3xl font-light text-noir-text group-hover:text-noir-accent transition-colors duration-300 tracking-widest">
                NOIR
              </span>
              <span className="font-body text-[9px] tracking-widest3 text-noir-secondary uppercase mt-0.5">
                Barbershop
              </span>
            </button>
            <p className="font-display italic text-noir-secondary text-base">
              «Стиль, который говорит за тебя.»
            </p>
            <div className="flex gap-4 mt-8">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-noir-border flex items-center justify-center text-noir-secondary hover:text-noir-accent hover:border-noir-accent transition-all duration-300"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-noir-secondary mb-6">
              Навигация
            </p>
            <nav className="flex flex-col gap-3" aria-label="Навигация в подвале">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-body text-sm text-noir-secondary hover:text-noir-text transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-noir-secondary mb-6">
              Контакты
            </p>
            <div className="flex flex-col gap-3 font-body text-sm text-noir-secondary">
              <p className="text-noir-text">Алматы</p>
              <p>ул. Панфилова, 123</p>
              <a
                href="tel:+77001234567"
                className="hover:text-noir-accent transition-colors mt-1"
              >
                +7 (700) 123-45-67
              </a>
            </div>
            <div className="mt-8">
              <button
                onClick={() => scrollTo('#booking')}
                className="btn-primary text-xs py-3 px-6"
                aria-label="Записаться на услугу"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-noir-border py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-noir-secondary/60">© 2026 NOIR BARBERSHOP</p>
          <p className="font-body text-xs text-noir-secondary/40">Concept website · Fictional brand</p>
        </div>
      </div>
    </footer>
  );
}
