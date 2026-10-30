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
    const expectedTop = target.getBoundingClientRect().top

    // Numa primeira visita o Chrome repete a rolagem nativa até a âncora logo após o evento `load`,
    // com uma posição calculada antes de as fontes da web entrarem, deixando o título ~55 px sob o
    // cabeçalho fixo (medido na prévia). A correção:
    // - não escuta `scroll`: só reage a mudanças de layout e a checagens curtas após load + fontes;
    // - só corrige desvios pequenos (até 150 px), nunca uma rolagem de verdade;
    // - é cancelada por qualquer sinal de intenção do visitante.
    const realign = () => {
      const drift = Math.abs(target.getBoundingClientRect().top - expectedTop)
      if (drift > 2 && drift < 150) target.scrollIntoView({ behavior: 'instant' })
    }
    const observer = new ResizeObserver(realign)
    const intentEvents = ['wheel', 'touchstart', 'keydown', 'pointerdown', 'click', 'focusin', 'hashchange'] as const
    const timers: number[] = []
    let stopped = false
    const stop = () => {
      stopped = true
      observer.disconnect()
      timers.forEach(clearTimeout)
      window.removeEventListener('load', onLoaded)
      for (const e of intentEvents) window.removeEventListener(e, stop, true)
    }
    const onLoaded = () => {
      void document.fonts.ready.then(() => {
        if (stopped) return
        for (const delay of [0, 50, 150, 300, 600, 1000]) timers.push(window.setTimeout(realign, delay))
        timers.push(window.setTimeout(stop, 1100))
      })
    }

    timers.push(window.setTimeout(stop, 15000))
    for (const e of intentEvents) window.addEventListener(e, stop, { capture: true, passive: true })
    observer.observe(document.body)
    if (document.readyState === 'complete') onLoaded()
    else window.addEventListener('load', onLoaded, { once: true })
    return stop
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
