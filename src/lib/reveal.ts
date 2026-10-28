/**
 * Marca elementos `.reveal` como visíveis na primeira vez que entram na tela.
 * Retorna a função de limpeza (ou nada, quando o usuário prefere menos movimento).
 */
export function initReveal(): (() => void) | undefined {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

  const root = document.documentElement
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-revealed', '')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )

  // Atributo (e não classe) para o React não sobrescrevê-lo ao re-renderizar `className`.
  for (const el of document.querySelectorAll('.reveal:not([data-revealed])')) {
    // Elementos que já passaram (ex.: ao abrir a página direto em uma âncora) aparecem sem animar.
    if (el.getBoundingClientRect().bottom < 0) el.setAttribute('data-revealed', '')
    else observer.observe(el)
  }
  root.classList.add('reveal-ready')

  return () => {
    observer.disconnect()
    root.classList.remove('reveal-ready')
  }
}
