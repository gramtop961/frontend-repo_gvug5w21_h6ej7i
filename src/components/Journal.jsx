import { useState } from 'react'

export default function Journal({ email }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const backend = import.meta.env.VITE_BACKEND_URL

  const save = async () => {
    try {
      const res = await fetch(`${backend}/api/journal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, content: text })
      })
      const data = await res.json()
      setResult(data)
      setText('')
    } catch (e) {
      setResult({ sentiment_score: 0, theme: 'reflection' })
    }
  }

  return (
    <div className="rounded-2xl p-6 bg-white/80 shadow">
      <h3 className="text-lg font-semibold text-[#1b1f3b]">The Enlightenment Journal</h3>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="Pour your heart..." className="mt-3 w-full rounded-lg border p-3" />
      <div className="mt-3 flex items-center gap-2">
        <button onClick={save} className="px-4 py-2 rounded bg-[#1b1f3b] text-white">Save Entry</button>
        {result && (
          <div className="text-sm text-[#1b1f3b]">
            Mood score: <span className="font-semibold">{result.sentiment_score?.toFixed?.(2)}</span> • Theme: {result.theme || '—'}
          </div>
        )}
      </div>
    </div>
  )
}
