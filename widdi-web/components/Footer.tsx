'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const footerLinks = {
    solutions: [
      { name: 'AI-Powered SaaS', href: '/services' },
      { name: 'High-Volume Systems', href: '/services' },
      { name: 'Cloud Architecture', href: '/services' },
      { name: 'Digital Transformation', href: '/services' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/contact' },
      { name: 'Contact', href: '/contact' },
      { name: 'Partners', href: '/contact' },
    ],
    resources: [
      { name: 'Documentation', href: '/services' },
      { name: 'Case Studies', href: '/services' },
      { name: 'Support', href: '/contact' },
      { name: 'FAQ', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/privacy' },
      { name: 'Security', href: '/about' },
    ],
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
        </svg>
      ),
    },
  ];

  const certifications = [
    { name: 'ISO 27001', description: 'Certified' },
    { name: 'SOC 2 Type II', description: 'Compliant' },
    { name: 'GDPR', description: 'Compliant' },
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const FooterSection = ({ title, links, sectionKey }: { title: string; links: any[]; sectionKey: string }) => {
    const isExpanded = expandedSection === sectionKey;
    
    return (
      <div className="border-b border-gray-800 md:border-none">
        {/* Mobile: Accordion Header */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className="md:hidden w-full flex items-center justify-between py-4 text-left touch-manipulation"
          aria-expanded={isExpanded}
          style={{ minHeight: '48px' }}
        >
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{title}</h4>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        {/* Desktop: Always Visible Header */}
        <h4 className="hidden md:block text-sm font-semibold text-white mb-4 uppercase tracking-wider">{title}</h4>

        {/* Links - Accordion on Mobile, Always Visible on Desktop */}
        <AnimatePresence>
          {(isExpanded || true) && (
            <motion.ul
              initial={false}
              animate={{ 
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0 
              }}
              className="space-y-3 overflow-hidden md:h-auto! md:opacity-100! pb-4 md:pb-0"
            >
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 active:text-blue-300 transition-colors font-light block py-1 touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <footer className="relative bg-black border-t border-gray-800">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          {/* Brand Section - Full Width on Mobile */}
          <div className="mb-8 sm:mb-10 lg:mb-12 pb-8 border-b border-gray-800">
            <Link href="/" className="inline-block mb-4 sm:mb-6">
              <Image
                src="/widdi-logo.png"
                alt="Widdi Logo"
                width={120}
                height={42}
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 max-w-md font-light">
              Enterprise-grade AI-powered software solutions for global businesses. Trusted by 500+ companies worldwide.
            </p>
            
            {/* Social Links - Touch Optimized (48x48px) */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gray-800/50 hover:bg-blue-500/20 active:bg-blue-500/30 rounded-xl text-gray-400 hover:text-blue-400 transition-all border border-gray-700 hover:border-blue-500/40 touch-manipulation"
                  aria-label={social.name}
                  style={{ minWidth: '48px', minHeight: '48px' }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links - Accordion on Mobile, Grid on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <FooterSection title="Solutions" links={footerLinks.solutions} sectionKey="solutions" />
            <FooterSection title="Company" links={footerLinks.company} sectionKey="company" />
            <FooterSection title="Resources" links={footerLinks.resources} sectionKey="resources" />
            <FooterSection title="Legal" links={footerLinks.legal} sectionKey="legal" />
          </div>

          {/* Newsletter Section - Mobile Optimized */}
          <div className="pt-8 sm:pt-10 border-t border-gray-800">
            <div className="max-w-xl">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-xs sm:text-sm text-gray-400 mb-4 font-light">
                Subscribe to our newsletter for enterprise insights and product updates.
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your.email@company.com"
                  className="flex-1 px-4 py-3 text-sm bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  style={{ minHeight: '48px' }}
                  aria-label="Email address"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 active:shadow-blue-500/40 transition-all touch-manipulation"
                  style={{ minHeight: '48px' }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Mobile Stack */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            {/* Copyright */}
            <p className="text-xs text-gray-500 font-light text-center md:text-left">
              © {currentYear} Widdi. All rights reserved.
            </p>

            {/* Certifications - Mobile Responsive */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-gray-600">
              {certifications.map((cert, index) => (
                <div key={cert.name} className="flex items-center gap-3 sm:gap-4">
                  {index > 0 && <div className="hidden sm:block w-px h-4 bg-gray-800" />}
                  <div className="text-center">
                    <div className="text-[10px] sm:text-xs font-semibold">{cert.name}</div>
                    <div className="text-[9px] sm:text-[10px] text-gray-700">{cert.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Status - Always Centered on Mobile */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-light">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
