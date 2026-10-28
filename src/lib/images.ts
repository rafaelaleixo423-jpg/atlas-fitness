/**
 * Fotos do Unsplash (licença Unsplash: uso livre, inclusive comercial).
 * A CDN do Unsplash redimensiona e converte para WebP/AVIF via `auto=format`.
 */
export const photos = {
  hero: '1605296867304-46d5465a13f1',
  strength: '1583454110551-21f2fa2afe61',
  functional: '1599058917212-d750089bc07e',
  coaching: '1584466977773-e625c37cdd50',
  method: '1574680096145-d05b474e2155',
  trial: '1593079831268-3381b0db4a77',
} as const

/** Mídia local, servida a partir de /public. */
export const media = {
  /** 8 s, 1280×720, H.264 (~1,5 MB). O terço esquerdo do quadro é escuro, ideal para o texto da hero. */
  heroVideo: '/videos/hero-deadlift.mp4',
} as const

export type PhotoId = (typeof photos)[keyof typeof photos]

/** Largura × altura opcional; a altura é derivada da proporção quando informada. */
export function unsplashUrl(id: string, width: number, ratio?: number): string {
  const params = new URLSearchParams({ w: String(width), q: '70', auto: 'format', fit: 'crop' })
  if (ratio) params.set('h', String(Math.round(width / ratio)))
  return `https://images.unsplash.com/photo-${id}?${params}`
}

export function unsplashSrcSet(id: string, widths: number[], ratio?: number): string {
  return widths.map((w) => `${unsplashUrl(id, w, ratio)} ${w}w`).join(', ')
}
