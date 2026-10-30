/**
 * Id do elemento apontado pela âncora da URL (`#planos` → `planos`), ou `null` quando a âncora está
 * vazia ou malformada. `decodeURIComponent` lança `URIError` em âncoras como `#%` ou `#%FF`;
 * sem esta proteção, uma URL inválida derrubava a página inteira.
 */
export function hashTargetId(hash: string): string | null {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  if (!raw) return null
  try {
    return decodeURIComponent(raw)
  } catch {
    return null
  }
}
