/* ==========================================================================
   Portfólio Camila Silva — main.js
   JavaScript simples, sem bibliotecas. Cada bloco confere se os elementos
   existem antes de usá-los, para não gerar erros no console.
   Sumário:
   1. Utilidades
   2. Menu mobile
   3. Link ativo da navegação
   4. Relógio e ano do rodapé
   5. Barra de carregamento do hero
   6. Janelas (minimizar / fechar / reabrir)
   7. Animações ao rolar (scroll reveal)
   8. Terminal decorativo (efeito de digitação)
   9. Fundo animado
  10. Brilhos que seguem o cursor e sprites que reagem ao mouse
  11. Copiar e-mail
  12. Botão voltar ao topo
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ---------- 1. Utilidades ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /* ---------- 2. Menu mobile ---------- */
  const menuToggle = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.toggle('hidden', !open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    // Fecha ao escolher um link
    $$('a', mobileMenu).forEach((link) => link.addEventListener('click', () => setMenu(false)));
    // Fecha com Esc e devolve o foco ao botão
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuToggle.focus();
      }
    });
    // Fecha ao voltar para a tela grande
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- 3. Link ativo da navegação ---------- */
  const navLinks = $$('.nav-link, .mobile-link');
  const trackedIds = ['inicio', 'sobre', 'tecnologias', 'projetos', 'experiencia', 'formacao', 'contato'];
  const trackedEls = trackedIds.map((id) => document.getElementById(id)).filter(Boolean);

  function setActive(id) {
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && trackedEls.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    trackedEls.forEach((el) => navObserver.observe(el));
  }

  /* ---------- 4. Relógio e ano do rodapé ---------- */
  const clock = $('#clock');
  function updateClock() {
    if (!clock) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = hh + ':' + mm;
  }
  updateClock();
  if (clock) setInterval(updateClock, 30000);

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 5. Barra de carregamento do hero ---------- */
  const loadFill = $('#load-fill');
  const loadPercent = $('#load-percent');
  const loadLabel = $('#load-label');

  if (loadFill) {
    if (reduceMotion) {
      loadFill.style.width = '100%';
      if (loadLabel) loadLabel.textContent = 'portfólio carregado!';
    } else {
      let progress = 0;
      if (loadPercent) loadPercent.textContent = '0%';
      const timer = setInterval(() => {
        // avança em "degraus" para lembrar uma barra de instalação antiga
        progress = Math.min(100, progress + 8 + Math.floor(Math.random() * 10));
        loadFill.style.width = progress + '%';
        if (loadPercent) loadPercent.textContent = progress + '%';
        if (progress >= 100) {
          clearInterval(timer);
          if (loadLabel) loadLabel.textContent = 'portfólio carregado!';
        }
      }, 140);
    }
  }
  // Barras sem JS específico ficam completas
  $$('.retro-bar > i.is-full').forEach((bar) => { bar.style.width = '100%'; });

  /* ---------- 6. Janelas (minimizar / fechar / reabrir) ---------- */
  $$('[data-window]').forEach((win) => {
    const minBtn = $('[data-win-min]', win);
    const closeBtn = $('[data-win-close]', win);
    const titleEl = $('.win-title', win);
    const title = titleEl ? titleEl.textContent.trim() : 'janela';

    if (minBtn) {
      minBtn.addEventListener('click', () => {
        const minimized = win.classList.toggle('is-minimized');
        minBtn.setAttribute('aria-expanded', String(!minimized));
        minBtn.setAttribute(
          'aria-label',
          (minimized ? 'Restaurar janela ' : 'Minimizar janela ') + title
        );
        minBtn.textContent = minimized ? '▫' : '_';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const hideWindow = () => {
          win.hidden = true;
          win.classList.remove('is-closing');

          // Cria um botão para reabrir a janela
          const restore = document.createElement('button');
          restore.type = 'button';
          restore.className = 'win-restore';
          restore.textContent = '↺ reabrir ' + title;
          win.insertAdjacentElement('afterend', restore);

          restore.addEventListener('click', () => {
            restore.remove();
            win.hidden = false;
            win.classList.add('is-opening');
            win.addEventListener('animationend', () => win.classList.remove('is-opening'), { once: true });
            win.setAttribute('tabindex', '-1');
            win.focus({ preventScroll: true });
          });
          restore.focus();
        };

        if (reduceMotion) {
          hideWindow();
        } else {
          win.classList.add('is-closing');
          win.addEventListener('animationend', hideWindow, { once: true });
        }
      });
    }
  });

  /* ---------- 7. Animações ao rolar (scroll reveal) ---------- */
  const revealEls = $$('[data-reveal]');

  function showEl(el) {
    el.classList.add('is-visible');
    // remove a transição depois que a entrada termina (não atrapalha o hover)
    const delay = parseInt(getComputedStyle(el).transitionDelay, 10) || 0;
    setTimeout(() => el.classList.add('is-done'), 700 + delay);
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible', 'is-done'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showEl(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 8. Terminal decorativo (efeito de digitação) ---------- */
  const terminal = $('#terminal');

  function typeTerminal() {
    const lines = $$('.t-line', terminal);
    if (!lines.length) return;
    const texts = lines.map((line) => line.dataset.type || line.textContent);
    lines.forEach((line) => { line.textContent = ''; });

    const caret = document.createElement('span');
    caret.className = 't-caret';
    caret.setAttribute('aria-hidden', 'true');
    caret.innerHTML = '&nbsp;';

    let lineIndex = 0;
    let charIndex = 0;

    function step() {
      if (lineIndex >= lines.length) return; // termina com o cursor piscando na última linha
      const line = lines[lineIndex];
      line.appendChild(caret);
      const text = texts[lineIndex];
      if (charIndex < text.length) {
        line.insertBefore(document.createTextNode(text.charAt(charIndex)), caret);
        charIndex += 1;
        setTimeout(step, 45);
      } else {
        lineIndex += 1;
        charIndex = 0;
        setTimeout(step, 280);
      }
    }
    step();
  }

  if (terminal && !reduceMotion && 'IntersectionObserver' in window) {
    const termObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          typeTerminal();
        }
      },
      { threshold: 0.4 }
    );
    termObserver.observe(terminal);
  }

  /* ---------- 9. Fundo animado ---------- */
  const bgDeco = $('#bg-deco');

  if (bgDeco && !reduceMotion) {
    // sprites em SVG (pixel art) usados como fundo
    const sprites = [
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7 6' shape-rendering='crispEdges'%3E%3Cpath fill='%23ff5fae' d='M1 0h2v1H1zM4 0h2v1H4zM0 1h7v2H0zM1 3h5v1H1zM2 4h3v1H2zM3 5h1v1H3z'/%3E%3C/svg%3E\")",
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7 7' shape-rendering='crispEdges'%3E%3Cpath fill='%233ecf8e' d='M3 0h1v2H3zM2 2h3v1H2zM0 3h7v1H0zM2 4h3v1H2zM3 5h1v2H3z'/%3E%3C/svg%3E\")",
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7 7' shape-rendering='crispEdges'%3E%3Cpath fill='%23b79af5' d='M3 0h1v2H3zM2 2h3v1H2zM0 3h7v1H0zM2 4h3v1H2zM3 5h1v2H3z'/%3E%3C/svg%3E\")",
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 5' shape-rendering='crispEdges'%3E%3Cpath fill='%23ff9ccd' d='M1 0h1v1H1zM3 0h1v1H3zM0 1h5v1H0zM0 2h2v1H0zM3 2h2v1H3zM0 3h5v1H0zM1 4h1v1H1zM3 4h1v1H3z'/%3E%3Cpath fill='%233ecf8e' d='M2 2h1v1H2z'/%3E%3C/svg%3E\")"
    ];
    const count = window.innerWidth < 640 ? 9 : 16; // menos itens no celular = melhor desempenho
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i += 1) {
      const el = document.createElement('span');
      const size = 14 + Math.floor(Math.random() * 5) * 4; // 14 a 30px
      el.className = 'deco';
      el.style.left = Math.random() * 96 + '%';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.backgroundImage = sprites[i % sprites.length];
      el.style.animationDuration = 22 + Math.random() * 26 + 's';
      el.style.animationDelay = -Math.random() * 40 + 's'; // espalha os itens desde o início
      fragment.appendChild(el);
    }
    bgDeco.appendChild(fragment);
  }

  /* ---------- 10. Brilhos no cursor e sprites que reagem ao mouse ---------- */
  if (!reduceMotion && finePointer) {
    const colors = ['s-pink', 's-green', 's-lilac'];
    let lastSpark = 0;
    let rafPending = false;
    let mouseX = 0;
    let mouseY = 0;
    const parallaxEls = $$('.parallax');

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      // Brilho (limitado a ~1 a cada 70ms)
      const now = performance.now();
      if (now - lastSpark > 70) {
        lastSpark = now;
        const spark = document.createElement('span');
        spark.className = 'sparkle ' + colors[Math.floor(Math.random() * colors.length)];
        spark.style.left = mouseX + 'px';
        spark.style.top = mouseY + 'px';
        spark.style.setProperty('--dx', Math.round((Math.random() - 0.5) * 24) + 'px');
        spark.setAttribute('aria-hidden', 'true');
        document.body.appendChild(spark);
        spark.addEventListener('animationend', () => spark.remove(), { once: true });
      }

      // Sprites do hero se movem de leve com o mouse
      if (parallaxEls.length && !rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          const nx = mouseX / window.innerWidth - 0.5;
          const ny = mouseY / window.innerHeight - 0.5;
          parallaxEls.forEach((el) => {
            const depth = parseFloat(el.dataset.depth) || 10;
            el.style.transform = 'translate(' + (nx * depth).toFixed(1) + 'px,' + (ny * depth).toFixed(1) + 'px)';
          });
          rafPending = false;
        });
      }
    }, { passive: true });
  }

  /* ---------- 11. Copiar e-mail ---------- */
  const copyBtn = $('#copy-email');
  const copyStatus = $('#copy-status');

  function showCopyStatus(message) {
    if (!copyStatus) return;
    copyStatus.textContent = message;
    setTimeout(() => { copyStatus.textContent = ''; }, 2500);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email || '';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // alternativa para quando abrir o index.html direto do computador
          const temp = document.createElement('textarea');
          temp.value = email;
          temp.setAttribute('readonly', '');
          temp.style.position = 'absolute';
          temp.style.left = '-9999px';
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          temp.remove();
        }
        showCopyStatus('> e-mail copiado! ♥');
      } catch (error) {
        showCopyStatus('> não consegui copiar, selecione o e-mail acima');
      }
    });
  }

  /* ---------- 12. Botão voltar ao topo ---------- */
  const backTop = $('#back-to-top');

  if (backTop) {
    const toggleBackTop = () => { backTop.hidden = window.scrollY < 600; };
    window.addEventListener('scroll', toggleBackTop, { passive: true });
    toggleBackTop();
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
});
