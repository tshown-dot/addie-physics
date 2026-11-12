// Checks every piece of content: answers, worked steps, typical-mistake values,
// formula links, and that all the maths notation renders. Run: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { CHAPTERS, FORMULAS, ITEMS } from '../js/content/index.js';
import { close, finalize, parseNum } from '../js/util.js';

const katex = createRequire(import.meta.url)('../vendor/katex/katex.min.js');

function seeded(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
}
function checkTex(str, where) {
  const parts = String(str).split('$');
  assert.equal(parts.length % 2, 1, `unbalanced $ in ${where}: ${str}`);
  for (let i = 1; i < parts.length; i += 2) {
    try { katex.renderToString(parts[i], { throwOnError: true }); } catch (e) { assert.fail(`bad LaTeX in ${where}: ${parts[i]} (${e.message})`); }
  }
}
const rawTex = (latex, where) => {
  try { katex.renderToString(latex, { throwOnError: true }); } catch (e) { assert.fail(`bad LaTeX in ${where}: ${latex} (${e.message})`); }
};

test('ids are unique', () => {
  const ids = Object.keys(ITEMS);
  const total = CHAPTERS.reduce((n, c) => n + c.questions.length + c.scenarios.length + c.problems.length, 0);
  assert.equal(ids.length, total);
  const fids = CHAPTERS.flatMap((c) => c.formulas.map((f) => f.id));
  assert.equal(new Set(fids).size, fids.length);
});

test('questions are well formed', () => {
  for (const c of CHAPTERS) for (const q of c.questions) {
    assert.equal(q.o.length, 4, q.id);
    assert.ok(q.a >= 0 && q.a < 4, q.id);
    assert.equal(new Set(q.o).size, 4, `duplicate options in ${q.id}`);
    assert.ok(q.why, q.id);
    [q.q, q.why, q.trap || '', ...q.o].forEach((s) => checkTex(s, q.id));
  }
});

test('scenarios point at real formulas', () => {
  for (const c of CHAPTERS) for (const s of c.scenarios) {
    assert.ok(FORMULAS[s.f], `${s.id} -> ${s.f}`);
    [s.q, s.why].forEach((x) => checkTex(x, s.id));
  }
});

test('formulas, ideas, facts and traps render', () => {
  for (const c of CHAPTERS) {
    for (const f of c.formulas) {
      rawTex(f.latex, f.id);
      assert.ok(f.forms.length >= 1, f.id);
      f.forms.forEach((x) => rawTex(x.latex, f.id));
      checkTex(f.plain, f.id);
    }
    c.ideas.forEach((i) => checkTex(i.b, `ch${c.id} idea ${i.t}`));
    c.facts.forEach((x) => checkTex(x, `ch${c.id} fact`));
    c.traps.forEach((t) => [t.t, t.wrong, t.right, t.hook].forEach((x) => checkTex(x, `ch${c.id} trap`)));
  }
});

test('problem generators are correct for many random draws', () => {
  for (const c of CHAPTERS) for (const p of c.problems) {
    const f = FORMULAS[p.f];
    assert.ok(f, `${p.id} -> ${p.f}`);
    if (p.form) assert.ok(f.forms.some((x) => x.for === p.form), `${p.id}: no form ${p.form} in ${p.f}`);
    for (const g of [9.8, 10]) for (let seed = 1; seed <= 150; seed++) {
      const x = finalize(p.make(seeded(seed), { g }));
      const where = `${p.id} seed ${seed} g ${g}`;
      assert.ok(Number.isFinite(x.answer), where);
      assert.ok(x.steps.length >= 1, where);
      assert.ok(close(x.steps.at(-1).v, x.answer), `${where}: last step ${x.steps.at(-1).v} != answer ${x.answer}`);
      for (const s of x.steps) { assert.ok(Number.isFinite(s.v), where); rawTex(s.work, where); checkTex(s.say, where); }
      for (const m of x.mistakes) { assert.ok(!close(m.v, x.answer), where); checkTex(m.msg, where); }
      checkTex(x.prompt, where);
      x.givens.forEach((gv) => { rawTex(gv.s, where); rawTex(gv.v, where); });
      assert.equal(typeof x.unit, 'string', where);
    }
  }
});

test('answer parsing', () => {
  assert.equal(parseNum('450'), 450);
  assert.equal(parseNum(' 4.9 '), 4.9);
  assert.equal(parseNum('-2'), -2);
  assert.equal(parseNum('+2'), 2);
  assert.ok(close(parseNum('1/9'), 0.1111));
  assert.ok(close(parseNum('6.67e-9'), 6.67e-9));
  assert.ok(close(parseNum('6.67x10^-9'), 6.67e-9));
  assert.ok(close(parseNum('6.67 × 10^-9'), 6.67e-9));
  assert.ok(Number.isNaN(parseNum('abc')));
  assert.ok(close(44, 44.1) && !close(40, 44.1));
});
