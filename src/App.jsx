import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, ShoppingCart, Package, Plane, MapPin, Monitor,
  UtensilsCrossed, Truck, Shield, Clock, DollarSign, ShieldCheck,
  Globe, ChevronRight, ArrowRight, Send, Phone, Mail, MapPinned
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  CSS injected via <style> for @keyframes (no external CSS needed)   */
/* ------------------------------------------------------------------ */
const animationStyles = `
@keyframes line-draw {
  from { stroke-dashoffset: 1000; }
  to   { stroke-dashoffset: 0; }
}
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.6); opacity: 0.5; }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
.animate-line-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: line-draw 2.5s ease-out forwards;
}
.animate-line-draw-delay-1 { animation-delay: 0.3s; }
.animate-line-draw-delay-2 { animation-delay: 0.6s; }
.animate-line-draw-delay-3 { animation-delay: 0.9s; }
.animate-line-draw-delay-4 { animation-delay: 1.2s; }
.animate-pulse-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}
.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.7s ease-out forwards;
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
.delay-700 { animation-delay: 0.7s; }
.delay-800 { animation-delay: 0.8s; }
.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;

/* ------------------------------------------------------------------ */
/*  Intersection Observer hook                                         */
/* ------------------------------------------------------------------ */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

/* ------------------------------------------------------------------ */
/*  Section wrapper with scroll-triggered fade-in                      */
/* ------------------------------------------------------------------ */
function Section({ id, className = '', children }) {
  const [ref, inView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Americas SVG Map with animated routes                              */
/* ------------------------------------------------------------------ */
function AmericasMap() {
  return (
    <svg viewBox="0 0 500 700" className="w-full max-w-lg mx-auto h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* --- Simplified continent outlines --- */}
      {/* North America / USA */}
      <path
        d="M100 80 L260 60 L300 80 L320 120 L310 160 L290 180 L270 170 L250 190 L220 200 L200 220 L180 210 L160 220 L140 200 L120 180 L100 160 Z"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
      />
      {/* Mexico + Central America */}
      <path
        d="M140 200 L160 220 L180 210 L200 220 L210 250 L200 270 L190 290 L185 310 L195 330 L210 340 L220 360 L215 370 L200 360 L190 340 L175 320 L170 300 L160 280 L150 260 L135 240 L120 220 Z"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
      />
      {/* South America */}
      <path
        d="M215 370 L240 360 L270 365 L300 370 L320 390 L335 420 L340 450 L335 480 L320 510 L310 540 L300 560 L290 580 L275 600 L260 620 L250 640 L240 650 L235 640 L230 620 L225 590 L220 560 L215 530 L210 500 L200 470 L195 440 L200 410 L210 390 Z"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
      />

      {/* --- Animated route lines from Miami --- */}
      {/* Miami coords: 290, 185 */}
      {/* Mexico City: 175, 255 */}
      <line x1="290" y1="185" x2="175" y2="255" stroke="#EA580C" strokeWidth="2" className="animate-line-draw" opacity="0.8" />
      {/* Panama City: 215, 355 */}
      <line x1="290" y1="185" x2="215" y2="355" stroke="#EA580C" strokeWidth="2" className="animate-line-draw animate-line-draw-delay-1" opacity="0.8" />
      {/* Bogota: 265, 390 */}
      <line x1="290" y1="185" x2="265" y2="390" stroke="#EA580C" strokeWidth="2" className="animate-line-draw animate-line-draw-delay-2" opacity="0.8" />
      {/* Lima: 220, 475 */}
      <line x1="290" y1="185" x2="220" y2="475" stroke="#EA580C" strokeWidth="2" className="animate-line-draw animate-line-draw-delay-3" opacity="0.8" />
      {/* Santiago: 250, 595 */}
      <line x1="290" y1="185" x2="250" y2="595" stroke="#EA580C" strokeWidth="2" className="animate-line-draw animate-line-draw-delay-4" opacity="0.8" />

      {/* --- City dots --- */}
      {/* Miami */}
      <circle cx="290" cy="185" r="6" fill="#EA580C" className="animate-pulse-dot" style={{ transformOrigin: '290px 185px' }} />
      <circle cx="290" cy="185" r="3" fill="#fff" />
      <text x="298" y="182" fill="#fff" fontSize="11" fontFamily="Poppins" fontWeight="600">Miami</text>

      {/* Mexico City */}
      <circle cx="175" cy="255" r="5" fill="#059669" className="animate-pulse-dot" style={{ transformOrigin: '175px 255px', animationDelay: '0.3s' }} />
      <circle cx="175" cy="255" r="2.5" fill="#fff" />
      <text x="130" y="270" fill="#fff" fontSize="9" fontFamily="Poppins">CDMX</text>

      {/* Panama */}
      <circle cx="215" cy="355" r="5" fill="#059669" className="animate-pulse-dot" style={{ transformOrigin: '215px 355px', animationDelay: '0.5s' }} />
      <circle cx="215" cy="355" r="2.5" fill="#fff" />
      <text x="222" y="352" fill="#fff" fontSize="9" fontFamily="Poppins">Panamá</text>

      {/* Bogota */}
      <circle cx="265" cy="390" r="5" fill="#059669" className="animate-pulse-dot" style={{ transformOrigin: '265px 390px', animationDelay: '0.7s' }} />
      <circle cx="265" cy="390" r="2.5" fill="#fff" />
      <text x="273" y="387" fill="#fff" fontSize="9" fontFamily="Poppins">Bogotá</text>

      {/* Lima */}
      <circle cx="220" cy="475" r="5" fill="#059669" className="animate-pulse-dot" style={{ transformOrigin: '220px 475px', animationDelay: '0.9s' }} />
      <circle cx="220" cy="475" r="2.5" fill="#fff" />
      <text x="195" y="492" fill="#fff" fontSize="9" fontFamily="Poppins">Lima</text>

      {/* Santiago */}
      <circle cx="250" cy="595" r="5" fill="#059669" className="animate-pulse-dot" style={{ transformOrigin: '250px 595px', animationDelay: '1.1s' }} />
      <circle cx="250" cy="595" r="2.5" fill="#fff" />
      <text x="258" y="592" fill="#fff" fontSize="9" fontFamily="Poppins">Santiago</text>
    </svg>
  );
}

/* ================================================================== */
/*  MAIN APP COMPONENT                                                 */
/* ================================================================== */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('ES');
  const [form, setForm] = useState({
    nombre: '', empresa: '', pais: '', email: '', interes: '', mensaje: ''
  });

  const handleChange = useCallback((e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    alert('Solicitud enviada (demo). Gracias por su interés.');
    setForm({ nombre: '', empresa: '', pais: '', email: '', interes: '', mensaje: '' });
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const countries = [
    { name: 'México', flag: '🇲🇽' },
    { name: 'Colombia', flag: '🇨🇴' },
    { name: 'Chile', flag: '🇨🇱' },
    { name: 'Perú', flag: '🇵🇪' },
    { name: 'Ecuador', flag: '🇪🇨' },
    { name: 'Panamá', flag: '🇵🇦' },
    { name: 'Costa Rica', flag: '🇨🇷' },
    { name: 'Guatemala', flag: '🇬🇹' },
    { name: 'Rep. Dominicana', flag: '🇩🇴' },
  ];

  return (
    <>
      {/* Inject keyframe animations */}
      <style>{animationStyles}</style>

      {/* ========== NAVIGATION ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm font-display">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-1 shrink-0">
              <span className="text-xl font-bold text-blue-intl">Tech Group</span>
              <span className="text-xl font-light text-green-latam">Latin America</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-blue-intl transition-colors">
                  {l.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
                className="text-sm font-medium text-gray-500 hover:text-blue-intl transition-colors"
              >
                <span className={lang === 'ES' ? 'text-blue-intl font-bold' : ''}>ES</span>
                {' | '}
                <span className={lang === 'EN' ? 'text-blue-intl font-bold' : ''}>EN</span>
              </button>
              <a
                href="#contacto"
                className="px-5 py-2 bg-orange-connect text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Cotizar
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-intl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-gray-700 hover:text-blue-intl"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-3 border-t">
                <button
                  onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
                  className="text-sm text-gray-500"
                >
                  <span className={lang === 'ES' ? 'text-blue-intl font-bold' : ''}>ES</span>
                  {' | '}
                  <span className={lang === 'EN' ? 'text-blue-intl font-bold' : ''}>EN</span>
                </button>
                <a
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-2 bg-orange-connect text-white text-sm font-semibold rounded-lg"
                >
                  Cotizar
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden font-display">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=2000&q=85')",
          }}
        />
        {/* Color overlay for brand consistency */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,59,92,0.92) 0%, rgba(30,58,138,0.85) 45%, rgba(15,23,42,0.9) 100%)',
          }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-28 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
              Conectando tecnología entre dos continentes
            </h1>
            <p className="mt-6 text-lg md:text-xl text-blue-200 max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
              Desde Miami al corazón de Latinoamérica. Tecnología y productos premium sin fronteras.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-400">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-connect text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-connect/30"
              >
                Cotizar Envío <ArrowRight size={18} />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Ver Servicios
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="animate-fade-in-up delay-300 animate-float">
            <AmericasMap />
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 40 C360 80 720 0 1080 40 C1260 60 1380 50 1440 40 L1440 80 L0 80 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ========== HOW WE WORK ========== */}
      <Section id="proceso" className="py-20 lg:py-28 bg-ice-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-intl">Cómo Trabajamos</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Desde la orden hasta su puerta, controlamos cada eslabón de la cadena.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-intl via-orange-connect to-green-latam opacity-30" />

            {[
              { num: 1, icon: ShoppingCart, title: 'Orden en USA', desc: 'Gestión de compras y consolidación', bg: 'bg-blue-intl', delay: 'delay-100' },
              { num: 2, icon: Package, title: 'Consolidación', desc: 'Centro de acopio en Miami', bg: 'bg-orange-connect', delay: 'delay-200' },
              { num: 3, icon: Plane, title: 'Envío Internacional', desc: 'Transporte aéreo y marítimo', bg: 'bg-green-latam', delay: 'delay-300' },
              { num: 4, icon: MapPin, title: 'Entrega LATAM', desc: 'Hasta su bodega en destino', bg: 'bg-blue-intl', delay: 'delay-400' },
            ].map((step, i) => (
              <div key={step.num} className={`flex flex-col items-center text-center animate-fade-in-up ${step.delay}`}>
                <div className={`relative z-10 w-14 h-14 rounded-full ${step.bg} flex items-center justify-center shadow-lg`}>
                  <step.icon size={24} className="text-white" />
                </div>
                <span className="mt-2 text-xs font-bold text-gray-400 tracking-widest">PASO {step.num}</span>
                <h3 className="mt-2 text-lg font-bold text-gray-800">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{step.desc}</p>

                {/* Arrow between steps on mobile */}
                {i < 3 && (
                  <ChevronRight size={20} className="mt-4 text-gray-300 md:hidden rotate-90" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== SERVICES ========== */}
      <Section id="servicios" className="py-20 lg:py-28 bg-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-intl">Nuestros Servicios</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Soluciones integrales de importación y logística para empresas que necesitan eficiencia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Monitor, title: 'Tech Import', borderColor: 'border-blue-intl', iconBg: 'bg-blue-intl/10', iconColor: 'text-blue-intl',
                desc: 'Importación de hardware de cómputo, laptops, componentes y periféricos desde USA.',
              },
              {
                icon: UtensilsCrossed, title: 'Food Import', borderColor: 'border-green-latam', iconBg: 'bg-green-latam/10', iconColor: 'text-green-latam',
                desc: 'Productos alimenticios premium americanos y europeos con cadena de frío.',
              },
              {
                icon: Truck, title: 'Logística Integral', borderColor: 'border-orange-connect', iconBg: 'bg-orange-connect/10', iconColor: 'text-orange-connect',
                desc: 'Transporte multimodal, consolidación de carga y última milla.',
              },
              {
                icon: Shield, title: 'Aduanas y Compliance', borderColor: 'border-gray-500', iconBg: 'bg-gray-100', iconColor: 'text-gray-600',
                desc: 'Gestión aduanera, documentación y cumplimiento regulatorio.',
              },
            ].map((svc, i) => (
              <div
                key={svc.title}
                className={`group border-l-4 ${svc.borderColor} bg-white rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-lg ${svc.iconBg} flex items-center justify-center`}>
                    <svc.icon size={24} className={svc.iconColor} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-intl transition-colors">{svc.title}</h3>
                    <p className="mt-2 text-gray-500 leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== OPERATIONS GALLERY ========== */}
      <Section id="operaciones" className="py-20 lg:py-28 bg-ice-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-intl">
              Nuestras Operaciones
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Tres verticales estratégicas que conectan USA con Latinoamérica sin fricción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                src: '/img1.webp',
                badge: 'Tech Import',
                badgeColor: 'bg-blue-intl',
                title: 'Proveedores Tech USA',
                desc: 'Acceso directo a los principales mayoristas de hardware y componentes de computación en Estados Unidos.',
                delay: 'delay-100',
              },
              {
                src: '/img2.jpg',
                badge: 'Consumer Electronics',
                badgeColor: 'bg-orange-connect',
                title: 'Productos Premium',
                desc: 'Catálogo curado de dispositivos, laptops y tablets de marcas líderes con garantía internacional.',
                delay: 'delay-200',
              },
              {
                src: '/img3.webp',
                badge: 'Food & Logística',
                badgeColor: 'bg-green-latam',
                title: 'Cadena de Suministro',
                desc: 'Importación de alimentos premium con cadena de frío y distribución multimodal hacia LATAM.',
                delay: 'delay-300',
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`group animate-fade-in-up ${card.delay} rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={card.src}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.7) 100%)',
                    }}
                  />
                  <span
                    className={`absolute top-4 left-4 ${card.badgeColor} text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg`}
                  >
                    {card.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-intl transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary strip */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80',
                label: 'Carga Aérea',
              },
              {
                src: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=700&q=80',
                label: 'Marítimo',
              },
              {
                src: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=700&q=80',
                label: 'Última Milla',
              },
              {
                src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&q=80',
                label: 'Consolidación',
              },
            ].map((thumb) => (
              <div
                key={thumb.label}
                className="group relative h-28 md:h-32 rounded-xl overflow-hidden shadow-sm"
              >
                <img
                  src={thumb.src}
                  alt={thumb.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-intl/85 via-blue-intl/30 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-semibold text-sm tracking-wide">
                  {thumb.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== COVERAGE ========== */}
      <Section id="cobertura" className="py-20 lg:py-28 bg-blue-intl font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Nuestra Cobertura</h2>
          <p className="mt-4 text-blue-200 max-w-2xl mx-auto">Presencia operativa activa en los mercados más dinámicos de la región.</p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {countries.map(c => (
              <div
                key={c.name}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/20 transition-colors"
              >
                <span className="text-3xl">{c.flag}</span>
                <h3 className="mt-2 text-white font-semibold">{c.name}</h3>
                <span className="inline-block mt-2 px-3 py-0.5 text-xs font-medium bg-green-latam/20 text-green-300 rounded-full">
                  Operaci&oacute;n activa
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl max-w-xl mx-auto">
            <p className="text-blue-200">
              &iquest;No ve su pa&iacute;s? Cont&aacute;ctenos para evaluar rutas personalizadas.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-orange-connect text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Contáctenos <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </Section>

      {/* ========== ADVANTAGES ========== */}
      <Section id="nosotros" className="py-20 lg:py-28 bg-ice-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-intl">&iquest;Por qu&eacute; Tech Group?</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Combinamos tecnología, experiencia y una red operativa real en el terreno.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: 'Tiempos de Tránsito', desc: 'Entregas en 5-12 días según destino.', iconBg: 'bg-blue-intl/10', iconColor: 'text-blue-intl' },
              { icon: DollarSign, title: 'Costos Competitivos', desc: 'Consolidación reduce hasta 40% en fletes.', iconBg: 'bg-green-latam/10', iconColor: 'text-green-latam' },
              { icon: ShieldCheck, title: 'Cumplimiento Total', desc: '100% legal, documentado y trazable.', iconBg: 'bg-orange-connect/10', iconColor: 'text-orange-connect' },
              { icon: Globe, title: 'Soporte Bilingüe', desc: 'Equipo nativo en español e inglés.', iconBg: 'bg-blue-intl/10', iconColor: 'text-blue-intl' },
            ].map((adv) => (
              <div
                key={adv.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`mx-auto w-14 h-14 rounded-full ${adv.iconBg} flex items-center justify-center`}>
                  <adv.icon size={28} className={adv.iconColor} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-800">{adv.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== CONTACT FORM ========== */}
      <Section id="contacto" className="py-20 lg:py-28 bg-ice-white font-body">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-intl">Solicite una Cotización</h2>
            <p className="mt-4 text-gray-500">Cuéntenos sobre su operación y le preparamos una propuesta a la medida.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
                <input
                  id="nombre" name="nombre" type="text" required
                  value={form.nombre} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-intl/40 focus:border-blue-intl transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>
              {/* Empresa */}
              <div>
                <label htmlFor="empresa" className="block text-sm font-semibold text-gray-700 mb-1">Empresa</label>
                <input
                  id="empresa" name="empresa" type="text" required
                  value={form.empresa} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-intl/40 focus:border-blue-intl transition-colors"
                  placeholder="Acme Corp"
                />
              </div>
              {/* País */}
              <div>
                <label htmlFor="pais" className="block text-sm font-semibold text-gray-700 mb-1">País</label>
                <select
                  id="pais" name="pais" required
                  value={form.pais} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-intl/40 focus:border-blue-intl transition-colors"
                >
                  <option value="">Seleccione un país</option>
                  {countries.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
                  <option value="Otro">Otro</option>
                </select>
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  id="email" name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-intl/40 focus:border-blue-intl transition-colors"
                  placeholder="juan@empresa.com"
                />
              </div>
            </div>

            {/* Tipo de Interés */}
            <div>
              <label htmlFor="interes" className="block text-sm font-semibold text-gray-700 mb-1">Tipo de Interés</label>
              <select
                id="interes" name="interes" required
                value={form.interes} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-intl/40 focus:border-blue-intl transition-colors"
              >
                <option value="">Seleccione una opción</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Logística">Logística</option>
                <option value="Consultoría Aduanera">Consultoría Aduanera</option>
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-1">Mensaje</label>
              <textarea
                id="mensaje" name="mensaje" rows="4"
                value={form.mensaje} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-intl/40 focus:border-blue-intl transition-colors resize-none"
                placeholder="Describa brevemente su necesidad..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-connect text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-connect/20"
            >
              <Send size={18} /> Enviar Solicitud
            </button>
          </form>
        </div>
      </Section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-blue-intl text-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company */}
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xl font-bold text-white">Tech Group</span>
                <span className="text-xl font-light text-green-latam">Latin America</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Su puente tecnológico entre USA y Latinoamérica. Importación, logística y cumplimiento en una sola operación.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase">Servicios</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#servicios" className="hover:text-white transition-colors">Tech Import</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Food Import</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Logística Integral</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Aduanas y Compliance</a></li>
              </ul>
            </div>

            {/* Coverage */}
            <div>
              <h4 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase">Cobertura</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>México &middot; Colombia &middot; Chile</li>
                <li>Perú &middot; Ecuador &middot; Panamá</li>
                <li>Costa Rica &middot; Guatemala</li>
                <li>Rep. Dominicana</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase">Contacto</h4>
              <ul className="space-y-3 text-sm text-blue-200">
                <li className="flex items-center gap-2"><Mail size={14} /> info@techgrouplatam.com</li>
                <li className="flex items-center gap-2"><Phone size={14} /> +1 (305) 555-0180</li>
                <li className="flex items-start gap-2"><MapPinned size={14} className="shrink-0 mt-0.5" /> Miami, FL (HQ)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-blue-300">
            <span>&copy; 2024 Tech Group Latin America. All rights reserved.</span>
            <span>Miami, FL (HQ) | Ciudad de México | Bogotá</span>
          </div>
        </div>
      </footer>
    </>
  );
}
