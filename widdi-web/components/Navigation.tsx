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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-blue-500/10'
            : 'bg-black/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/">
              <motion.div
                initial={false}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <Image
                  src="/widdi-logo.png"
                  alt="Widdi Logo"
                  width={120}
                  height={40}
                  priority
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <motion.div
                    initial={false}
                    whileHover={{ scale: 1.1 }}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      pathname === item.path
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                    {pathname === item.path && (
                      <motion.div
                        initial={false}
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400"
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            <motion.button
              initial={false}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-5 lg:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-shadow"
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              // avoid injecting initial inline styles during SSR
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={false}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 left-0 bottom-0 w-70 bg-gray-900 shadow-2xl z-40 md:hidden overflow-y-auto border-r border-gray-800"
            >
              <div className="p-6 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={item.path}
                  >
                    <Link href={item.path}>
                      <div
                        className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                          pathname === item.path
                            ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {item.name}
                      </div>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <button className="w-full px-4 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                    Get Started
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
