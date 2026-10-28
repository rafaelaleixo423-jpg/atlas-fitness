/**
 * Configuração central do site.
 * Para usar com um cliente real, edite apenas este arquivo.
 */
export const siteConfig = {
  name: 'Atlas Fitness',

  whatsapp: {
    /**
     * Número do cliente no formato internacional, somente dígitos:
     * 55 + DDD + número. Exemplo: '5511999999999'.
     * Vazio = integração desativada (o site exibe o aviso de modo demonstrativo).
     */
    number: '',
    defaultMessage: 'Olá! Vim pelo site da Atlas Fitness e gostaria de agendar uma aula experimental.',
  },

  /** Dados ilustrativos — academia fictícia. */
  location: {
    address: 'Endereço ilustrativo',
    city: 'Sua cidade · UF',
  },

  hours: [
    { days: 'Segunda a sexta', time: '5h às 23h' },
    { days: 'Sábados', time: '8h às 18h' },
    { days: 'Domingos e feriados', time: '8h às 13h' },
  ],

  /** Opcional: crédito do desenvolvedor no rodapé. Deixe vazio para ocultar. */
  portfolio: {
    authorName: '',
    authorUrl: '',
  },
} as const
