// Screens and navigation.
import { CHAPTERS, ITEMS, TEST_CHAPTERS, chapter } from './content/index.js';
import { md, tex, esc } from './render.js';
import {
  state, save, reset, activeChapters, chapterMastery, dueCount, weakSpots, buildSession, buildTest,
  dayStreak, daysToTest, itemsIn, mastery, today,
} from './store.js';
import { runSession } from './player.js';
import { sheetHTML } from './sheet.js';

const view = document.getElementById('view');
const pct = (x) => `${Math.round(x * 100)}%`;
const meter = (x) => `<div class="meter" role="img" aria-label="${pct(x)} mastered"><i style="width:${pct(x)}"></i></div>`;
const KIND = { q: 'Concept', s: 'Formula finder', p: 'Math' };

function setNav(name) {
  document.querySelectorAll('nav a').forEach((a) => a.classList.toggle('on', a.dataset.nav === name));
  document.body.classList.toggle('in-session', name === 'session');
}

function start(opts) {
  setNav('session');
  window.scrollTo(0, 0);
  runSession(view, opts);
}

function startToday() {
  const chapters = activeChapters();
  start({ title: "Today's session", keys: buildSession({ chapters, n: 12 }), chapters, again: startToday });
}

function chips(name, selected, list = CHAPTERS) {
  return `<div class="chips">${list.map((c) => `<label class="pick"><input type="checkbox" name="${name}" value="${c.id}" ${selected.includes(c.id) ? 'checked' : ''}><span>Ch ${c.id} <small>${c.title}</small></span></label>`).join('')}</div>`;
}
const checked = (form, name) => [...form.querySelectorAll(`[name=${name}]:checked`)].map((x) => Number(x.value));

// ---------- Home ----------
function home() {
  setNav('home');
  const chapters = activeChapters();
  const items = itemsIn(chapters);
  const overall = items.reduce((s, it) => s + mastery(it.key), 0) / items.length;
  const seen = items.filter((it) => state.items[it.key]).length;
  const due = dueCount(chapters);
  const days = daysToTest();
  const didToday = state.days[today()];
  const weak = weakSpots(chapters).slice(0, 6);
  const countdown = days === null ? 'Set your test date below to see a countdown.'
    : days > 1 ? `<strong>${days} days</strong> until the test.`
      : days === 1 ? '<strong>The test is tomorrow.</strong> A light review, then sleep.'
        : days === 0 ? '<strong>Test day.</strong> You have done the work.'
          : 'That test date has passed. Update it below for the next one.';

  view.innerHTML = `
    <header class="hero">
      <h1>Hi Addie</h1>
      <p>Chapters ${TEST_CHAPTERS[0]}–${TEST_CHAPTERS.at(-1)}. ${countdown}</p>
    </header>

    <section class="card today">
      <div>
        <h2>${didToday ? 'Keep going' : "Today's session"}</h2>
        <p>12 questions, about 10 minutes. ${due ? `${due} due for review, the rest new.` : seen ? 'New material and a few refreshers.' : 'A mix of concepts, formula picking and math.'}</p>
        ${didToday ? `<p class="quiet">Done today: ${didToday.n} answered, ${didToday.right} right first time.</p>` : ''}
      </div>
      <button class="btn primary big" id="go">${didToday ? 'Another round' : 'Start'}</button>
    </section>

    <section class="stats">
      <div><b>${pct(overall)}</b><span>mastered</span></div>
      <div><b>${seen}<small> / ${items.length}</small></b><span>items tried</span></div>
      <div><b>${dayStreak()}</b><span>day streak</span></div>
    </section>

    <h2 class="section">Chapters</h2>
    <section class="card list">
      ${chapters.map((id) => { const c = chapter(id); const m = chapterMastery(id); return `
        <a class="chrow" href="#/chapter/${id}"><span class="ico">${c.icon}</span><span class="grow"><strong>Chapter ${id}: ${c.title}</strong>${meter(m)}</span><span class="num">${pct(m)}</span></a>`; }).join('')}
    </section>

    ${weak.length ? `
    <h2 class="section">Worth another look</h2>
    <section class="card">
      <ul class="review-list">${weak.map((it) => `<li><span class="chip">${KIND[it.kind]}</span> ${it.kind === 'p' ? esc(it.data.title) : md(it.data.q)}</li>`).join('')}</ul>
      <button class="btn" id="weak">Practise these</button>
    </section>` : ''}

    <details class="card settings">
      <summary>Settings</summary>
      <label>Test date <input type="date" id="testDate" value="${state.settings.testDate}"></label>
      <label>Value of g in math problems
        <select id="g"><option value="9.8" ${state.settings.g === 9.8 ? 'selected' : ''}>9.8 m/s²</option><option value="10" ${state.settings.g === 10 ? 'selected' : ''}>10 m/s²</option></select>
      </label>
      <button class="btn danger" id="reset">Reset all progress</button>
    </details>`;

  view.querySelector('#go').onclick = startToday;
  const weakBtn = view.querySelector('#weak');
  if (weakBtn) weakBtn.onclick = () => start({ title: 'Worth another look', keys: weakSpots(chapters).slice(0, 12).map((it) => it.key), chapters });
  view.querySelector('#testDate').onchange = (e) => { state.settings.testDate = e.target.value; save(); home(); };
  view.querySelector('#g').onchange = (e) => { state.settings.g = Number(e.target.value); save(); };
  view.querySelector('#reset').onclick = () => { if (confirm('Erase all saved progress? This cannot be undone.')) { reset(); home(); } };
}

// ---------- Chapters ----------
function chapters() {
  setNav('chapters');
  const row = (c) => `<a class="chrow" href="#/chapter/${c.id}"><span class="ico">${c.icon}</span><span class="grow"><strong>Chapter ${c.id}: ${c.title}</strong>${meter(chapterMastery(c.id))}</span><span class="num">${pct(chapterMastery(c.id))}</span></a>`;
  view.innerHTML = `
    <header class="hero"><h1>Chapters</h1><p>Read the big ideas, then practise one chapter at a time.</p></header>
    <section class="card list">${CHAPTERS.map(row).join('')}</section>`;
}

function chapterPage(id) {
  setNav('chapters');
  const c = chapter(id);
  if (!c) return chapters();
  const count = (k) => itemsIn([c.id], [k]).length;
  view.innerHTML = `
    <header class="hero">
      <a class="back" href="#/chapters">← Chapters</a>
      <h1>${c.icon} Chapter ${c.id}: ${c.title}</h1>
      ${meter(chapterMastery(c.id))}
    </header>
    <section class="card actions">
      <button class="btn primary" data-kinds="q,s,p">Practise this chapter</button>
      ${count('q') ? `<button class="btn" data-kinds="q">Concepts (${count('q')})</button>` : ''}
      ${count('s') ? `<button class="btn" data-kinds="s">Formula finder (${count('s')})</button>` : ''}
      ${count('p') ? `<button class="btn" data-kinds="p">Math (${count('p')} types)</button>` : ''}
    </section>
    ${c.ideas.length ? `<h2 class="section">Big ideas</h2>${c.ideas.map((i) => `<section class="card idea"><h3>${i.t}</h3><p>${md(i.b)}</p></section>`).join('')}` : ''}
    ${c.traps.length ? `<h2 class="section">Watch out</h2>${c.traps.map((t) => `
      <section class="card trap"><h3>${md(t.t)}</h3>
        <p class="wrong"><span>✗</span> ${md(t.wrong)}</p><p class="right"><span>✓</span> ${md(t.right)}</p>
        <p class="hook">${md(t.hook)}</p></section>`).join('')}` : ''}
    ${c.formulas.length || c.facts.length ? `<h2 class="section">Formulas and must-knows</h2><section class="card sheet">${sheetHTML([c.id])}</section>` : ''}`;
  view.querySelectorAll('[data-kinds]').forEach((b) => (b.onclick = () => {
    const kinds = b.dataset.kinds.split(',');
    const go = () => start({ title: `Chapter ${c.id}`, keys: buildSession({ chapters: [c.id], kinds, n: 10 }), chapters: [c.id], again: go });
    go();
  }));
}

// ---------- Practice ----------
function practice() {
  setNav('practice');
  view.innerHTML = `
    <header class="hero"><h1>Practice</h1><p>Pick what to work on. Missed items come back until they stick.</p></header>
    <form class="card form" id="pf">
      <fieldset><legend>Chapters</legend>${chips('ch', activeChapters())}</fieldset>
      <fieldset><legend>What kind</legend>
        <div class="chips">
          <label class="pick"><input type="radio" name="kind" value="q,s,p" checked><span>Mixed</span></label>
          <label class="pick"><input type="radio" name="kind" value="q"><span>Concepts</span></label>
          <label class="pick"><input type="radio" name="kind" value="s"><span>Formula finder</span></label>
          <label class="pick"><input type="radio" name="kind" value="p"><span>Math</span></label>
        </div>
      </fieldset>
      <fieldset><legend>Math help</legend>
        <div class="chips">
          <label class="pick"><input type="radio" name="level" value="0" checked><span>Auto <small>adapts to you</small></span></label>
          <label class="pick"><input type="radio" name="level" value="1"><span>Guided <small>step by step</small></span></label>
          <label class="pick"><input type="radio" name="level" value="2"><span>Coached <small>formula given</small></span></label>
          <label class="pick"><input type="radio" name="level" value="3"><span>On my own <small>like the test</small></span></label>
        </div>
      </fieldset>
      <fieldset><legend>How many</legend>
        <div class="chips">
          <label class="pick"><input type="radio" name="n" value="10" checked><span>10</span></label>
          <label class="pick"><input type="radio" name="n" value="20"><span>20</span></label>
        </div>
      </fieldset>
      <p class="msg" aria-live="polite"></p>
      <button class="btn primary big">Start</button>
    </form>`;
  const form = view.querySelector('#pf');
  form.onsubmit = (e) => {
    e.preventDefault();
    const chs = checked(form, 'ch');
    const kinds = form.kind.value.split(',');
    const opts = { chapters: chs, kinds, n: Number(form.n.value) };
    if (!chs.length || !itemsIn(chs, kinds).length) { form.querySelector('.msg').textContent = 'Pick at least one chapter that has this kind of question.'; return; }
    const go = () => start({ title: 'Practice', keys: buildSession(opts), chapters: chs, level: Number(form.level.value), again: go });
    go();
  };
}

// ---------- Practice test ----------
function testSetup() {
  setNav('test');
  const past = state.tests.slice(-5).reverse();
  view.innerHTML = `
    <header class="hero"><h1>Practice test</h1><p>Like the real thing: no hints and no feedback until the end. Your formula sheet is allowed.</p></header>
    <form class="card form" id="tf">
      <fieldset><legend>Chapters</legend>${chips('ch', activeChapters())}</fieldset>
      <fieldset><legend>Length</legend>
        <div class="chips">
          <label class="pick"><input type="radio" name="n" value="12"><span>12 <small>quick check</small></span></label>
          <label class="pick"><input type="radio" name="n" value="24" checked><span>24</span></label>
          <label class="pick"><input type="radio" name="n" value="40"><span>40 <small>full length</small></span></label>
        </div>
      </fieldset>
      <p class="msg" aria-live="polite"></p>
      <button class="btn primary big">Start test</button>
    </form>
    ${past.length ? `<h2 class="section">Recent results</h2><section class="card"><table class="bych">${past.map((t) => `<tr><th>${t.day === today() ? 'Today' : `${today() - t.day} day${today() - t.day === 1 ? '' : 's'} ago`}</th><td>${t.right} / ${t.n}</td><td><strong>${t.pct}%</strong></td></tr>`).join('')}</table></section>` : ''}`;
  const form = view.querySelector('#tf');
  form.onsubmit = (e) => {
    e.preventDefault();
    const chs = checked(form, 'ch');
    if (!chs.length) { form.querySelector('.msg').textContent = 'Pick at least one chapter.'; return; }
    start({ title: 'Practice test', mode: 'test', keys: buildTest({ chapters: chs, n: Number(form.n.value) }), chapters: chs });
  };
}

// ---------- Formula sheet ----------
function sheet() {
  setNav('sheet');
  let chosen = activeChapters();
  const draw = () => {
    view.innerHTML = `
      <header class="hero noprint"><h1>Formula sheet</h1><p>Every formula with its trigger words and rearranged versions. Print it, or copy it onto the sheet you bring to the test.</p></header>
      <form class="card form noprint" id="sf">${chips('ch', chosen)}<button type="button" class="btn primary" id="print">Print</button></form>
      <section class="card sheet printable">${sheetHTML(chosen) || '<p>Pick a chapter.</p>'}</section>`;
    const form = view.querySelector('#sf');
    form.onchange = () => { chosen = checked(form, 'ch'); draw(); };
    view.querySelector('#print').onclick = () => window.print();
  };
  draw();
}

// ---------- Router ----------
function route() {
  const [, name, arg] = location.hash.split('/');
  window.scrollTo(0, 0);
  if (name === 'chapters') return chapters();
  if (name === 'chapter') return chapterPage(arg);
  if (name === 'practice') return practice();
  if (name === 'test') return testSetup();
  if (name === 'sheet') return sheet();
  return home();
}
window.addEventListener('hashchange', route);
route();
