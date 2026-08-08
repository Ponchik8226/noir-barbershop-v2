import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { services, masters } from '../data';

interface FormState {
  name: string;
  phone: string;
  service: string;
  master: string;
  date: string;
  time: string;
}

const initialForm: FormState = {
  name: '', phone: '', service: '', master: '', date: '', time: '',
};

const timeSlots = [
  '10:00','11:00','12:00','13:00','14:00',
  '15:00','16:00','17:00','18:00','19:00','20:00','21:00'
];

async function sendToTelegram(form: FormState): Promise<void> {
  const token = import.meta.env.VITE_TG_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TG_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram не настроен');
  }

  const serviceName = services.find(s => s.id === form.service)?.name ?? form.service;
  const masterName = form.master
    ? (masters.find(m => m.id === form.master)?.name ?? form.master)
    : 'Любой мастер';

  const text = [
    '✂️ <b>Новая заявка — NOIR Barbershop</b>',
    '',
    `👤 <b>Имя:</b> ${form.name}`,
    `📞 <b>Телефон:</b> ${form.phone}`,
    `💈 <b>Услуга:</b> ${serviceName}`,
    `👨‍🎨 <b>Мастер:</b> ${masterName}`,
    `📅 <b>Дата:</b> ${form.date}`,
    `🕐 <b>Время:</b> ${form.time}`,
  ].join('\n');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.description ?? 'Ошибка отправки');
  }
}

export default function Booking() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = 'Введите имя';
    if (!form.phone.trim() || !/^\+?[\d\s\-()]{10,}$/.test(form.phone))
      errs.phone = 'Введите корректный номер';
    if (!form.service) errs.service = 'Выберите услугу';
    if (!form.date) errs.date = 'Выберите дату';
    if (!form.time) errs.time = 'Выберите время';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setSendError(null);
    try {
      await sendToTelegram(form);
      setSuccess(true);
    } catch (e) {
      setSendError('Не удалось отправить заявку. Позвоните нам: +7 (700) 123-45-67');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const today = new Date().toISOString().split('T')[0];

  const inputClass = (field: keyof FormState) =>
    `w-full bg-noir-black border px-4 py-3.5 font-body text-sm text-noir-text
     placeholder-noir-secondary/50 focus:outline-none transition-colors duration-200 appearance-none
     ${errors[field]
       ? 'border-red-500/60 focus:border-red-400'
       : 'border-noir-border focus:border-noir-accent/60'}`;

  return (
    <section id="booking" className="py-24 md:py-36 bg-noir-black" ref={ref} aria-label="Форма записи NOIR">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-14 md:mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            Запись
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-heading text-3xl md:text-5xl lg:text-6xl text-noir-text"
          >
            Твой следующий образ
            <br />
            <span className="text-noir-accent italic">начинается здесь.</span>
          </motion.h2>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-16 px-8 border border-noir-border"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle className="mx-auto mb-6 text-noir-accent" size={52} strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl font-light text-noir-text mb-4">
                Заявка отправлена
              </h3>
              <p className="text-noir-secondary font-body text-base max-w-sm mx-auto leading-relaxed mb-8">
                Спасибо! Мы получили вашу заявку и скоро свяжемся с вами.
              </p>
              <button
                onClick={() => { setSuccess(false); setForm(initialForm); }}
                className="btn-outline text-xs"
              >
                Новая запись
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="border border-noir-border p-6 md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-widest uppercase text-noir-secondary">
                    Имя *
                  </label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    className={inputClass('name')}
                    autoComplete="given-name"
                  />
                  {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-widest uppercase text-noir-secondary">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (700) 000-00-00"
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    className={inputClass('phone')}
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-widest uppercase text-noir-secondary">
                    Услуга *
                  </label>
                  <select
                    value={form.service}
                    onChange={e => handleChange('service', e.target.value)}
                    className={inputClass('service') + ' cursor-pointer'}
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" disabled>Выберите услугу</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.price}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-400 text-xs">{errors.service}</p>}
                </div>

                {/* Master */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-widest uppercase text-noir-secondary">
                    Мастер
                  </label>
                  <select
                    value={form.master}
                    onChange={e => handleChange('master', e.target.value)}
                    className={inputClass('master') + ' cursor-pointer'}
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="">Любой мастер</option>
                    {masters.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} — {m.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-widest uppercase text-noir-secondary">
                    Дата *
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={e => handleChange('date', e.target.value)}
                    className={inputClass('date') + ' cursor-pointer'}
                    style={{ colorScheme: 'dark' }}
                  />
                  {errors.date && <p className="text-red-400 text-xs">{errors.date}</p>}
                </div>

                {/* Time */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-widest uppercase text-noir-secondary">
                    Время *
                  </label>
                  <select
                    value={form.time}
                    onChange={e => handleChange('time', e.target.value)}
                    className={inputClass('time') + ' cursor-pointer'}
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" disabled>Выберите время</option>
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-400 text-xs">{errors.time}</p>}
                </div>
              </div>

              {/* Send error */}
              {sendError && (
                <div className="mt-5 p-4 border border-red-500/30 bg-red-500/5">
                  <p className="text-red-400 text-sm font-body">{sendError}</p>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Отправляем...
                    </span>
                  ) : 'Записаться'}
                </button>
                <p className="text-noir-secondary font-body text-xs leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
