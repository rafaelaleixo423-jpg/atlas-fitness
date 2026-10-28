import { differentials } from '../data/content'
import { photos } from '../lib/images'
import { Photo, SectionHeading } from './ui'

export function Differentials() {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-title" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 font-display text-[22vw] leading-none font-extrabold text-white/[0.025] uppercase select-none"
      >
        Atlas
      </span>

      <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="diferenciais-title"
              eyebrow="Diferenciais"
              title={
                <>
                  Feita para quem leva o treino <span className="text-brand-soft">a sério.</span>
                </>
              }
            />
            <figure className="reveal relative mt-10 overflow-hidden rounded-sm">
              <Photo
                id={photos.method}
                alt="Atleta posicionada sob a barra para um agachamento, em fotografia preto e branco"
                ratio={4 / 5}
                sizes="(min-width: 1024px) 40vw, 100vw"
                widths={[480, 720, 960]}
                className="aspect-[4/5] w-full grayscale lg:aspect-square"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <span className="font-display text-2xl leading-tight font-semibold tracking-wide uppercase">
                  Técnica, progressão
                  <br />e consistência.
                </span>
                <span aria-hidden="true" className="mb-1.5 h-0.5 w-12 shrink-0 bg-brand" />
              </figcaption>
            </figure>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:pt-4">
          {differentials.map((d, i) => (
            <li key={d.title} className="reveal group grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 py-10 first:border-t-0 first:pt-0 sm:gap-10 lg:first:border-t lg:first:pt-10">
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none font-bold text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] group-hover:text-brand group-hover:[-webkit-text-stroke:1px_var(--color-brand)] sm:text-7xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{d.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-300">{d.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
