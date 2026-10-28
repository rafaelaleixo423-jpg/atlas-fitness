import { faq, TRIAL_SECTION_ID } from '../data/content'
import { Icon } from './Icon'
import { SectionHeading } from './ui'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ink-950 py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="faq-title"
            eyebrow="Dúvidas frequentes"
            title="Antes de começar"
            intro="Respostas rápidas para as perguntas mais comuns. Ficou alguma dúvida? Ela pode ser respondida na sua aula experimental."
          />
          <a href={`#${TRIAL_SECTION_ID}`} className="btn-ghost mt-10">
            Agendar aula experimental
          </a>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-7">
          {faq.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-xl font-semibold tracking-wide uppercase transition-colors hover:text-brand-soft sm:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-transform duration-300 group-open:rotate-45 group-open:border-brand group-open:bg-brand">
                  <Icon name="plus" className="size-4" strokeWidth={2} />
                </span>
              </summary>
              <p className="max-w-2xl pr-12 pb-7 leading-relaxed text-ink-300">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
