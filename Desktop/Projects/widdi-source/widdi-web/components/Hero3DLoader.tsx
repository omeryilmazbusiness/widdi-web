import { motion } from 'framer-motion';

export default function Hero3DLoader() {
  // deterministic placeholder/loader: no client-only state or effects
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Widdi Logo - Only render after client mount */}
        <div className="relative h-16 w-48 flex items-center justify-center">
          <img
            src="/widdi-logo.png"
            alt="Widdi"
            width={200}
            height={70}
            className="h-16 w-auto object-contain"
          />
          
          {/* Glow effect behind logo - keep as motion for animation */}
          <motion.div
            className="absolute inset-0 blur-2xl opacity-30 -z-10"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.3 }}
          >
            <div className="w-full h-full bg-linear-to-r from-blue-500 via-cyan-500 to-purple-500" />
          </motion.div>
        </div>

        {/* Animated Earth Skeleton */}
        <div className="relative w-64 h-64">
          {/* Spinning rings effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            // avoid initial inline styles during SSR
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.div
              className="w-64 h-64 rounded-full border-4 border-blue-500/20 border-t-blue-500/80"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 w-56 h-56 rounded-full border-4 border-cyan-500/20 border-t-cyan-500/60"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-8 w-48 h-48 rounded-full border-4 border-purple-500/20 border-t-purple-500/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Central glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            // avoid initial inline styles during SSR
            initial={false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500/30 via-cyan-500/20 to-purple-500/30 blur-xl" />
          </motion.div>

          {/* Pulsing core */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            // avoid injecting initial inline styles during SSR
            initial={false}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-400/50 to-cyan-400/50" />
          </motion.div>
        </div>

        {/* Loading text and progress */}
        <motion.div
          className="flex flex-col items-center gap-4"
          // avoid initial inline styles during SSR
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Loading dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-400"
                // avoid injecting initial inline styles during SSR
                initial={false}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.p
            className="text-sm text-blue-400/80 font-light tracking-wide"
            // avoid injecting initial inline styles during SSR
            initial={false}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Initializing Experience
          </motion.p>
        </motion.div>
      </div>

      {/* Static background gradient effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
