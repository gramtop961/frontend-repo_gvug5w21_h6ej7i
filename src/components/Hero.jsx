import { motion } from 'framer-motion'

export default function Hero({ onStart }) {
  return (
    <div className="relative overflow-hidden min-h-[60vh] rounded-3xl bg-gradient-to-br from-[#1b1f3b] via-indigo-800 to-[#4a3f35] text-white p-10 flex flex-col items-center justify-center">
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 800">
        <defs>
          <radialGradient id="rad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="400" r="300" fill="url(#rad)" />
      </svg>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-serif tracking-tight text-center"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        WonderLens Chronicles
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-4 text-indigo-100 text-center max-w-2xl"
      >
        See Through the Wonder. Live Through the Lens.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="mt-8 px-6 py-3 rounded-full bg-[#d4af37] text-[#1b1f3b] font-semibold shadow-lg"
      >
        Begin Your Path
      </motion.button>
    </div>
  )
}
