import { benefits } from '../data/content'
import { Icon } from './Icon'
import { SectionHeading } from './ui'

export function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="bg-ink-950 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="beneficios-title"
          eyebrow="Benefícios"
          title={
            <>
              O que a constância <span className="text-ink-400">faz por você</span>
            </>
          }
          intro="Sem promessas milagrosas: estes são benefícios amplamente reconhecidos da atividade física regular e bem orientada. Cada corpo responde no seu tempo."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <li key={b.title} className="reveal group relative bg-ink-950 p-8 transition-colors hover:bg-ink-900 lg:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-sm border border-white/10 text-brand-soft">
                  <Icon name={b.icon} className="size-6" />
                </span>
                <span className="font-display text-sm font-semibold text-ink-400" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-wide uppercase">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-300">{b.text}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-start gap-2 text-sm text-ink-400">
          <Icon name="info" className="mt-0.5 size-4 shrink-0" />
          Antes de iniciar qualquer atividade física, recomenda-se uma avaliação médica.
        </p>
      </div>
    </section>
  )
}
