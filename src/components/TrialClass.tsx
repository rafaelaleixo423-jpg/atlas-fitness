import { useId, useRef, useState, type FormEvent } from 'react'
import { interests, trialSteps, TRIAL_SECTION_ID, type Interest } from '../data/content'
import { photos } from '../lib/images'
import { getWhatsAppUrl, isWhatsAppConfigured } from '../lib/whatsapp'
import { PRIVACY_PATH } from './Footer'
import { Icon } from './Icon'
import { Photo, SectionHeading } from './ui'

type Props = {
  interest: Interest | ''
  onInterestChange: (interest: Interest | '') => void
}

type Errors = { name?: string; interest?: string }

/**
 * Formulário sem backend: nada é enviado nem armazenado por este site.
 * Com o WhatsApp configurado, ele apenas monta a mensagem e abre a conversa.
 * Sem configuração, exibe um aviso honesto de modo demonstrativo.
 */
export function TrialClass({ interest, onInterestChange }: Props) {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [result, setResult] = useState<{ kind: 'demo' } | { kind: 'whatsapp'; url: string } | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const interestRef = useRef<HTMLSelectElement>(null)
  const uid = useId()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult(null)
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Informe seu nome.'
    if (!interest) next.interest = 'Selecione um interesse.'
    setErrors(next)
    if (next.name) return nameRef.current?.focus()
    if (next.interest) return interestRef.current?.focus()

    const label = interests.find((i) => i.value === interest)?.label ?? ''
    const url = getWhatsAppUrl(
      `Olá! Meu nome é ${name.trim()}. Tenho interesse em ${label.toLowerCase()} e gostaria de agendar uma aula experimental.`,
    )
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      setResult({ kind: 'whatsapp', url })
    } else {
      setResult({ kind: 'demo' })
    }
  }

  const fieldBase =
    'mt-2 block w-full rounded-sm border bg-ink-950/60 px-4 py-3.5 text-base text-white placeholder:text-ink-400 transition-colors focus:border-brand-soft focus:outline-none focus-visible:outline-none'

  return (
    <section
      id={TRIAL_SECTION_ID}
      aria-labelledby="aula-title"
      className="relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32"
    >
      <Photo
        id={photos.trial}
        alt=""
        ratio={16 / 9}
        sizes="100vw"
        widths={[768, 1280, 1920]}
        className="absolute inset-0 -z-20 size-full opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/70" />

      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="aula-title"
            eyebrow="Aula experimental"
            title={
              <>
                Seu primeiro treino <span className="text-brand-soft">começa aqui.</span>
              </>
            }
            intro="Conheça a estrutura, o método e a equipe na prática. Sem compromisso: você treina, tira suas dúvidas e decide depois."
          />
          <ol className="mt-12 space-y-8">
            {trialSteps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 font-display text-lg font-semibold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-wide uppercase">{s.title}</h3>
                  <p className="mt-1 text-ink-300">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal rounded-sm border border-white/10 bg-ink-900/85 p-7 shadow-2xl backdrop-blur sm:p-10 lg:self-center">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-2xl font-bold tracking-wide uppercase">Agende sua aula</h3>
            {!isWhatsAppConfigured && (
              <span className="rounded-sm border border-white/15 px-2.5 py-1 text-xs text-ink-300">
                Formulário demonstrativo
              </span>
            )}
          </div>

          <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-6" aria-describedby={`${uid}-privacy`}>
            <div>
              <label htmlFor={`${uid}-name`} className="text-sm font-medium text-white/90">
                Nome
              </label>
              <input
                ref={nameRef}
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="given-name"
                placeholder="Como podemos te chamar?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors((err) => ({ ...err, name: undefined }))
                }}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                className={`${fieldBase} ${errors.name ? 'border-brand-soft' : 'border-white/15'}`}
              />
              {errors.name && (
                <p id={`${uid}-name-error`} className="mt-2 text-sm text-brand-soft">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${uid}-interest`} className="text-sm font-medium text-white/90">
                Interesse
              </label>
              <div className="relative">
                <select
                  ref={interestRef}
                  id={`${uid}-interest`}
                  name="interest"
                  value={interest}
                  onChange={(e) => {
                    onInterestChange(e.target.value as Interest | '')
                    if (errors.interest) setErrors((err) => ({ ...err, interest: undefined }))
                  }}
                  aria-invalid={errors.interest ? true : undefined}
                  aria-describedby={errors.interest ? `${uid}-interest-error` : undefined}
                  className={`${fieldBase} appearance-none pr-12 ${errors.interest ? 'border-brand-soft' : 'border-white/15'} ${
                    interest ? '' : 'text-ink-400'
                  }`}
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {interests.map((i) => (
                    <option key={i.value} value={i.value} className="bg-ink-900 text-white">
                      {i.label}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute top-1/2 right-4 mt-1 size-5 -translate-y-1/2 text-ink-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              {errors.interest && (
                <p id={`${uid}-interest-error`} className="mt-2 text-sm text-brand-soft">
                  {errors.interest}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full">
              {isWhatsAppConfigured ? 'Continuar no WhatsApp' : 'Agendar aula experimental'}
              <Icon name="arrowRight" className="size-5" />
            </button>

            <div aria-live="polite" role="status">
              {result?.kind === 'demo' && (
                <div className="flex gap-3 rounded-sm border border-white/15 bg-white/5 p-4 text-sm leading-relaxed text-ink-300">
                  <Icon name="info" className="mt-0.5 size-5 shrink-0 text-brand-soft" />
                  <p>
                    <strong className="text-white">Modo demonstrativo — nada foi enviado.</strong> Este site não possui
                    integração ativa, então nenhuma informação foi transmitida ou armazenada. Em um projeto real, esta
                    etapa abriria o WhatsApp da academia com a mensagem pronta.
                  </p>
                </div>
              )}
              {result?.kind === 'whatsapp' && (
                <div className="flex gap-3 rounded-sm border border-white/15 bg-white/5 p-4 text-sm leading-relaxed text-ink-300">
                  <Icon name="chat" className="mt-0.5 size-5 shrink-0 text-brand-soft" />
                  <p>
                    Sua mensagem está pronta no WhatsApp; o agendamento é confirmado pela equipe na conversa. Se a nova
                    aba não abriu,{' '}
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
                      abra o WhatsApp aqui
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>

            <p id={`${uid}-privacy`} className="flex items-start gap-2 text-xs leading-relaxed text-ink-400">
              <Icon name="shield" className="mt-px size-4 shrink-0" />
              <span>
                Nada do que você digita aqui é enviado ou armazenado.{' '}
                <a href={PRIVACY_PATH} className="underline underline-offset-2 hover:text-white">
                  Política de Privacidade
                </a>
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
