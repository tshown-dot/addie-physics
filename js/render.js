// Turning content strings into HTML. Inline maths is written $like this$ and
// **bold** is supported; everything else passes through as-is.
export function tex(latex, display = false) {
  return window.katex.renderToString(latex, { displayMode: display, throwOnError: false });
}

export function md(s) {
  return String(s)
    .split('$')
    .map((part, i) => (i % 2 ? tex(part) : part.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')))
    .join('');
}

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
