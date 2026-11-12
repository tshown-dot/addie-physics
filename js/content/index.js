import ch9 from './ch9.js';
import ch10 from './ch10.js';
import ch11 from './ch11.js';
import ch12 from './ch12.js';
import { EXTRA, NEW_QUESTIONS } from './extra.js';

// Every chapter, in order.
export const CHAPTERS = [ch9, ch10, ch11, ch12];
// Layer the wrong-choice notes, reworded versions and diagrams onto the questions.
for (const ch of CHAPTERS) {
  ch.questions.push(...(NEW_QUESTIONS[ch.id] || []));
  for (const q of ch.questions) Object.assign(q, EXTRA[q.id] || {});
}
export const EXTRA_IDS = Object.keys(EXTRA);

export const TEST_CHAPTERS = CHAPTERS.map((c) => c.id);

// Flat lookup tables. Item keys look like "q:q9-1", "s:s9-1", "p:p9-farther".
export const FORMULAS = {};
export const ITEMS = {};
for (const ch of CHAPTERS) {
  for (const f of ch.formulas) FORMULAS[f.id] = { ...f, ch: ch.id };
  for (const q of ch.questions) ITEMS[`q:${q.id}`] = { kind: 'q', ch: ch.id, key: `q:${q.id}`, data: q };
  for (const s of ch.scenarios) ITEMS[`s:${s.id}`] = { kind: 's', ch: ch.id, key: `s:${s.id}`, data: s };
  for (const p of ch.problems) ITEMS[`p:${p.id}`] = { kind: 'p', ch: ch.id, key: `p:${p.id}`, data: p };
}
export const chapter = (id) => CHAPTERS.find((c) => c.id === Number(id));
