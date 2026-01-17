# Widdi Web - Enterprise Software Solutions Platform

Modern, performanslı ve production-ready Next.js 15 tabanlı kurumsal web uygulaması.

## 🚀 Özellikler

- ⚡ **Next.js 15** - App Router, React Server Components
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- 🌐 **3D Visualizations** - Three.js & React Three Fiber
- 📊 **Performance Monitoring** - Web Vitals tracking
- 🔒 **Security Headers** - HSTS, CSP, XSS Protection
- ♿ **Accessibility** - WCAG 2.1 AA compliant
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **SEO Optimized** - Metadata, sitemap, robots.txt
- 🍪 **Cookie Consent** - GDPR compliant
- 📈 **Analytics Ready** - Google Analytics integration
- 🎭 **Framer Motion** - Smooth animations
- 🔍 **TypeScript** - Type-safe development

## 📋 Gereksinimler

- Node.js >= 16.0.0
- npm, yarn, pnpm veya bun

## 🛠️ Kurulum

1. **Repository'yi klonlayın**
```bash
git clone <repository-url>
cd widdi-web
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. **Environment variables'ı ayarlayın**
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyip gerekli değerleri girin.

4. **Development sunucusunu başlatın**
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📦 Build & Deploy

### Production Build

```bash
npm run build
npm run start
```

### Vercel'e Deploy

```bash
vercel
```

### Docker ile Deploy

```dockerfile
# Dockerfile örneği
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

## 🗂️ Proje Yapısı

```
widdi-web/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Ana sayfa
│   ├── about/             # Hakkımızda sayfası
│   ├── services/          # Hizmetler sayfası
│   ├── contact/           # İletişim sayfası
│   ├── privacy/           # Gizlilik politikası
│   └── terms/             # Kullanım şartları
├── components/            # Reusable components
│   ├── Navigation.tsx     # Header navigation
│   ├── Footer.tsx         # Footer component
│   ├── Hero3D.tsx         # 3D hero section
│   ├── Analytics.tsx      # Analytics wrapper
│   ├── CookieConsent.tsx  # GDPR cookie consent
│   └── ...
├── public/                # Static assets
│   ├── textures/          # 3D textures
│   └── ...
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Konfigürasyon

### Environment Variables

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics Measurement ID
- `NEXT_PUBLIC_ANALYTICS_ENABLED` - Analytics aktif/pasif
- `NEXT_PUBLIC_SITE_URL` - Site URL (production)
- `NEXT_PUBLIC_ENABLE_3D` - 3D özellikleri aktif/pasif

### Next.js Config

- Image optimization (AVIF, WebP)
- Security headers (HSTS, CSP, XSS)
- Compression enabled
- React Compiler enabled
- Package import optimization

## 🎯 Performance

- ✅ Lighthouse Score: 95+
- ✅ Core Web Vitals optimized
- ✅ Lazy loading & code splitting
- ✅ Image optimization
- ✅ Font optimization (Geist Sans & Mono)

## 🔒 Security

- HTTPS enforced (HSTS)
- XSS Protection
- Content Security Policy
- Frame Options
- MIME type sniffing prevention
- Referrer Policy

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Skip navigation links

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Touch-friendly interactions

## 🧪 Testing

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Build check
npm run build
```

## 📈 Analytics & Monitoring

- Google Analytics integration
- Web Vitals tracking (LCP, FID, CLS, FCP, TTFB, INP)
- Performance monitoring
- Error tracking (Sentry ready)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🔗 Links

- **Website:** [https://widdigroup.com](https://widdigroup.com)
- **Documentation:** [Next.js Docs](https://nextjs.org/docs)
- **Support:** enterprise@widdigroup.com

## 👨‍💻 Tech Stack

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- Three.js
- Framer Motion
- React Hook Form
- Zod
- Lucide Icons

---

Made with ❤️ by Widdi Team
