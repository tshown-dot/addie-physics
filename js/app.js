// Screens and navigation.
import { CHAPTERS, ITEMS, TEST_CHAPTERS, chapter } from './content/index.js';
import { md, tex, esc } from './render.js';
import {
  state, save, reset, activeChapters, chapterMastery, dueCount, weakSpots, buildSession, buildTest,
  dayStreak, daysToTest, itemsIn, mastery, today, starred, rec, testWeek, markDone, didToday, exportData, importData,
} from './store.js';
import { runSession } from './player.js';
import { sheetHTML } from './sheet.js';

const view = document.getElementById('view');
const pct = (x) => `${Math.round(x * 100)}%`;
const meter = (x) => `<div class="meter" role="img" aria-label="${pct(x)} test-ready"><i style="width:${pct(x)}"></i></div>`;
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

const sessionSize = () => (testWeek() ? 15 : 12);
function startToday() {
  const chapters = activeChapters();
  start({ title: "Today's session", keys: buildSession({ chapters, n: sessionSize() }), chapters, again: startToday, onFinish: () => markDone('session') });
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
  const did = didToday();
  const stats = state.days[today()];
  const weak = weakSpots(chapters).slice(0, 6);
  const week = testWeek();
  const lastTest = state.tests.at(-1);
  const countdown = days === null ? 'Set your test date in Settings to turn on the countdown and test-week mode.'
    : days > 1 ? `<strong>${days} days</strong> until the test.`
      : days === 1 ? '<strong>The test is tomorrow.</strong> A light review, then sleep.'
        : days === 0 ? '<strong>Test day.</strong> You have done the work.'
          : 'That test date has passed. Update it in Settings for the next one.';
  const tick = (done) => `<span class="tick ${done ? 'done' : ''}" aria-label="${done ? 'done today' : 'not done yet'}">${done ? '✓' : ''}</span>`;

  view.innerHTML = `
    <header class="hero">
      <h1>Hi Addie</h1>
      <p>Chapters ${TEST_CHAPTERS[0]}–${TEST_CHAPTERS.at(-1)}. ${countdown}</p>
      ${week ? '<p class="weekmode">Test-week mode is on: reviews come back faster and sessions cover what you have not seen yet.</p>' : ''}
    </header>

    <h2 class="section">Today's plan</h2>
    <section class="card plan">
      <div class="step">
        ${tick(did.session)}
        <div><h2>Daily session</h2>
          <p>${sessionSize()} questions, about ${week ? 12 : 10} minutes. ${due ? `${due} to review, the rest new.` : 'Concepts, formula picking and math.'}</p>
          ${stats ? `<p class="quiet">Today so far: ${stats.n} answered, ${stats.right} right first time.</p>` : ''}</div>
        <button class="btn primary" id="go">${did.session ? 'Again' : 'Start'}</button>
      </div>
      <div class="step">
        ${tick(did.star)}
        <div><h2>Test review problems</h2>
          <p>The math from the Nov 11 review. On Test 1 the three written problems were worth <strong>60 of the 100 points</strong>.</p>
          <ul class="review-list">${starred().map((it) => `<li><span class="chip">${['', 'Guided', 'Coached', 'On your own'][rec(it.key).level]}</span> ${esc(it.data.title.replace(' (test review)', ''))}</li>`).join('')}</ul></div>
        <button class="btn primary" id="star">${did.star ? 'Again' : 'Practise'}</button>
      </div>
      <div class="step">
        ${tick(did.test)}
        <div><h2>Practice test</h2>
          <p>The professor's format: 40 multiple choice, then 3 written problems. ${lastTest ? `Last score: <strong>${lastTest.pct}%</strong>.` : 'Best once you have tried most of the items.'}</p></div>
        <a class="btn" href="#/test">Set up</a>
      </div>
    </section>

    <section class="stats">
      <div><b>${pct(overall)}</b><span>test-ready</span></div>
      <div><b>${seen}<small> / ${items.length}</small></b><span>items tried</span></div>
      <div><b>${dayStreak()}</b><span>day streak</span></div>
    </section>
    <p class="quiet">Test-ready counts each item you got right the last time you saw it. Math only counts in full when you solve it on your own.</p>

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
      <summary>Settings and backup</summary>
      <label>Test date <input type="date" id="testDate" value="${state.settings.testDate}"></label>
      <label>Value of g in math problems
        <select id="g"><option value="9.8" ${state.settings.g === 9.8 ? 'selected' : ''}>9.8 m/s²</option><option value="10" ${state.settings.g === 10 ? 'selected' : ''}>10 m/s²</option></select>
      </label>
      <p class="quiet">Progress is saved on this device only. To move it to another phone or laptop, save a backup file here and restore it there.</p>
      <div class="row">
        <button class="btn" id="backup">Save a backup file</button>
        <label class="btn filebtn">Restore from a backup<input type="file" id="restore" accept="application/json,.json"></label>
      </div>
      <p class="msg" id="backupMsg" aria-live="polite"></p>
      <button class="btn danger" id="reset">Reset all progress</button>
    </details>`;

  view.querySelector('#go').onclick = startToday;
  const starGo = () => start({ title: 'Test review problems', keys: [...starred(), ...starred()].map((it) => it.key), chapters, again: starGo, onFinish: () => markDone('star') });
  view.querySelector('#star').onclick = starGo;
  const weakBtn = view.querySelector('#weak');
  if (weakBtn) weakBtn.onclick = () => start({ title: 'Worth another look', keys: weakSpots(chapters).slice(0, 12).map((it) => it.key), chapters });
  view.querySelector('#testDate').onchange = (e) => { state.settings.testDate = e.target.value; save(); home(); };
  view.querySelector('#g').onchange = (e) => { state.settings.g = Number(e.target.value); save(); };
  view.querySelector('#backup').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([exportData()], { type: 'application/json' }));
    a.download = `addie-physics-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  view.querySelector('#restore').onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      if (!confirm('Replace the progress on this device with the backup?')) return;
      importData(text);
      location.reload();
    } catch {
      view.querySelector('#backupMsg').textContent = 'That file is not a backup from this app.';
    }
  };
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
    <header class="hero"><h1>Practice test</h1><p>Set out like the professor's tests: multiple choice first, then written problems. No hints and no feedback until the end. Your formula sheet is allowed.</p></header>
    <form class="card form" id="tf">
      <fieldset><legend>Chapters</legend>${chips('ch', activeChapters())}</fieldset>
      <fieldset><legend>Length</legend>
        <div class="chips">
          <label class="pick"><input type="radio" name="size" value="10,1"><span>Quick <small>10 questions + 1 problem</small></span></label>
          <label class="pick"><input type="radio" name="size" value="20,3"><span>Half <small>20 questions + 3 problems</small></span></label>
          <label class="pick"><input type="radio" name="size" value="40,3" checked><span>Full <small>40 questions + 3 problems</small></span></label>
        </div>
      </fieldset>
      <p class="quiet">Scored like Test 1: the multiple choice is worth 40 points and the written problems 60.</p>
      <p class="msg" aria-live="polite"></p>
      <button class="btn primary big">Start test</button>
    </form>
    ${past.length ? `<h2 class="section">Recent results</h2><section class="card"><table class="bych">${past.map((t) => `<tr><th>${t.day === today() ? 'Today' : `${today() - t.day} day${today() - t.day === 1 ? '' : 's'} ago`}</th><td>${t.n} items</td><td><strong>${t.pct}%</strong></td></tr>`).join('')}</table></section>` : ''}`;
  const form = view.querySelector('#tf');
  form.onsubmit = (e) => {
    e.preventDefault();
    const chs = checked(form, 'ch');
    if (!chs.length) { form.querySelector('.msg').textContent = 'Pick at least one chapter.'; return; }
    const [mc, problems] = form.size.value.split(',').map(Number);
    start({ title: 'Practice test', mode: 'test', keys: buildTest({ chapters: chs, mc, problems }), chapters: chs });
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
