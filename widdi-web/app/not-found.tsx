'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          // avoid injecting initial inline styles during SSR
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-400 font-light">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/">
              <motion.button
                initial={false}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                Go to Homepage
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                initial={false}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all"
              >
                Contact Support
              </motion.button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 mb-4">Or try these pages:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/services" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Services
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/about" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                About Us
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/contact" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
