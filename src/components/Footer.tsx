import { siteConfig } from '../config/site'
import { navLinks, TRIAL_SECTION_ID } from '../data/content'
import { getWhatsAppUrl } from '../lib/whatsapp'
import { Icon } from './Icon'
import { Logo } from './ui'

export function Footer() {
  const whatsappUrl = getWhatsAppUrl()
  const { authorName, authorUrl } = siteConfig.portfolio

  return (
    <footer className="border-t border-white/10 bg-black text-sm text-ink-300">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs leading-relaxed">
            Musculação, treino funcional e acompanhamento profissional para treinar com método e constância.
          </p>
          <a href={`#${TRIAL_SECTION_ID}`} className="btn-primary mt-8 min-h-11 px-5 text-sm">
            Aula experimental
          </a>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2">
          <h2 className="font-display text-sm font-semibold tracking-[0.2em] text-white uppercase">Navegação</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-semibold tracking-[0.2em] text-white uppercase">Funcionamento</h2>
          <dl className="mt-5 space-y-3">
            {siteConfig.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <dt>{h.days}</dt>
                <dd className="text-white">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-ink-400">Horários ilustrativos.</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-semibold tracking-[0.2em] text-white uppercase">Contato</h2>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3">
              <Icon name="pin" className="size-5 shrink-0 text-brand-soft" />
              <span>
                {siteConfig.location.address}
                <br />
                {siteConfig.location.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="chat" className="size-5 shrink-0 text-brand-soft" />
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-soft">
                  Falar no WhatsApp
                </a>
              ) : (
                <span>
                  WhatsApp
                  <span className="mt-1 block text-xs text-ink-400">Integração demonstrativa — número não configurado.</span>
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-8">
          <p className="flex items-start gap-3 rounded-sm border border-white/10 bg-white/[0.03] p-4 leading-relaxed">
            <Icon name="info" className="mt-0.5 size-5 shrink-0 text-brand-soft" />
            <span>
              <strong className="text-white">Projeto demonstrativo de portfólio.</strong> A Atlas Fitness é uma academia
              fictícia. Nomes, valores, endereço, horários e serviços são ilustrativos e não representam oferta comercial.
              Nenhum dado é coletado por este site.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-4 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Atlas Fitness (marca fictícia) · Fotografias:{' '}
              <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                Unsplash
              </a>{' '}
              · Vídeo da hero gerado com IA
              {authorName && (
                <>
                  {' '}· Desenvolvido por{' '}
                  {authorUrl ? (
                    <a href={authorUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                      {authorName}
                    </a>
                  ) : (
                    authorName
                  )}
                </>
              )}
            </p>
            <a href="#inicio" className="inline-flex items-center gap-2 self-start hover:text-white sm:self-auto">
              Voltar ao topo
              <Icon name="arrowUp" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
