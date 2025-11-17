import { useState } from 'react'
import Hero from './components/Hero'
import Onboarding from './components/Onboarding'
import Mantra from './components/Mantra'
import Journal from './components/Journal'
import Oracle from './components/Oracle'

function App() {
  const [profile, setProfile] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1226] via-[#1b1f3b] to-[#4a3f35] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {!profile ? (
          <>
            <Hero onStart={() => {}} />
            <Onboarding onComplete={setProfile} />
          </>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <Mantra profile={profile} />
              <Journal email={profile.email} />
            </div>
            <Oracle email={profile.email} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
