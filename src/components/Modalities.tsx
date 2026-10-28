import { facilities, modalities, TRIAL_SECTION_ID, type Interest } from '../data/content'
import { Icon } from './Icon'
import { Photo, SectionHeading } from './ui'

export function Modalities({ onChoose }: { onChoose: (interest: Interest) => void }) {
  return (
    <section id="modalidades" aria-labelledby="modalidades-title" className="bg-ink-900 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="modalidades-title"
          eyebrow="Estrutura e modalidades"
          title="Três formas de treinar. Um mesmo padrão."
          intro="Escolha o formato que combina com a sua rotina — ou combine modalidades. Em todas elas, você treina com orientação profissional."
        />

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {modalities.map((m) => (
            <li
              key={m.id}
              className="reveal group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-ink-950 transition-colors duration-300 hover:border-white/25"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo
                  id={m.photo}
                  alt={m.alt}
                  ratio={4 / 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 80vw, 100vw"
                  widths={[480, 720, 960]}
                  className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
                <span className="absolute top-4 left-4 rounded-sm bg-ink-950/80 px-3 py-1 font-display text-xs font-semibold tracking-[0.2em] text-white uppercase backdrop-blur">
                  {m.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7 lg:p-8">
                <h3 className="font-display text-3xl font-bold tracking-wide uppercase">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-300">{m.text}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-soft" strokeWidth={2.25} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={`#${TRIAL_SECTION_ID}`}
                  onClick={() => onChoose(m.id)}
                  className="mt-8 inline-flex items-center gap-2 self-start font-display text-sm font-semibold tracking-[0.16em] text-white uppercase hover:text-brand-soft"
                >
                  Experimentar {m.title.toLowerCase()}
                  <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 lg:grid-cols-4">
          {facilities.map((f) => (
            <li key={f.label} className="flex items-center gap-3 bg-ink-900 px-5 py-5 text-sm text-white/85 sm:px-6">
              <Icon name={f.icon} className="size-5 shrink-0 text-brand-soft" />
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
