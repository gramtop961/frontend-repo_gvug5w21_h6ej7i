import { useState } from 'react'

export default function Oracle({ email }) {
  const [text, setText] = useState('')
  const [answer, setAnswer] = useState(null)
  const backend = import.meta.env.VITE_BACKEND_URL

  const ask = async () => {
    try {
      const res = await fetch(`${backend}/api/oracle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, input_text: text })
      })
      const data = await res.json()
      setAnswer(data.interpretation)
    } catch (e) {
      setAnswer('Your path is aligning. Breathe, listen, and take one gentle action today.')
    }
  }

  return (
    <div className="rounded-2xl p-6 bg-white/80 shadow">
      <h3 className="text-lg font-semibold text-[#1b1f3b]">The Lens Oracle</h3>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={3} placeholder="Dreams, symbols, or events..." className="mt-3 w-full rounded-lg border p-3" />
      <div className="mt-3 flex items-center gap-2">
        <button onClick={ask} className="px-4 py-2 rounded bg-[#d4af37] text-[#1b1f3b]">Interpret</button>
      </div>
      {answer && <p className="mt-3 text-[#1b1f3b]">{answer}</p>}
    </div>
  )
}
