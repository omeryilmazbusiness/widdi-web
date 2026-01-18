'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState, Suspense } from 'react';
import StructuredData from '@/components/StructuredData';
import Hero3DLoader from '@/components/Hero3DLoader';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="relative h-16 w-48 flex items-center justify-center">
          <img
            src="/widdi-logo.png"
            alt="Widdi"
            width={200}
            height={70}
            className="h-16 w-auto object-contain"
          />
        </div>
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border-4 border-blue-500/20 border-t-blue-500/80" />
          </div>
        </div>
      </div>
    </div>
  )
});

export default function Home() {
  const params = useParams();
  const locale = params?.locale as string || 'tr';

  const t = useTranslations('hero');
  const tSolutions = useTranslations('solutions');
  const tCapabilities = useTranslations('capabilities');
  const tContact = useTranslations('contact');
  const tCommon = useTranslations('common');
  
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    {
      title: tSolutions('items.aiSaas.title'),
      description: tSolutions('items.aiSaas.description'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: tSolutions('items.highVolume.title'),
      description: tSolutions('items.highVolume.description'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: tSolutions('items.transformation.title'),
      description: tSolutions('items.transformation.description'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  const capabilities = [
    {
      title: tCapabilities('items.cloudNative.title'),
      description: tCapabilities('items.cloudNative.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      title: tCapabilities('items.analytics.title'),
      description: tCapabilities('items.analytics.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: tCapabilities('items.security.title'),
      description: tCapabilities('items.security.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: tCapabilities('items.apiFirst.title'),
      description: tCapabilities('items.apiFirst.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isMobile) {
        // Vertical scroll detection for mobile
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const section = Math.round(scrollTop / windowHeight);
        setCurrentSection(section);
      } else {
        // Horizontal scroll detection for desktop
        const scrollLeft = container.scrollLeft;
        const sectionWidth = container.offsetWidth;
        const section = Math.round(scrollLeft / sectionWidth);
        setCurrentSection(section);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Structured Data for Services */}
      <StructuredData
        type="service"
        data={{
          name: t('title.line1') + ' ' + t('title.line2'),
          description: t('description', { company: tCommon('company') }),
          serviceType: "Enterprise Software Development"
        }}
      />
      
      <div className="relative">
        {/* Scroll Indicator - Desktop Only */}
        <div className="hidden lg:flex fixed top-24 right-6 z-50 flex-col gap-3">
          {['Home', 'Solutions', 'Capabilities', 'Contact'].map((name, index) => (
            <button
              key={name}
              onClick={() => {
                const container = containerRef.current;
                if (container && !isMobile) {
                  container.scrollTo({
                    left: index * container.offsetWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`group relative transition-all duration-300 ${
                currentSection === index 
                  ? 'w-10 h-3 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full' 
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-500 rounded-full'
              }`}
              aria-label={`Go to ${name}`}
            >
              <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
                {name}
              </span>
            </button>
          ))}
        </div>

        {/* Container: Horizontal (Desktop) / Vertical (Mobile) */}
        <div 
          ref={containerRef}
          className={`
            ${isMobile 
              ? 'block' 
              : 'flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory h-screen scroll-smooth [&::-webkit-scrollbar]:hidden'
            }
          `}
          style={!isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
        >
          {/* Section 1: Hero - Mobile Optimized */}
          <section className={`${isMobile ? 'min-h-screen' : 'min-w-full h-screen snap-start snap-always shrink-0'} relative flex items-center justify-center overflow-hidden bg-black`}>
            {/* 3D Earth - Desktop Only */}
            {!isMobile && (
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-80">
                  {isLoaded ? (
                    <Suspense fallback={<Hero3DLoader />}>
                      <Hero3D />
                    </Suspense>
                  ) : (
                    <Hero3DLoader />
                  )}
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
              </div>
            )}

            {/* Mobile Gradient Background */}
            {isMobile && (
              <div className="absolute inset-0 z-0 bg-linear-to-br from-gray-900 via-black to-gray-900">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]" />
                  <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.3),transparent_50%)]" />
                </div>
              </div>
            )}
            
            {/* Content Container - Compact Mobile */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center min-h-screen">
              <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl">
                {/* Badge - Smaller on Mobile */}
                <motion.div
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-[9px] sm:text-xs font-semibold tracking-wider backdrop-blur-sm uppercase">
                    <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {t('badge')}
                  </span>
                </motion.div>

                {/* Main Heading - Smaller on Mobile */}
                <motion.h1
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[2rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold sm:leading-[1.15] md:leading-[1.1] tracking-tight"
                >
                  <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {t('title.line1')}
                  </span>
                  <span className="block bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mt-1.5 sm:mt-2 md:mt-3">
                    {t('title.line2')}
                  </span>
                </motion.h1>
                
                {/* Description - Compact Mobile */}
                <motion.p
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light px-2 sm:px-4 md:px-0"
                >
                  {t('description', { company: tCommon('company') })}
                </motion.p>
                
                {/* CTA Buttons - Compact Mobile */}
                <motion.div
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center pt-2 sm:pt-4 w-full max-w-md mx-auto px-2 sm:px-0"
                >
                  <Link href={`/${locale}/services`} className="w-full sm:w-auto">
                    <motion.button
                      initial={false}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto group px-5 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-500 via-cyan-500 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all inline-flex items-center justify-center gap-1.5 sm:gap-2 touch-manipulation"
                      style={{ minHeight: '44px' }}
                    >
                      {t('exploreSolutions')}
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </Link>
                  <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                    <motion.button
                      initial={false}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base border-2 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all touch-manipulation"
                      style={{ minHeight: '44px' }}
                    >
                      {t('requestDemo')}
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Stats Section - Compact Mobile 2x2 Grid */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 w-full max-w-5xl px-2 sm:px-4 md:px-0"
              >
                {[
                  { 
                    label: t('stats.clients'), 
                    value: '500+', 
                    icon: (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                      </svg>
                    )
                  },
                  { 
                    label: t('stats.uptime'), 
                    value: '99.99%', 
                    icon: (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    )
                  },
                  { 
                    label: t('stats.transactions'), 
                    value: '10M+', 
                    icon: (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      </svg>
                    )
                  },
                  { 
                    label: t('stats.countries'), 
                    value: '50+', 
                    icon: (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    )
                  },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl md:rounded-2xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-blue-500/40 transition-all"
                    initial={false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="text-blue-400 mb-2 sm:mb-3 inline-block">{stat.icon}</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Section 2: Core Solutions - Mobile Optimized */}
          <section className={`${isMobile ? 'min-h-screen py-20' : 'min-w-full h-screen snap-start snap-always shrink-0'} flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-900 p-4 sm:p-6 lg:p-12`}>
            <div className="max-w-7xl w-full">
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8 sm:mb-10 md:mb-14"
              >
                <motion.span
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-block px-3 sm:px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-[10px] sm:text-xs font-semibold tracking-wider backdrop-blur-sm mb-3 sm:mb-4 uppercase"
                >
                  {tSolutions('badge')}
                </motion.span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight px-4">
                  {tSolutions('title')}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light px-4 sm:px-6">
                  {tSolutions('subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -5 }}
                    className="group p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all border border-gray-800 hover:border-blue-500/40 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all" />
                    <div className="relative z-10">
                      <div className="text-blue-400 mb-4 sm:mb-5 transform group-hover:scale-105 transition-transform">
                        {service.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-blue-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={false}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center px-4"
              >
                <Link href={`/${locale}/services`}>
                  <motion.button
                    initial={false}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all inline-flex items-center gap-2 touch-manipulation"
                    style={{ minHeight: '48px' }}
                  >
                    {tSolutions('viewAll')}
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Section 3: Technical Capabilities - Mobile Optimized */}
          <section className={`${isMobile ? 'min-h-screen py-20' : 'min-w-full h-screen snap-start snap-always shrink-0'} flex items-center justify-center bg-black p-4 sm:p-6 lg:p-12`}>
            <div className="max-w-7xl w-full">
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8 sm:mb-10 md:mb-14"
              >
                <motion.span
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-block px-3 sm:px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] sm:text-xs font-semibold tracking-wider backdrop-blur-sm mb-3 sm:mb-4 uppercase"
                >
                  {tCapabilities('badge')}
                </motion.span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight px-4">
                  {tCapabilities('title')}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light px-4 sm:px-6">
                  {tCapabilities('subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability.title}
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/40 transition-all group"
                  >
                    <div className="text-cyan-400 mb-4 sm:mb-5 group-hover:scale-105 transition-transform">
                      {capability.icon}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-cyan-400 mb-2 sm:mb-3">{capability.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">{capability.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                {[
                  { 
                    title: tCapabilities('mission.title'), 
                    description: tCapabilities('mission.description'),
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    )
                  },
                  { 
                    title: tCapabilities('vision.title'), 
                    description: tCapabilities('vision.description'),
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )
                  },
                  { 
                    title: tCapabilities('values.title'), 
                    description: tCapabilities('values.description'),
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    )
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center p-7 rounded-xl bg-linear-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 hover:border-blue-500/40 transition-all group"
                  >
                    <div className="text-blue-400 mb-4 inline-block group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">{item.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Section 4: Contact - Mobile Optimized */}
          <section className={`${isMobile ? 'min-h-screen py-20' : 'min-w-full h-screen snap-start snap-always shrink-0'} flex items-center justify-center bg-linear-to-br from-black via-gray-950 to-gray-900 p-4 sm:p-6 lg:p-12`}>
            <div className="max-w-4xl w-full">
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8 sm:mb-10 md:mb-12"
              >
                <motion.span
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-block px-3 sm:px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-[10px] sm:text-xs font-semibold tracking-wider backdrop-blur-sm mb-3 sm:mb-4 uppercase"
                >
                  {tContact('badge')}
                </motion.span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight px-4">
                  {tContact('title')}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light px-4 sm:px-6">
                  {tContact('subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-800 shadow-xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500/40 transition-all">
                    <div className="p-2.5 bg-blue-500/20 rounded-lg">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-0.5">{tContact('email.title')}</h3>
                      <p className="text-sm text-gray-400">{tContact('email.value')}</p>
                      <p className="text-xs text-gray-500 mt-1">{tContact('email.support')}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/40 transition-all">
                    <div className="p-2.5 bg-purple-500/20 rounded-lg">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-0.5">{tContact('global.title')}</h3>
                      <p className="text-sm text-gray-400">{tContact('global.value')}</p>
                      <p className="text-xs text-gray-500 mt-1">{tContact('global.coverage')}</p>
                    </div>
                  </div>
                </div>

                <Link href={`/${locale}/contact`}>
                  <motion.button
                    initial={false}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full px-6 sm:px-8 py-4 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 touch-manipulation"
                    style={{ minHeight: '48px' }}
                  >
                    {tContact('schedule')}
                    <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-center text-gray-400 text-xs mb-2.5">
                    {tContact('supportInfo')}
                  </p>
                  <div className="flex justify-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {tContact('certifications.iso')}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {tContact('certifications.soc')}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {tContact('certifications.gdpr')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
