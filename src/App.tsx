import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { Modalities } from './components/Modalities'
import { Differentials } from './components/Differentials'
import { Plans } from './components/Plans'
import { TrialClass } from './components/TrialClass'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import type { Interest } from './data/content'
import { initReveal } from './lib/reveal'

export default function App() {
  // Compartilhado para que os CTAs de modalidades e planos pré-selecionem o interesse no formulário.
  const [interest, setInterest] = useState<Interest | ''>('')

  useEffect(() => initReveal(), [])

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Benefits />
        <Modalities onChoose={setInterest} />
        <Differentials />
        <Plans onChoose={setInterest} />
        <TrialClass interest={interest} onInterestChange={setInterest} />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
