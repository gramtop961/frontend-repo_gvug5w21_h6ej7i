import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Mantra({ profile }) {
  const [mantra, setMantra] = useState(null)
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL

  const fetchMantra = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/mantra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profile.email, mood: 'peaceful', stage: profile.stage })
      })
      const data = await res.json()
      setMantra({ text: data.text, meaning: data.meaning })
    } catch (e) {
      setMantra({ text: 'I breathe with the ancestors; Ashe guides my steps.', meaning: 'Trust the flow and walk gently today.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMantra() }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-900 to-[#1b1f3b] text-white">
      <svg className="absolute -top-16 -right-16 w-64 h-64 opacity-20" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" stroke="#d4af37" strokeWidth="2" fill="none" />
        <circle cx="100" cy="100" r="50" stroke="#d4af37" strokeWidth="2" fill="none" />
        <circle cx="100" cy="100" r="20" stroke="#d4af37" strokeWidth="2" fill="none" />
      </svg>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Daily Mantra</h3>
          {loading ? (
            <p className="mt-2 text-indigo-200">Breathing wisdom...</p>
          ) : (
            mantra && (
              <>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-lg">{mantra.text}</motion.p>
                <p className="mt-2 text-indigo-200">{mantra.meaning}</p>
              </>
            )
          )}
        </div>
        <button onClick={fetchMantra} className="px-3 py-2 rounded bg-[#d4af37] text-[#1b1f3b]">Refresh</button>
      </div>
    </div>
  )
}
