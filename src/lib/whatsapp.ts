import { siteConfig } from '../config/site'

const number = siteConfig.whatsapp.number.replace(/\D/g, '')

/** Número válido: código do país + DDD + telefone (12 ou 13 dígitos no Brasil). */
export const isWhatsAppConfigured = number.length >= 12

/** Retorna o link do WhatsApp, ou `null` quando nenhum número foi configurado. */
export function getWhatsAppUrl(message: string = siteConfig.whatsapp.defaultMessage): string | null {
  if (!isWhatsAppConfigured) return null
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
