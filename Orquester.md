Actúa como Full-Stack Designer especializado en sitios B2B internacionales y logística.

CONTEXTO ACTIVO:
@CM-TGLA-001 (Master Context)
@SC-DESIGN-TGLA (Design System)
@SC-CONTENT-TGLA (Copy)
@SC-TECH-TGLA (Technical)

MISIÓN:
Desarrolla una landing page tipo "brochure digital" para Tech Group Latin America que enfatice el concepto de "puente" entre USA y Latinoamérica. Debe sentirse como una empresa de logística tech moderna (estilo Flexport/FedEx pero más pequeño y ágil).

REQUISITOS ESPECÍFICOS:
1. **Header dinámico:** Logo placeholder (TGLA), navegación: Servicios, Cobertura, Nosotros, Contacto. Toggle idioma ES/EN (UI only, no funcionalidad real aún)
2. **Hero con mapa:** 
   - Fondo: SVG o canvas con mapa estilizado de América (desde USA hasta Sudamérica)
   - Líneas animadas (CSS o Framer) conectando Miami con Ciudad de México, Bogotá, Lima, Santiago
   - Pulsos animados en los puntos de ciudad
   - Overlay texto: "Conectando tecnología entre dos continentes"
3. **Sección Rutas:** 
   - Visual de "Cómo trabajamos": 4 pasos con iconos (1. Orden en USA → 2. Consolidación → 3. Envío → 4. Entrega LATAM)
   - Flechas conectando los pasos, animación al scroll
4. **Grid Servicios:** 4 cards con hover lift
   - Tech Import (Azul)
   - Food Import (Verde)  
   - Logística Integral (Naranja)
   - Aduanas y Compliance (Gris)
5. **Sección Cobertura:** 
   - Grid de banderas/nombres de países: México, Colombia, Chile, Perú, Ecuador, Panamá
   - Mensaje: "¿No ve su país? Contáctenos para evaluar rutas personalizadas"
6. **Formulario Internacional:** 
   - Campos: Nombre, Empresa, País (dropdown), Email, Tipo de interés (Tech/Food/Logística), Mensaje
   - Diseño limpio, espacioso, profesional

RECURSOS GRÁFICOS:
- Business meeting: ![Latin business meeting](https://kimi-web-img.moonshot.cn/img/minmaxdeals.com/83638065054d93efa56c0e04325ad974f6f6e701.webp)
- Computer wholesale: ![Wholesale computers](https://kimi-web-img.moonshot.cn/img/exportersworlds.com/88dbee222446a1fe55144b1907dbe325d026db7f.webp)
- Tech devices: ![Samsung devices](https://kimi-web-img.moonshot.cn/img/www.techlandllc.com/4434a2e1da2e80a1248c75b5544ed5aba02fd02d.jpg)
- Food logistics: ![Food supply chain](https://kimi-web-img.moonshot.cn/img/freshloadinternational.com/eb8a99f44a70eed1759c3788af409f4f98e07e33.webp)

RESTRICCIONES TÉCNICAS:
- Usar React + Vite + Tailwind CSS
- Animaciones suaves con Framer Motion (líneas que se dibujan, puntos que pulsan)
- Colores exactos: Azul #1E3A8A, Verde #059669, Naranja #EA580C
- Tipografía: Poppins (Google Fonts) - weights 300, 400, 600, 700
- Mapa no usar librerías pesadas (Google Maps), usar SVG estilizado o ilustración
- Mobile: Las líneas de conexión se simplifican o convierten en lista vertical

ENTREGABLE:
Código completo App.jsx, componentes reutilizables para las cards de servicio, y guía de customización de rutas/países."