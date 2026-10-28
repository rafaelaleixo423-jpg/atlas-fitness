import { plans, TRIAL_SECTION_ID, type Interest } from '../data/content'
import { Icon } from './Icon'
import { SectionHeading } from './ui'

export function Plans({ onChoose }: { onChoose: (interest: Interest) => void }) {
  return (
    <section id="planos" aria-labelledby="planos-title" className="bg-paper py-24 text-ink-950 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="planos-title"
            tone="light"
            eyebrow="Planos"
            title="Escolha como começar"
            intro="Todos os planos incluem avaliação inicial e treino orientado. Comece pela aula experimental e decida com calma."
          />
          <div
            role="note"
            className="flex max-w-sm items-start gap-3 rounded-sm border border-ink-950/15 bg-white px-5 py-4 text-sm text-ink-700"
          >
            <Icon name="info" className="mt-0.5 size-5 shrink-0 text-brand" />
            <p>
              <strong className="block font-display text-base font-bold tracking-[0.14em] text-ink-950 uppercase">
                Valores ilustrativos
              </strong>
              Preços fictícios para fins de demonstração. Não constituem oferta comercial.
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => {
            const featured = plan.featured
            return (
              <li
                key={plan.name}
                className={`reveal relative flex flex-col rounded-sm p-7 transition-shadow duration-300 sm:p-8 xl:p-10 ${
                  featured
                    ? 'bg-ink-950 text-white shadow-2xl shadow-ink-950/30 lg:-my-4 lg:py-14'
                    : 'border border-ink-950/10 bg-white hover:shadow-xl hover:shadow-ink-950/10'
                }`}
              >
                {featured && (
                  <span className="absolute top-0 left-7 -translate-y-1/2 rounded-sm bg-brand px-3 py-1 font-display text-xs font-semibold tracking-[0.2em] text-white uppercase sm:left-8 xl:left-10">
                    Mais completo
                  </span>
                )}
                <h3 className="font-display text-3xl font-bold tracking-wide uppercase">{plan.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${featured ? 'text-ink-300' : 'text-ink-700'}`}>
                  {plan.description}
                </p>

                <p className="mt-8 flex items-baseline gap-1">
                  <span className={`text-sm ${featured ? 'text-ink-300' : 'text-ink-700'}`}>R$</span>
                  <span className="font-display text-6xl leading-none font-bold">{plan.price}</span>
                  <span className={`text-sm ${featured ? 'text-ink-300' : 'text-ink-700'}`}>/mês</span>
                </p>
                <p
                  className={`mt-3 inline-flex items-center gap-1.5 self-start rounded-sm border px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase ${
                    featured ? 'border-white/20 text-ink-300' : 'border-ink-950/20 text-ink-700'
                  }`}
                >
                  <Icon name="info" className="size-3.5" strokeWidth={2} />
                  Valor ilustrativo
                </p>

                <ul className={`mt-8 space-y-3 border-t pt-8 text-sm ${featured ? 'border-white/10' : 'border-ink-950/10'}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        strokeWidth={2.25}
                        className={`mt-0.5 size-4 shrink-0 ${featured ? 'text-brand-soft' : 'text-brand'}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <a
                    href={`#${TRIAL_SECTION_ID}`}
                    onClick={() => onChoose(plan.interest)}
                    aria-label={`Começar o plano ${plan.name} com uma aula experimental`}
                    className={`w-full ${
                      featured
                        ? 'btn-primary'
                        : 'btn border border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-white'
                    }`}
                  >
                    Quero experimentar
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
