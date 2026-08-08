export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
}

export interface Master {
  id: string;
  name: string;
  role: string;
  experience: string;
  photo: string;
  specialty?: string;
}

export interface Review {
  id: string;
  text: string;
  author: string;
  rating: number;
  service?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  tag: string;
  span?: 'tall' | 'wide' | 'normal';
}

export const services: Service[] = [
  {
    id: 'classic-cut',
    name: 'Classic Cut',
    description: 'Классическая мужская стрижка с учётом формы головы и индивидуальных пожеланий',
    price: '5 000 ₸',
    duration: '45 мин',
  },
  {
    id: 'fade',
    name: 'Fade',
    description: 'Современная стрижка с плавным градиентным переходом — от кожи до нужной длины',
    price: '6 000 ₸',
    duration: '50 мин',
  },
  {
    id: 'beard',
    name: 'Beard',
    description: 'Моделирование и оформление бороды с учётом роста волос и желаемой формы',
    price: '4 000 ₸',
    duration: '30 мин',
  },
  {
    id: 'royal-shave',
    name: 'Royal Shave',
    description: 'Классическое бритьё опасной бритвой с горячим полотенцем и уходовыми средствами',
    price: '5 000 ₸',
    duration: '40 мин',
  },
  {
    id: 'cut-beard',
    name: 'Cut + Beard',
    description: 'Стрижка и оформление бороды — полный образ за одно посещение',
    price: '8 000 ₸',
    duration: '75 мин',
  },
  {
    id: 'noir-experience',
    name: 'Noir Experience',
    description: 'Стрижка, оформление бороды и уход — полный премиальный ритуал NOIR',
    price: '10 000 ₸',
    duration: '90 мин',
  },
];

export const masters: Master[] = [
  {
    id: 'alex',
    name: 'Алекс',
    role: 'Senior Barber',
    experience: '12 лет опыта',
    photo: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80',
    specialty: 'Classic & Fade',
  },
  {
    id: 'daniel',
    name: 'Даниэль',
    role: 'Barber',
    experience: '8 лет опыта',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
    specialty: 'Textured Cuts',
  },
  {
    id: 'artur',
    name: 'Артур',
    role: 'Top Barber',
    experience: '10 лет опыта',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    specialty: 'Beard & Shave',
  },
  {
    id: 'max',
    name: 'Макс',
    role: 'Barber',
    experience: '6 лет опыта',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    specialty: 'Modern Styles',
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    text: 'Лучший fade, который мне делали в Алматы. Отдельно понравилась атмосфера — тихо, без лишней суеты. Зайдёшь за стрижкой, выйдешь другим человеком.',
    author: 'Данияр К.',
    rating: 5,
    service: 'Fade',
  },
  {
    id: 'r2',
    text: 'Очень сильный сервис. Записался один раз, теперь хожу только сюда. Алекс понимает с полуслова — не нужно объяснять одно и то же дважды.',
    author: 'Арман Т.',
    rating: 5,
    service: 'Classic Cut',
  },
  {
    id: 'r3',
    text: 'Мастер реально понял, что я хотел. Результат превзошёл ожидания. Noir Experience — это отдельный уровень. Рекомендую всем.',
    author: 'Тимур М.',
    rating: 5,
    service: 'Noir Experience',
  },
  {
    id: 'r4',
    text: 'Пришёл первый раз по рекомендации, теперь сам советую всем друзьям. Качество, атмосфера и отношение — всё на уровне.',
    author: 'Аслан Р.',
    rating: 5,
    service: 'Cut + Beard',
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=85',
    alt: 'Мастер делает fade стрижку',
    tag: 'Fade',
    span: 'tall',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85',
    alt: 'Классическая мужская стрижка',
    tag: 'Classic Cut',
    span: 'normal',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=85',
    alt: 'Оформление бороды',
    tag: 'Beard',
    span: 'normal',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=85',
    alt: 'Textured crop стрижка',
    tag: 'Textured Crop',
    span: 'wide',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1621605814971-fbc98d665033?w=800&q=85',
    alt: 'Slick back стрижка',
    tag: 'Slick Back',
    span: 'normal',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=85',
    alt: 'Modern cut',
    tag: 'Modern Cut',
    span: 'tall',
  },
];

export const instagramPosts = [
  {
    id: 'ig1',
    src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&q=80',
    alt: 'NOIR barbershop work',
  },
  {
    id: 'ig2',
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80',
    alt: 'NOIR barbershop work',
  },
  {
    id: 'ig3',
    src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&q=80',
    alt: 'NOIR barbershop work',
  },
  {
    id: 'ig4',
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&q=80',
    alt: 'NOIR barbershop work',
  },
  {
    id: 'ig5',
    src: 'https://images.unsplash.com/photo-1621605814971-fbc98d665033?w=500&q=80',
    alt: 'NOIR barbershop work',
  },
  {
    id: 'ig6',
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&q=80',
    alt: 'NOIR barbershop work',
  },
];
