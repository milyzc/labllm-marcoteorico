// Minimal slide engine: keyboard/click navigation, #hash, step reveal, notes, theme.
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;
  let cur = 0;

  const progress = el('div', 'progress');
  const nav = el('div', 'nav');
  const prevBtn = el('button', '', '←');
  const nextBtn = el('button', '', '→');
  const count = el('span', 'count');
  const helpBtn = el('button', '', '?');
  prevBtn.title = 'Anterior'; nextBtn.title = 'Siguiente'; helpBtn.title = 'Atajos';
  nav.append(prevBtn, count, nextBtn, helpBtn);
  const home = el('a', 'home', '⌂ Índice');
  home.href = 'index.html';
  const help = el('div', 'help');
  help.innerHTML = `<div class="card"><h3>Atajos</h3><table>
    <tr><td><kbd>→</kbd> <kbd>espacio</kbd></td><td>siguiente (paso o slide)</td></tr>
    <tr><td><kbd>←</kbd></td><td>anterior</td></tr>
    <tr><td><kbd>Inicio</kbd> <kbd>Fin</kbd></td><td>primera / última</td></tr>
    <tr><td><kbd>N</kbd></td><td>notas del presentador</td></tr>
    <tr><td><kbd>T</kbd></td><td>tema claro / oscuro</td></tr>
    <tr><td><kbd>F</kbd></td><td>pantalla completa</td></tr>
    <tr><td><kbd>?</kbd> <kbd>Esc</kbd></td><td>esta ayuda</td></tr></table></div>`;
  document.body.append(progress, nav, home, help);

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function steps(i) { return [...slides[i].querySelectorAll('.step')]; }

  function go(i, showAllSteps = false) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, k) => s.classList.toggle('on', k === cur));
    steps(cur).forEach(s => s.classList.toggle('shown', showAllSteps));
    slides[cur].scrollTop = 0;
    progress.style.width = `${((cur + 1) / slides.length) * 100}%`;
    count.textContent = `${cur + 1} / ${slides.length}`;
    if (location.hash !== `#${cur + 1}`) history.replaceState(null, '', `#${cur + 1}`);
    slides[cur].dispatchEvent(new CustomEvent('slide:enter'));
  }

  function next() {
    const hidden = steps(cur).find(s => !s.classList.contains('shown'));
    if (hidden) hidden.classList.add('shown');
    else go(cur + 1);
  }

  function prev() {
    const shown = steps(cur).filter(s => s.classList.contains('shown'));
    if (shown.length) shown[shown.length - 1].classList.remove('shown');
    else go(cur - 1, true);
  }

  function toggleTheme() {
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : !matchMedia('(prefers-color-scheme: light)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('deck-theme', root.dataset.theme); } catch {}
  }

  try {
    const t = localStorage.getItem('deck-theme');
    if (t) document.documentElement.dataset.theme = t;
  } catch {}

  document.addEventListener('keydown', e => {
    if (e.target.closest('input,textarea,select,[contenteditable]')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(slides.length - 1, true);
    else if (k === 'n' || k === 'N') document.body.classList.toggle('show-notes');
    else if (k === 't' || k === 'T') toggleTheme();
    else if (k === 'f' || k === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.();
    }
    else if (k === '?') help.classList.toggle('on');
    else if (k === 'Escape') help.classList.remove('on');
  });
  prevBtn.onclick = prev;
  nextBtn.onclick = next;
  helpBtn.onclick = () => help.classList.toggle('on');
  help.onclick = () => help.classList.remove('on');

  // Clickable checklists: tick items during the talk.
  document.querySelectorAll('.checklist li').forEach(li => {
    li.onclick = () => li.classList.toggle('done');
  });

  window.addEventListener('hashchange', () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (n && n - 1 !== cur) go(n - 1);
  });
  const start = parseInt(location.hash.slice(1), 10);
  go(start ? start - 1 : 0);
})();

// OWASP Top 10 for LLM: every <span class="tag">LLMxx</span> gets its name in small text next to it,
// unless the surrounding element already names the risk (e.g. a card titled "Cadena de suministro").
(() => {
  const RISKS = {
    LLM01: ['Prompt injection', 'prompt injection'],
    LLM02: ['Divulgación de información sensible', 'divulgación'],
    LLM03: ['Cadena de suministro', 'cadena de suministro'],
    LLM04: ['Envenenamiento de datos y modelos', 'envenenamiento'],
    LLM05: ['Manejo inseguro de la salida', 'manejo inseguro'],
    LLM06: ['Agencia excesiva', 'agencia excesiva'],
    LLM07: ['Filtración del system prompt', 'filtración'],
    LLM08: ['Debilidades de vectores y embeddings', 'vectores'],
    LLM09: ['Desinformación', 'desinformación'],
    LLM10: ['Consumo sin límites', 'consumo'],
  };
  document.querySelectorAll('.tag').forEach(tag => {
    const r = RISKS[tag.textContent.trim()];
    if (!r) return;
    const [name, key] = r;
    tag.title = name;
    const around = (tag.parentElement?.textContent || '').toLowerCase();
    if (around.includes(key)) return;
    const small = document.createElement('small');
    small.className = 'tagname';
    small.textContent = name;
    tag.after(small);
  });
})();
