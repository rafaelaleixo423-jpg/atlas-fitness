import type { ReactNode } from 'react'
import { siteConfig } from '../config/site'
import { Footer } from './Footer'
import { Icon } from './Icon'
import { Logo } from './ui'

const { ownerName, contactEmail, updatedAt } = siteConfig.privacy

const summary = [
  'O site não tem banco de dados e não vende dados pessoais.',
  'O formulário de aula experimental é demonstrativo: nada do que você digita é enviado ou armazenado.',
  'Não usamos cookies, armazenamento no navegador nem ferramentas de análise, publicidade ou rastreamento.',
  'Ao abrir a página, seu navegador se conecta à Vercel (hospedagem), ao Google Fonts e ao Unsplash, que recebem dados técnicos como o endereço IP.',
  'Se você escrever para o e-mail de contato, o responsável recebe seu endereço e sua mensagem, usados apenas para responder e excluídos em até 90 dias.',
]

const providers: { name: string; role: string; text: string; policy: string }[] = [
  {
    name: 'Vercel',
    role: 'Hospedagem do site',
    text: 'A Vercel entrega as páginas, o vídeo e os demais arquivos do site. Como todo serviço de hospedagem, ela recebe cada requisição — incluindo o caminho da página ou do arquivo solicitado e eventuais parâmetros da URL (o trecho após o sinal #, usado para pular para uma seção, não é enviado) — e pode registrar dados técnicos, como endereço IP, tipo de navegador, data e hora, para entregar o conteúdo, manter o serviço funcionando e protegê-lo contra abusos. Este projeto não ativou as ferramentas de análise da Vercel (Web Analytics e Speed Insights).',
    policy: 'https://vercel.com/legal/privacy-policy',
  },
  {
    name: 'Google Fonts',
    role: 'Fontes tipográficas',
    text: 'As fontes Barlow Condensed e Inter são carregadas dos servidores do Google (fonts.googleapis.com e fonts.gstatic.com). Para entregá-las, o Google recebe o endereço IP e dados técnicos do navegador.',
    policy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Unsplash',
    role: 'Fotografias',
    text: 'As fotos do site são carregadas de images.unsplash.com. Para entregá-las, o Unsplash recebe o endereço IP e dados técnicos do navegador.',
    policy: 'https://unsplash.com/privacy',
  },
]

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-white/10 pt-10">
      <h2 id={id} className="font-display text-2xl font-semibold tracking-wide text-white uppercase sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 leading-relaxed text-ink-300">{children}</div>
    </section>
  )
}

const linkClass = 'text-white underline underline-offset-4 hover:text-brand-soft'

export function PrivacyPage() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Pular para o conteúdo
      </a>
      <header id="topo" className="border-b border-white/10 bg-ink-950">
        <div className="container-page flex h-16 items-center justify-between lg:h-20">
          <a href="/" aria-label="Atlas Fitness — página inicial" className="rounded-sm">
            <Logo />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.12em] text-ink-300 uppercase hover:text-white"
          >
            <Icon name="arrowRight" className="size-4 rotate-180" />
            Voltar ao site
          </a>
        </div>
      </header>

      <main id="conteudo" className="bg-ink-950 py-16 sm:py-24">
        <article className="container-page max-w-3xl">
          <p className="eyebrow text-brand-soft">Privacidade</p>
          <h1 className="heading-xl mt-4 text-5xl text-white sm:text-6xl">Política de Privacidade</h1>
          <p className="mt-4 text-sm text-ink-400">Última atualização: {updatedAt}</p>

          <div className="mt-10 rounded-sm border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold tracking-wide text-white uppercase">Em resumo</h2>
            <ul className="mt-5 space-y-3 text-ink-300">
              {summary.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-soft" strokeWidth={2.25} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 space-y-12">
            <Section id="sobre" title="Sobre este site">
              <p>
                A Atlas Fitness é uma <strong className="text-white">academia fictícia</strong>. Este site é um projeto
                demonstrativo de portfólio: não existe empresa, CNPJ, unidade física ou prestação de serviços por trás
                dele. Nomes, valores, endereço e horários são ilustrativos.
              </p>
              <p>
                O responsável pelo projeto é <strong className="text-white">{ownerName}</strong>. Esta política vale
                apenas para este site.
              </p>
            </Section>

            <Section id="formulario" title="Formulário de aula experimental">
              <p>
                O formulário é <strong className="text-white">demonstrativo e não envia dados</strong>. O nome e o
                interesse que você informa são verificados no próprio navegador e não são transmitidos a nenhum servidor,
                nem armazenados. Eles ficam apenas na memória da aba aberta e são descartados ao recarregar ou fechar a
                página.
              </p>
              <p>
                A integração com o WhatsApp está desativada neste projeto. Se ela for ativada no futuro, esta política
                será atualizada antes.
              </p>
            </Section>

            <Section id="emails" title="Mensagens enviadas por e-mail">
              <p>
                O site não envia nada automaticamente. Se você decidir escrever para{' '}
                <a href={`mailto:${contactEmail}`} className={linkClass}>
                  {contactEmail}
                </a>
                , o responsável passa a tratar os dados dessa mensagem:
              </p>
              <ul className="list-disc space-y-2 pl-5 marker:text-brand-soft">
                <li>
                  <strong className="text-white">Finalidade:</strong> exclusivamente responder à sua mensagem — por
                  exemplo, dúvidas sobre o projeto, sobre esta política ou pedidos relacionados aos seus dados. Além do
                  provedor de e-mail descrito abaixo, as mensagens não são repassadas a terceiros e não são usadas para
                  marketing.
                </li>
                <li>
                  <strong className="text-white">Informações recebidas:</strong> seu endereço de e-mail, o nome que
                  aparecer na mensagem, o conteúdo e eventuais anexos, além da data e hora de envio.
                </li>
                <li>
                  <strong className="text-white">Onde ficam:</strong> na caixa de e-mail do responsável, hospedada no
                  Gmail (Google), que trata esses dados como provedor do serviço de e-mail, conforme a{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    política de privacidade do Google
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-white">Conservação:</strong> as mensagens são excluídas, inclusive da lixeira,
                  em até 90 dias após a última troca de mensagens. Você pode pedir a exclusão antes disso, pelo mesmo
                  endereço.
                </li>
              </ul>
            </Section>

            <Section id="cookies" title="Cookies e armazenamento no navegador">
              <p>
                Este site não usa cookies nem grava informações no seu navegador (como localStorage ou sessionStorage), e
                não utiliza ferramentas de análise, publicidade ou rastreamento. Por isso não há banner de consentimento
                de cookies.
              </p>
            </Section>

            <Section id="terceiros" title="Serviços de terceiros">
              <p>
                Para exibir a página, seu navegador se conecta diretamente aos serviços abaixo. Cada um trata os dados
                técnicos que recebe conforme a própria política de privacidade.
              </p>
              <ul className="space-y-4">
                {providers.map((p) => (
                  <li key={p.name} className="rounded-sm border border-white/10 p-5">
                    <p className="font-display text-lg font-semibold tracking-wide text-white uppercase">
                      {p.name} <span className="font-sans text-sm font-normal tracking-normal text-ink-400 normal-case">· {p.role}</span>
                    </p>
                    <p className="mt-2">{p.text}</p>
                    <a href={p.policy} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block text-sm ${linkClass}`}>
                      Política de privacidade da {p.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                Ao buscar fontes e fotos, o navegador informa ao Google Fonts e ao Unsplash, no cabeçalho Referer, apenas a
                origem do site (o domínio), e não o endereço completo da página, conforme a política de referência
                configurada no site. Isso não vale para a Vercel: por hospedar o site, ela recebe o endereço de cada
                página e arquivo solicitado.
              </p>
              <p>
                Os links para sites externos, como o do Unsplash no rodapé e os das políticas acima, abrem sem enviar
                informação de referência e levam a páginas com políticas próprias.
              </p>
            </Section>

            <Section id="seguranca" title="Segurança">
              <p>
                O site é servido somente por HTTPS e usa cabeçalhos de segurança que restringem quais recursos podem ser
                carregados e impedem que ele seja exibido dentro de outros sites.
              </p>
            </Section>

            <Section id="direitos" title="Seus direitos">
              <p>
                A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) garante, entre outros, os direitos de confirmação e
                acesso, correção, eliminação e informação sobre o compartilhamento de dados pessoais.
              </p>
              <p>
                O site em si não guarda dados pessoais — nem os do formulário, que é demonstrativo. Se você enviou
                mensagens ao responsável, pode exercer esses direitos sobre elas escrevendo para{' '}
                <a href={`mailto:${contactEmail}`} className={linkClass}>
                  {contactEmail}
                </a>
                .
              </p>
              <p>
                Os dados técnicos recebidos pela Vercel, pelo Google e pelo Unsplash são tratados por essas empresas. Para
                exercer direitos sobre eles, use os canais indicados nas políticas de cada uma. Você também pode
                apresentar reclamação à{' '}
                <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Autoridade Nacional de Proteção de Dados (ANPD)
                </a>
                .
              </p>
            </Section>

            <Section id="contato" title="Contato do responsável">
              <p>
                Dúvidas sobre esta política ou pedidos sobre seus dados podem ser enviados para {ownerName}:{' '}
                <a href={`mailto:${contactEmail}`} className={linkClass}>
                  {contactEmail}
                </a>
                .
              </p>
            </Section>

            <Section id="alteracoes" title="Alterações desta política">
              <p>
                Esta política pode ser atualizada se o funcionamento do site mudar. A data da última atualização aparece no
                topo desta página.
              </p>
            </Section>
          </div>
        </article>
      </main>

      <Footer homeHref="/" topHref="#topo" />
    </>
  )
}
