import { useEffect, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { navLinks, TRIAL_SECTION_ID } from '../data/content'
import { Icon } from './Icon'
import { Logo } from './ui'

/** Destaca no menu a seção visível no momento. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}

// A hero entra na lista para limpar o destaque ao voltar ao topo.
const sectionIds = ['inicio', ...navLinks.map((l) => l.id), TRIAL_SECTION_ID]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu mobile: trava a rolagem, fecha com Esc e ao voltar para o layout desktop.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const media = window.matchMedia('(min-width: 1024px)')
    const onMedia = () => media.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    media.addEventListener('change', onMedia)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      media.removeEventListener('change', onMedia)
    }
  }, [open])

  // Com o menu aberto o body está travado, então a rolagem nativa da âncora falharia:
  // fecha o menu de forma síncrona, libera a rolagem e navega explicitamente.
  const close = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!open) return
    e.preventDefault()
    const id = e.currentTarget.hash.slice(1)
    flushSync(() => setOpen(false))
    document.body.style.overflow = ''
    document.getElementById(id)?.scrollIntoView()
    history.pushState(null, '', `#${id}`)
  }
  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-white/10 bg-ink-950/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <a href="#inicio" onClick={close} aria-label="Atlas Fitness — voltar ao início" className="rounded-sm">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`group relative py-2 text-sm font-medium transition-colors ${
                    active === link.id ? 'text-white' : 'text-ink-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 ${
                      active === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={`#${TRIAL_SECTION_ID}`} className="btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex">
            Aula experimental
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-white hover:bg-white/10 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="size-6" />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 bg-ink-950 lg:hidden"
      >
        <nav aria-label="Menu mobile" className="container-page flex min-h-full flex-col py-8">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {navLinks.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={close}
                  className="flex items-center justify-between py-5 font-display text-3xl font-semibold tracking-wide uppercase"
                >
                  <span>{link.label}</span>
                  <span className="font-sans text-xs text-ink-400">{String(i + 1).padStart(2, '0')}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={`#${TRIAL_SECTION_ID}`} onClick={close} className="btn-primary mt-10 w-full">
            Agendar aula experimental
          </a>
          <p className="mt-auto pt-10 text-xs text-ink-400">Academia fictícia · projeto demonstrativo de portfólio</p>
        </nav>
      </div>
    </header>
  )
}
