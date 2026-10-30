# Atlas Fitness — landing page demonstrativa

Landing page comercial para uma **academia fictícia**, criada como projeto de portfólio.
Nomes, valores, endereço e horários são ilustrativos. O site não tem backend: o formulário é demonstrativo
e não envia nem armazena dados. Detalhes em [Política de Privacidade](#política-de-privacidade).

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 — sem outras dependências de runtime.

## Rodar localmente

Requer **Node.js 22.18+**: o `npm test` executa os arquivos `.ts` diretamente, recurso que o Node só
habilita por padrão a partir dessa versão (o build sozinho funciona desde o Node 20.19).

```bash
npm install
npm run dev       # http://localhost:5173 (landing) e /privacidade/
npm run build     # checagem de tipos + build de produção em dist/ (duas páginas)
npm run preview   # serve o build de produção localmente
npm test          # testes de regressão (executor nativo do Node, sem dependências extras)
```

## Estrutura

```
index.html            ← landing page
privacidade/index.html← Política de Privacidade (/privacidade/)
vercel.json           ← cabeçalhos de segurança e cache
src/
  config/site.ts      ← configuração central (WhatsApp, horários, crédito, responsável pela privacidade)
  data/content.ts     ← todos os textos: benefícios, modalidades, planos, FAQ…
  lib/whatsapp.ts     ← monta o link wa.me (ou null se não houver número)
  lib/images.ts       ← fotos do Unsplash com srcset responsivo
  lib/hash.ts         ← leitura segura da âncora da URL (+ hash.test.ts)
  components/         ← uma seção por arquivo; PrivacyPage.tsx é a página de privacidade
```

## Ativar o WhatsApp

Em `src/config/site.ts`, preencha `whatsapp.number` com o número do cliente (somente dígitos,
com código do país e DDD, ex.: `5511999999999`).

- **Sem número:** o formulário valida os campos e exibe um aviso de modo demonstrativo, deixando
  claro que nada foi enviado. O rodapé indica "integração demonstrativa". Nenhum link quebrado.
- **Com número:** o formulário abre o WhatsApp com a mensagem pronta (nome + interesse) e o
  rodapé passa a exibir o link "Falar no WhatsApp".

## Vídeo da hero

`public/videos/hero-deadlift.mp4` (8 s, 1280×720, H.264, ~1,5 MB) toca como fundo da hero em
`src/components/HeroVideo.tsx`, por cima da foto, que permanece como fallback.

- `autoplay`, `muted`, `loop`, `playsInline`, `object-fit: cover`; enquadramento com foco no atleta
  (`object-position` 66% no mobile, 70% no desktop) e degradês que garantem a leitura do texto.
- **Movimento reduzido ou economia de dados:** o `<video>` não é criado e o arquivo não é baixado.
- **Loop:** um escurecimento curto (~0,45 s de cada lado) esconde o corte entre o último e o primeiro quadro.
- Botão discreto para pausar; o vídeo também pausa sozinho quando a hero sai da tela.
- Se o vídeo falhar ou o autoplay for bloqueado, a foto continua visível.

Para trocar o vídeo, substitua o arquivo (ou ajuste `media.heroVideo` em `src/lib/images.ts`).

## Política de Privacidade

Página em `/privacidade/` (`src/components/PrivacyPage.tsx`), com link no rodapé e no formulário.
Responsável, e-mail de contato e data de atualização ficam em `src/config/site.ts → privacy`.

- O site não usa cookies, armazenamento no navegador nem analytics; por isso não há banner de cookies.
- O navegador acessa Vercel (hospedagem), Google Fonts e Unsplash, que recebem dados técnicos como o IP.
- E-mails enviados ao responsável são usados só para responder e excluídos em até 90 dias.

**Ao mudar o tratamento de dados** (ex.: ativar o WhatsApp, adicionar analytics, formulário com envio
ou novos serviços externos), atualize a política, a data em `privacy.updatedAt` e a CSP do `vercel.json`.

## Segurança e cache (`vercel.json`)

CSP restrita às origens usadas, `nosniff`, `X-Frame-Options: DENY` / `frame-ancestors 'none'` (o site não
pode ser exibido em iframes), `Referrer-Policy`, `Permissions-Policy` e `Cross-Origin-Opener-Policy`.
Cache de 1 ano para `/assets` (nomes com hash) e de 1 dia para `/videos`. Os cabeçalhos só valem na Vercel.

## Publicar na Vercel

**Pelo painel (recomendado):**
1. Envie o projeto para um repositório no GitHub/GitLab/Bitbucket.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta o Vite automaticamente (build `npm run build`, saída `dist`). Clique em **Deploy**.

**Pela CLI:**

```bash
npx vercel          # deploy de pré-visualização
npx vercel --prod   # deploy de produção
```

Não há variáveis de ambiente nem credenciais necessárias.

## Créditos

Fotografias: [Unsplash](https://unsplash.com) (Licença Unsplash). Vídeo da hero: gerado com IA
(contém metadados de procedência C2PA). Fontes: Barlow Condensed e Inter (Google Fonts).
