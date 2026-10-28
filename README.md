# Atlas Fitness — landing page demonstrativa

Landing page comercial para uma **academia fictícia**, criada como projeto de portfólio.
Nomes, valores, endereço e horários são ilustrativos. O site não coleta nem armazena dados.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 — sem outras dependências de runtime.

## Rodar localmente

Requer Node.js 20+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # checagem de tipos + build de produção em dist/
npm run preview   # serve o build de produção localmente
```

## Estrutura

```
src/
  config/site.ts      ← configuração central (WhatsApp, endereço, horários, crédito do autor)
  data/content.ts     ← todos os textos: benefícios, modalidades, planos, FAQ…
  lib/whatsapp.ts     ← monta o link wa.me (ou null se não houver número)
  lib/images.ts       ← fotos do Unsplash com srcset responsivo
  components/         ← uma seção por arquivo
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
