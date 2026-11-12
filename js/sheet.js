// The formula sheet: used on its own page (printable) and as a pop-up while
// solving problems, since Addie brings her own sheet to the real test.
import { chapter } from './content/index.js';
import { md, tex } from './render.js';

export function sheetHTML(chapterIds) {
  return chapterIds.map((id) => {
    const c = chapter(id);
    if (!c.formulas.length && !c.facts.length) return '';
    return `
    <section class="sheet-ch">
      <h2>Chapter ${c.id}: ${c.title}</h2>
      <div class="sheet-grid">
        ${c.formulas.map((f) => `
          <div class="sheet-f">
            <h3>${f.name}</h3>
            <div class="eq">${tex(f.latex, true)}</div>
            <p class="when"><strong>Use when you see:</strong> ${f.triggers.join(' · ')}</p>
            ${f.forms.length > 1 ? `<table>${f.forms.map((x) => `<tr><th>${x.label}</th><td>${tex(x.latex)}</td></tr>`).join('')}</table>` : `<p class="tip">${md(f.forms[0].tip)}</p>`}
          </div>`).join('')}
      </div>
      ${c.facts.length ? `<ul class="facts">${c.facts.map((x) => `<li>${md(x)}</li>`).join('')}</ul>` : ''}
    </section>`;
  }).join('');
}

export function openSheet(chapterIds) {
  let dlg = document.getElementById('sheet-dialog');
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.id = 'sheet-dialog';
    document.body.appendChild(dlg);
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
  }
  dlg.innerHTML = `<div class="dlg-head"><strong>My formula sheet</strong><button class="btn ghost" data-close>Close</button></div><div class="sheet">${sheetHTML(chapterIds)}</div>`;
  dlg.showModal();
}
