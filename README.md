# ✿ Portfólio — Camila Silva

Portfólio pessoal em estilo **Pixel Art + Y2K**, feito como um desktop retrô: janelas, barra de tarefas, ícones pixelados, brilhos e animações.
Site 100% estático, pronto para o **GitHub Pages**.

## Tecnologias

- HTML5
- Tailwind CSS v3 (via CDN, sem build)
- CSS3 (`assets/css/style.css`: animações, janelas, fundo, cursor, scrollbar)
- JavaScript moderno, sem bibliotecas (`assets/js/main.js`)
- Fontes do Google Fonts: Press Start 2P, VT323 e Nunito

## Estrutura de pastas

```text
/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        ├── favicon.svg
        └── perfil.jpg      ← VOCÊ precisa adicionar esta foto
```

## Como ver o site no computador

Abra o arquivo `index.html` no navegador (duplo clique). É preciso internet para carregar o Tailwind e as fontes.

## Como adicionar sua foto

1. Salve sua foto com o nome **`perfil.jpg`** dentro de `assets/images/`.
2. Use uma imagem quadrada (ex.: 600 × 600 px) e leve (até ~300 KB).
3. Enquanto o arquivo não existir, o site mostra um sprite de computadorzinho com o texto "foto em breve".

## Como personalizar

| O que | Onde |
| --- | --- |
| Adicionar o LinkedIn | Na seção `#contato` do `index.html`, copie o botão do GitHub e troque o link e o texto |
| Link de demonstração de projeto | No `cart-foot` do projeto, adicione um novo botão `<a class="px-btn px-btn-sm px-btn-white">` |
| Tecnologias de cada projeto | No `cart-body` do projeto, use `<ul>` com `<li class="chip chip-study">Nome</li>` |
| Status dos projetos | Os badges "Projeto em grupo" e "Projeto de estudo" ficam no `cart-top` de cada cartão |
| Cores | Variáveis no começo de `style.css` e `tailwind.config` no `<head>` do `index.html` |
| Imagem ao compartilhar o link | No `<head>`, adicione `<meta property="og:image" content="URL ABSOLUTA da imagem">` depois de publicar |

> Informações **não fornecidas** (LinkedIn, Instagram, site, demonstrações online e tecnologias de alguns projetos) foram propositalmente omitidas, para não inventar nada.

## Acessibilidade

- HTML semântico, link "pular para o conteúdo" e navegação por teclado
- Foco visível em todos os elementos interativos
- Textos alternativos e `aria-label` onde necessário
- Respeita `prefers-reduced-motion` (animações, fundo e brilhos são desativados)

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `portfolio`) e envie todos os arquivos, com `index.html` na raiz.
2. Vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch **main** e a pasta **/ (root)** e clique em **Save**.
5. Aguarde 1 a 2 minutos. O site ficará em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Créditos

Feito com HTML, Tailwind CSS e muito rosa ♥
