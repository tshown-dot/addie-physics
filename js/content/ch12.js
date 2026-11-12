import { T, pick, fmt } from '../util.js';

const r2 = (x) => Math.round(x * 100) / 100;
// [name, density in g/cm^3]
const MAT = [['aluminum', 2.7], ['iron', 7.9], ['lead', 11.3], ['gold', 19.3], ['copper', 8.9], ['silver', 10.5], ['ice', 0.9], ['water', 1]];
const VOLS = [2, 5, 10, 20, 50, 100];

export default {
  id: 12,
  title: 'Solids',
  icon: '🧱',

  ideas: [
    { t: 'Crystals', b: T`In most solids the atoms sit in a regular repeating pattern called a **crystal**. **X-ray diffraction patterns** are the evidence. Solids with no regular pattern are **amorphous**. Atoms are held together by electrical bonds: ionic, covalent, metallic and **Van der Waals (the weakest)**.` },
    { t: 'Density', b: T`Density is how much mass is packed into each unit of volume: $\rho = \frac{m}{V}$. It is a property of the **material**, not of how much you have. A gold ring and a gold bar have the same density. Water is $1\text{ g/cm}^3 = 1000\text{ kg/m}^3$. **Weight density** is weight per volume, which is density times 9.8.` },
    { t: 'Elasticity and Hooke’s law', b: T`Elastic means it **returns to its original shape**. Steel is more elastic than rubber. Clay and dough are inelastic. **Hooke's law:** stretch is proportional to force, $F = k\,\Delta x$. Double the load, double the stretch (up to the elastic limit). Every spring has its own spring constant $k$.` },
    { t: 'Tension and compression', b: T`Pulled = **tension**. Squashed = **compression**. A beam held at both ends with a load in the middle sags: its **top is compressed** and its **bottom is stretched**. A beam sticking out from a wall is the opposite. The middle layer feels almost nothing, which is why **I-beams** leave most of the middle out: strong but light.` },
    { t: 'Arches and domes', b: T`Stone is strong in **compression**, and an arch puts every stone in compression. An arch holding only its own weight has the shape of a **catenary**, the upside-down curve of a hanging chain (the St. Louis arch). Spin an arch around and you get a **dome**.` },
    { t: 'Scaling', b: T`Make something $k$ times bigger in every direction: **area and strength** go up by $k^2$, but **volume and weight** go up by $k^3$. Weight outruns strength, so big things need thicker legs. **Surface area per volume gets smaller as size grows.** Small things have lots of surface for their size, so crushed ice melts faster and small animals lose heat faster.` },
    { t: 'From your notes', b: T`**Young's double-slit experiment** showed that light behaves like a wave. It later became a cornerstone of quantum mechanics.` },
  ],

  facts: [
    T`$\rho = \dfrac{m}{V}$ $\qquad m = \rho V \qquad V = \dfrac{m}{\rho}$`,
    T`Water: $1000\text{ kg/m}^3 = 1\text{ g/cm}^3$`,
    T`Weight density = $9.8 \times$ density, in $\text{N/m}^3$`,
    T`Density does not depend on how much material you have`,
    T`Steel is more elastic than rubber`,
    T`Hooke: $F = k\,\Delta x$. Only the STRETCH scales with the load`,
    T`Loaded beam held at both ends: top compression, bottom tension`,
    T`Size $\times k$: area and strength $\times k^2$, volume and weight $\times k^3$`,
    T`Van der Waals bonds are the weakest`,
  ],

  traps: [
    { t: 'Rubber is stretchier, so more elastic', wrong: 'Rubber is more elastic than steel.', right: 'Elastic means returning to the original shape. Steel does that better than rubber.', hook: 'Elastic = springs back, not stretches far.' },
    { t: 'More material, more density', wrong: 'A big gold bar is denser than a gold ring.', right: 'Density belongs to the material. Cut it in half and each half has the same density.', hook: 'Density is mass PER volume.' },
    { t: 'Scaling the whole spring', wrong: 'A 10 cm spring that reaches 12 cm with 1 kg will be 36 cm with 3 kg.', right: 'Only the stretch triples. Stretch is 2 cm, so 3 kg gives 6 cm of stretch: 10 + 6 = 16 cm.', hook: 'Find the stretch, scale the stretch, add the original length back.' },
    { t: 'Twice as big, twice as heavy', wrong: 'A statue twice as tall weighs twice as much.', right: T`Weight follows volume: $2^3 = 8$ times as heavy. Its strength only goes up $2^2 = 4$ times.`, hook: 'Area squares. Volume cubes.' },
    { t: 'Dividing the wrong way round', wrong: 'Volume = density ÷ mass.', right: T`Volume = mass ÷ density. Check the units: $\text{g} \div \text{g/cm}^3 = \text{cm}^3$.`, hook: 'Mass goes on top.' },
  ],

  formulas: [
    {
      id: 'density', name: 'Density', latex: T`\rho = \dfrac{m}{V}`,
      plain: 'On the test review. Asked for density: m ÷ V. Asked for volume: m ÷ ρ. Asked for mass: ρ × V.',
      triggers: ['density', 'mass and volume', 'what is the volume', 'g/cm³', 'kg/m³'],
      forms: [
        { for: 'rho', label: 'density', latex: T`\rho = \dfrac{m}{V}`, tip: 'Mass divided by volume.' },
        { for: 'm', label: 'mass', latex: T`m = \rho \cdot V`, tip: 'Density times volume.' },
        { for: 'V', label: 'volume', latex: T`V = \dfrac{m}{\rho}`, tip: 'Mass divided by density.' },
      ],
    },
    {
      id: 'weight-density', name: 'Weight density', latex: T`\text{weight density} = \dfrac{\text{weight}}{\text{volume}} = g \times \rho`,
      plain: 'Weight (not mass) per unit of volume, in N/m³.',
      triggers: ['weight density', 'N/m³', 'weight of a cubic metre'],
      forms: [
        { for: 'wd', label: 'weight density', latex: T`\text{weight density} = g \times \rho`, tip: 'Multiply the density by g.' },
      ],
    },
    {
      id: 'hooke', name: "Hooke's law", latex: T`F = k\,\Delta x`,
      plain: 'A spring stretches in proportion to the force on it. Twice the load, twice the stretch.',
      triggers: ['spring', 'stretches', 'load suspended', 'spring constant', 'extension'],
      forms: [
        { for: 'F', label: 'force', latex: T`F = k \cdot \Delta x`, tip: 'Spring constant times stretch.' },
        { for: 'k', label: 'spring constant', latex: T`k = \dfrac{F}{\Delta x}`, tip: 'Force divided by stretch.' },
        { for: 'x', label: 'stretch', latex: T`\Delta x = \dfrac{F}{k}`, tip: 'Force divided by spring constant.' },
      ],
    },
    {
      id: 'scaling', name: 'Scaling rule', latex: T`\text{area} \sim k^2 \qquad \text{volume} \sim k^3`,
      plain: 'Make every dimension k times bigger. Area and strength go up by k squared. Volume, mass and weight go up by k cubed.',
      triggers: ['scaled up', 'twice as tall, wide and deep', 'how much heavier', 'surface area', 'twice the diameter'],
      forms: [
        { for: 'A', label: 'area or strength', latex: T`\text{new area} = \text{old area} \times k^2`, tip: 'Square the scale factor.' },
        { for: 'V', label: 'volume or weight', latex: T`\text{new volume} = \text{old volume} \times k^3`, tip: 'Cube the scale factor.' },
      ],
    },
  ],

  scenarios: [
    { id: 's12-1', q: 'A block of metal has a mass of 540 g and a volume of 200 cm³. Which metal could it be?', clues: ['mass', 'volume', 'which material'], f: 'density', why: 'Mass and volume together give density, and density identifies the material.' },
    { id: 's12-2', q: 'A spring stretches 4 cm when a 2 kg load hangs from it. How far does it stretch with a 6 kg load?', clues: ['spring', 'stretches', 'load'], f: 'hooke', why: 'Stretch is proportional to the load. That is Hooke’s law.' },
    { id: 's12-3', q: 'A sculpture is rebuilt 3 times as tall, 3 times as wide and 3 times as deep. How many times heavier is it?', clues: ['3 times in every direction', 'how many times heavier'], f: 'scaling', why: 'Weight follows volume, which grows with the cube of the scale factor: 27 times.' },
    { id: 's12-4', q: 'Water has a density of 1000 kg/m³. How much does each cubic metre of it weigh, in newtons?', clues: ['density', 'weigh', 'per cubic metre'], f: 'weight-density', why: 'Weight per volume is weight density: g times the density.' },
    { id: 's12-5', q: 'A gold nugget has a mass of 193 g. Gold’s density is 19.3 g/cm³. What is the nugget’s volume?', clues: ['mass', 'density', 'what is the volume'], f: 'density', why: 'The density formula rearranged for volume: V = m ÷ ρ. Your notes flag this one for the test.' },
    { id: 's12-6', q: 'A 30 N weight stretches a spring by 6 cm. What is the spring constant?', clues: ['spring', 'force and stretch', 'spring constant'], f: 'hooke', why: 'F = kΔx rearranged: k = F ÷ Δx.' },
    { id: 's12-7', q: 'A cube is scaled up to twice the size. How does the area of each face change?', clues: ['twice the size', 'area'], f: 'scaling', why: 'Area grows with the square of the scale factor: 4 times.' },
  ],

  questions: [
    { id: 'q12-1', q: 'In a crystal, the atoms are', o: ['arranged at random', 'arranged in a regular repeating pattern', 'not bonded to each other', 'always moving freely past each other'], a: 1, why: 'A crystal is a regular array of atoms. Solids without that order are called amorphous.' },
    { id: 'q12-2', q: 'What is the evidence that a solid is crystalline?', o: ['It is shiny', 'It is heavy', 'It produces an X-ray diffraction pattern', 'It melts when heated'], a: 2, why: 'X-rays passing through a regular array of atoms make a clear pattern. That pattern reveals the crystal structure.' },
    { id: 'q12-3', q: 'A solid whose atoms are NOT in a regular array is called', o: ['crystalline', 'amorphous', 'elastic', 'metallic'], a: 1, why: 'Amorphous means "without form". Glass is a common example.' },
    { id: 'q12-4', q: 'Which type of bond between atoms is the weakest?', o: ['Ionic', 'Covalent', 'Metallic', 'Van der Waals'], a: 3, why: 'Of the four kinds on the lecture slide, Van der Waals bonds are the weakest.' },
    { id: 'q12-5', q: 'Density is', o: ['weight times volume', 'mass per unit volume', 'volume per unit mass', 'mass times volume'], a: 1, why: T`$\rho = \frac{m}{V}$: how much mass is packed into each unit of volume.` },
    { id: 'q12-6', q: 'The density of water is', o: ['1 kg/m³', '100 kg/m³', '1000 kg/m³', '9.8 kg/m³'], a: 2, why: T`$1000\text{ kg/m}^3$, which is the same as $1\text{ g/cm}^3$.` },
    { id: 'q12-7', q: 'A gold bar is cut exactly in half. The density of each half is', o: ['half the original', 'the same as the original', 'twice the original', 'a quarter of the original'], a: 1, why: 'Each half has half the mass AND half the volume, so mass ÷ volume is unchanged. Density is a property of the material.' },
    { id: 'q12-8', q: 'If the mass of an object doubled while its volume stayed the same, its density would', o: ['halve', 'stay the same', 'double', 'be four times as great'], a: 2, why: T`$\rho = \frac{m}{V}$. Double the top and the answer doubles.` },
    { id: 'q12-9', q: 'If the volume of an object doubled while its mass stayed the same, its density would', o: ['halve', 'stay the same', 'double', 'be four times as great'], a: 0, why: T`$\rho = \frac{m}{V}$. Double the bottom and the answer halves. The same stuff is spread through more space.` },
    { id: 'q12-10', q: 'The density of a material depends on', o: ['only how much of it you have', 'the mass of its atoms and how closely they are spaced', 'its shape', 'its colour'], a: 1, why: 'Heavy atoms packed closely make a dense material.' },
    { id: 'q12-11', q: 'Weight density is', o: ['mass divided by volume', 'weight divided by volume', 'weight times volume', 'mass times g'], a: 1, why: T`Weight per unit volume, in $\text{N/m}^3$. It equals $9.8 \times$ the (mass) density.` },
    { id: 'q12-12', q: 'Which is more elastic?', o: ['Steel', 'Rubber', 'They are equally elastic', 'Clay'], a: 0, why: 'Elasticity is about returning to the original shape when the force is removed. Steel does that better than rubber.', trap: 'This exact question is on the lecture slides.' },
    { id: 'q12-13', q: 'A material is INELASTIC if it', o: ['stretches a long way', 'does not return to its original shape', 'is very hard', 'is a metal'], a: 1, why: 'Clay, putty and dough stay deformed. They are inelastic.' },
    { id: 'q12-14', q: 'Hooke’s law says the stretch of a spring is', o: ['proportional to the force applied', 'proportional to the square of the force', 'the same for any force', 'inversely proportional to the force'], a: 0, why: T`$F = k\,\Delta x$. Double the force, double the stretch (as long as you stay within the elastic limit).` },
    { id: 'q12-15', q: 'A 10 cm spring stretches to 12 cm when a 1 kg load hangs from it. How long is it with a 3 kg load?', o: ['14 cm', '16 cm', '20 cm', '36 cm'], a: 1, why: 'Stretch with 1 kg is 2 cm. Three times the load gives 3 × 2 = 6 cm of stretch. Length = 10 + 6 = 16 cm.', trap: 'Only the stretch triples, not the whole length.' },
    { id: 'q12-16', q: 'A beam is supported at both ends and a heavy load sits in the middle. The TOP of the beam is under', o: ['tension', 'compression', 'neither', 'both equally'], a: 1, why: 'The beam sags in the middle. The top edge gets squeezed shorter (compression) and the bottom edge gets stretched (tension).' },
    { id: 'q12-17', q: 'A diving board is fixed to the wall at one end and you stand on the free end. The TOP of the board is under', o: ['tension', 'compression', 'neither', 'both equally'], a: 0, why: 'The free end droops, so the top surface is stretched (tension) and the bottom is squeezed (compression).' },
    { id: 'q12-18', q: 'Steel beams are made in an I shape because', o: ['it looks better', 'the middle of a beam carries little stress, so removing material there saves weight without losing much strength', 'the middle carries all the stress', 'it makes the beam more elastic'], a: 1, why: 'The top and bottom flanges carry the tension and compression. The middle (neutral layer) is hardly stressed.' },
    { id: 'q12-19', q: 'Stone arches are strong because stone', o: ['withstands compression well', 'withstands tension well', 'is elastic', 'is light'], a: 0, why: 'In an arch every stone is squeezed, and stone is very strong when squeezed.' },
    { id: 'q12-20', q: 'A catenary is', o: ['a kind of crystal', 'the curve of a chain hanging between two points', 'a type of chemical bond', 'the middle layer of a beam'], a: 1, why: 'Flip that hanging-chain curve upside down and you get the strongest shape for an arch that holds only its own weight, like the St. Louis arch.' },
    { id: 'q12-21', q: 'A chair is scaled up to 3 times its size in every dimension. Its weight is', o: ['3 times as much', '6 times as much', '9 times as much', '27 times as much'], a: 3, why: T`Weight follows volume, and volume grows with the cube: $3^3 = 27$.`, trap: '9 is the area. Weight goes with volume.' },
    { id: 'q12-22', q: 'A solid glass ball weighs 1 N. A solid glass ball with twice the diameter weighs', o: ['2 N', '4 N', '6 N', '8 N'], a: 3, why: T`Twice the size in every direction means $2^3 = 8$ times the volume and weight.` },
    { id: 'q12-23', q: 'When an object is scaled up, its strength grows with its cross-sectional area and its weight grows with its volume. So a scaled-up object is', o: ['stronger for its weight', 'weaker for its weight', 'exactly as strong for its weight', 'weightless'], a: 1, why: T`Strength goes up by $k^2$ but weight by $k^3$. Weight wins, which is why elephants need thick legs.` },
    { id: 'q12-24', q: 'As an object gets bigger, its ratio of surface area to volume', o: ['increases', 'decreases', 'stays the same', 'becomes zero'], a: 1, why: T`$\frac{\text{area}}{\text{volume}} \sim \frac{k^2}{k^3} = \frac{1}{k}$. Bigger size, smaller ratio.` },
    { id: 'q12-25', q: 'Crushed ice melts faster than a single block of the same mass because the crushed ice has', o: ['more mass', 'more surface area', 'a higher density', 'a lower temperature'], a: 1, why: 'Many small pieces have far more surface for the same volume, so heat gets in faster.' },
    { id: 'q12-26', q: 'Which has more skin per kilogram of body weight?', o: ['An elephant', 'A mouse', 'They are the same', 'It depends on the season'], a: 1, why: 'Small things have a large surface area for their volume. That is why a mouse loses heat quickly and must eat a lot for its size.' },
    { id: 'q12-27', q: 'Young’s double-slit experiment showed that light', o: ['is made of atoms', 'behaves like a wave', 'has mass', 'cannot be bent'], a: 1, why: 'From your notes: it proved light behaves like a wave and later became a cornerstone of quantum mechanics.' },
    { id: 'q12-28', q: 'Which has more volume: 1 kg of gold or 1 kg of aluminum?', o: ['The gold', 'The aluminum', 'They are the same', 'It cannot be known'], a: 1, why: T`$V = \frac{m}{\rho}$. Same mass, but aluminum is far less dense, so it takes up more space.` },
  ],

  problems: [
    {
      id: 'p12-volume', title: 'Volume from mass and density', f: 'density', form: 'V',
      make(r) {
        const [name, d] = pick(r, MAT.slice(0, 6));
        const V = pick(r, VOLS);
        const m = r2(d * V);
        return {
          prompt: T`A piece of ${name} has a mass of **${m} g**. The density of ${name} is **${d} g/cm³**. What is its volume?`,
          givens: [{ s: 'm', v: T`${m}\text{ g}` }, { s: T`\rho`, v: T`${d}\text{ g/cm}^3` }],
          steps: [{ say: 'Volume is mass divided by density.', work: T`V = \dfrac{${m}}{${d}} = ${V}\text{ cm}^3`, v: V }],
          answer: V, unit: 'cm³',
          mistakes: [
            { v: m * d, msg: 'You multiplied. Volume = mass ÷ density.' },
            { v: d / m, msg: 'Upside down. Mass goes on top: V = m ÷ ρ.' },
          ],
        };
      },
    },
    {
      id: 'p12-review-volume', star: true, title: 'Find the volume (test review)', f: 'density', form: 'V',
      make(r) {
        const m = pick(r, [5, 6, 8, 9, 10, 12, 20]);
        const d = pick(r, [1.5, 2.5, 4, 4.5, 7.5, 8]);
        const V = m / d;
        return {
          prompt: T`A material has a density of **${d} kg/m³**. You have **${m} kg** of it. What is its volume? (Round to 2 decimal places.)`,
          givens: [{ s: 'm', v: T`${m}\text{ kg}` }, { s: T`\rho`, v: T`${d}\text{ kg/m}^3` }],
          steps: [{ say: 'Asked for volume: mass divided by density.', work: T`V = \dfrac{${m}}{${d}} = ${fmt(r2(V))}\text{ m}^3`, v: V }],
          answer: V, unit: 'm³',
          mistakes: [
            { v: m * d, msg: 'You multiplied. Volume = mass ÷ density.' },
            { v: d / m, msg: 'Upside down. Mass goes on top: V = m ÷ ρ.' },
          ],
        };
      },
    },
    {
      id: 'p12-review-density', star: true, title: 'Find the density (test review)', f: 'density', form: 'rho',
      make(r) {
        const m = pick(r, [5, 6, 9, 10, 12, 15, 20]);
        const V = pick(r, [2, 3, 4, 5, 8]);
        const d = m / V;
        return {
          prompt: T`An object has a mass of **${m} kg** and a volume of **${V} m³**. What is its density? (Round to 2 decimal places.)`,
          givens: [{ s: 'm', v: T`${m}\text{ kg}` }, { s: 'V', v: T`${V}\text{ m}^3` }],
          steps: [{ say: 'Density is mass divided by volume.', work: T`\rho = \dfrac{${m}}{${V}} = ${fmt(r2(d))}\text{ kg/m}^3`, v: d }],
          answer: d, unit: 'kg/m³',
          mistakes: [
            { v: V / m, msg: 'Upside down. Density = mass ÷ volume.' },
            { v: m * V, msg: 'Divide mass by volume. Do not multiply.' },
          ],
        };
      },
    },
    {
      id: 'p12-review-mass', star: true, title: 'Find the mass (test review)', f: 'density', form: 'm',
      make(r) {
        const d = pick(r, [1.5, 2.5, 4, 4.5, 7.5, 8]);
        const V = pick(r, [2, 3, 4, 5, 6, 10]);
        const m = d * V;
        return {
          prompt: T`A material has a density of **${d} kg/m³**. A sample of it has a volume of **${V} m³**. What is the mass of the sample?`,
          givens: [{ s: T`\rho`, v: T`${d}\text{ kg/m}^3` }, { s: 'V', v: T`${V}\text{ m}^3` }],
          steps: [{ say: 'Asked for mass: density times volume.', work: T`m = ${d} \times ${V} = ${fmt(m)}\text{ kg}`, v: m }],
          answer: m, unit: 'kg',
          mistakes: [
            { v: V / d, msg: 'You divided. Mass = density × volume.' },
            { v: d / V, msg: 'You divided. Mass = density × volume.' },
          ],
        };
      },
    },
    {
      id: 'p12-density', title: 'Density from mass and volume', f: 'density', form: 'rho',
      make(r) {
        const [name, d] = pick(r, MAT.slice(0, 6));
        const V = pick(r, VOLS);
        const m = r2(d * V);
        return {
          prompt: T`A metal block has a mass of **${m} g** and a volume of **${V} cm³**. What is its density? (It is ${name}.)`,
          givens: [{ s: 'm', v: T`${m}\text{ g}` }, { s: 'V', v: T`${V}\text{ cm}^3` }],
          steps: [{ say: 'Density is mass divided by volume.', work: T`\rho = \dfrac{${m}}{${V}} = ${d}\text{ g/cm}^3`, v: d }],
          answer: d, unit: 'g/cm³',
          mistakes: [
            { v: V / m, msg: 'Upside down. Density = mass ÷ volume.' },
            { v: m * V, msg: 'Divide mass by volume. Do not multiply.' },
          ],
        };
      },
    },
    {
      id: 'p12-mass', title: 'Mass from density and volume', f: 'density', form: 'm',
      make(r) {
        const [name, d] = pick(r, MAT);
        const side = pick(r, [0, 0, 2, 10]);
        const V = side ? side ** 3 : pick(r, VOLS);
        const m = r2(d * V);
        const steps = [];
        if (side) steps.push({ say: `First find the volume of the cube: ${side} × ${side} × ${side}.`, work: T`${side}^3 = ${V}\text{ cm}^3`, v: V });
        steps.push({ say: 'Mass is density times volume.', work: T`m = ${d} \times ${V} = ${fmt(m)}\text{ g}`, v: m });
        return {
          prompt: side
            ? T`A solid cube of ${name} is **${side} cm** on each side. The density of ${name} is **${d} g/cm³**. What is its mass?`
            : T`A piece of ${name} has a volume of **${V} cm³**. The density of ${name} is **${d} g/cm³**. What is its mass?`,
          givens: [{ s: T`\rho`, v: T`${d}\text{ g/cm}^3` }, side ? { s: T`\text{side}`, v: T`${side}\text{ cm}` } : { s: 'V', v: T`${V}\text{ cm}^3` }],
          steps, answer: m, unit: 'g',
          mistakes: [
            { v: V / d, msg: 'You divided. Mass = density × volume.' },
            { v: d * side, msg: 'You used the side length as the volume. Volume of a cube is side × side × side.' },
            { v: d * side * side, msg: 'Volume of a cube is side CUBED, not squared.' },
          ],
        };
      },
    },
    {
      id: 'p12-weight-density', title: 'Weight density', f: 'weight-density',
      make(r, ctx) {
        const [name, d] = pick(r, [['water', 1000], ['cork', 240], ['ice', 920], ['aluminum', 2700], ['seawater', 1025]]);
        const ans = d * ctx.g;
        return {
          prompt: T`The density of ${name} is **${d} kg/m³**. What is its weight density? Use $g = ${ctx.g}\text{ m/s}^2$.`,
          givens: [{ s: T`\rho`, v: T`${d}\text{ kg/m}^3` }, { s: 'g', v: T`${ctx.g}\text{ m/s}^2` }],
          steps: [{ say: 'Multiply the density by g.', work: T`${d} \times ${ctx.g} = ${fmt(ans)}\text{ N/m}^3`, v: ans }],
          answer: ans, unit: 'N/m³',
          mistakes: [{ v: d / ctx.g, msg: 'Multiply by g. Weight is mass times g, so weight density is density times g.' }],
        };
      },
    },
    {
      id: 'p12-spring-stretch', title: 'Spring: bigger load', f: 'hooke',
      make(r) {
        const x1 = pick(r, [2, 3, 4, 5, 6]);
        const L1 = pick(r, [1, 2, 10, 30]);
        const n = pick(r, [2, 3, 4, 5]);
        const unit = L1 >= 10 ? 'N' : 'kg';
        return {
          prompt: T`A spring stretches **${x1} cm** when a **${L1} ${unit}** load hangs from it. How far will it stretch with a **${L1 * n} ${unit}** load? (It stays within its elastic limit.)`,
          givens: [{ s: T`\Delta x_1`, v: T`${x1}\text{ cm}` }, { s: T`\text{load}`, v: T`${L1} \to ${L1 * n}` }],
          steps: [
            { say: 'How many times bigger is the new load? Divide new by old.', work: T`\dfrac{${L1 * n}}{${L1}} = ${n}`, v: n },
            { say: 'The stretch grows by the same factor. Multiply.', work: T`${x1} \times ${n} = ${x1 * n}\text{ cm}`, v: x1 * n },
          ],
          answer: x1 * n, unit: 'cm',
          mistakes: [
            { v: x1 + n, msg: 'Multiply the stretch by the load factor. Do not add.' },
            { v: x1 * L1 * n, msg: `Use the ratio of the loads (${n}), not the new load itself.` },
            { v: n, msg: 'That is the load factor. Multiply the old stretch by it.' },
          ],
        };
      },
    },
    {
      id: 'p12-spring-length', title: 'Spring: total length (slide example)', f: 'hooke',
      make(r) {
        const L0 = pick(r, [10, 20, 30, 50]);
        const dx = pick(r, [2, 3, 4, 5, 10]);
        const n = pick(r, [2, 3, 4]);
        const ans = L0 + n * dx;
        return {
          prompt: T`A spring is **${L0} cm** long. It stretches to **${L0 + dx} cm** when a 1 kg load hangs from it. How long is the spring with a **${n} kg** load?`,
          givens: [{ s: T`L_0`, v: T`${L0}\text{ cm}` }, { s: T`L_1`, v: T`${L0 + dx}\text{ cm}` }, { s: T`\text{load}`, v: T`\times ${n}` }],
          steps: [
            { say: 'Find the stretch with 1 kg: new length minus original length.', work: T`${L0 + dx} - ${L0} = ${dx}\text{ cm}`, v: dx },
            { say: `The load is ${n} times bigger, so the stretch is too. Multiply.`, work: T`${dx} \times ${n} = ${dx * n}\text{ cm}`, v: dx * n },
            { say: 'Add the stretch to the original length.', work: T`${L0} + ${dx * n} = ${ans}\text{ cm}`, v: ans },
          ],
          answer: ans, unit: 'cm',
          mistakes: [
            { v: (L0 + dx) * n, msg: 'You multiplied the whole length. Only the STRETCH grows with the load.' },
            { v: dx * n, msg: 'That is the stretch. Add the original length to get the total length.' },
            { v: L0 + dx + n, msg: `Multiply the stretch (${dx} cm) by ${n}, then add the original length.` },
          ],
        };
      },
    },
    {
      id: 'p12-spring-k', title: 'Spring constant', f: 'hooke', form: 'k',
      make(r) {
        const k = pick(r, [2, 5, 10, 20, 50]);
        const x = pick(r, [2, 3, 4, 5, 6]);
        const F = k * x;
        return {
          prompt: T`A force of **${F} N** stretches a spring by **${x} cm**. What is the spring constant, in N/cm?`,
          givens: [{ s: 'F', v: T`${F}\text{ N}` }, { s: T`\Delta x`, v: T`${x}\text{ cm}` }],
          steps: [{ say: 'Divide the force by the stretch.', work: T`k = \dfrac{${F}}{${x}} = ${k}\text{ N/cm}`, v: k }],
          answer: k, unit: 'N/cm',
          mistakes: [
            { v: F * x, msg: 'Divide force by stretch. Do not multiply.' },
            { v: x / F, msg: 'Upside down. Force goes on top: k = F ÷ Δx.' },
          ],
        };
      },
    },
    {
      id: 'p12-scale-weight', title: 'Scaling: weight', f: 'scaling', form: 'V',
      make(r) {
        const k = pick(r, [2, 3, 4, 5]);
        const W = pick(r, [1, 2, 4, 5, 10]);
        const [thing, u] = pick(r, [['brass cube', 'kg'], ['solid glass ball', 'N'], ['stone statue', 'kg'], ['wooden chair', 'kg']]);
        const ans = W * k ** 3;
        return {
          prompt: T`A ${thing} has a ${u === 'N' ? 'weight' : 'mass'} of **${W} ${u}**. What is the ${u === 'N' ? 'weight' : 'mass'} of one made of the same material but **${k} times** as big in every dimension?`,
          givens: [{ s: T`\text{old}`, v: T`${W}\text{ ${u}}` }, { s: 'k', v: `${k}` }],
          steps: [
            { say: `Weight and mass follow volume. Cube the scale factor: ${k} × ${k} × ${k}.`, work: T`${k}^3 = ${k ** 3}`, v: k ** 3 },
            { say: 'Multiply the old value by that.', work: T`${W} \times ${k ** 3} = ${ans}\text{ ${u}}`, v: ans },
          ],
          answer: ans, unit: u,
          mistakes: [
            { v: W * k * k, msg: T`You squared. That is for AREA. Weight follows volume: cube it ($${k}^3 = ${k ** 3}$).` },
            { v: W * k, msg: T`Every dimension grew, so the volume grew by $${k}^3 = ${k ** 3}$.` },
            { v: W * 3 * k, msg: T`Cubing means $${k} \times ${k} \times ${k}$, not $3 \times ${k}$.` },
          ],
        };
      },
    },
    {
      id: 'p12-scale-area', title: 'Scaling: area and strength', f: 'scaling', form: 'A',
      make(r) {
        const k = pick(r, [2, 3, 4, 5, 10]);
        const A = pick(r, [2, 3, 5, 6, 10]);
        const ans = A * k * k;
        return {
          prompt: T`A cube has a total surface area of **${A} cm²**. What is the surface area of a cube **${k} times** as big in every dimension?`,
          givens: [{ s: T`\text{old area}`, v: T`${A}\text{ cm}^2` }, { s: 'k', v: `${k}` }],
          steps: [
            { say: `Area follows the SQUARE of the scale factor. Square ${k}.`, work: T`${k}^2 = ${k * k}`, v: k * k },
            { say: 'Multiply the old area by that.', work: T`${A} \times ${k * k} = ${ans}\text{ cm}^2`, v: ans },
          ],
          answer: ans, unit: 'cm²',
          mistakes: [
            { v: A * k ** 3, msg: T`You cubed. That is for VOLUME and weight. Area uses the square ($${k}^2 = ${k * k}$).` },
            { v: A * k, msg: T`Area grows in two directions: multiply by $${k}^2 = ${k * k}$.` },
          ],
        };
      },
    },
  ],
};
