// Runs a study session or a practice test: shows one item at a time, gives
// feedback, records the result and brings missed items back.
import { ITEMS, FORMULAS, chapter } from './content/index.js';
import { FIGS } from './content/figures.js';
import { md, tex, esc } from './render.js';
import { state, rec, record, save, today, markDone } from './store.js';
import { shuffle, parseNum, close, finalize, fmt } from './util.js';
import { openSheet } from './sheet.js';

const LEVELS = { 1: 'Guided', 2: 'Coached', 3: 'On your own' };
const LEVEL_NOTE = {
  1: 'Next time you will get this type step by step.',
  2: 'Next time you will get the formula and the givens, and do the working yourself.',
  3: 'Next time you will do this type on your own, like on the test.',
};

const tag = (item, label) => `<p class="tag">Chapter ${item.ch} · ${label}</p>`;

function formulaChoices(correctId, chapters) {
  const pool = Object.values(FORMULAS).filter((f) => f.id !== correctId);
  const near = shuffle(pool.filter((f) => chapters.includes(f.ch)));
  const far = shuffle(pool.filter((f) => !chapters.includes(f.ch)));
  return shuffle([FORMULAS[correctId], ...[...near, ...far].slice(0, 3)]);
}

const formulaButton = (f) => `<button class="opt formula" data-id="${f.id}"><span class="fname">${f.name}</span><span class="feq">${tex(f.latex)}</span></button>`;

function feedback(good, title, body) {
  return `<div class="fb-box ${good ? 'good' : 'bad'}"><p class="fb-title">${title}</p>${body}</div>`;
}

// ---------- concept question ----------
// "All of the above" style options stay at the bottom; the rest are shuffled.
const PINNED = /^(all|none|both|either|neither|more than one|it is the same)\b/i;
function optionOrder(v) {
  const idx = v.o.map((_, i) => i);
  if (v.fixed) return idx;
  return [...shuffle(idx.filter((i) => !PINNED.test(v.o[i]))), ...idx.filter((i) => PINNED.test(v.o[i]))];
}
const figHTML = (v) => (v.fig ? `<div class="fig">${FIGS[v.fig]}</div>` : '');

function renderQuestion(el, item, ctx) {
  const q = item.data;
  const versions = [q, ...(q.alts || [])];
  const v = versions[Math.floor(Math.random() * versions.length)]; // a reworded version, sometimes
  const why = v.why || q.why;
  const order = optionOrder(v);
  el.innerHTML = `${tag(item, 'Concept')}
    <h2 class="prompt">${md(v.q)}</h2>
    ${figHTML(v)}
    <div class="opts">${order.map((oi, n) => `<button class="opt" data-i="${oi}"><span class="letter">${'ABCDE'[n]}</span><span>${md(v.o[oi])}</span></button>`).join('')}</div>
    <div class="fb" aria-live="polite"></div>`;
  const buttons = [...el.querySelectorAll('.opt')];
  buttons.forEach((b) => (b.onclick = () => {
    const i = Number(b.dataset.i);
    if (ctx.mode === 'test') {
      buttons.forEach((x) => x.classList.toggle('picked', x === b));
      ctx.setAnswer({ clean: i === v.a, given: md(v.o[i]), v });
      return;
    }
    buttons.forEach((x) => { x.disabled = true; if (Number(x.dataset.i) === v.a) x.classList.add('right'); });
    if (i !== v.a) b.classList.add('wrong');
    const note = i !== v.a && v.x && v.x[v.o[i]];
    el.querySelector('.fb').innerHTML = feedback(i === v.a, i === v.a ? 'Correct' : 'Not quite',
      `${note ? `<p class="whynot"><strong>Why not “${md(v.o[i])}”:</strong> ${md(note)}</p>` : ''}
       <p>${i === v.a ? '' : `<strong>${md(v.o[v.a])}.</strong> `}${md(why)}</p>${q.trap && v === q ? `<p class="trapnote"><strong>Watch out:</strong> ${md(q.trap)}</p>` : ''}`);
    ctx.answered(i === v.a);
  }));
}

export const questionReview = (item, v = item.data) => `${figHTML(v)}<p><strong>Answer:</strong> ${md(v.o[v.a])}</p><p>${md(v.why || item.data.why)}</p>`;

// ---------- formula finder ----------
function renderScenario(el, item, ctx) {
  const s = item.data;
  const choices = formulaChoices(s.f, ctx.chapters);
  el.innerHTML = `${tag(item, 'Formula finder')}
    <h2 class="prompt">${md(s.q)}</h2>
    <p class="ask">Which formula would you reach for?</p>
    <div class="opts">${choices.map(formulaButton).join('')}</div>
    <div class="fb" aria-live="polite"></div>`;
  const buttons = [...el.querySelectorAll('.opt')];
  buttons.forEach((b) => (b.onclick = () => {
    const ok = b.dataset.id === s.f;
    if (ctx.mode === 'test') {
      buttons.forEach((x) => x.classList.toggle('picked', x === b));
      ctx.setAnswer({ clean: ok, given: FORMULAS[b.dataset.id].name });
      return;
    }
    buttons.forEach((x) => { x.disabled = true; if (x.dataset.id === s.f) x.classList.add('right'); });
    if (!ok) b.classList.add('wrong');
    el.querySelector('.fb').innerHTML = feedback(ok, ok ? 'Correct' : 'Not quite',
      `<p>${md(s.why)}</p><p class="clues"><strong>The clues:</strong> ${s.clues.map((c) => `<span class="chip">${esc(c)}</span>`).join(' ')}</p>`);
    ctx.answered(ok);
  }));
}

export const scenarioReview = (item) => `<p><strong>Answer:</strong> ${FORMULAS[item.data.f].name} ${tex(FORMULAS[item.data.f].latex)}</p><p>${md(item.data.why)}</p>`;

// ---------- math problem ----------
const answerLine = (g) => `$${fmt(g.answer)}$${g.unit ? ' ' + esc(g.unit) : ''}`;
export const solutionHTML = (g, formLatex) => `${formLatex ? `<p class="note">On the test, write the formula first, then each line of working. The professor gives credit for it.</p><div class="work">${tex(formLatex)}</div>` : ''}<ol class="solution">${g.steps.map((s) => `<li><span>${md(s.say)}</span><div class="work">${tex(s.work)}</div></li>`).join('')}</ol>`;
const givensHTML = (g) => `<div class="givens">${g.givens.map((x) => `<span class="given">${tex(x.s)} <em>=</em> ${tex(x.v)}</span>`).join('')}</div>`;

function numberForm(g, { unit = '', label = 'Check' } = {}) {
  const needsText = g.answer < 0 || g.mistakes.some((m) => m.v < 0) || (g.answer !== 0 && (Math.abs(g.answer) < 0.001 || Math.abs(g.answer) >= 1e7));
  return `<form class="ans" novalidate>
    <input type="text" inputmode="${needsText ? 'text' : 'decimal'}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="Your answer">
    ${unit ? `<span class="unit">${esc(unit)}</span>` : ''}
    <button class="btn primary" type="submit">${label}</button>
  </form><p class="msg" aria-live="polite"></p>`;
}

function renderProblem(el, item, ctx) {
  const p = item.data;
  const f = FORMULAS[p.f];
  const g = finalize(p.make(Math.random, { g: state.settings.g }));
  const form = (p.form && f.forms.find((x) => x.for === p.form)) || f.forms[0];
  const level = ctx.mode === 'test' ? 3 : ctx.level || rec(item.key).level || 1;
  let clean = true;

  el.innerHTML = `${tag(item, ctx.mode === 'test' ? 'Math' : `Math · ${LEVELS[level]}`)}
    <h2 class="prompt">${md(g.prompt)}</h2>
    <div class="flow"></div>
    <div class="fb" aria-live="polite"></div>`;
  const flow = el.querySelector('.flow');
  const add = (html) => {
    const d = document.createElement('div');
    d.className = 'block';
    d.innerHTML = html;
    flow.appendChild(d);
    return d;
  };
  const sheetBtn = '<button type="button" class="btn ghost" data-sheet>📋 My formula sheet</button>';
  el.addEventListener('click', (e) => { if (e.target.closest('[data-sheet]')) openSheet(ctx.chapters); });

  if (ctx.mode === 'test') {
    const b = add(`<p class="note">A written problem. On the real test these carry most of the points, and the professor gives credit for your working, so write it out on paper first.</p>${numberForm(g, { unit: g.unit, label: 'Save answer' })}${sheetBtn}`);
    const input = b.querySelector('input');
    const saveIt = () => {
      const v = parseNum(input.value);
      ctx.setAnswer({ clean: !Number.isNaN(v) && close(v, g.answer), given: esc(input.value || '(blank)'), gen: g, form: form.latex });
      b.querySelector('.msg').textContent = input.value ? 'Saved.' : '';
    };
    ctx.setAnswer({ clean: false, given: '(blank)', gen: g, form: form.latex });
    input.addEventListener('input', saveIt);
    b.querySelector('form').onsubmit = (e) => { e.preventDefault(); saveIt(); };
    return;
  }

  const conclude = (ok) => {
    const r = ctx.answered(clean && ok, level);
    const note = r && !ctx.level ? `<p class="levelnote">${LEVEL_NOTE[r.level]}</p>` : '';
    const title = clean && ok ? 'Correct' : ok ? 'You got there' : `The answer is ${md(answerLine(g))}`;
    el.querySelector('.fb').innerHTML = feedback(ok, title,
      `${level === 1 && ok ? `<p>Answer: ${md(answerLine(g))}</p>` : `${solutionHTML(g, form.latex)}`}${note}`);
  };

  // --- Level 1: guided, one small step at a time ---
  if (level === 1) {
    const stages = [];
    const advance = () => { const next = stages.shift(); if (next) next(); else conclude(true); };

    const pickStage = (title, buttonsHTML, isRight, afterHTML) => () => {
      const b = add(`<p class="step-title">${title}</p><div class="opts">${buttonsHTML}</div><div class="after"></div>`);
      const buttons = [...b.querySelectorAll('.opt')];
      buttons.forEach((btn) => (btn.onclick = () => {
        buttons.forEach((x) => { x.disabled = true; if (isRight(x)) x.classList.add('right'); });
        if (!isRight(btn)) { btn.classList.add('wrong'); clean = false; }
        b.querySelector('.after').innerHTML = afterHTML(isRight(btn));
        advance();
      }));
    };

    stages.push(pickStage('First, pick the formula.', formulaChoices(p.f, ctx.chapters).map(formulaButton).join(''),
      (x) => x.dataset.id === p.f,
      (ok) => `<p class="note">${ok ? '' : `It is <strong>${f.name}</strong>. `}${md(f.plain)}</p><p class="step-title">What you know</p>${givensHTML(g)}`));

    if (p.form && f.forms.length > 1) {
      stages.push(pickStage(`Which version gives you the <strong>${form.label}</strong>?`,
        shuffle(f.forms).map((x) => `<button class="opt formula" data-for="${esc(x.for)}"><span class="feq">${tex(x.latex)}</span></button>`).join(''),
        (x) => x.dataset.for === form.for,
        () => `<p class="note">${md(form.tip)}</p>`));
    }

    g.steps.forEach((st, i) => stages.push(() => {
      const last = i === g.steps.length - 1;
      const b = add(`<p class="step-title"><span class="num">${i + 1}</span> ${md(st.say)}</p>${numberForm(g, { unit: last ? g.unit : '' })}`);
      const input = b.querySelector('input');
      const msg = b.querySelector('.msg');
      let tries = 0;
      input.focus({ preventScroll: true });
      b.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      b.querySelector('form').onsubmit = (e) => {
        e.preventDefault();
        const v = parseNum(input.value);
        if (Number.isNaN(v)) { msg.textContent = 'Type a number.'; return; }
        const ok = close(v, st.v);
        if (!ok && ++tries < 2) {
          clean = false;
          const m = last && g.mistakes.find((x) => close(v, x.v));
          msg.innerHTML = m ? md(m.msg) : 'Not quite. Check your calculator entry and try once more.';
          input.select();
          return;
        }
        if (!ok) clean = false;
        b.querySelector('form').remove();
        msg.remove();
        b.insertAdjacentHTML('beforeend', `<div class="work ${ok ? 'ok' : 'shown'}">${ok ? '✓' : 'It is'} ${tex(st.work)}</div>`);
        advance();
      };
    }));
    advance();
    return;
  }

  // --- Levels 2 and 3: one answer box, hints on request ---
  if (level === 2) {
    add(`<p class="step-title">What you know</p>${givensHTML(g)}
      <p class="step-title">Formula</p><div class="eq">${tex(form.latex, true)}</div><p class="note">${md(form.tip)}</p>`);
  }
  const b = add(`${numberForm(g, { unit: g.unit })}
    <div class="row">${level === 3 ? sheetBtn : ''}<button type="button" class="btn ghost" data-hint>${level === 3 ? "I'm stuck" : 'Give me a hint'}</button></div>
    <ol class="hints"></ol>`);
  const input = b.querySelector('input');
  const msg = b.querySelector('.msg');
  let attempts = 0;
  let hinted = 0;
  b.querySelector('[data-hint]').onclick = (e) => {
    if (level === 3) clean = false;
    if (hinted === 0 && level === 3) {
      b.querySelector('.hints').insertAdjacentHTML('beforebegin', `<p class="note">Use <strong>${f.name}</strong>: ${tex(form.latex)}</p>`);
    }
    if (hinted < g.steps.length) {
      const st = g.steps[hinted++];
      b.querySelector('.hints').insertAdjacentHTML('beforeend', `<li>${md(st.say)}</li>`);
    }
    if (hinted >= g.steps.length) e.currentTarget.remove();
  };
  b.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    const v = parseNum(input.value);
    if (Number.isNaN(v)) { msg.textContent = 'Type a number.'; return; }
    const ok = close(v, g.answer);
    if (!ok && ++attempts < 2) {
      clean = false;
      const m = g.mistakes.find((x) => close(v, x.v));
      msg.innerHTML = `${m ? md(m.msg) : 'Not quite.'} Try once more.`;
      input.select();
      return;
    }
    input.disabled = true;
    b.querySelector('form button').disabled = true;
    b.querySelector('.row').remove();
    msg.textContent = '';
    conclude(ok);
  };
}

const RENDER = { q: renderQuestion, s: renderScenario, p: renderProblem };
const KIND_LABEL = { q: 'Concept', s: 'Formula finder', p: 'Math' };

function itemTitle(item) {
  if (item.kind === 'q') return md(item.data.q);
  if (item.kind === 's') return md(item.data.q);
  return esc(item.data.title);
}

// opts: { title, keys, chapters, mode: 'learn' | 'test', level, again() }
export function runSession(root, opts) {
  const mode = opts.mode || 'learn';
  const queue = opts.keys.map((key) => ({ key }));
  const total = queue.length;
  const results = []; // first attempts only
  const started = Date.now();
  let i = 0;
  let pending = null;

  function show() {
    if (i >= queue.length) return mode === 'test' ? finishTest() : finishLearn();
    const entry = queue[i];
    const item = ITEMS[entry.key];
    const doneCount = results.length;
    root.innerHTML = `
      <div class="session-head">
        <a class="btn ghost quit" href="#/" aria-label="Leave session">✕</a>
        <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${doneCount}"><i style="width:${(100 * doneCount) / total}%"></i></div>
        <span class="count">${Math.min(doneCount + 1, total)} / ${total}</span>
      </div>
      ${entry.retry ? '<p class="retry-note">Second look at one you missed</p>' : ''}
      <article class="card item"></article>
      <div class="session-foot"></div>`;
    const foot = root.querySelector('.session-foot');
    const nextLabel = () => (i + 1 >= queue.length ? (mode === 'test' ? 'Finish test' : 'Finish') : 'Next');
    const goNext = () => { i++; show(); window.scrollTo(0, 0); };
    pending = { key: entry.key, clean: false, given: '(blank)' };

    const ctx = {
      mode,
      level: opts.level || 0,
      chapters: opts.chapters,
      setAnswer(a) { pending = { key: entry.key, ...a }; },
      answered(clean, usedLevel) {
        let r = null;
        if (!entry.retry) {
          r = record(entry.key, clean, usedLevel);
          results.push({ key: entry.key, clean });
          if (!clean) queue.splice(Math.min(queue.length, i + 4), 0, { key: entry.key, retry: true });
        }
        foot.innerHTML = `<button class="btn primary big" id="next">${nextLabel()}</button>`;
        const next = foot.querySelector('#next');
        next.onclick = goNext;
        next.focus({ preventScroll: true });
        next.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        return r;
      },
    };
    RENDER[item.kind](root.querySelector('.item'), item, ctx);
    if (mode === 'test') {
      foot.innerHTML = `<button class="btn primary big" id="next">${nextLabel()}</button>`;
      foot.querySelector('#next').onclick = () => { results.push(pending); goNext(); };
    }
  }

  function finishLearn() {
    if (opts.onFinish) opts.onFinish();
    const right = results.filter((r) => r.clean).length;
    const missed = results.filter((r) => !r.clean);
    const line = right === results.length ? 'Every one right first time.'
      : right / results.length >= 0.7 ? 'Solid session.'
        : 'This is the useful kind of session: you found what needs work.';
    root.innerHTML = `
      <article class="card center">
        <p class="tag">${esc(opts.title)}</p>
        <p class="score">${right}<span> / ${results.length}</span></p>
        <p>right first time. ${line}</p>
        ${missed.length ? `<div class="left"><p class="step-title">Coming back for review</p><ul class="review-list">${missed.map((m) => `<li><span class="chip">${KIND_LABEL[ITEMS[m.key].kind]}</span> ${itemTitle(ITEMS[m.key])}</li>`).join('')}</ul></div>` : ''}
        <div class="row center">
          ${opts.again ? '<button class="btn primary" id="again">Another round</button>' : ''}
          <a class="btn" href="#/">Home</a>
        </div>
      </article>`;
    const again = root.querySelector('#again');
    if (again) again.onclick = opts.again;
  }

  function finishTest() {
    results.forEach((r) => record(r.key, r.clean, 3));
    markDone('test');
    const isP = (r) => ITEMS[r.key].kind === 'p';
    const mc = results.filter((r) => !isP(r));
    const pr = results.filter(isP);
    const mcRight = mc.filter((r) => r.clean).length;
    const prRight = pr.filter((r) => r.clean).length;
    // Scored like the real test: multiple choice is 40 points, written problems 60.
    const pct = Math.round(!pr.length ? (100 * mcRight) / mc.length
      : !mc.length ? (100 * prRight) / pr.length
        : (40 * mcRight) / mc.length + (60 * prRight) / pr.length);
    const byCh = {};
    mc.forEach((r) => {
      const ch = ITEMS[r.key].ch;
      byCh[ch] = byCh[ch] || { right: 0, n: 0 };
      byCh[ch].n++;
      if (r.clean) byCh[ch].right++;
    });
    state.tests.push({ day: today(), right: mcRight + prRight, n: results.length, pct, byCh });
    save();
    const minutes = Math.max(1, Math.round((Date.now() - started) / 60000));
    const review = (r) => {
      const item = ITEMS[r.key];
      const body = item.kind === 'q' ? questionReview(item, r.v)
        : item.kind === 's' ? scenarioReview(item)
          : `<p>${md(r.gen.prompt)}</p><p><strong>Answer:</strong> ${md(answerLine(r.gen))}</p>${solutionHTML(r.gen, r.form)}`;
      return `<li class="${r.clean ? 'ok' : 'miss'}"><p class="tag">Chapter ${item.ch} · ${isP(r) ? 'Written problem' : KIND_LABEL[item.kind]} · ${r.clean ? 'correct' : 'missed'}</p>
        ${item.kind === 'p' ? '' : `<p class="rq">${md((r.v || item.data).q)}</p>`}
        ${r.clean ? '' : `<p class="yours">Your answer: ${r.given}</p>`}${body}</li>`;
    };
    const missed = results.filter((r) => !r.clean);
    root.innerHTML = `
      <article class="card center">
        <p class="tag">Practice test result</p>
        <p class="score">${pct}<span>%</span></p>
        <p>Scored like the real test, in about ${minutes} min.</p>
        <table class="bych">
          ${mc.length ? `<tr><th><strong>Multiple choice</strong> (40 points)</th><td>${mcRight} / ${mc.length}</td></tr>` : ''}
          ${Object.entries(byCh).map(([ch, v]) => `<tr class="sub"><th>Chapter ${ch}: ${chapter(ch).title}</th><td>${v.right} / ${v.n}</td></tr>`).join('')}
          ${pr.length ? `<tr><th><strong>Written problems</strong> (60 points)</th><td>${prRight} / ${pr.length}</td></tr>` : ''}
        </table>
        ${pr.length ? '<p class="quiet">Written problems are marked right or wrong here. On the real test, working that is partly right still earns points.</p>' : ''}
        <div class="row center">
          ${missed.length ? '<button class="btn primary" id="fix">Practise what I missed</button>' : ''}
          <a class="btn" href="#/">Home</a>
        </div>
      </article>
      ${missed.length ? `<h2 class="section">What you missed</h2><ul class="test-review">${missed.map(review).join('')}</ul>` : ''}
      <details class="card"><summary>Show the ones you got right (${results.length - missed.length})</summary><ul class="test-review">${results.filter((r) => r.clean).map(review).join('')}</ul></details>`;
    const fix = root.querySelector('#fix');
    if (fix) fix.onclick = () => runSession(root, { title: 'Fixing test misses', keys: missed.map((m) => m.key), chapters: opts.chapters });
    window.scrollTo(0, 0);
  }

  show();
}
