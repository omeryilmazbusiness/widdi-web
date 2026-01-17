'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Logo/Brand */}
        <motion.div
          // avoid injecting initial inline styles during SSR
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Widdi
          </h1>
        </motion.div>

        {/* Spinner */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-2"
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-sm text-gray-400 font-light"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
