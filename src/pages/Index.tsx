import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/44c04827-b8a2-4dd5-a1b7-8b604e07ba3b.jpg";
const GARDEN_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/83033b65-7386-435d-b653-94fddc213166.jpg";
const SHOWROOM_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/files/c66e0e66-19b9-4ec7-b64b-3e8efa991827.jpg";

type Section = "home" | "catalog" | "about" | "contacts" | "faq" | "cart";

const catalogProducts = [
  { id: 1, name: "Либерти", category: "sofa", price: 69399, img: HERO_IMAGE, tag: "Хит" },
  { id: 2, name: "Фарелл", category: "garden", price: 44999, img: GARDEN_IMAGE, tag: "Новинка" },
  { id: 3, name: "LUXE CORNER", category: "sofa", price: 124900, img: SHOWROOM_IMAGE, tag: "" },
  { id: 4, name: "TERRA SET", category: "garden", price: 79900, img: GARDEN_IMAGE, tag: "Хит" },
  { id: 5, name: "MINIMAL", category: "sofa", price: 54900, img: HERO_IMAGE, tag: "" },
  { id: 6, name: "PATIO DUO", category: "garden", price: 44900, img: GARDEN_IMAGE, tag: "Новинка" },
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
                    Диваны и садовая мебель. Велюр, рогожка, гарантия 18 месяцев.
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
                  { num: "4 200+", label: "Довольных клиентов" },
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
                  { icon: "Store", title: "Только из наличия", desc: "Покупайте из готового каталога — без ожидания и лишних договорённостей" },
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

            {/* Materials */}
            <section className="bg-card border-y border-border py-24">
              <div className="container">
                <div className="text-center mb-16">
                  <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-3">Обивка</p>
                  <h2 className="font-display text-5xl font-bold">МАТЕРИАЛЫ</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Рогожка */}
                  <div className="border border-border p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-3xl font-bold tracking-wide">РОГОЖКА</h3>
                        <p className="font-body text-muted-foreground text-sm mt-1">5 базовых цветов · Все модели</p>
                      </div>
                      <span className="bg-primary text-primary-foreground font-display text-xs tracking-widest px-3 py-1">БАЗОВАЯ</span>
                    </div>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
                      Плотная структурированная ткань с характерным переплетением. Практична в уходе, устойчива к истиранию, не скатывается. Подходит для любого интерьера.
                    </p>
                    <div className="space-y-3">
                      <p className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">Доступные цвета</p>
                      <div className="flex gap-4 flex-wrap">
                        {[
                          { name: "Бежевый", color: "#E8DCC8" },
                          { name: "Медово-коричневый", color: "#C4924A" },
                          { name: "Серый", color: "#9E9E9E" },
                          { name: "Кофейный", color: "#6B4226" },
                          { name: "Синий", color: "#2C4B7A" },
                        ].map((c) => (
                          <div key={c.name} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 border border-border shadow-sm" style={{ background: c.color }} />
                            <span className="font-body text-xs text-muted-foreground text-center leading-tight max-w-[56px]">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Велюр */}
                  <div className="border border-border p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-3xl font-bold tracking-wide">ВЕЛЮР</h3>
                        <p className="font-body text-muted-foreground text-sm mt-1">Индивидуальная палитра · Отдельные модели</p>
                      </div>
                      <span className="bg-accent text-accent-foreground font-display text-xs tracking-widest px-3 py-1">PREMIUM</span>
                    </div>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
                      Мягкая бархатистая ткань с коротким ворсом. Создаёт эффект глубины цвета, приятна на ощупь. Цвета подбираются индивидуально под каждую модель.
                    </p>
                    <div className="space-y-3">
                      <p className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">Примеры оттенков</p>
                      <div className="flex gap-4 flex-wrap">
                        {[
                          { name: "Изумруд", color: "#2D6A4F" },
                          { name: "Сапфир", color: "#1B3A6B" },
                          { name: "Терракота", color: "#A0522D" },
                          { name: "Антрацит", color: "#2C2C2C" },
                          { name: "Пудра", color: "#D4A5A5" },
                        ].map((c) => (
                          <div key={c.name} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 border border-border shadow-sm" style={{ background: c.color }} />
                            <span className="font-body text-xs text-muted-foreground text-center leading-tight max-w-[56px]">{c.name}</span>
                          </div>
                        ))}
                      </div>
                      <p className="font-body text-xs text-muted-foreground pt-2">
                        * Точные цвета велюра уточняются при выборе конкретной модели
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border border-primary/20 bg-primary/5 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="font-body text-sm text-muted-foreground">Хотите увидеть образцы вживую? Приезжайте в наш шоурум или закажите консультацию.</p>
                  <button onClick={() => navigate("contacts")} className="bg-primary text-primary-foreground px-6 py-3 font-display text-sm tracking-widest uppercase whitespace-nowrap hover:opacity-90 transition-opacity">
                    Записаться
                  </button>
                </div>
              </div>
            </section>

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
                {catalogProducts.slice(0, 3).map((p, i) => (
                  <div key={p.id} className="group cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden relative mb-4">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {p.tag && (
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 font-display text-xs tracking-widest">{p.tag}</div>
                      )}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-xl tracking-widest">{p.name}</h3>
                        <p className="font-body text-muted-foreground text-sm mt-1">{p.category === "sofa" ? "Диван" : "Садовая мебель"}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg text-primary">{p.price.toLocaleString("ru")} ₽</div>
                        <button onClick={() => addToCart(p)} className="mt-1 text-xs font-body text-muted-foreground hover:text-primary transition-colors">
                          + В корзину
                        </button>
                      </div>
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
              {[{ id: "all", label: "Все модели" }, { id: "sofa", label: "Диваны" }, { id: "garden", label: "Садовая мебель" }].map((f) => (
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
                <div key={p.id} className="group">
                  <div className="aspect-[4/3] overflow-hidden relative mb-4">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {p.tag && (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 font-display text-xs tracking-widest">{p.tag}</div>
                    )}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                      <button onClick={() => addToCart(p)} className="w-full bg-primary text-primary-foreground py-3 font-display text-sm tracking-widest uppercase">
                        В корзину
                      </button>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-xl tracking-widest">{p.name}</h3>
                      <p className="font-body text-muted-foreground text-sm mt-1">{p.category === "sofa" ? "Диван" : "Садовая мебель"}</p>
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
                    Сегодня FORMA — это 120+ моделей, 4 200 довольных клиентов и шоурум в центре Москвы.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "2015", label: "Год основания" },
                    { num: "4 200+", label: "Клиентов" },
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
    </div>
  );
}