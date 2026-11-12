// Small diagrams, drawn as inline SVG so they follow the light/dark theme.
const svg = (h, body, label) => `<svg viewBox="0 0 320 ${h}" role="img" aria-label="${label}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const text = (x, y, s, extra = '') => `<text x="${x}" y="${y}" fill="currentColor" stroke="none" font-size="14" font-weight="600" text-anchor="middle" ${extra}>${s}</text>`;
const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="var(--brand)" stroke="none"/>`;
const body = (x, y, r, color) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="none"/>`;
const EARTH = '#3b82f6', SUN = '#f59e0b', MOON = '#9ca3af';

const tides = (moonX, moonY, label) => svg(170, `
  ${body(40, 85, 26, SUN)}${text(40, 135, 'Sun')}
  ${body(190, 85, 20, EARTH)}${text(190, 135, 'Earth')}
  ${body(moonX, moonY, 9, MOON)}${text(moonX + (moonY < 60 ? 34 : 0), moonY < 60 ? moonY + 5 : 135, 'Moon')}
  <path d="M70 85 H160" stroke-dasharray="4 6" opacity=".5"/>`, label);

const cube = (x, y, s) => {
  const k = s * 0.4;
  return `<path d="M${x} ${y} h${s} v${s} h${-s} z M${x} ${y} l${k} ${-k} h${s} l${-k} ${k} M${x + s} ${y + s} l${k} ${-k} v${-s}"/>`;
};

export const FIGS = {
  orbit: svg(190, `
    <ellipse cx="160" cy="95" rx="130" ry="72"/>
    ${body(52, 95, 15, EARTH)}${text(96, 100, 'Earth')}
    ${dot(30, 95)}${text(14, 100, 'P')}
    ${dot(160, 23)}${text(160, 14, 'Q')}
    ${dot(290, 95)}${text(306, 100, 'R')}
    ${dot(160, 167)}${text(160, 186, 'S')}`, 'A satellite in an elliptical orbit around Earth. Earth is near the left end. Point P is closest to Earth, R is farthest, Q is at the top and S at the bottom.'),

  launch: svg(215, `
    <path d="M10 200 H310"/>
    <path d="M20 200 Q145 128 270 200" stroke="var(--brand)"/>
    <path d="M20 200 Q164.5 56 309 200" stroke="var(--good)"/>
    <path d="M20 200 Q145 -16 270 200" stroke="var(--bad)"/>
    ${text(145, 182, '30°')}${text(190, 122, '45°')}${text(145, 82, '60°')}`, 'Three paths of a ball thrown at the same speed at 30, 45 and 60 degrees. The 30 and 60 degree paths land at the same spot. The 45 degree path lands farthest.'),

  drop: svg(200, `
    <path d="M10 40 H70 V190 M10 190 H310"/>
    ${dot(80, 34)}${dot(96, 34)}
    <path d="M80 34 V184" stroke-dasharray="4 6"/>
    <path d="M96 34 Q200 34 270 184" stroke-dasharray="4 6"/>
    <path d="M110 34 h26 m-7 -5 l7 5 l-7 5" stroke="var(--brand)"/>
    ${text(52, 28, 'dropped')}${text(190, 28, 'fired level')}`, 'Two balls leave the edge of a cliff at the same moment. One is dropped straight down and one is fired horizontally.'),

  beamEnds: svg(150, `
    <path d="M30 60 Q160 96 290 60 M30 76 Q160 112 290 76 M30 60 V76 M290 60 V76"/>
    <path d="M40 78 l-14 26 h28 z M280 78 l-14 26 h28 z"/>
    <rect x="140" y="42" width="40" height="30" fill="var(--brand)" stroke="none"/>
    ${text(160, 30, 'load')}${text(160, 132, 'supported at both ends')}`, 'A beam supported at both ends sags under a load in the middle.'),

  beamWall: svg(150, `
    <rect x="20" y="20" width="24" height="110" fill="currentColor" stroke="none" opacity=".35"/>
    <path d="M44 56 Q170 58 290 92 M44 72 Q170 74 286 108 M290 92 L286 108"/>
    <rect x="252" y="54" width="34" height="28" fill="var(--brand)" stroke="none"/>
    ${text(270, 44, 'load')}${text(170, 136, 'fixed to a wall at one end')}`, 'A beam fixed to a wall at one end droops under a load at its free end.'),

  tidesLine: tides(240, 85, 'The Sun, Earth and Moon are lined up in a straight line.'),
  tidesAngle: tides(190, 30, 'The Moon is at a right angle to the line from the Sun to Earth.'),

  radii: svg(150, `
    ${body(70, 75, 50, EARTH)}
    <path d="M70 75 H270" stroke-dasharray="4 6"/>
    <path d="M70 68 v14 M120 68 v14 M170 68 v14"/>
    ${text(95, 62, 'R', 'fill="#fff"')}${text(145, 62, 'R')}
    <path d="M170 75 l14 -9 v18 z" fill="var(--bad)" stroke="none"/>
    ${text(196, 58, 'rocket')}${text(70, 142, 'Earth')}`, 'A rocket is one Earth radius above the surface, which is two Earth radii from the centre of Earth.'),

  cubes: svg(170, `
    ${cube(40, 110, 40)}${cube(150, 70, 80)}
    <path d="M190 70 v80 M150 110 h80 M190 70 l32 -32 M230 110 l32 -32" opacity=".5"/>
    ${text(60, 168, '1 cm')}${text(190, 168, '2 cm')}`, 'A small cube 1 centimetre on each edge beside a larger cube 2 centimetres on each edge.'),

  atom: svg(190, `
    <circle cx="205" cy="95" r="42" opacity=".5"/><circle cx="205" cy="95" r="78" opacity=".5"/>
    ${[[220, 95], [197.5, 82], [197.5, 108]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.5" fill="var(--bad)" stroke="none"/>${text(x, y + 5, '+', 'fill="#fff"')}`).join('')}
    ${[[205, 95], [212.5, 82], [190, 95], [212.5, 108]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.5" fill="var(--card)"/>`).join('')}
    ${[[205, 53], [205, 137], [283, 95]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="var(--brand)" stroke="none"/>${text(x, y + 5, '−', 'fill="#fff"')}`).join('')}
    ${text(48, 30, '+ proton')}${text(50, 50, '○ neutron')}${text(52, 70, '− electron')}`, 'An atom with 3 protons and 4 neutrons in its nucleus and 3 electrons around it.'),
};
