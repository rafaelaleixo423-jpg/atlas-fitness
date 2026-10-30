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
import { hashTargetId } from './lib/hash'
import { initReveal } from './lib/reveal'

export default function App() {
  // Compartilhado para que os CTAs de modalidades e planos pré-selecionem o interesse no formulário.
  const [interest, setInterest] = useState<Interest | ''>('')

  useEffect(() => initReveal(), [])

  // Ao chegar por um link com âncora (ex.: /#planos vindo da Política de Privacidade), o navegador
  // tenta rolar antes de o React montar as seções; rola de novo agora que elas existem.
  useEffect(() => {
    const id = hashTargetId(window.location.hash)
    const target = id ? document.getElementById(id) : null
    if (!target) return
    target.scrollIntoView({ behavior: 'instant' })

    // Numa primeira visita as fontes da web chegam depois e encolhem o conteúdo acima (~55 px),
    // escondendo a seção sob o cabeçalho. Realinha uma vez quando elas carregam, salvo se o
    // visitante já interagiu com a página.
    let interacted = false
    const markInteraction = () => (interacted = true)
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    for (const e of events) window.addEventListener(e, markInteraction, { once: true, passive: true })
    document.fonts.ready.then(() => {
      if (!interacted) target.scrollIntoView({ behavior: 'instant' })
    })
    return () => {
      for (const e of events) window.removeEventListener(e, markInteraction)
    }
  }, [])

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
