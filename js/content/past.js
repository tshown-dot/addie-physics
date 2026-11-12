// Chapters 5-8 (Test 2). Questions, formulas and traps come from the original
// app's data; the scenarios and problem generators are rewritten for the new engine.
import { T, pick, fmt } from '../util.js';
import { FORMULAS, TRAPS, CONCEPT_QUESTIONS } from './legacy-data.js';

const TITLES = { 5: "Newton's Third Law", 6: 'Momentum', 7: 'Energy', 8: 'Rotational Motion' };
const ICONS = { 5: '🤝', 6: '🎱', 7: '⚡', 8: '🎡' };
const TRAP_CH = { 'trap-gravity': 6, 'trap-third-law': 5, 'trap-speed-squared': 7, 'trap-bouncing': 6, 'trap-centrifugal': 8 };

const EXTRA_FORMULAS = [
  {
    id: 'power', ch: 7, name: 'Power', latex: T`P = \dfrac{W}{t}`,
    plain: 'Power is how fast work gets done. Work in joules divided by time in seconds gives watts.',
    triggers: ['power', 'watts', 'how fast work is done', 'in ... seconds'],
    forms: [
      { for: 'P', label: 'power', latex: T`P = \dfrac{W}{t}`, tip: 'Work divided by time.' },
      { for: 'W', label: 'work', latex: T`W = P \cdot t`, tip: 'Power times time.' },
    ],
  },
  {
    id: 'efficiency', ch: 7, name: 'Efficiency', latex: T`\text{efficiency} = \dfrac{\text{useful work out}}{\text{total energy in}}`,
    plain: 'What fraction of the energy you put in comes out as useful work. Multiply by 100 for a percent.',
    triggers: ['efficiency', 'useful work output', 'energy input', 'percent'],
    forms: [{ for: 'e', label: 'efficiency', latex: T`\text{efficiency} = \dfrac{\text{work out}}{\text{energy in}} \times 100\%`, tip: 'Out divided by in, times 100.' }],
  },
  {
    id: 'machine', ch: 7, name: 'Simple machines: work in = work out', latex: T`(F \cdot d)_{\text{in}} = (F \cdot d)_{\text{out}}`,
    plain: 'A lever or pulley trades force for distance. Small force over a long distance in, big force over a short distance out.',
    triggers: ['lever', 'pulley', 'jack', 'input force', 'how high is the load lifted'],
    forms: [{ for: 'd', label: 'output distance', latex: T`d_{\text{out}} = \dfrac{F_{\text{in}} \cdot d_{\text{in}}}{F_{\text{out}}}`, tip: 'Work in, divided by the output force.' }],
  },
];

const SCENARIOS = [
  { id: 's7-1', ch: 7, q: 'A 4 kg box slides across a table at 15 m/s. You need its energy of motion.', clues: ['mass', 'speed', 'energy of motion'], f: 'kinetic-energy', why: 'Mass and speed, asked for energy of motion: kinetic energy.' },
  { id: 's6-1', ch: 6, q: 'An airbag spreads a collision over a longer time to reduce the force on the passenger.', clues: ['airbag', 'longer time', 'reduce the force'], f: 'impulse-momentum', why: 'Cushioning, airbags, follow-through, force over time: impulse and momentum.' },
  { id: 's8-1', ch: 8, q: 'A space habitat of radius 600 m rotates with a rim speed of 40 m/s. What is the inward acceleration at the rim?', clues: ['radius', 'rim speed', 'inward acceleration'], f: 'centripetal-acceleration', why: 'Acceleration while moving in a circle is centripetal acceleration.' },
  { id: 's6-2', ch: 6, q: 'A 3 kg cart rolling at 8 m/s hits a resting 5 kg cart and they stick together. How fast do they move afterwards?', clues: ['stick together', 'two masses'], f: 'inelastic-collision', why: '"Stick together" means an inelastic collision: momentum before equals momentum after.' },
  { id: 's8-2', ch: 8, q: 'A mechanic slides a long pipe over a wrench to loosen a rusted nut more easily.', clues: ['wrench', 'longer handle', 'turning'], f: 'torque', why: 'Twisting around a pivot with a lever arm is torque.' },
  { id: 's6-3', ch: 6, q: 'A 1200 kg car slows from 25 m/s to 8 m/s. What is its change in momentum?', clues: ['mass', 'two speeds', 'change in momentum'], f: 'impulse-momentum', why: 'Change in momentum is mass times (final speed − initial speed). It is horizontal, so no g.' },
  { id: 's7-2', ch: 7, q: 'A 1000 kg car speeds up from 10 m/s to 30 m/s. How much work did the engine do?', clues: ['work done', 'change in speed'], f: 'work-energy', why: 'Work equals the change in kinetic energy.' },
  { id: 's7-3', ch: 7, q: 'A motor does 2000 J of work in 4 seconds. How powerful is it?', clues: ['work', 'in 4 seconds'], f: 'power', why: 'Work divided by time is power.' },
  { id: 's7-4', ch: 7, q: 'A machine takes in 100 J of energy and does 40 J of useful work. How good is it at converting energy?', clues: ['energy in', 'useful work out'], f: 'efficiency', why: 'Useful work out divided by energy in is efficiency.' },
  { id: 's7-5', ch: 7, q: 'You push down 1 m on a lever with 25 N to lift a 100 N rock. How high does the rock rise?', clues: ['lever', 'input force and distance', 'how high'], f: 'machine', why: 'For a simple machine, work in equals work out.' },
];

const PROBLEMS = [
  {
    id: 'p7-ke', ch: 7, title: 'Kinetic energy', f: 'kinetic-energy', form: 'KE',
    make(r) {
      const m = pick(r, [2, 3, 4, 5, 6, 8, 10]), v = pick(r, [10, 12, 14, 15, 18, 20]);
      const ans = 0.5 * m * v * v;
      return {
        prompt: T`A box with a mass of **${m} kg** slides across a smooth floor at **${v} m/s**. What is its kinetic energy?`,
        givens: [{ s: 'm', v: T`${m}\text{ kg}` }, { s: 'v', v: T`${v}\text{ m/s}` }],
        steps: [
          { say: 'Square the speed first.', work: T`${v}^2 = ${v * v}`, v: v * v },
          { say: 'Multiply by the mass.', work: T`${m} \times ${v * v} = ${m * v * v}`, v: m * v * v },
          { say: 'Take half.', work: T`\dfrac{${m * v * v}}{2} = ${ans}\text{ J}`, v: ans },
        ],
        answer: ans, unit: 'J',
        mistakes: [
          { v: 0.5 * m * v, msg: 'You forgot to square the speed.' },
          { v: m * v * v, msg: T`You forgot the $\frac{1}{2}$. Halve it.` },
          { v: (0.5 * m * v) ** 2, msg: 'Square ONLY the speed, and do it first.' },
        ],
      };
    },
  },
  {
    id: 'p7-speed', ch: 7, title: 'Speed from kinetic energy', f: 'kinetic-energy', form: 'v',
    make(r) {
      const m = pick(r, [2, 4, 5, 8, 10]), v = pick(r, [4, 5, 6, 8, 10, 12]);
      const ke = 0.5 * m * v * v;
      return {
        prompt: T`A **${m} kg** object has **${ke} J** of kinetic energy. How fast is it moving?`,
        givens: [{ s: 'KE', v: T`${ke}\text{ J}` }, { s: 'm', v: T`${m}\text{ kg}` }],
        steps: [
          { say: 'Double the kinetic energy.', work: T`2 \times ${ke} = ${2 * ke}`, v: 2 * ke },
          { say: 'Divide by the mass.', work: T`\dfrac{${2 * ke}}{${m}} = ${v * v}`, v: v * v },
          { say: 'Take the square root.', work: T`\sqrt{${v * v}} = ${v}\text{ m/s}`, v },
        ],
        answer: v, unit: 'm/s',
        mistakes: [
          { v: v * v, msg: 'Nearly. Take the square root.' },
          { v: Math.sqrt(ke / m), msg: 'Double the KE before dividing by the mass.' },
          { v: ke / m, msg: 'Double the KE, divide by mass, then square root.' },
        ],
      };
    },
  },
  {
    id: 'p8-ac', ch: 8, title: 'Centripetal acceleration', f: 'centripetal-acceleration', form: 'a_c',
    make(r) {
      const v = pick(r, [10, 20, 30, 40]), rad = pick(r, [50, 100, 200, 400, 600]);
      const ans = (v * v) / rad;
      return {
        prompt: T`A space habitat with a radius of **${rad} m** spins so that its rim moves at **${v} m/s**. What is the centripetal acceleration at the rim?`,
        givens: [{ s: 'v', v: T`${v}\text{ m/s}` }, { s: 'r', v: T`${rad}\text{ m}` }],
        steps: [
          { say: 'Square the speed.', work: T`${v}^2 = ${v * v}`, v: v * v },
          { say: 'Divide by the radius.', work: T`\dfrac{${v * v}}{${rad}} = ${fmt(Math.round(ans * 100) / 100)}\text{ m/s}^2`, v: ans },
        ],
        answer: ans, unit: 'm/s²',
        mistakes: [
          { v: v / rad, msg: 'You forgot to square the speed.' },
          { v: (rad * rad) / v, msg: 'Speed squared goes on top, radius on the bottom.' },
        ],
      };
    },
  },
  {
    id: 'p6-dp', ch: 6, title: 'Change in momentum', f: 'impulse-momentum',
    make(r) {
      const m = pick(r, [800, 1000, 1200, 1500]), v1 = pick(r, [15, 20, 25, 30]), v2 = pick(r, [5, 8, 10]);
      const ans = m * (v2 - v1);
      return {
        prompt: T`A **${m} kg** car slows down from **${v1} m/s** to **${v2} m/s**. What is its change in momentum? (Include the minus sign.)`,
        givens: [{ s: 'm', v: T`${m}\text{ kg}` }, { s: 'v_1', v: T`${v1}\text{ m/s}` }, { s: 'v_2', v: T`${v2}\text{ m/s}` }],
        steps: [
          { say: 'Final speed minus starting speed.', work: T`${v2} - ${v1} = ${v2 - v1}`, v: v2 - v1 },
          { say: 'Multiply by the mass.', work: T`${m} \times (${v2 - v1}) = ${ans}\text{ kg}{\cdot}\text{m/s}`, v: ans },
        ],
        answer: ans, unit: 'kg·m/s',
        mistakes: [
          { v: -ans, msg: 'Right size. It is slowing down, so the change is negative: final minus initial.' },
          { v: m * (v2 + v1), msg: 'Subtract the speeds. Do not add.' },
          { v: m * (v2 - v1) * 9.8, msg: 'No g here. The car is moving horizontally.' },
        ],
      };
    },
  },
  {
    id: 'p6-stick', ch: 6, title: 'Collide and stick', f: 'inelastic-collision',
    make(r) {
      const m2 = pick(r, [1, 2, 3, 5]), k = pick(r, [1, 2, 3]), m1 = m2 * k, vf = pick(r, [1, 2, 3, 4]);
      const v1 = (vf * (m1 + m2)) / m1;
      return {
        prompt: T`A **${m1} kg** cart moving at **${fmt(v1)} m/s** hits a **${m2} kg** cart at rest. They stick together. How fast do they move afterwards?`,
        givens: [{ s: 'm_1', v: T`${m1}\text{ kg}` }, { s: 'v_1', v: T`${fmt(v1)}\text{ m/s}` }, { s: 'm_2', v: T`${m2}\text{ kg}` }, { s: 'v_2', v: '0' }],
        steps: [
          { say: 'Momentum before: mass times speed of the moving cart.', work: T`${m1} \times ${fmt(v1)} = ${fmt(m1 * v1)}`, v: m1 * v1 },
          { say: 'Add the two masses.', work: T`${m1} + ${m2} = ${m1 + m2}`, v: m1 + m2 },
          { say: 'Divide the momentum by the combined mass.', work: T`\dfrac{${fmt(m1 * v1)}}{${m1 + m2}} = ${vf}\text{ m/s}`, v: vf },
        ],
        answer: vf, unit: 'm/s',
        mistakes: [
          { v: v1, msg: 'The speed drops because the same momentum is now shared by more mass.' },
          { v: (m1 * v1) / m2, msg: 'Divide by the COMBINED mass, not just the second cart.' },
          { v: m1 * v1, msg: 'That is the momentum. Divide by the combined mass to get the speed.' },
        ],
      };
    },
  },
  {
    id: 'p7-power', ch: 7, title: 'Work and power', f: 'power', form: 'P',
    make(r) {
      const m = pick(r, [50, 100, 200]), h = pick(r, [2, 3, 4, 5]), t = pick(r, [2, 4, 5, 10]);
      const W = m * 10 * h;
      return {
        prompt: T`A motor lifts a **${m} kg** load **${h} m** straight up in **${t} s**. What power does it deliver? Use $g = 10\text{ m/s}^2$.`,
        givens: [{ s: 'm', v: T`${m}\text{ kg}` }, { s: 'h', v: T`${h}\text{ m}` }, { s: 't', v: T`${t}\text{ s}` }],
        steps: [
          { say: 'Find the work done: mass × g × height.', work: T`${m} \times 10 \times ${h} = ${W}\text{ J}`, v: W },
          { say: 'Power is work divided by time.', work: T`\dfrac{${W}}{${t}} = ${W / t}\text{ W}`, v: W / t },
        ],
        answer: W / t, unit: 'W',
        mistakes: [
          { v: W, msg: 'That is the work in joules. Divide by the time to get power.' },
          { v: W * t, msg: 'Divide by time. Do not multiply.' },
          { v: (m * h) / t, msg: 'You left out g when finding the work.' },
        ],
      };
    },
  },
  {
    id: 'p7-eff', ch: 7, title: 'Efficiency', f: 'efficiency',
    make(r) {
      const inp = pick(r, [100, 200, 400, 500]), pct = pick(r, [20, 25, 40, 50, 80]);
      const out = (inp * pct) / 100;
      return {
        prompt: T`A machine takes in **${inp} J** of energy and does **${out} J** of useful work. What is its efficiency, as a percent?`,
        givens: [{ s: T`\text{out}`, v: T`${out}\text{ J}` }, { s: T`\text{in}`, v: T`${inp}\text{ J}` }],
        steps: [
          { say: 'Divide useful work out by energy in.', work: T`\dfrac{${out}}{${inp}} = ${pct / 100}`, v: pct / 100 },
          { say: 'Multiply by 100 to make it a percent.', work: T`${pct / 100} \times 100 = ${pct}\%`, v: pct },
        ],
        answer: pct, unit: '%',
        mistakes: [
          { v: pct / 100, msg: 'Right, as a decimal. Multiply by 100 for the percent.' },
          { v: (inp / out) * 100, msg: 'Upside down. Output goes on top.' },
        ],
      };
    },
  },
  {
    id: 'p7-lever', ch: 7, title: 'Work in = work out', f: 'machine',
    make(r) {
      const Fin = pick(r, [20, 25, 50]), din = pick(r, [1, 2]), Fout = pick(r, [100, 200, 500]);
      const ans = (Fin * din) / Fout;
      return {
        prompt: T`You push down on a lever with **${Fin} N** through a distance of **${din} m**. The other end lifts a **${Fout} N** load. How high is the load lifted, in metres?`,
        givens: [{ s: T`F_{\text{in}}`, v: T`${Fin}\text{ N}` }, { s: T`d_{\text{in}}`, v: T`${din}\text{ m}` }, { s: T`F_{\text{out}}`, v: T`${Fout}\text{ N}` }],
        steps: [
          { say: 'Work in: input force times input distance.', work: T`${Fin} \times ${din} = ${Fin * din}\text{ J}`, v: Fin * din },
          { say: 'Work out is the same. Divide by the load to get the height.', work: T`\dfrac{${Fin * din}}{${Fout}} = ${fmt(ans)}\text{ m}`, v: ans },
        ],
        answer: ans, unit: 'm',
        mistakes: [
          { v: Fout / (Fin * din), msg: 'Upside down. Work in goes on top, the load goes on the bottom.' },
          { v: ans * 100, msg: 'That is the answer in centimetres. The question asks for metres.' },
        ],
      };
    },
  },
];

function convertFormula(f) {
  return {
    id: f.id,
    ch: parseInt(f.topic.match(/Chapter (\d+)/)[1], 10),
    name: f.name.replace(/\s*\(.*\)$/, ''),
    latex: f.latex,
    plain: f.plainEnglish,
    triggers: f.triggerKeywords,
    forms: f.algebraLifeline.map((a) => ({
      for: a.find.split(/\s|\\text/)[0],
      label: (a.find.match(/\((.+?)\)/) || [, a.find])[1].toLowerCase(),
      latex: a.formulaLatex,
      tip: a.tip,
    })),
  };
}

const formulas = [...FORMULAS.map(convertFormula), ...EXTRA_FORMULAS];

export default [5, 6, 7, 8].map((id) => ({
  id,
  title: TITLES[id],
  icon: ICONS[id],
  past: true,
  ideas: [],
  facts: [],
  traps: TRAPS.filter((t) => TRAP_CH[t.id] === id).map((t) => ({
    t: t.title.replace(/^🚨\s*/, ''), wrong: t.description, right: t.rule, hook: t.mnemonic,
  })),
  formulas: formulas.filter((f) => f.ch === id),
  scenarios: SCENARIOS.filter((s) => s.ch === id),
  questions: CONCEPT_QUESTIONS.filter((q) => q.chapter === id).map((q) => ({
    id: `q${q.id}`, q: q.question, o: q.options, a: q.correct, why: q.plainEnglish, trap: q.trapTip,
  })),
  problems: PROBLEMS.filter((p) => p.ch === id),
}));
