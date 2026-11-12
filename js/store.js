// Saved progress and the review schedule. Everything lives in the browser's
// localStorage on the device Addie studies on.
import { ITEMS, TEST_CHAPTERS, CHAPTERS } from './content/index.js';
import { shuffle } from './util.js';

const KEY = 'addie_physics_v2';
const INTERVALS = [0, 1, 2, 4, 7, 14]; // days until an item comes back, by box

function load() {
  const base = { items: {}, settings: { testDate: '', g: 9.8, extra: [] }, days: {}, tests: [] };
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

export function activeChapters() {
  return [...TEST_CHAPTERS, ...state.settings.extra].sort((a, b) => a - b);
}

const blank = () => ({ box: 0, due: 0, seen: 0, right: 0, wrong: 0, level: 1, up: -1 });
export const rec = (key) => state.items[key] || blank();

// Record a first attempt. "clean" means right first time without being shown the answer.
export function record(key, clean) {
  const r = (state.items[key] = state.items[key] || blank());
  const isProblem = key.startsWith('p:');
  const t = today();
  r.seen++;
  if (clean) {
    r.right++;
    if (isProblem) r.level = Math.min(3, r.level + 1);
    if (r.up !== t) { r.box = Math.min(5, r.box + 1); r.up = t; } // one promotion a day: spacing matters
  } else {
    r.wrong++;
    if (isProblem) r.level = Math.max(1, r.level - 1);
    r.box = Math.max(0, r.box - (isProblem ? 1 : 2));
  }
  r.due = t + (clean ? INTERVALS[r.box] : 0);
  const d = (state.days[t] = state.days[t] || { n: 0, right: 0 });
  d.n++;
  if (clean) d.right++;
  save();
  return r;
}

export function mastery(key) {
  const r = state.items[key];
  if (!r) return 0;
  const boxPart = Math.min(r.box, 3) / 3;
  return key.startsWith('p:') ? 0.5 * ((r.level - 1) / 2) + 0.5 * boxPart : boxPart;
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

// Choose items for a study session: things due for review first (weakest first),
// then things never seen, then everything else.
export function buildSession({ chapters, kinds = ['q', 's', 'p'], n = 12 }) {
  const t = today();
  const rank = (it) => {
    const r = state.items[it.key];
    if (!r) return 100 + Math.random();
    if (r.due <= t) return r.box + Math.random();
    return 200 + r.due + Math.random();
  };
  const share = { q: 0.5, s: 0.2, p: 0.3 };
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

// A practice test: a fresh random mix, not driven by the review schedule.
export function buildTest({ chapters, n = 20 }) {
  const take = (kind, count) => shuffle(itemsIn(chapters, [kind])).slice(0, count);
  const p = take('p', Math.round(n * 0.25));
  const s = take('s', Math.round(n * 0.15));
  const q = take('q', n - p.length - s.length);
  return shuffle([...q, ...s, ...p]).map((it) => it.key);
}

export function dayStreak() {
  let t = today();
  if (!state.days[t]) t--; // today not started yet does not break the streak
  let n = 0;
  while (state.days[t]) { n++; t--; }
  return n;
}

export function daysToTest() {
  if (!state.settings.testDate) return null;
  const [y, m, d] = state.settings.testDate.split('-').map(Number);
  return dayNumber(new Date(y, m - 1, d)) - today();
}

export const chapterName = (id) => { const c = CHAPTERS.find((x) => x.id === id); return c ? `Ch ${c.id}` : ''; };
