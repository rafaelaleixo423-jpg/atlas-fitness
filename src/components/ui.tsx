import type { ReactNode } from 'react'
import { unsplashSrcSet, unsplashUrl } from '../lib/images'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 font-display uppercase ${className}`}>
      <span className="text-2xl font-extrabold tracking-[0.04em]">Atlas</span>
      <span className="mb-[0.2em] inline-block h-[0.55em] w-[3px] -skew-x-12 bg-brand" aria-hidden="true" />
      <span className="text-2xl font-medium tracking-[0.18em] text-white/75">Fitness</span>
    </span>
  )
}

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, title, intro, tone = 'dark', align = 'left', id }: SectionHeadingProps) {
  const light = tone === 'light'
  return (
    <div className={`reveal max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${light ? 'text-brand-dark' : 'text-brand-soft'}`}>{eyebrow}</p>
      <h2 id={id} className={`heading-xl mt-4 text-4xl sm:text-5xl lg:text-6xl ${light ? 'text-ink-950' : 'text-white'}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${light ? 'text-ink-700' : 'text-ink-300'}`}>{intro}</p>
      )}
    </div>
  )
}

type PhotoProps = {
  id: string
  alt: string
  /** Proporção largura/altura usada para recorte e para reservar espaço (evita CLS). */
  ratio: number
  sizes: string
  widths?: number[]
  priority?: boolean
  className?: string
}

export function Photo({ id, alt, ratio, sizes, widths = [480, 768, 1080, 1440], priority, className = '' }: PhotoProps) {
  const base = widths[Math.min(1, widths.length - 1)]
  return (
    <img
      src={unsplashUrl(id, base, ratio)}
      srcSet={unsplashSrcSet(id, widths, ratio)}
      sizes={sizes}
      alt={alt}
      width={base}
      height={Math.round(base / ratio)}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`bg-ink-800 object-cover ${className}`}
    />
  )
}
