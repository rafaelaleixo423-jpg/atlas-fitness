import { TRIAL_SECTION_ID } from '../data/content'
import { photos, unsplashSrcSet, unsplashUrl } from '../lib/images'
import { HeroVideo } from './HeroVideo'
import { Icon, type IconName } from './Icon'

const highlights: { icon: IconName; label: string }[] = [
  { icon: 'target', label: 'Avaliação inicial' },
  { icon: 'user', label: 'Treino individualizado' },
  { icon: 'layers', label: 'Turmas reduzidas' },
]

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      {/* Mesmas URLs do <link rel="preload"> em index.html */}
      <img
        src={unsplashUrl(photos.hero, 1600)}
        srcSet={unsplashSrcSet(photos.hero, [768, 1280, 1920])}
        sizes="100vw"
        alt="Atleta executando levantamento de barra em uma academia com iluminação dramática"
        width={1600}
        height={1067}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full bg-ink-900 object-cover object-[60%_center] lg:left-auto lg:w-[68%] lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
      />
      {/* Vídeo sobre a imagem; a imagem permanece como fallback e para movimento reduzido. */}
      <HeroVideo />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(10,10,11,0.7)_0%,transparent_25%),linear-gradient(to_top,var(--color-ink-950)_5%,rgba(10,10,11,0.74)_50%,rgba(10,10,11,0.58)_100%)] lg:bg-[linear-gradient(to_bottom,rgba(10,10,11,0.75)_0%,transparent_24%),linear-gradient(to_right,rgba(10,10,11,0.95)_0%,rgba(10,10,11,0.7)_40%,rgba(10,10,11,0.15)_75%),linear-gradient(to_top,var(--color-ink-950)_0%,transparent_30%)]"
      />

      <div className="container-page pt-32 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-soft">Musculação · Funcional · Acompanhamento</p>
          <h1 id="hero-title" className="heading-xl mt-6 text-[clamp(3.25rem,11vw,7.5rem)] text-white">
            Força se
            <br />
            constrói com <span className="text-brand-soft">método.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Treinos orientados por profissionais, estrutura completa e um plano feito para o seu objetivo — no seu
            ritmo, com segurança e constância.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={`#${TRIAL_SECTION_ID}`} className="btn-primary group">
              Agendar aula experimental
              <Icon name="arrowRight" className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#planos" className="btn-ghost">
              Conhecer planos
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/75">
            {highlights.map((h) => (
              <li key={h.label} className="flex items-center gap-2.5">
                <Icon name={h.icon} className="size-4 text-brand-soft" />
                {h.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
