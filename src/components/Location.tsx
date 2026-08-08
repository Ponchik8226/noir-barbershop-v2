import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom dark marker SVG
const markerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
  <path d="M16 0C7.16 0 0 7.16 0 16c0 11 16 26 16 26S32 27 32 16C32 7.16 24.84 0 16 0z" fill="#C9A96E"/>
  <circle cx="16" cy="16" r="7" fill="#0A0A0A"/>
</svg>`;

const markerIcon = typeof window !== 'undefined'
  ? L.divIcon({
      html: markerSvg,
      className: '',
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -44],
    })
  : undefined;

export default function Location() {
  const ref = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  // Coordinates: ул. Панфилова, Алматы
  const LAT = 43.2567;
  const LNG = 76.9286;

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [LAT, LNG],
      zoom: 16,
      zoomControl: false,
      scrollWheelZoom: false, // disable scroll zoom to not hijack page scroll; user can enable via click
    });

    // Dark OpenStreetMap tile layer (Stadia dark theme - free, no key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Zoom control bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Marker
    if (markerIcon) {
      L.marker([LAT, LNG], { icon: markerIcon })
        .addTo(map)
        .bindPopup(
          '<div style="font-family:sans-serif;font-size:13px;color:#0A0A0A;padding:2px 4px"><strong>NOIR Barbershop</strong><br>ул. Панфилова, 123</div>'
        )
        .openPopup();
    }

    // Enable scroll zoom on click/focus
    map.on('click', () => { map.scrollWheelZoom.enable(); });
    map.on('blur', () => { map.scrollWheelZoom.disable(); });

    leafletMap.current = map;

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  return (
    <section id="location" className="py-24 md:py-36 bg-noir-dark" ref={ref} aria-label="Адрес и контакты NOIR">
      {/* Leaflet CSS overrides for dark theme */}
      <style>{`
        .leaflet-container { background: #111; }
        .leaflet-popup-content-wrapper { border-radius: 0; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        .leaflet-popup-tip { background: #fff; }
        .leaflet-control-zoom a {
          background: #181818 !important;
          color: #C9A96E !important;
          border-color: #242424 !important;
          border-radius: 0 !important;
        }
        .leaflet-control-zoom a:hover { background: #242424 !important; }
        .leaflet-control-attribution {
          background: rgba(10,10,10,0.7) !important;
          color: #555 !important;
          font-size: 10px;
        }
        .leaflet-control-attribution a { color: #777 !important; }
      `}</style>

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
            <div className="flex gap-5 items-start border-b border-noir-border pb-8">
              <MapPin size={20} className="text-noir-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-noir-secondary mb-2">Адрес</p>
                <p className="font-display text-xl md:text-2xl font-light text-noir-text">Алматы</p>
                <p className="font-body text-sm text-noir-secondary mt-1">ул. Панфилова, 123</p>
              </div>
            </div>

            <div className="flex gap-5 items-start border-b border-noir-border pb-8">
              <Clock size={20} className="text-noir-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-noir-secondary mb-2">Время работы</p>
                <p className="font-display text-xl md:text-2xl font-light text-noir-text">Пн–Вс</p>
                <p className="font-body text-sm text-noir-secondary mt-1">10:00 — 22:00</p>
              </div>
            </div>

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

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={`https://www.openstreetmap.org/directions?to=${LAT},${LNG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 justify-center"
              >
                <Navigation size={15} />
                Маршрут
              </a>
              <a
                href="tel:+77001234567"
                className="btn-outline inline-flex items-center gap-2 justify-center"
              >
                <Phone size={15} />
                Позвонить
              </a>
            </div>
          </motion.div>

          {/* Real Leaflet map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] border border-noir-border overflow-hidden"
          >
            <div ref={mapRef} className="w-full h-full" aria-label="Карта расположения NOIR Barbershop" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}