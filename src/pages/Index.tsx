import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/054d72d3-7aaf-4dab-acf3-3d57ff56743b/files/5a43b93e-0a7a-4460-bc4b-33283f77cc47.jpg";
const SPA_IMG = "https://cdn.poehali.dev/projects/054d72d3-7aaf-4dab-acf3-3d57ff56743b/files/74cd9394-1dda-4c07-9a31-920ded12d9fc.jpg";
const ROOM_IMG = "https://cdn.poehali.dev/projects/054d72d3-7aaf-4dab-acf3-3d57ff56743b/files/9c19384d-608e-45a8-8def-e5481926d7ee.jpg";

const NAV_LINKS = [
  { label: "О курорте", href: "#about" },
  { label: "Номера", href: "#rooms" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const STATS = [
  { value: "12+", label: "лет работы" },
  { value: "340", label: "номеров" },
  { value: "5★", label: "уровень сервиса" },
  { value: "18", label: "га территории" },
];

const SERVICES = [
  { icon: "Waves", title: "Бассейны", desc: "Открытые и крытые бассейны с морской водой, подогревом и видом на море" },
  { icon: "Sparkles", title: "СПА-центр", desc: "Банный комплекс, хаммам, сауны, массажные кабинеты и косметология" },
  { icon: "UtensilsCrossed", title: "Рестораны", desc: "4 ресторана с авторской кухней, летние терассы и доставка в номер 24/7" },
  { icon: "Dumbbell", title: "Спорт", desc: "Теннисные корты, пляжный волейбол, фитнес-центр и йога на закате" },
  { icon: "Baby", title: "Детский клуб", desc: "Профессиональные аниматоры, игровые зоны и детский бассейн" },
  { icon: "Car", title: "Трансфер", desc: "Встреча в аэропорту Анапы и ж/д вокзале, аренда авто и экскурсии" },
];

const ROOMS = [
  {
    title: "Стандарт",
    desc: "Уютный номер с видом на парк",
    size: "28 м²",
    price: "от 8 500 ₽/ночь",
    img: ROOM_IMG,
  },
  {
    title: "Делюкс с видом на море",
    desc: "Панорамный вид на Черное море, балкон",
    size: "38 м²",
    price: "от 14 000 ₽/ночь",
    img: HERO_IMG,
  },
  {
    title: "Люкс",
    desc: "Гостиная, спальня, джакузи и терасса",
    size: "65 м²",
    price: "от 22 000 ₽/ночь",
    img: SPA_IMG,
  },
];

const REVIEWS = [
  {
    name: "Марина К.",
    city: "Москва",
    text: "Второй год подряд приезжаем семьёй. Дети в восторге от анимации, мы с мужем — от спа. Сервис безупречный, территория ухоженная.",
    rating: 5,
  },
  {
    name: "Дмитрий Л.",
    city: "Краснодар",
    text: "Отдыхали в сентябре, тепло и не многолюдно. Номер с видом на море — просто загляденье. Ресторан порадовал свежей рыбой.",
    rating: 5,
  },
  {
    name: "Анна В.",
    city: "Санкт-Петербург",
    text: "Спа-программа превзошла все ожидания. Массажисты — настоящие профессионалы. Буду рекомендовать всем подругам!",
    rating: 5,
  },
];

const FAQ_ITEMS = [
  { q: "Когда лучше приехать в Барвиху?", a: "Курорт работает круглый год. Купальный сезон — июнь–сентябрь. Вне сезона действуют специальные цены и доступны все спа-программы в тишине и комфорте." },
  { q: "Есть ли трансфер из аэропорта?", a: "Да, мы организуем трансфер из аэропорта Анапы и ж/д вокзала Анапы. Забронируйте заранее при бронировании номера или свяжитесь с нами." },
  { q: "Можно ли с животными?", a: "К сожалению, проживание с животными на курорте не предусмотрено. Мы заботимся об аллергиках и всех гостях." },
  { q: "Какие варианты питания доступны?", a: "Завтрак шведский стол, полупансион и полный пансион. 4 ресторана à la carte. Доставка в номер — 24 часа в сутки." },
  { q: "Есть ли программы для детей?", a: "Детский клуб с аниматорами работает ежедневно с 9:00 до 21:00. Детский бассейн, игровые площадки и специальное меню." },
  { q: "Как забронировать номер?", a: "Позвоните нам, напишите в WhatsApp или оставьте заявку на сайте — менеджер свяжется с вами в течение 15 минут и подберёт лучший вариант." },
  { q: "Какие документы нужны при заселении?", a: "Паспорт гражданина РФ или загранпаспорт. При наличии путёвки — путёвка. Для детей до 14 лет — свидетельство о рождении." },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col leading-none">
          <span
            className="font-cormorant text-2xl font-semibold tracking-widest"
            style={{ color: scrolled ? "var(--dark)" : "white" }}
          >
            БАРВИХА
          </span>
          <span
            className="text-xs tracking-[0.3em] uppercase font-golos"
            style={{ color: scrolled ? "var(--gold)" : "rgba(255,255,255,0.7)" }}
          >
            курорт · анапа
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="nav-link text-sm tracking-wider uppercase font-golos transition-colors"
              style={{ color: scrolled ? "var(--dark)" : "rgba(255,255,255,0.85)" }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("#contacts")}
          className="hidden md:block px-6 py-2.5 text-xs tracking-widest uppercase font-golos font-medium transition-all duration-300 hover:opacity-90"
          style={{ background: "var(--gold)", color: "white" }}
        >
          Забронировать
        </button>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: scrolled ? "var(--dark)" : "white" }}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-md border-t border-border px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm tracking-wider uppercase font-golos text-left"
              style={{ color: "var(--dark)" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contacts")}
            className="mt-2 px-6 py-3 text-xs tracking-widest uppercase font-golos font-medium text-white"
            style={{ background: "var(--gold)" }}
          >
            Забронировать
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Курорт Барвиха Анапа"
          className="w-full h-full object-cover"
          style={{ animation: "heroScale 1.5s ease forwards" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(28,23,16,0.88) 0%, rgba(28,23,16,0.3) 55%, rgba(28,23,16,0.1) 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
        <div className="max-w-2xl">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6 font-golos"
            style={{ color: "var(--gold)", animation: "fadeUp 0.8s ease 0.3s both" }}
          >
            Черноморское побережье · Анапа
          </p>
          <h1
            className="font-cormorant text-6xl md:text-8xl font-light text-white leading-none mb-8"
            style={{ animation: "fadeUp 0.8s ease 0.5s both" }}
          >
            Место,<br />
            <em>где останавливается</em><br />
            время
          </h1>
          <p
            className="font-golos text-base text-white/75 mb-10 leading-relaxed max-w-md"
            style={{ animation: "fadeUp 0.8s ease 0.7s both" }}
          >
            Премиальный курорт на берегу Чёрного моря. 18 гектаров природы, открытые бассейны, авторская кухня и полное спокойствие.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{ animation: "fadeUp 0.8s ease 0.9s both" }}
          >
            <button
              onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 text-sm tracking-widest uppercase font-golos font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--gold)" }}
            >
              Забронировать
            </button>
            <button
              onClick={() => document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 text-sm tracking-widest uppercase font-golos font-medium text-white border border-white/40 hover:border-white/80 transition-colors"
            >
              Смотреть номера
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10">
        <span className="text-white/50 text-xs tracking-widest font-golos" style={{ writingMode: "vertical-rl" }}>
          ПРОКРУТИТЕ
        </span>
        <div className="w-px h-16 overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div className="w-full" style={{ height: "50%", background: "var(--gold)", animation: "scrollLine 2s ease infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes heroScale {
          from { transform: scale(1.06); }
          to { transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
            }}
          >
            <div className="font-cormorant text-5xl md:text-6xl font-light mb-2" style={{ color: "var(--gold)" }}>
              {s.value}
            </div>
            <div className="text-xs tracking-widest uppercase font-golos" style={{ color: "rgba(255,255,255,0.5)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <p className="text-xs tracking-[0.4em] uppercase font-golos mb-4" style={{ color: "var(--gold)" }}>
            О курорте
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light leading-tight mb-8 gold-line" style={{ color: "var(--dark)" }}>
            Барвиха —<br /><em>не просто отдых</em>
          </h2>
          <p className="font-golos text-base leading-relaxed mb-6" style={{ color: "var(--warm-gray)" }}>
            Курорт расположен на первой береговой линии Анапы. 18 гектаров парковой зоны, выход на собственный пляж, четыре ресторана и полный спектр велнес-услуг — всё создано для того, чтобы вы забыли о суете большого города.
          </p>
          <p className="font-golos text-base leading-relaxed mb-10" style={{ color: "var(--warm-gray)" }}>
            Мы работаем для тех, кто ценит пространство, тишину и безупречный сервис. Каждая деталь продумана с заботой о вашем комфорте.
          </p>
          <div className="flex gap-8">
            <div>
              <div className="font-cormorant text-3xl font-semibold" style={{ color: "var(--dark)" }}>2012</div>
              <div className="text-xs tracking-wider uppercase font-golos mt-1" style={{ color: "var(--warm-gray)" }}>год основания</div>
            </div>
            <div style={{ width: "1px", background: "var(--gold)", opacity: 0.3 }} />
            <div>
              <div className="font-cormorant text-3xl font-semibold" style={{ color: "var(--dark)" }}>500 м</div>
              <div className="text-xs tracking-wider uppercase font-golos mt-1" style={{ color: "var(--warm-gray)" }}>до моря</div>
            </div>
            <div style={{ width: "1px", background: "var(--gold)", opacity: 0.3 }} />
            <div>
              <div className="font-cormorant text-3xl font-semibold" style={{ color: "var(--dark)" }}>12</div>
              <div className="text-xs tracking-wider uppercase font-golos mt-1" style={{ color: "var(--warm-gray)" }}>наград</div>
            </div>
          </div>
        </div>

        <div className="reveal delay-300 relative">
          <img
            src={SPA_IMG}
            alt="СПА курорта Барвиха"
            className="w-full object-cover"
            style={{ height: "520px", filter: "brightness(0.95)" }}
          />
          <div
            className="absolute -bottom-6 -left-6 hidden md:flex flex-col gap-1 px-8 py-6"
            style={{ background: "var(--gold)", width: "200px" }}
          >
            <span className="font-cormorant text-4xl font-light text-white">★★★★★</span>
            <span className="text-xs tracking-wider uppercase font-golos text-white/80">Рейтинг гостей</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6" style={{ background: "white" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.4em] uppercase font-golos mb-4" style={{ color: "var(--gold)" }}>
            Всё включено
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light gold-line-center" style={{ color: "var(--dark)" }}>
            Услуги и развлечения
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "hsl(var(--border))" }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="reveal p-10 group cursor-default transition-all duration-300 hover:-translate-y-1"
              style={{ background: "white", animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: "var(--cream)" }}
              >
                <Icon name={s.icon} size={22} style={{ color: "var(--gold)" }} />
              </div>
              <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "var(--dark)" }}>
                {s.title}
              </h3>
              <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--warm-gray)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomsSection() {
  return (
    <section id="rooms" className="py-24 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.4em] uppercase font-golos mb-4" style={{ color: "var(--gold)" }}>
            Размещение
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light gold-line-center" style={{ color: "var(--dark)" }}>
            Номера и сьюты
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ROOMS.map((room, i) => (
            <div
              key={room.title}
              className="reveal group overflow-hidden"
              style={{ animationDelay: `${i * 0.15}s`, background: "white" }}
            >
              <div className="overflow-hidden" style={{ height: "260px" }}>
                <img
                  src={room.img}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-cormorant text-2xl font-medium" style={{ color: "var(--dark)" }}>
                    {room.title}
                  </h3>
                  <span className="text-xs font-golos px-2 py-1" style={{ background: "var(--cream)", color: "var(--warm-gray)" }}>
                    {room.size}
                  </span>
                </div>
                <p className="font-golos text-sm mb-6" style={{ color: "var(--warm-gray)" }}>
                  {room.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-cormorant text-xl" style={{ color: "var(--dark)" }}>
                    {room.price}
                  </span>
                  <button
                    onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-xs tracking-widest uppercase font-golos px-5 py-2.5 transition-opacity hover:opacity-80"
                    style={{ background: "var(--gold)", color: "white" }}
                  >
                    Выбрать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullscreenCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(28,23,16,0.78)" }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
        <p className="text-xs tracking-[0.4em] uppercase font-golos mb-6" style={{ color: "var(--gold)" }}>
          Специальное предложение
        </p>
        <h2 className="font-cormorant text-5xl md:text-7xl font-light text-white mb-8 leading-tight">
          Раннее бронирование<br />
          <em>— скидка 20%</em>
        </h2>
        <p className="font-golos text-base text-white/70 mb-10 leading-relaxed">
          Забронируйте отдых заранее и сэкономьте. Предложение действует до 30 апреля 2026 года.
        </p>
        <button
          onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
          className="px-10 py-4 text-sm tracking-widest uppercase font-golos font-medium transition-opacity hover:opacity-90"
          style={{ background: "var(--gold)", color: "white" }}
        >
          Узнать подробности
        </button>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 px-6" style={{ background: "white" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.4em] uppercase font-golos mb-4" style={{ color: "var(--gold)" }}>
            Гости о нас
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light gold-line-center" style={{ color: "var(--dark)" }}>
            Отзывы
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className="reveal p-10 relative"
              style={{ background: "var(--cream)", animationDelay: `${i * 0.15}s` }}
            >
              <div className="font-cormorant text-7xl leading-none mb-4" style={{ color: "var(--gold)", opacity: 0.35 }}>
                "
              </div>
              <p className="font-golos text-sm leading-relaxed mb-8" style={{ color: "var(--warm-gray)" }}>
                {r.text}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-cormorant text-lg font-medium" style={{ color: "var(--dark)" }}>
                    {r.name}
                  </div>
                  <div className="text-xs font-golos" style={{ color: "var(--warm-gray)" }}>
                    {r.city}
                  </div>
                </div>
                <div className="flex gap-0.5 text-base" style={{ color: "var(--gold)" }}>
                  {"★".repeat(r.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.4em] uppercase font-golos mb-4" style={{ color: "var(--gold)" }}>
            Часто спрашивают
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light gold-line-center" style={{ color: "var(--dark)" }}>
            Вопросы и ответы
          </h2>
        </div>

        <div className="flex flex-col gap-px" style={{ background: "hsl(var(--border))" }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ background: "white" }}>
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-golos text-sm font-medium" style={{ color: "var(--dark)" }}>
                  {item.q}
                </span>
                <Icon
                  name={open === i ? "Minus" : "Plus"}
                  size={16}
                  style={{ color: "var(--gold)", flexShrink: 0 }}
                />
              </button>
              {open === i && (
                <div className="px-8 pb-6">
                  <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--warm-gray)" }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", guests: "2", dates: "", consent: false });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setSent(true);
  };

  return (
    <section id="contacts" className="py-24 px-6" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div className="reveal">
          <p className="text-xs tracking-[0.4em] uppercase font-golos mb-4" style={{ color: "var(--gold)" }}>
            Бронирование
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white mb-8 leading-tight">
            Начните<br /><em>планировать отдых</em>
          </h2>
          <p className="font-golos text-sm leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.5)" }}>
            Оставьте заявку — наш менеджер свяжется с вами в течение 15 минут и подберёт оптимальный вариант размещения.
          </p>

          <div className="flex flex-col gap-6">
            {[
              { icon: "Phone", text: "+7 (861) 123-45-67" },
              { icon: "Mail", text: "info@barvikha-resort.ru" },
              { icon: "MapPin", text: "Анапа, ул. Черноморская, 1" },
              { icon: "Clock", text: "Ресепшн — 24/7" },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(196,165,90,0.15)" }}>
                  <Icon name={c.icon} size={16} style={{ color: "var(--gold)" }} />
                </div>
                <span className="font-golos text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {c.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal delay-300 p-8 md:p-10" style={{ background: "white" }}>
          {sent ? (
            <div className="text-center py-12">
              <div className="font-cormorant text-6xl mb-4" style={{ color: "var(--gold)" }}>✓</div>
              <h3 className="font-cormorant text-3xl font-medium mb-3" style={{ color: "var(--dark)" }}>
                Заявка получена
              </h3>
              <p className="font-golos text-sm" style={{ color: "var(--warm-gray)" }}>
                Мы свяжемся с вами в течение 15 минут
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className="font-cormorant text-3xl font-medium mb-2" style={{ color: "var(--dark)" }}>
                Оставить заявку
              </h3>

              <div className="flex flex-col gap-1">
                <label className="text-xs tracking-wider uppercase font-golos" style={{ color: "var(--warm-gray)" }}>
                  Ваше имя *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border px-4 py-3 font-golos text-sm outline-none transition-colors"
                  style={{ borderColor: "hsl(var(--border))", color: "var(--dark)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
                  placeholder="Иван Иванов"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs tracking-wider uppercase font-golos" style={{ color: "var(--warm-gray)" }}>
                  Телефон *
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="border px-4 py-3 font-golos text-sm outline-none transition-colors"
                  style={{ borderColor: "hsl(var(--border))", color: "var(--dark)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
                  placeholder="+7 (999) 000-00-00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs tracking-wider uppercase font-golos" style={{ color: "var(--warm-gray)" }}>
                    Гостей
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="border px-4 py-3 font-golos text-sm outline-none transition-colors bg-white"
                    style={{ borderColor: "hsl(var(--border))", color: "var(--dark)" }}
                  >
                    {["1", "2", "3", "4", "5+"].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs tracking-wider uppercase font-golos" style={{ color: "var(--warm-gray)" }}>
                    Даты
                  </label>
                  <input
                    value={form.dates}
                    onChange={(e) => setForm({ ...form, dates: e.target.value })}
                    className="border px-4 py-3 font-golos text-sm outline-none transition-colors"
                    style={{ borderColor: "hsl(var(--border))", color: "var(--dark)" }}
                    placeholder="Июль 2026"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 cursor-pointer"
                  style={{ accentColor: "var(--gold)" }}
                />
                <span className="font-golos text-xs leading-relaxed" style={{ color: "var(--warm-gray)" }}>
                  Я даю согласие на обработку персональных данных согласно{" "}
                  <a href="#" style={{ color: "var(--gold)", textDecoration: "underline" }}>
                    Политике конфиденциальности
                  </a>
                </span>
              </label>

              <button
                type="submit"
                disabled={!form.consent}
                className="py-4 text-sm tracking-widest uppercase font-golos font-medium text-white transition-opacity mt-2"
                style={{
                  background: form.consent ? "var(--gold)" : "var(--warm-gray)",
                  cursor: form.consent ? "pointer" : "not-allowed",
                }}
              >
                Отправить заявку
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6" style={{ background: "#130F0A", borderTop: "1px solid rgba(196,165,90,0.2)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-cormorant text-xl tracking-widest" style={{ color: "var(--gold)" }}>
            БАРВИХА
          </span>
          <span className="text-xs font-golos" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2026 ООО «Курорт Барвиха» · ИНН 000000000000
          </span>
        </div>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          {[
            "Политика конфиденциальности",
            "Согласие на обработку ПДн",
            "Cookie",
          ].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs font-golos transition-colors hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          {[
            { icon: "Phone", href: "tel:+78611234567" },
            { icon: "MessageCircle", href: "#" },
          ].map((s) => (
            <a
              key={s.icon}
              href={s.href}
              className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ border: "1px solid rgba(196,165,90,0.3)" }}
            >
              <Icon name={s.icon} size={15} style={{ color: "var(--gold)" }} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function StickyBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 md:bottom-8 z-40 px-8 py-3.5 text-xs tracking-widest uppercase font-golos font-medium text-white shadow-lg transition-all duration-500 hover:opacity-90"
      style={{
        background: "var(--gold)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <span className="flex items-center gap-2">
        <Icon name="Calendar" size={14} />
        Забронировать
      </span>
    </button>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-accepted", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 p-6 shadow-2xl cookie-banner"
      style={{ background: "white", border: "1px solid hsl(var(--border))" }}
    >
      <p className="font-golos text-xs leading-relaxed mb-4" style={{ color: "var(--warm-gray)" }}>
        Сайт использует Яндекс.Метрику — российский сервис аналитики. Продолжая использовать сайт, вы соглашаетесь с{" "}
        <a href="#" style={{ color: "var(--gold)", textDecoration: "underline" }}>
          Политикой обработки ПДн
        </a>.
      </p>
      <button
        onClick={accept}
        className="w-full py-2.5 text-xs tracking-widest uppercase font-golos font-medium text-white"
        style={{ background: "var(--gold)" }}
      >
        Принять
      </button>
    </div>
  );
}

export default function Index() {
  useReveal();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <RoomsSection />
      <FullscreenCTA />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <StickyBookButton />
      <CookieBanner />
    </div>
  );
}