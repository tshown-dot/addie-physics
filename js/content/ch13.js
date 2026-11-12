import { T, pick, fmt } from '../util.js';

export default {
  id: 13,
  title: 'Liquids',
  icon: '💧',
  optional: true,

  ideas: [
    { t: 'Pressure', b: T`Pressure is force spread over an area: $P = \frac{F}{A}$, measured in $\text{N/m}^2$, also called pascals (Pa). The same weight on a smaller area gives more pressure, which is why a sharp knife cuts better.` },
    { t: 'Liquid pressure', b: T`Pressure in a liquid depends only on **depth** and the liquid's **density**: liquid pressure = weight density × depth. It does not depend on the amount of water. 2 m down in a pond is the same pressure as 2 m down in a huge lake.` },
    { t: 'Buoyancy', b: T`Pressure is greater at the bottom of a submerged object than at the top, so the liquid pushes it **upward**. **Archimedes' principle:** the buoyant force equals the **weight of the fluid displaced**: $F_b = \rho\, g\, V$.` },
    { t: 'Sink or float', b: T`Denser than the liquid: sinks. Less dense: floats. Same density: stays put. A **floating** object displaces a weight of fluid equal to **its own weight**.` },
    { t: "Pascal's principle", b: T`Pressure applied to an enclosed fluid is passed on unchanged to every part of the fluid. That is how a hydraulic lift turns a small force into a big one.` },
  ],

  facts: [
    T`$P = \dfrac{F}{A}$ in $\text{N/m}^2 = \text{Pa}$`,
    T`Liquid pressure = weight density × depth`,
    T`Buoyant force = weight of fluid displaced: $F_b = \rho\, g\, V$`,
    T`Floating: buoyant force = the object's weight`,
    T`Weight density of water is about $10{,}000\text{ N/m}^3$`,
  ],

  traps: [
    { t: 'More water, more pressure', wrong: 'The bottom of a big lake has more pressure than the same depth in a small pool.', right: 'Only depth (and density) matter. Same depth, same pressure.', hook: 'Depth, not amount.' },
    { t: 'Buoyant force equals the object’s weight', wrong: 'The buoyant force on any object equals its weight.', right: 'It equals the weight of the FLUID DISPLACED. That matches the object’s weight only when it floats.', hook: 'Buoyancy is about the water pushed aside.' },
    { t: 'Heavy things sink', wrong: 'Heavy objects sink and light ones float.', right: 'Density decides, not weight. A huge steel ship floats and a tiny pebble sinks.', hook: 'Compare densities.' },
  ],

  formulas: [
    {
      id: 'pressure', name: 'Pressure', latex: T`P = \dfrac{F}{A}`,
      plain: 'Force divided by the area it presses on.',
      triggers: ['pressure', 'force on an area', 'N/m²', 'pascals'],
      forms: [
        { for: 'P', label: 'pressure', latex: T`P = \dfrac{F}{A}`, tip: 'Force divided by area.' },
        { for: 'F', label: 'force', latex: T`F = P \cdot A`, tip: 'Pressure times area.' },
        { for: 'A', label: 'area', latex: T`A = \dfrac{F}{P}`, tip: 'Force divided by pressure.' },
      ],
    },
    {
      id: 'liquid-pressure', name: 'Liquid pressure', latex: T`P = \text{weight density} \times \text{depth}`,
      plain: 'Pressure under water depends only on how deep you are.',
      triggers: ['depth', 'under water', 'bottom of the tank', 'water tower'],
      forms: [{ for: 'P', label: 'pressure', latex: T`P = \text{weight density} \times \text{depth}`, tip: 'For water use 10,000 N/m³ times the depth in metres.' }],
    },
    {
      id: 'buoyancy', name: 'Buoyant force', latex: T`F_b = \rho\, g\, V`,
      plain: 'The upward push equals the weight of the fluid the object pushes aside.',
      triggers: ['buoyant force', 'submerged', 'displaces', 'floats'],
      forms: [{ for: 'F', label: 'buoyant force', latex: T`F_b = \rho \cdot g \cdot V`, tip: 'Fluid density times g times the volume under water.' }],
    },
  ],

  scenarios: [
    { id: 's13-1', q: 'A 100 N block rests on a contact area of 0.25 m². How hard does it press on each square metre?', clues: ['force', 'contact area', 'per square metre'], f: 'pressure', why: 'Force spread over an area is pressure: P = F ÷ A.' },
    { id: 's13-2', q: 'What is the water pressure at the bottom of a 50 m tall water tower?', clues: ['water', '50 m tall', 'at the bottom'], f: 'liquid-pressure', why: 'Pressure from a depth of liquid is weight density times depth.' },
    { id: 's13-3', q: 'A rock with a volume of 0.002 m³ is completely under water. How big is the upward push of the water on it?', clues: ['volume', 'under water', 'upward push'], f: 'buoyancy', why: 'The upward push is the buoyant force: the weight of the water displaced.' },
  ],

  questions: [
    { id: 'q13-1', q: 'Pressure is', o: ['force times area', 'force divided by area', 'mass divided by volume', 'weight times depth'], a: 1, why: T`$P = \frac{F}{A}$, in newtons per square metre (pascals).` },
    { id: 'q13-2', q: 'You stand on one foot instead of two. Your weight and the pressure on the floor are', o: ['both the same', 'same weight, more pressure', 'more weight, same pressure', 'both greater'], a: 1, why: 'Your weight has not changed, but it is spread over half the area, so the pressure doubles.' },
    { id: 'q13-3', q: 'Water pressure 2 m below the surface of a small pond, compared with 2 m below the surface of a huge lake, is', o: ['less', 'the same', 'greater', 'zero'], a: 1, why: 'Liquid pressure depends on depth and density only, not on how much water there is.' },
    { id: 'q13-4', q: 'Water pressure on a submerged object is greatest against its', o: ['top', 'sides', 'bottom', 'same on all surfaces'], a: 2, why: 'The bottom is deeper, and pressure grows with depth. That difference is what creates the buoyant force.' },
    { id: 'q13-5', q: 'The buoyant force on a submerged object equals the', o: ['weight of the object', 'weight of the fluid it displaces', 'volume of the object', 'density of the object'], a: 1, why: 'Archimedes’ principle: an immersed body is buoyed up by a force equal to the weight of the fluid it displaces.' },
    { id: 'q13-6', q: 'The buoyant force on a 10-ton ship floating in the ocean is', o: ['less than 10 tons', '10 tons', 'more than 10 tons', 'zero'], a: 1, why: 'It floats at rest, so the upward buoyant force exactly balances its weight.' },
    { id: 'q13-7', q: 'An object that is denser than water will', o: ['float', 'sink', 'hover at any depth', 'dissolve'], a: 1, why: 'Denser than the fluid: sinks. Less dense: floats. Same density: stays wherever you put it.' },
    { id: 'q13-8', q: 'Pascal’s principle says that pressure applied to an enclosed fluid is', o: ['absorbed by the fluid', 'transmitted undiminished throughout the fluid', 'greatest at the top', 'turned into heat'], a: 1, why: 'The extra pressure shows up everywhere in the fluid. Hydraulic lifts and brakes depend on it.' },
    { id: 'q13-9', q: 'As a rock sinks deeper and deeper in a lake, the buoyant force on it', o: ['increases', 'decreases', 'stays the same', 'drops to zero'], a: 2, why: 'A rock does not get squashed, so it displaces the same volume of water at any depth.' },
    { id: 'q13-10', q: 'A 1 kg block of aluminum and a 1 kg block of lead are both lowered into water. Which pushes aside more water?', o: ['The aluminum', 'The lead', 'The same', 'Neither displaces any'], a: 0, why: 'Same mass, but aluminum is less dense, so it has the bigger volume and displaces more water.' },
  ],

  problems: [
    {
      id: 'p13-pressure', title: 'Pressure from force and area', f: 'pressure', form: 'P',
      make(r) {
        const A = pick(r, [0.25, 0.5, 2, 4, 5]);
        const P = pick(r, [100, 200, 400, 1000]);
        const F = P * A;
        return {
          prompt: T`A crate weighing **${F} N** rests on a contact area of **${A} m²**. What pressure does it put on the floor?`,
          givens: [{ s: 'F', v: T`${F}\text{ N}` }, { s: 'A', v: T`${A}\text{ m}^2` }],
          steps: [{ say: 'Divide the force by the area.', work: T`P = \dfrac{${F}}{${A}} = ${P}\text{ N/m}^2`, v: P }],
          answer: P, unit: 'N/m²',
          mistakes: [{ v: F * A, msg: 'Divide force by area. Do not multiply.' }, { v: A / F, msg: 'Upside down. Force goes on top.' }],
        };
      },
    },
    {
      id: 'p13-depth', title: 'Water pressure at depth', f: 'liquid-pressure',
      make(r) {
        const h = pick(r, [1, 2, 5, 6, 20, 50, 200]);
        const ans = 10000 * h;
        return {
          prompt: T`What is the water pressure **${h} m** below the surface? Use a weight density of $10{,}000\text{ N/m}^3$ for water and ignore the atmosphere.`,
          givens: [{ s: T`\text{weight density}`, v: T`10{,}000\text{ N/m}^3` }, { s: T`\text{depth}`, v: T`${h}\text{ m}` }],
          steps: [{ say: 'Multiply the weight density by the depth.', work: T`10{,}000 \times ${h} = ${ans}\text{ N/m}^2`, v: ans }],
          answer: ans, unit: 'N/m²',
          mistakes: [{ v: 10000 / h, msg: 'Deeper means more pressure. Multiply by the depth.' }, { v: 1000 * h, msg: 'Use the WEIGHT density (10,000 N/m³), not the mass density (1000 kg/m³).' }],
        };
      },
    },
    {
      id: 'p13-buoyant', title: 'Buoyant force', f: 'buoyancy',
      make(r, ctx) {
        const V = pick(r, [0.001, 0.002, 0.005, 0.01, 0.5]);
        const ans = 1000 * ctx.g * V;
        return {
          prompt: T`A rock with a volume of **${V} m³** is completely under water. What is the buoyant force on it? The density of water is $1000\text{ kg/m}^3$. Use $g = ${ctx.g}\text{ m/s}^2$.`,
          givens: [{ s: T`\rho`, v: T`1000\text{ kg/m}^3` }, { s: 'g', v: T`${ctx.g}` }, { s: 'V', v: T`${V}\text{ m}^3` }],
          steps: [
            { say: 'Multiply the density of water by g.', work: T`1000 \times ${ctx.g} = ${fmt(1000 * ctx.g)}`, v: 1000 * ctx.g },
            { say: 'Multiply by the volume.', work: T`${fmt(1000 * ctx.g)} \times ${V} = ${fmt(ans)}\text{ N}`, v: ans },
          ],
          answer: ans, unit: 'N',
          mistakes: [{ v: 1000 * V, msg: 'That is the MASS of water displaced. Multiply by g to get its weight.' }],
        };
      },
    },
  ],
};
