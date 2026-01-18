'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { locales, localeNames, Locale } from '@/i18n.config';

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('navigation');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Fix hydration: wait for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    handleScroll(); // Check initial scroll position
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Handle swipe to close on mobile
  useEffect(() => {
    if (!mobileMenuOpen) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 75) {
        // Swipe left to close
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: t('home'), path: `/${locale}` },
    { name: t('services'), path: `/${locale}/services` },
    { name: t('about'), path: `/${locale}/about` },
    { name: t('contact'), path: `/${locale}/contact` },
  ];

  // Get current path without locale for language switching
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    // Remove locale from path if it exists
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    // Return path with leading slash, or empty string for home
    return segments.length > 0 ? `/${segments.join('/')}` : '';
  };

  // Get the path for switching locale
  const getLocalePath = (newLocale: Locale) => {
    const pathWithoutLocale = getPathWithoutLocale();
    return `/${newLocale}${pathWithoutLocale}`;
  };

  // Force locale change by using window.location for hard navigation
  const changeLocale = (newLocale: Locale) => {
    const newPath = getLocalePath(newLocale);
    
    // Force hard navigation to ensure locale change
    window.location.href = newPath;
  };

  // Prevent hydration mismatch: don't render until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/" className="relative z-50">
              <div className="flex items-center gap-2">
                <Image
                  src="/widdi-logo.png"
                  alt="Widdi Logo"
                  width={120}
                  height={40}
                  priority
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.path ? 'text-blue-400' : 'text-gray-300'
                  }`}>
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
            <button className="md:hidden p-3 rounded-xl" style={{ minWidth: '48px', minHeight: '48px' }}>
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="w-6 h-0.5 bg-gray-300 rounded-full mb-1.5" />
                <span className="w-6 h-0.5 bg-gray-300 rounded-full mb-1.5" />
                <span className="w-6 h-0.5 bg-gray-300 rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-blue-500/10'
            : 'bg-black/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="relative z-50">
              <div className="flex items-center gap-2">
                <Image
                  src="/widdi-logo.png"
                  alt="Widdi Logo"
                  width={120}
                  height={40}
                  priority
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      pathname === item.path
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                    {pathname === item.path && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400" />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Actions: Language Switcher + CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  aria-label="Change language"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="uppercase">{locale}</span>
                  <svg className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden z-50"
                      onMouseLeave={() => setLangMenuOpen(false)}
                    >
                      {locales.map((loc) => (
                        <Link
                          key={loc}
                          href={`/${loc}${getPathWithoutLocale()}`}
                          onClick={() => setLangMenuOpen(false)}
                        >
                          <div
                            className={`px-4 py-3 text-sm transition-colors ${
                              locale === loc
                                ? 'bg-blue-500/20 text-blue-400 font-semibold'
                                : 'text-gray-300 hover:bg-gray-800'
                            }`}
                          >
                            {localeNames[loc]}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <Link href={`/${locale}/contact`}>
                <button className="px-5 lg:px-6 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                  {t('getStarted')}
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button - Touch Optimized (48x48px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 p-3 rounded-xl hover:bg-gray-800/50 active:bg-gray-700/50 transition-colors touch-manipulation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              style={{ minWidth: '48px', minHeight: '48px' }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={`w-6 h-0.5 bg-gray-300 rounded-full mb-1.5 origin-center transition-transform duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span 
                  className={`w-6 h-0.5 bg-gray-300 rounded-full mb-1.5 transition-opacity duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span 
                  className={`w-6 h-0.5 bg-gray-300 rounded-full origin-center transition-transform duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full Screen */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Full Screen Menu Panel */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                opacity: { duration: 0.2 }
              }}
              className="fixed top-0 left-0 bottom-0 right-0 bg-linear-to-br from-gray-900 via-gray-900 to-black z-40 md:hidden overflow-y-auto safe-top safe-bottom"
              style={{
                paddingTop: 'max(env(safe-area-inset-top), 4rem)',
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
            >
              <div className="min-h-full flex flex-col justify-between p-6 pt-20">
                {/* Navigation Items */}
                <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                  {navItems.map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      key={item.path}
                    >
                      <Link 
                        href={item.path}
                        className="block touch-manipulation"
                      >
                        <motion.div
                          whileTap={{ scale: 0.97 }}
                          className={`flex items-center justify-between px-6 py-4 rounded-2xl font-semibold text-lg transition-all touch-manipulation ${
                            pathname === item.path
                              ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-2 border-blue-500/40 shadow-lg shadow-blue-500/20'
                              : 'text-gray-300 hover:bg-gray-800/50 active:bg-gray-700/50 border-2 border-transparent'
                          }`}
                          style={{ minHeight: '56px' }}
                        >
                          <span>{item.name}</span>
                          {pathname === item.path && (
                            <motion.svg 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5"
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Language Switcher */}
                  <div className="pt-6 border-t border-gray-800">
                    <p className="text-xs text-gray-500 uppercase mb-3 px-2">Language</p>
                    <div className="grid grid-cols-2 gap-2">
                      {locales.map((loc) => (
                        <Link
                          key={loc}
                          href={getLocalePath(loc)}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-3 rounded-xl text-center font-semibold text-sm transition-all touch-manipulation ${
                              locale === loc
                                ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/40'
                                : 'bg-gray-800/50 text-gray-400 border-2 border-transparent hover:border-gray-700'
                            }`}
                          >
                            {localeNames[loc]}
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>

                {/* Bottom Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="space-y-4 pt-8 border-t border-gray-800"
                >
                  {/* CTA Button */}
                  <Link href={`/${locale}/contact`} className="block">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="w-full px-6 py-4 bg-linear-to-r from-blue-500 via-purple-500 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all touch-manipulation"
                      style={{ minHeight: '56px' }}
                    >
                      {t('getStarted')}
                    </motion.button>
                  </Link>

                  {/* Contact Info */}
                  <div className="text-center text-sm text-gray-400 space-y-1">
                    <p className="font-light">Need help? Contact us:</p>
                    <a 
                      href="mailto:enterprise@widdigroup.com" 
                      className="text-blue-400 hover:text-blue-300 font-medium touch-manipulation inline-block py-2"
                    >
                      enterprise@widdigroup.com
                    </a>
                  </div>

                  {/* Swipe Hint */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600 pt-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span>Swipe left to close</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
