import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeDirections } from '@/i18n.config';
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import WebVitals from "@/components/WebVitals";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import Accessibility from "@/components/Accessibility";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Arabic font - Cairo is more reliable than Noto Sans Arabic
const cairoFont = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Extract viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Widdi - Enterprise AI-Powered Software Solutions",
  description: "Leading provider of AI-powered SaaS platforms and high-volume system management solutions. Trusted by 500+ enterprise clients worldwide. 99.99% uptime SLA, ISO 27001 & SOC 2 certified.",
  keywords: [
    "enterprise software",
    "AI-powered SaaS",
    "high-volume systems",
    "cloud architecture",
    "digital transformation",
    "DevOps",
    "microservices",
    "enterprise solutions"
  ],
  authors: [{ name: "Widdi" }],
  creator: "Widdi",
  publisher: "Widdi",
  // Apple mobile web app configuration
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Widdi',
  },
  // Format detection (prevent iOS from auto-detecting phone numbers, etc.)
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/widdi-logo.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://widdigroup.com",
    title: "Widdi - Enterprise AI-Powered Software Solutions",
    description: "Leading provider of AI-powered SaaS platforms and high-volume system management solutions. Trusted by 500+ enterprise clients worldwide.",
    siteName: "Widdi",
    images: [
      {
        url: '/widdi-logo.png',
        width: 1200,
        height: 630,
        alt: 'Widdi Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Widdi - Enterprise AI-Powered Software Solutions",
    description: "Leading provider of AI-powered SaaS platforms and high-volume system management solutions.",
    creator: "@widdigroup",
    images: ['/widdi-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: "/",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Widdi',
  url: 'https://widdigroup.com',
  logo: 'https://widdigroup.com/logo.png',
  description: 'Leading provider of AI-powered SaaS platforms and high-volume system management solutions',
  foundingDate: '2020',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'enterprise@widdigroup.com',
    contactType: 'Customer Service',
    availableLanguage: ['en', 'tr'],
  },
  sameAs: [
    'https://twitter.com/widdi',
    'https://linkedin.com/company/widdi',
    'https://github.com/widdi',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'TR',
  },
  areaServed: 'Worldwide',
  serviceType: [
    'AI-Powered SaaS Platform',
    'High-Volume System Management',
    'Enterprise Digital Transformation',
    'Cloud-Native Architecture',
  ],
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Await params (Next.js 15+ requirement)
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages({ locale });
  
  // Get text direction for the locale (RTL for Arabic)
  const dir = localeDirections[locale as keyof typeof localeDirections] || 'ltr';

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script id="locale-attributes" strategy="beforeInteractive">
        {`
          document.documentElement.lang = '${locale}';
          document.documentElement.dir = '${dir}';
          document.body.className = '${locale === 'ar' ? cairoFont.variable : geistSans.variable} ${geistMono.variable} antialiased';
          ${locale === 'ar' ? "document.body.style.fontFamily = 'var(--font-arabic), system-ui, sans-serif';" : ''}
        `}
      </Script>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Accessibility />
        <Navigation />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <WebVitals />
        <PerformanceMonitor />
      </NextIntlClientProvider>
    </>
  );
}
