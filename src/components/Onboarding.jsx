import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stages = ['Awakening', 'Healing', 'Embodiment', 'Manifestation', 'Communion']

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [stage, setStage] = useState(stages[0])

  const backend = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async () => {
    try {
      await fetch(`${backend}/api/onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, stage })
      })
    } catch (e) {
      // ignore for MVP UX
    }
    onComplete({ name, email, stage })
  }

  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-xl">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h3 className="text-xl font-semibold text-[#1b1f3b]">Your Name</h3>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Amina" className="mt-3 w-full rounded-lg border p-3" />
            <button onClick={()=> setStep(1)} disabled={!name} className="mt-4 px-4 py-2 rounded bg-[#1b1f3b] text-white">Continue</button>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h3 className="text-xl font-semibold text-[#1b1f3b]">Email</h3>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="mt-3 w-full rounded-lg border p-3" />
            <div className="mt-4 flex gap-2">
              <button onClick={()=> setStep(0)} className="px-4 py-2 rounded border">Back</button>
              <button onClick={()=> setStep(2)} disabled={!email} className="px-4 py-2 rounded bg-[#1b1f3b] text-white">Continue</button>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h3 className="text-xl font-semibold text-[#1b1f3b]">Where are you on your path?</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
              {stages.map(s => (
                <button key={s} onClick={()=> setStage(s)} className={`px-4 py-2 rounded border ${stage===s?'bg-[#d4af37] text-[#1b1f3b]':'bg-white'}`}>{s}</button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=> setStep(1)} className="px-4 py-2 rounded border">Back</button>
              <button onClick={handleSubmit} className="px-4 py-2 rounded bg-[#d4af37] text-[#1b1f3b]">Finish</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
