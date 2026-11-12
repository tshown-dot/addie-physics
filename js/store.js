// Saved progress and the review schedule. Everything lives in the browser's
// localStorage on the device Addie studies on.
import { ITEMS, TEST_CHAPTERS, CHAPTERS } from './content/index.js';
import { shuffle } from './util.js';

const KEY = 'addie_physics_v2';
const INTERVALS = [0, 1, 2, 4, 7, 14]; // days until an item comes back, by box
const CRAM_INTERVALS = [0, 0, 1, 1, 2, 3]; // the same, in the last week before the test

function load() {
  const base = { items: {}, settings: { testDate: '', g: 9.8 }, days: {}, tests: [] };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { ...base, ...saved, settings: { ...base.settings, ...(saved.settings || {}) } };
  } catch {
    return base;
  }
}

export const state = load();
export const save = () => localStorage.setItem(KEY, JSON.stringify(state));
export function reset() {
  state.items = {}; state.days = {}; state.tests = [];
  save();
}

export const dayNumber = (d = new Date()) => Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
export const today = () => dayNumber();

export const activeChapters = () => TEST_CHAPTERS.slice();

const blank = () => ({ box: 0, due: 0, seen: 0, right: 0, wrong: 0, level: 1, up: -1 });
export const rec = (key) => state.items[key] || blank();

export function daysToTest() {
  if (!state.settings.testDate) return null;
  const [y, m, d] = state.settings.testDate.split('-').map(Number);
  return dayNumber(new Date(y, m - 1, d)) - today();
}

// Test week: the last 7 days before the test. Reviews come back faster.
export function testWeek() {
  const d = daysToTest();
  return d !== null && d >= 0 && d <= 7;
}

// Record a first attempt. "clean" means right first time without being shown
// the answer. usedLevel is the amount of help a math problem was done with.
export function record(key, clean, usedLevel) {
  const r = (state.items[key] = state.items[key] || blank());
  const isProblem = key.startsWith('p:');
  const t = today();
  const cram = testWeek();
  r.seen++;
  r.ok = clean;
  r.lv = usedLevel || r.level;
  if (r.up !== t) r.upN = 0;
  if (clean) {
    r.right++;
    if (isProblem) r.level = Math.min(3, r.level + 1);
    // Spacing matters, so an item normally moves up once a day (twice in test week).
    if ((r.upN || 0) < (cram ? 2 : 1)) { r.box = Math.min(5, r.box + 1); r.up = t; r.upN = (r.upN || 0) + 1; }
  } else {
    r.wrong++;
    if (isProblem) r.level = Math.max(1, r.level - 1);
    r.box = Math.max(0, r.box - (isProblem ? 1 : 2));
  }
  r.due = t + (clean ? (cram ? CRAM_INTERVALS : INTERVALS)[r.box] : 0);
  const d = (state.days[t] = state.days[t] || { n: 0, right: 0 });
  d.n++;
  if (clean) d.right++;
  save();
  return r;
}

// Note that part of today's plan is finished: 'session', 'star' or 'test'.
export function markDone(what) {
  const t = today();
  const d = (state.days[t] = state.days[t] || { n: 0, right: 0 });
  d.did = { ...(d.did || {}), [what]: true };
  save();
}
export const didToday = () => (state.days[today()] || {}).did || {};

// Test readiness for one item, from the most recent attempt: 1 if she got it
// right first time (for math: on her own), partial credit for math done with help.
export function mastery(key) {
  const r = state.items[key];
  if (!r || !r.ok) return 0;
  return key.startsWith('p:') ? [0, 0.3, 0.6, 1][r.lv || 1] : 1;
}

export const itemsIn = (chapters, kinds = ['q', 's', 'p']) =>
  Object.values(ITEMS).filter((it) => chapters.includes(it.ch) && kinds.includes(it.kind));

export function chapterMastery(ch) {
  const items = itemsIn([ch]);
  if (!items.length) return 0;
  return items.reduce((sum, it) => sum + mastery(it.key), 0) / items.length;
}

export function dueCount(chapters) {
  const t = today();
  return itemsIn(chapters).filter((it) => state.items[it.key] && state.items[it.key].due <= t).length;
}

export function weakSpots(chapters) {
  return itemsIn(chapters)
    .filter((it) => { const r = state.items[it.key]; return r && r.seen && (r.wrong > r.right || (r.box === 0 && r.wrong > 0)); })
    .sort((a, b) => (rec(b.key).wrong - rec(b.key).right) - (rec(a.key).wrong - rec(a.key).right));
}

// Choose items for a study session: recent misses first, then things due for
// review (weakest first), then things never seen, then everything else.
export function buildSession({ chapters, kinds = ['q', 's', 'p'], n = 12 }) {
  const t = today();
  const cram = testWeek();
  const rank = (it) => {
    const r = state.items[it.key];
    if (!r) return (cram ? 3 : it.data.star ? 50 : 100) + Math.random(); // in test week, cover everything
    if (!r.ok) return Math.random();
    if (r.due <= t) return 1 + r.box + Math.random();
    return 200 + r.due + Math.random();
  };
  const share = { q: 0.55, s: 0.15, p: 0.3 };
  const total = kinds.reduce((s, k) => s + share[k], 0);
  const chosen = [];
  const rest = [];
  for (const k of kinds) {
    const sorted = itemsIn(chapters, [k]).sort((a, b) => rank(a) - rank(b));
    const want = Math.round((n * share[k]) / total);
    chosen.push(...sorted.slice(0, want));
    rest.push(...sorted.slice(want));
  }
  rest.sort((a, b) => rank(a) - rank(b));
  while (chosen.length < n && rest.length) chosen.push(rest.shift());
  return shuffle(chosen.slice(0, n)).map((it) => it.key);
}

// A practice test in the professor's format: multiple choice first, then the
// written problems. The problems are drawn from the test-review types first,
// one per formula, then from the other problem types.
export function buildTest({ chapters, mc = 40, problems = 3 }) {
  const q = shuffle(itemsIn(chapters, ['q'])).slice(0, mc);
  const all = shuffle(itemsIn(chapters, ['p']));
  const picked = [];
  for (const it of all.filter((x) => x.data.star)) {
    if (picked.length < problems && !picked.some((x) => x.data.f === it.data.f)) picked.push(it);
  }
  for (const it of all) if (picked.length < problems && !picked.includes(it)) picked.push(it);
  return [...q, ...shuffle(picked)].map((it) => it.key);
}

export function dayStreak() {
  let t = today();
  if (!state.days[t]) t--; // today not started yet does not break the streak
  let n = 0;
  while (state.days[t]) { n++; t--; }
  return n;
}

// Backup and restore, so progress can be moved to another device.
export const exportData = () => JSON.stringify({ app: 'addie-physics', version: 2, saved: new Date().toISOString(), state });
export function importData(text) {
  const data = JSON.parse(text);
  if (data.app !== 'addie-physics' || !data.state || typeof data.state.items !== 'object') throw new Error('not a backup file');
  localStorage.setItem(KEY, JSON.stringify(data.state));
}

export const starred = () => Object.values(ITEMS).filter((it) => it.data.star);

export const chapterName = (id) => { const c = CHAPTERS.find((x) => x.id === id); return c ? `Ch ${c.id}` : ''; };
