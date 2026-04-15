import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";


const HERO_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/44c04827-b8a2-4dd5-a1b7-8b604e07ba3b.jpg";
const GARDEN_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/83033b65-7386-435d-b653-94fddc213166.jpg";
const SHOWROOM_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/files/c66e0e66-19b9-4ec7-b64b-3e8efa991827.jpg";

type Section = "home" | "catalog" | "about" | "contacts" | "faq" | "cart";

const ROGOJKA_BEIGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a389bbba-23dd-4b56-899d-d2317ab26cee.jpg";
const ROGOJKA_COFFEE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f1b9a482-58b8-46af-857c-4847ef4e3917.jpg";
const ROGOJKA_HONEY = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/985b83d3-f532-4f91-81af-58a255e5db43.jpg";
const ROGOJKA_GREY = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/334bb3de-ee3c-4dec-a59a-f195d0648310.jpg";
const ROGOJKA_BLUE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/46919192-f2f6-4f7b-a677-abb571901185.jpg";
const VELVET_EMERALD = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7ad6636c-e785-4898-a1b0-817c74a1a421.jpg";
const VELVET_CHOCOLATE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/19dbaa83-4956-42d1-8120-ea5f77c5ae71.jpg";
const VELVET_MINT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b9a818cd-a59c-4b69-b5c0-b4ca163ddba8.jpg";
const VELVET_LGREY = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b01460c2-6ca9-4767-a94b-238dfb5d32f4.jpg";
const VELVET_BLUE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f12ee5bf-0cf4-4300-8af6-16ef12060d2a.jpg";

const catalogProducts = [
  {
    id: 1, name: "Либерти", category: "sofa", price: 69399, img: HERO_IMAGE, tag: "Хит",
    images: [HERO_IMAGE, SHOWROOM_IMAGE, GARDEN_IMAGE],
    colors: [
      { name: "Бежевый", swatch: ROGOJKA_BEIGE },
      { name: "Кофейный", swatch: ROGOJKA_COFFEE },
      { name: "Медово-коричневый", swatch: ROGOJKA_HONEY },
      { name: "Серый", swatch: ROGOJKA_GREY },
      { name: "Синий (рогожка)", swatch: ROGOJKA_BLUE },
      { name: "Изумрудный", swatch: VELVET_EMERALD },
      { name: "Мятный", swatch: VELVET_MINT },
    ],
    desc: "Угловой диван с мягкими подлокотниками и независимым пружинным блоком. Обивка — рогожка или велюр на выбор. Срок изготовления до 7 рабочих дней.",
    specs: [
      { label: "Размер", value: "Ш 280 × Г 175 × В 85 см" },
      { label: "Механизм", value: "Дельфин" },
      { label: "Наполнитель", value: "ППУ 28кг/м³ + холлофайбер" },
      { label: "Каркас", value: "Сосна + берёзовая фанера" },
      { label: "Ткань", value: "Рогожка / велюр на выбор" },
      { label: "Цвета", value: "5 цветов рогожки, 4 цвета велюра" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 2, name: "Фарелл", category: "garden", price: 44999, img: GARDEN_IMAGE, tag: "Новинка",
    images: [GARDEN_IMAGE, HERO_IMAGE, SHOWROOM_IMAGE],
    colors: [
      { name: "Бежевый", swatch: ROGOJKA_BEIGE },
      { name: "Серый", swatch: ROGOJKA_GREY },
    ],
    desc: "Комплект садовой мебели из ротанга с алюминиевым каркасом. Не боится влаги и перепадов температур. Подушки входят в комплект.",
    specs: [
      { label: "Комплект", value: "Диван + 2 кресла + столик" },
      { label: "Материал", value: "Искусственный ротанг PE" },
      { label: "Каркас", value: "Алюминий, порошковая окраска" },
      { label: "Подушки", value: "Влагостойкая ткань, входят в комплект" },
      { label: "Нагрузка", value: "До 150 кг на место" },
      { label: "Уход", value: "Протирать влажной тряпкой" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 3, name: "Моника", category: "bed", price: 24999, img: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/49ffffd3-0c1f-467b-8a3b-1d215802383e.jpg", tag: "",
    images: ["https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/49ffffd3-0c1f-467b-8a3b-1d215802383e.jpg", SHOWROOM_IMAGE, HERO_IMAGE],
    colors: [
      { name: "Бежевый (велюр)", swatch: VELVET_LGREY },
      { name: "Мятный (велюр)", swatch: VELVET_MINT },
      { name: "Синий (велюр)", swatch: VELVET_BLUE },
      { name: "Изумрудный (велюр)", swatch: VELVET_EMERALD },
    ],
    desc: "Кровать с мягким изголовьем в скандинавском стиле. Вертикальная стёжка придаёт объём и благородство. Обивка — бежевый велюр.",
    specs: [
      { label: "Спальное место", value: "160×200 / 180×200 см" },
      { label: "Высота изголовья", value: "120 см" },
      { label: "Механизм", value: "Подъёмный, газлифт" },
      { label: "Каркас", value: "ЛДСП 25мм + металл" },
      { label: "Обивка", value: "Велюр, бежевый" },
      { label: "Ножки", value: "Массив дерева, натуральный" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 4, name: "Terra Set", category: "garden", price: 79900, img: GARDEN_IMAGE, tag: "Хит",
    images: [GARDEN_IMAGE, SHOWROOM_IMAGE, HERO_IMAGE],
    colors: [
      { name: "Бежевый", swatch: ROGOJKA_BEIGE },
      { name: "Серый", swatch: ROGOJKA_GREY },
      { name: "Кофейный", swatch: ROGOJKA_COFFEE },
    ],
    desc: "Премиальный комплект садовой мебели с широкими посадочными местами. Отлично подходит для террасы и зоны барбекю.",
    specs: [
      { label: "Комплект", value: "Диван + 2 кресла + журнальный стол" },
      { label: "Каркас", value: "Сталь с порошковым покрытием" },
      { label: "Ткань", value: "Olefin, UV-защита класса A" },
      { label: "Наполнитель", value: "Пена высокой плотности" },
      { label: "Вес комплекта", value: "48 кг" },
      { label: "Сборка", value: "Входит в стоимость" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 5, name: "Minimal", category: "sofa", price: 54900, img: HERO_IMAGE, tag: "",
    images: [HERO_IMAGE, GARDEN_IMAGE, SHOWROOM_IMAGE],
    colors: [
      { name: "Бежевый", swatch: ROGOJKA_BEIGE },
      { name: "Серый", swatch: ROGOJKA_GREY },
      { name: "Синий (рогожка)", swatch: ROGOJKA_BLUE },
      { name: "Изумрудный (велюр)", swatch: VELVET_EMERALD },
      { name: "Синий (велюр)", swatch: VELVET_BLUE },
    ],
    desc: "Прямой диван в стиле минимализм. Лаконичные линии, плотная посадка, высокие ножки. Идеален для небольших пространств.",
    specs: [
      { label: "Размер", value: "Ш 220 × Г 90 × В 80 см" },
      { label: "Механизм", value: "Еврокнижка" },
      { label: "Наполнитель", value: "ППУ 30кг/м³" },
      { label: "Каркас", value: "Берёзовая фанера + металл" },
      { label: "Ножки", value: "Натуральный дуб, высота 18 см" },
      { label: "Ткань", value: "Рогожка / велюр на выбор" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 6, name: "Patio Duo", category: "garden", price: 44900, img: GARDEN_IMAGE, tag: "Новинка",
    images: [GARDEN_IMAGE, HERO_IMAGE, SHOWROOM_IMAGE],
    colors: [
      { name: "Бежевый", swatch: ROGOJKA_BEIGE },
      { name: "Серый", swatch: ROGOJKA_GREY },
    ],
    desc: "Двухместный диван для открытых террас и лоджий. Компактный, но вместительный. Легко собирается без инструментов.",
    specs: [
      { label: "Размер", value: "Ш 150 × Г 80 × В 75 см" },
      { label: "Материал", value: "Ротанг PE, устойчив к УФ" },
      { label: "Каркас", value: "Алюминий" },
      { label: "Подушки", value: "В комплекте, съёмные чехлы" },
      { label: "Вес", value: "18 кг" },
      { label: "Нагрузка", value: "До 240 кг" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 7, name: "Ардо", category: "chair", price: 18900, img: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/files/4300a84d-f22a-46f5-bb64-31b787c56afd.jpg", tag: "Новинка",
    images: [
      "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/files/4300a84d-f22a-46f5-bb64-31b787c56afd.jpg",
      "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/files/9f50caee-1102-4e33-9527-3a1c2234fb89.jpg",
      "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/files/493f29d0-f89e-49dd-9c32-8c760b879482.jpg",
    ],
    colors: [
      { name: "Бежевый", swatch: ROGOJKA_BEIGE },
      { name: "Кофейный", swatch: ROGOJKA_COFFEE },
      { name: "Серый", swatch: ROGOJKA_GREY },
      { name: "Изумрудный (велюр)", swatch: VELVET_EMERALD },
      { name: "Мятный (велюр)", swatch: VELVET_MINT },
      { name: "Светло-серый (велюр)", swatch: VELVET_LGREY },
      { name: "Синий (велюр)", swatch: VELVET_BLUE },
    ],
    desc: "Кресло с глубокой мягкой посадкой и широкими подлокотниками. Идеально для чтения и отдыха. Обивка — велюр или рогожка на выбор.",
    specs: [
      { label: "Размер", value: "Ш 85 × Г 90 × В 95 см" },
      { label: "Высота сиденья", value: "45 см" },
      { label: "Наполнитель", value: "ППУ 28кг/м³ + перо" },
      { label: "Каркас", value: "Сосна + берёзовая фанера" },
      { label: "Ножки", value: "Массив дуба, высота 15 см" },
      { label: "Ткань", value: "Велюр / рогожка на выбор" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
];

const faqItems = [
  { q: "Какой срок гарантии на мебель?", a: "На всю мебель — 18 месяцев. Гарантия распространяется на каркас, механизмы и обивку." },
  { q: "Какие материалы доступны для обивки?", a: "Мы работаем с велюром и рогожкой. Рогожка доступна в 5 цветах: бежевый, медово-коричневый, серый, кофейный и синий. Велюр — в различных вариациях в зависимости от модели." },
  { q: "Есть ли шоурум, где можно посмотреть диваны вживую?", a: "Да, наш шоурум находится в Москве на Садовой-Сухаревской, 2. Открыт ежедневно с 10:00 до 21:00." },
];

type CartItem = { id: number; name: string; price: number; img: string; qty: number };

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeRogojka, setActiveRogojka] = useState(0);
  const [activeVelvet, setActiveVelvet] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<(typeof catalogProducts)[0] | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [promoTimeLeft, setPromoTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const promoEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
    const tick = () => {
      const diff = promoEnd.getTime() - Date.now();
      if (diff <= 0) return;
      setPromoTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openProduct = (p: (typeof catalogProducts)[0]) => {
    setSelectedProduct(p);
    setActivePhoto(0);
    setActiveColor(0);
  };
  const closeProduct = () => {
    setSelectedProduct(null);
    setActivePhoto(0);
    setActiveColor(0);
  };

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const navigate = (s: Section) => {
    setActiveSection(s);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: (typeof catalogProducts)[0]) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));

  const filteredProducts = activeFilter === "all" ? catalogProducts : catalogProducts.filter((p) => p.category === activeFilter);

  const navLinks: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О нас" },
    { id: "contacts", label: "Контакты" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} className="font-display text-2xl font-bold tracking-widest text-primary">
            Мебель за стеклом
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`font-body text-sm tracking-wider uppercase transition-colors ${
                  activeSection === link.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("cart")}
              className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-display tracking-widest hover:opacity-90 transition-opacity"
            >
              <Icon name="ShoppingBag" size={16} />
              <span className="hidden sm:inline">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-1" onClick={() => setMobileMenuOpen((v) => !v)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`block w-full text-left px-6 py-4 font-display tracking-widest uppercase text-sm border-b border-border ${
                  activeSection === link.id ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ====== HOME ====== */}
        {activeSection === "home" && (
          <div>
            {/* Hero */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
              <div className="relative container pb-20 animate-fade-up">
                <div className="max-w-2xl">
                  <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-4">Мебель нового поколения</p>
                  <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-6 text-foreground">
                    ФОРМА.<br />СТИЛЬ.<br />
                    <span className="text-accent">КОМФОРТ.</span>
                  </h1>
                  <p className="font-body text-muted-foreground text-lg mb-10 max-w-md">
                    Мягкая и садовая мебель, текстиль.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <button
                      onClick={() => navigate("catalog")}
                      className="bg-primary text-primary-foreground px-8 py-4 font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
                    >
                      Смотреть каталог
                    </button>
                    <button
                      onClick={() => navigate("contacts")}
                      className="border border-foreground/30 text-foreground px-8 py-4 font-display text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
                    >
                      Связаться с нами
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute top-32 right-8 hidden lg:flex flex-col gap-4 animate-fade-in delay-500">
                {[
                  { num: "1 млн+", label: "Довольных клиентов" },
                  { num: "18 мес.", label: "Гарантия" },
                  { num: "120+", label: "Моделей" },
                ].map((s, i) => (
                  <div key={i} className="bg-background/80 backdrop-blur border border-border px-5 py-3 text-right">
                    <div className="font-display text-2xl font-bold text-accent">{s.num}</div>
                    <div className="font-body text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Marquee */}
            <div className="bg-primary py-3 overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {Array(10).fill(null).map((_, i) => (
                  <span key={i} className="font-display text-primary-foreground text-sm tracking-[0.4em] uppercase font-light">
                    ДИВАНЫ · САДОВАЯ МЕБЕЛЬ · ВЕЛЮР · РОГОЖКА · ГАРАНТИЯ 18 МЕСЯЦЕВ ·&nbsp;
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <section className="container py-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: "Layers", title: "Качественные материалы", desc: "Велюр и рогожка — износостойкие ткани с богатой палитрой оттенков" },
                  { icon: "Clock", title: "Срок изготовления до 7 дней", desc: "Изготавливаем под заказ из каталога — всё, что видите, доступно для заказа" },
                  { icon: "ShieldCheck", title: "Гарантия 18 месяцев", desc: "Гарантия на каркас, механизмы и обивку. Ремонт или замена без лишних вопросов" },
                ].map((f, i) => (
                  <div key={i} className="border border-border p-8 hover:border-primary transition-colors group">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon name={f.icon as "Layers"} size={22} className="text-primary" />
                    </div>
                    <h3 className="font-display text-xl tracking-wide mb-3">{f.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Promo of the Month */}
            {(() => {
              const pad = (n: number) => String(n).padStart(2, "0");
              return (
                <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
                  {/* Фоновая текстура */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "24px 24px" }} />
                  {/* Акцентная полоса сверху */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />

                  <div className="container relative z-10 py-20 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                      {/* Левая часть — текст */}
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="font-display text-[10px] tracking-[0.5em] uppercase text-primary">Акция месяца</span>
                        </div>

                        <h2 className="font-display text-5xl lg:text-7xl font-bold leading-none tracking-tight mb-4">
                          МОДЕЛЬ<br />
                          <span className="text-white/20">МЕСЯЦА</span>
                        </h2>

                        <p className="font-body text-white/50 text-sm tracking-widest uppercase mb-10">
                          Диван «Название модели» — изумрудный велюр
                        </p>

                        {/* Цена */}
                        <div className="flex items-end gap-5 mb-12">
                          <span className="font-display text-6xl lg:text-8xl font-bold text-white leading-none">
                            00 000 ₽
                          </span>
                          <div className="mb-2">
                            <span className="font-body text-white/30 line-through text-2xl block">00 000 ₽</span>
                            <span className="font-display text-primary text-sm tracking-widest">−XX%</span>
                          </div>
                        </div>

                        {/* Таймер */}
                        <div className="mb-10">
                          <p className="font-display text-[9px] tracking-[0.5em] uppercase text-white/25 mb-4">Акция заканчивается через</p>
                          <div className="flex items-end gap-1">
                            {[
                              { val: promoTimeLeft.d, label: "дней" },
                              { val: promoTimeLeft.h, label: "часов" },
                              { val: promoTimeLeft.m, label: "минут" },
                              { val: promoTimeLeft.s, label: "секунд" },
                            ].map((t, i) => (
                              <div key={i} className="flex items-end gap-1">
                                <div className="text-center">
                                  <div className="font-display text-4xl lg:text-5xl font-bold tabular-nums leading-none bg-white/5 border border-white/10 px-3 py-2 min-w-[64px] text-center">
                                    {pad(t.val)}
                                  </div>
                                  <div className="font-body text-[9px] tracking-widest uppercase text-white/25 mt-2">{t.label}</div>
                                </div>
                                {i < 3 && <span className="font-display text-3xl text-white/20 mb-3 mx-0.5">:</span>}
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => setSection("catalog")}
                          className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-display text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-primary/90 transition-colors"
                        >
                          Воспользоваться акцией
                          <Icon name="ArrowRight" size={14} />
                        </button>
                      </div>

                      {/* Правая часть — фото */}
                      <div className="relative">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={HERO_IMAGE}
                            alt="Акция месяца"
                            className="w-full h-full object-cover opacity-80"
                          />
                          {/* Градиент слева для плавного слияния */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-transparent lg:block hidden" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                          {/* Бейдж */}
                          <div className="absolute top-6 right-6 bg-primary text-primary-foreground font-display text-xs tracking-[0.3em] uppercase px-4 py-2">
                            −XX%
                          </div>
                        </div>
                        {/* Декоративная рамка */}
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-white/10 pointer-events-none hidden lg:block" />
                      </div>

                    </div>
                  </div>

                  {/* Акцентная полоса снизу */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
                </section>
              );
            })()}

            {/* Materials */}
            {(() => {
              const rogojkaColors = [
                { name: "Бежевый", color: "#C8B89A", dark: false, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a389bbba-23dd-4b56-899d-d2317ab26cee.jpg" },
                { name: "Кофейный", color: "#3D2B1F", dark: true, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f1b9a482-58b8-46af-857c-4847ef4e3917.jpg" },
                { name: "Медово-коричневый", color: "#7A6E60", dark: true, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/985b83d3-f532-4f91-81af-58a255e5db43.jpg" },
                { name: "Серый", color: "#4A4A4A", dark: true, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/334bb3de-ee3c-4dec-a59a-f195d0648310.jpg" },
                { name: "Синий", color: "#2E4A6B", dark: true, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/46919192-f2f6-4f7b-a677-abb571901185.jpg" },
              ];
              const velvetColors = [
                { name: "Изумрудный", color: "#2E6B50", image: VELVET_EMERALD },
                { name: "Шоколадный", color: "#6B4A35", image: VELVET_CHOCOLATE },
                { name: "Мятный", color: "#4A8B7F", image: VELVET_MINT },
                { name: "Светло-серый", color: "#9E9E9E", image: VELVET_LGREY },
                { name: "Синий", color: "#3A5A8A", image: VELVET_BLUE },
              ];
              const rActive = rogojkaColors[activeRogojka];
              const vActive = velvetColors[activeVelvet];
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const rImg = (rActive as any).image as string;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const vImg = (vActive as any).image as string;
              return (
                <section className="border-y border-border overflow-hidden">
                  {/* Header */}
                  <div className="bg-card py-14 text-center border-b border-border">
                    <p className="font-body text-accent text-xs tracking-[0.4em] uppercase mb-3">Обивка</p>
                    <h2 className="font-display text-5xl md:text-6xl font-bold">МАТЕРИАЛЫ</h2>
                    <p className="font-body text-muted-foreground text-sm mt-4 max-w-sm mx-auto">Нажмите на цвет — и увидите, как ткань выглядит вживую</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

                    {/* ── РОГОЖКА ── */}
                    <div
                      className="relative flex flex-col overflow-hidden"
                      style={{ backgroundColor: rActive.color }}
                    >
                      {/* Real fabric photo background */}
                      <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                          backgroundImage: `url("${rImg}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {/* Dark overlay for readability */}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)" }} />

                      <div className="relative z-10 flex flex-col h-full p-10 lg:p-14 text-white">
                        <div className="flex items-start justify-between mb-auto pb-8">
                          <div>
                            <span className="font-body text-xs tracking-[0.35em] uppercase block mb-3 text-white/50"></span>
                            <h3 className="font-display text-7xl font-bold leading-none tracking-tight whitespace-nowrap">РОГОЖКА</h3>
                          </div>
                          <div className="border border-white/30 text-white/70 font-display text-xs tracking-widest px-3 py-1.5">
                            БАЗОВАЯ
                          </div>
                        </div>

                        <div className="mt-auto">
                          <p className="font-body text-sm leading-relaxed mb-8 max-w-xs text-white/60">
                            Плотное структурное переплетение нитей. Устойчива к истиранию, не скатывается, легко чистится.
                          </p>
                          <p className="font-display text-[10px] tracking-[0.4em] uppercase mb-4 text-white/40">
                            {rogojkaColors[activeRogojka].name} — выберите цвет
                          </p>
                          <div className="flex gap-2.5">
                            {rogojkaColors.map((c, i) => (
                              <button
                                key={c.name}
                                onClick={() => setActiveRogojka(i)}
                                title={c.name}
                                className="relative transition-all duration-200 overflow-hidden"
                                style={{ width: i === activeRogojka ? 56 : 40, height: 40 }}
                              >
                                <div
                                  className="w-full h-full border-2 transition-all duration-200"
                                  style={{
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    backgroundImage: `url("${(c as any).image}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderColor: i === activeRogojka ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                                    boxShadow: i === activeRogojka ? "0 2px 12px rgba(0,0,0,0.5)" : "none",
                                  }}
                                />
                                {i === activeRogojka && (
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── ВЕЛЮР ── */}
                    <div
                      className="relative flex flex-col overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20"
                      style={{ backgroundColor: vActive.color }}
                    >
                      {/* Real fabric photo background */}
                      <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                          backgroundImage: `url("${vImg}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)" }} />

                      <div className="relative z-10 flex flex-col h-full p-10 lg:p-14 text-white">
                        <div className="flex items-start justify-between mb-auto pb-8">
                          <div>
                            <span className="font-body text-xs tracking-[0.35em] uppercase block mb-3 text-white/40"></span>
                            <h3 className="font-display text-7xl font-bold leading-none tracking-tight whitespace-nowrap">ВЕЛЮР</h3>
                          </div>
                          <div className="border border-white/25 text-white/60 font-display text-xs tracking-widest px-3 py-1.5">
                            PREMIUM
                          </div>
                        </div>

                        <div className="mt-auto">
                          <p className="font-body text-sm leading-relaxed mb-8 max-w-xs text-white/55">
                            Короткий мягкий ворс с эффектом глубины цвета. Приятен на ощупь, переливается при смене угла света.
                          </p>
                          <p className="font-display text-[10px] tracking-[0.4em] uppercase mb-4 text-white/35">
                            {velvetColors[activeVelvet].name} — выберите оттенок
                          </p>
                          <div className="flex gap-2.5">
                            {velvetColors.map((c, i) => (
                              <button
                                key={c.name}
                                onClick={() => setActiveVelvet(i)}
                                title={c.name}
                                className="relative transition-all duration-200"
                                style={{ width: i === activeVelvet ? 56 : 40, height: 40 }}
                              >
                                <div
                                  className="w-full h-full border-2 transition-all duration-200"
                                  style={{
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    backgroundImage: `url("${(c as any).image}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderColor: i === activeVelvet ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                                    boxShadow: i === activeVelvet ? "0 2px 12px rgba(0,0,0,0.5)" : "none",
                                  }}
                                />
                                {i === activeVelvet && (
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border-t border-border px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-body text-sm text-muted-foreground">Хотите увидеть образцы вживую? Приезжайте в шоурум.</p>
                    <button onClick={() => navigate("contacts")} className="bg-primary text-primary-foreground px-6 py-3 font-display text-sm tracking-widest uppercase whitespace-nowrap hover:opacity-90 transition-opacity">
                      Записаться
                    </button>
                  </div>
                </section>
              );
            })()}

            {/* Catalog preview */}
            <section className="container py-24">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-2">Популярное</p>
                  <h2 className="font-display text-5xl font-bold">КАТАЛОГ</h2>
                </div>
                <button onClick={() => navigate("catalog")} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors tracking-wider">
                  Все модели →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {catalogProducts.slice(0, 3).map((p) => (
                  <div key={p.id} className="group cursor-pointer" onClick={() => openProduct(p)}>
                    <div className="aspect-[4/3] overflow-hidden relative mb-4">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {p.tag && (
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 font-display text-xs tracking-widest">{p.tag}</div>
                      )}
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-background/90 backdrop-blur px-6 py-3 font-display text-sm tracking-widest uppercase border border-border">
                          Подробнее →
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-xl tracking-widest">{p.name}</h3>
                        <p className="font-body text-muted-foreground text-sm mt-1">{p.category === "sofa" ? "Диван" : p.category === "bed" ? "Кровать" : p.category === "chair" ? "Кресло" : "Садовая мебель"}</p>
                      </div>
                      <div className="font-display text-lg text-primary">{p.price.toLocaleString("ru")} ₽</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Garden banner */}
            <section className="relative h-[50vh] overflow-hidden">
              <img src={GARDEN_IMAGE} className="w-full h-full object-cover" alt="Садовая мебель" />
              <div className="absolute inset-0 bg-background/60" />
              <div className="absolute inset-0 flex items-center">
                <div className="container">
                  <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Новая коллекция</p>
                  <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">САДОВАЯ<br />МЕБЕЛЬ</h2>
                  <button
                    onClick={() => navigate("catalog")}
                    className="border border-primary text-primary px-8 py-3 font-display tracking-widest text-sm uppercase hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Смотреть коллекцию
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ====== CATALOG ====== */}
        {activeSection === "catalog" && (
          <div className="container py-16">
            <div className="mb-12">
              <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Вся коллекция</p>
              <h1 className="font-display text-6xl font-bold">КАТАЛОГ</h1>
            </div>
            <div className="flex gap-3 mb-10 flex-wrap">
              {[{ id: "all", label: "Все модели" }, { id: "sofa", label: "Диваны" }, { id: "chair", label: "Кресла" }, { id: "bed", label: "Кровати" }, { id: "garden", label: "Садовая мебель" }].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-5 py-2 font-display text-sm tracking-widest uppercase transition-all ${
                    activeFilter === f.id ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer" onClick={() => openProduct(p)}>
                  <div className="aspect-[4/3] overflow-hidden relative mb-4">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {p.tag && (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 font-display text-xs tracking-widest">{p.tag}</div>
                    )}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-background/90 backdrop-blur px-6 py-3 font-display text-sm tracking-widest uppercase border border-border">
                        Подробнее →
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-xl tracking-widest">{p.name}</h3>
                      <p className="font-body text-muted-foreground text-sm mt-1">{p.category === "sofa" ? "Диван" : p.category === "bed" ? "Кровать" : p.category === "chair" ? "Кресло" : "Садовая мебель"}</p>
                    </div>
                    <div className="font-display text-xl text-primary">{p.price.toLocaleString("ru")} ₽</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ====== ABOUT ====== */}
        {activeSection === "about" && (
          <div>
            <div className="relative h-[50vh] overflow-hidden">
              <img src={SHOWROOM_IMAGE} className="w-full h-full object-cover" alt="О нас" />
              <div className="absolute inset-0 bg-background/70" />
              <div className="absolute inset-0 flex items-end container pb-16">
                <div>
                  <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Наша история</p>
                  <h1 className="font-display text-6xl md:text-8xl font-bold">О НАС</h1>
                </div>
              </div>
            </div>
            <div className="container py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
                <div>
                  <h2 className="font-display text-4xl font-bold mb-6">Мы создаём мебель<br /><span className="text-primary">с характером</span></h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-4">
                    Мебель за стеклом основана в 2015 году командой дизайнеров и мебельщиков, которые хотели изменить рынок. Мы устали от мебели без идеи — и решили делать иначе.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed mb-4">
                    Каждый диван проходит через руки мастеров на нашем производстве в Москве. Итальянские ткани, немецкие механизмы, экологичный наполнитель.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    Сегодня FORMA — это 120+ моделей, более 1 млн довольных клиентов и шоурум в центре Москвы.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "2015", label: "Год основания" },
                    { num: "1 млн+", label: "Клиентов" },
                    { num: "120+", label: "Моделей" },
                    { num: "18 мес.", label: "Гарантия" },
                  ].map((s, i) => (
                    <div key={i} className="border border-border p-6">
                      <div className="font-display text-4xl font-bold text-primary mb-2">{s.num}</div>
                      <div className="font-body text-muted-foreground text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <h2 className="font-display text-4xl font-bold mb-10">КОМАНДА</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Алексей Морозов", role: "Основатель и CEO" },
                  { name: "Марина Ким", role: "Главный дизайнер" },
                  { name: "Дмитрий Волков", role: "Руководитель производства" },
                  { name: "Анна Соколова", role: "Директор по клиентам" },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="aspect-square bg-secondary mb-3 flex items-center justify-center">
                      <Icon name="User" size={48} className="text-muted-foreground" />
                    </div>
                    <div className="font-display tracking-wide">{m.name}</div>
                    <div className="font-body text-muted-foreground text-sm mt-1">{m.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====== CONTACTS ====== */}
        {activeSection === "contacts" && (
          <div className="container py-20">
            <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Свяжитесь с нами</p>
            <h1 className="font-display text-6xl font-bold mb-16">КОНТАКТЫ</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                {[
                  { icon: "MapPin", title: "Шоурум", info: "Москва, Садовая-Сухаревская, 2\nПн–Вс: 10:00–21:00" },
                  { icon: "Phone", title: "Телефон", info: "+7 (495) 000-00-00\nБесплатно по России" },
                  { icon: "Mail", title: "Email", info: "hello@forma-mebel.ru\nОтвечаем в течение 2 часов" },
                  { icon: "MessageCircle", title: "WhatsApp / Telegram", info: "@forma_mebel" },
                ].map((c, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon as "MapPin"} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-display tracking-widest text-sm uppercase mb-1">{c.title}</div>
                      <div className="font-body text-muted-foreground text-sm whitespace-pre-line">{c.info}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border border-border p-8">
                <h2 className="font-display text-2xl tracking-widest mb-6">НАПИСАТЬ НАМ</h2>
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-widest uppercase block mb-2">Ваше имя</label>
                    <input className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-widest uppercase block mb-2">Телефон</label>
                    <input className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors" placeholder="+7 (999) 000-00-00" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-widest uppercase block mb-2">Сообщение</label>
                    <textarea rows={4} className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Расскажите, что вас интересует..." />
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-4 font-display tracking-widest uppercase text-sm hover:opacity-90 transition-opacity">
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====== FAQ ====== */}
        {activeSection === "faq" && (
          <div className="container py-20 max-w-3xl">
            <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Вопросы и ответы</p>
            <h1 className="font-display text-6xl font-bold mb-16">FAQ</h1>
            <div className="space-y-2">
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                    <span className="font-display tracking-wide">{item.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={18}
                      className={`flex-shrink-0 ml-4 transition-colors ${openFaq === i ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 animate-fade-in">
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-16 border border-primary/30 bg-primary/5 p-8 text-center">
              <h3 className="font-display text-2xl mb-3">Не нашли ответ?</h3>
              <p className="font-body text-muted-foreground mb-6">Напишите нам — ответим в течение 2 часов</p>
              <button onClick={() => navigate("contacts")} className="bg-primary text-primary-foreground px-8 py-3 font-display tracking-widest text-sm uppercase hover:opacity-90 transition-opacity">
                Связаться с нами
              </button>
            </div>
          </div>
        )}

        {/* ====== CART ====== */}
        {activeSection === "cart" && (
          <div className="container py-20">
            <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Выбранное</p>
            <h1 className="font-display text-6xl font-bold mb-16">КОРЗИНА</h1>
            {cartItems.length === 0 ? (
              <div className="text-center py-24 border border-border">
                <Icon name="ShoppingBag" size={64} className="text-muted-foreground mx-auto mb-6" />
                <h3 className="font-display text-3xl mb-3">Корзина пуста</h3>
                <p className="font-body text-muted-foreground mb-8">Добавьте товары из каталога или настройте диван в конфигураторе</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button onClick={() => navigate("catalog")} className="bg-primary text-primary-foreground px-8 py-3 font-display tracking-widest text-sm uppercase">В каталог</button>
                  <button onClick={() => navigate("home")} className="border border-border text-foreground px-8 py-3 font-display tracking-widest text-sm uppercase hover:border-primary hover:text-primary transition-colors">Конфигуратор</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border border-border p-4 flex gap-4 animate-fade-in">
                      <img src={item.img} alt={item.name} className="w-24 h-20 object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-display tracking-widest mb-1">{item.name}</div>
                        <div className="font-display text-primary">{item.price.toLocaleString("ru")} ₽</div>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary transition-colors">
                            <Icon name="Minus" size={14} />
                          </button>
                          <span className="font-display text-lg w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary transition-colors">
                            <Icon name="Plus" size={14} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                        <Icon name="X" size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border border-border p-6 h-fit sticky top-24">
                  <h3 className="font-display text-xl tracking-widest mb-6">ИТОГО</h3>
                  <div className="space-y-3 mb-6 font-body text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Товаров</span><span>{totalItems} шт.</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Доставка</span><span>Бесплатно</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-display tracking-widest">Итого</span>
                      <span className="font-display text-xl text-primary">{totalPrice.toLocaleString("ru")} ₽</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-4 font-display tracking-widest uppercase text-sm hover:opacity-90 transition-opacity">
                    Оформить заказ
                  </button>
                  <button onClick={() => navigate("catalog")} className="w-full mt-3 border border-border text-muted-foreground py-3 font-display tracking-widest uppercase text-xs hover:border-primary hover:text-primary transition-colors">
                    Продолжить покупки
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <footer className="border-t border-border mt-20 py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
              <div>
                <div className="font-display text-2xl text-primary tracking-widest mb-3">Мебель за стеклом</div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">Диваны и садовая мебель с гарантией 18 месяцев.</p>
              </div>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Разделы</div>
                <ul className="space-y-2">
                  {navLinks.map((l) => (
                    <li key={l.id}>
                      <button onClick={() => navigate(l.id)} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Контакты</div>
                <ul className="space-y-2">
                  {["+7 (495) 000-00-00", "hello@forma-mebel.ru", "Москва, Садовая-Сухаревская, 2"].map((t, i) => (
                    <li key={i}>
                      <button onClick={() => navigate("contacts")} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors text-left">{t}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Соцсети</div>
                <div className="flex gap-3">
                  {["Instagram", "Youtube", "Send"].map((ic) => (
                    <div key={ic} className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer">
                      <Icon name={ic as "Send"} size={16} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between gap-3">
              <p className="font-body text-xs text-muted-foreground">© 2024 FORMA. Все права защищены.</p>
              <p className="font-body text-xs text-muted-foreground">Политика конфиденциальности · Оферта</p>
            </div>
          </div>
        </footer>
      </main>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={closeProduct}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          <div
            className="relative z-10 w-full md:max-w-[92vw] lg:max-w-[1160px] md:mx-4 bg-background max-h-[95vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button onClick={closeProduct} className="absolute top-4 right-4 z-30 w-10 h-10 bg-background/90 backdrop-blur border border-border flex items-center justify-center hover:border-primary transition-colors">
              <Icon name="X" size={16} />
            </button>

            {/* ══ LEFT: Gallery — вертикальные миниатюры + большое фото ══ */}
            <div className="w-full md:w-[58%] flex-shrink-0 flex flex-row h-[280px] md:h-auto">

              {/* Вертикальный стрип миниатюр — только фотографии товара */}
              <div className="hidden md:flex flex-col gap-2 p-2 w-[88px] flex-shrink-0 overflow-y-auto border-r border-border bg-muted/10">
                {selectedProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`w-full aspect-square flex-shrink-0 overflow-hidden border-2 transition-all ${i === activePhoto ? "border-primary" : "border-transparent opacity-55 hover:opacity-100 hover:border-border"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Большое фото */}
              <div className="relative flex-1 bg-muted/10 overflow-hidden flex items-center justify-center">
                <img
                  key={activePhoto}
                  src={selectedProduct.images[activePhoto]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain p-2 transition-opacity duration-300"
                />

                {/* Стрелки навигации */}
                {selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhoto((p) => (p - 1 + selectedProduct.images.length) % selectedProduct.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/85 backdrop-blur border border-border flex items-center justify-center hover:border-primary transition-colors"
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    <button
                      onClick={() => setActivePhoto((p) => (p + 1) % selectedProduct.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/85 backdrop-blur border border-border flex items-center justify-center hover:border-primary transition-colors"
                    >
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </>
                )}

                {/* Счётчик */}
                <div className="absolute bottom-2 right-3 bg-background/75 backdrop-blur px-2 py-0.5 font-display text-[11px] tracking-widest text-muted-foreground">
                  {activePhoto + 1} / {selectedProduct.images.length}
                </div>

                {/* Горизонтальные точки — только мобайл */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
                  {selectedProduct.images.map((_, i) => (
                    <button key={i} onClick={() => setActivePhoto(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === activePhoto ? "bg-primary scale-125" : "bg-border"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* ══ RIGHT: Info panel ══ */}
            <div className="flex flex-col flex-1 overflow-y-auto border-t md:border-t-0 md:border-l border-border">
              <div className="p-6 md:p-8 flex flex-col min-h-full">

                {/* Категория + тег */}
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-muted-foreground text-xs tracking-[0.35em] uppercase">
                    {selectedProduct.category === "sofa" ? "Диван" : selectedProduct.category === "bed" ? "Кровать" : selectedProduct.category === "chair" ? "Кресло" : "Садовая мебель"}
                  </p>
                  {selectedProduct.tag && (
                    <span className="bg-primary text-primary-foreground px-3 py-0.5 font-display text-xs tracking-widest">{selectedProduct.tag}</span>
                  )}
                </div>

                {/* Название */}
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-widest mb-2">{selectedProduct.name}</h2>

                {/* Цена */}
                <div className="font-display text-2xl text-primary mb-4">{selectedProduct.price.toLocaleString("ru")} ₽</div>

                {/* Описание */}
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5 pb-5 border-b border-border">{selectedProduct.desc}</p>

                {/* ── ВЫБОР ЦВЕТА ОБИВКИ — отдельный блок ── */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="mb-5 pb-5 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-display text-xs tracking-[0.35em] uppercase text-muted-foreground">Цвет обивки</p>
                      {activeColor !== null && (
                        <p className="font-body text-xs text-primary font-medium">{selectedProduct.colors[activeColor].name}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((c, i) => (
                        <button
                          key={i}
                          title={c.name}
                          onClick={() => setActiveColor(i)}
                          className={`relative w-11 h-11 overflow-hidden transition-all duration-200 ${i === activeColor ? "ring-2 ring-primary ring-offset-2 scale-105" : "ring-1 ring-border hover:ring-primary/50 hover:scale-105"}`}
                        >
                          <img src={c.swatch} alt={c.name} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Характеристики */}
                <div className="mb-6 flex-1">
                  <p className="font-display text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">Характеристики</p>
                  <div>
                    {selectedProduct.specs.map((s, i) => (
                      <div key={i} className={`flex justify-between gap-4 py-2.5 text-sm ${i < selectedProduct.specs.length - 1 ? "border-b border-border/40" : ""}`}>
                        <span className="font-body text-muted-foreground flex-shrink-0">{s.label}</span>
                        <span className="font-body text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => { addToCart(selectedProduct); closeProduct(); }}
                  className="w-full bg-primary text-primary-foreground py-4 font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity mt-auto"
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}