'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

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

            {/* Desktop CTA */}
            <Link href="/contact" className="hidden md:block">
              <button className="px-5 lg:px-6 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                Get Started
              </button>
            </Link>

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
                </nav>

                {/* Bottom Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="space-y-4 pt-8 border-t border-gray-800"
                >
                  {/* CTA Button */}
                  <Link href="/contact" className="block">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="w-full px-6 py-4 bg-linear-to-r from-blue-500 via-purple-500 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all touch-manipulation"
                      style={{ minHeight: '56px' }}
                    >
                      Get Started
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
