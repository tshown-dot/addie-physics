// Small helpers shared by content and the app. No DOM access here so the
// content files can be loaded and tested in Node.

export const T = String.raw;

export const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

export function shuffle(arr, r = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Scientific notation as LaTeX, e.g. 6.67 \times 10^{-9}
export function sci(x) {
  if (x === 0) return '0';
  let e = Math.floor(Math.log10(Math.abs(x)));
  let m = Math.round((x / 10 ** e) * 100) / 100;
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  return `${m} \\times 10^{${e}}`;
}

// A tidy number for display inside LaTeX.
export function fmt(x) {
  if (!Number.isFinite(x)) return String(x);
  const a = Math.abs(x);
  if (a !== 0 && (a < 0.001 || a >= 1e7)) return sci(x);
  return String(Math.round(x * 1000) / 1000);
}

// Reads what a student might type: 450, 4.9, -2, +2, 1/9, 6.67e-9, 6.67x10^-9
export function parseNum(input) {
  const s = String(input).trim().toLowerCase()
    .replace(/[,\s]/g, '').replace(/−/g, '-').replace(/[×*]/g, 'x');
  let m;
  if ((m = s.match(/^([+-]?\d*\.?\d+)x10\^?\(?([+-]?\d+)\)?$/))) return parseFloat(m[1]) * 10 ** parseInt(m[2], 10);
  if ((m = s.match(/^([+-]?\d*\.?\d+)\/(\d*\.?\d+)$/))) return parseFloat(m[1]) / parseFloat(m[2]);
  if (/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/.test(s)) return parseFloat(s);
  return NaN;
}

// Is a typed answer close enough? Allows 2% for rounding.
export function close(a, b) {
  const d = Math.abs(a - b);
  const slack = b === 0 || Math.abs(b) > 0.01 ? 0.005 : 0;
  return d <= Math.abs(b) * 0.02 + slack;
}

// Finish a generated problem: drop "typical mistake" values that happen to
// equal the right answer for these particular numbers, and duplicates.
export function finalize(p) {
  const seen = [];
  p.mistakes = (p.mistakes || []).filter((m) => {
    if (!Number.isFinite(m.v) || close(m.v, p.answer) || close(p.answer, m.v)) return false;
    if (seen.some((v) => close(m.v, v))) return false;
    seen.push(m.v);
    return true;
  });
  return p;
}
