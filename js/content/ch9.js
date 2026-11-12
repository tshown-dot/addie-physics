import { T, pick, fmt, sci } from '../util.js';

const PAIRS = [
  ['Two asteroids', 'They drift apart'],
  ['A planet and its moon', 'The moon moves outward'],
  ['Two stars', 'They drift apart'],
  ['A space probe and a planet', 'The probe coasts away'],
];

export default {
  id: 9,
  title: 'Gravity',
  icon: '🌍',

  ideas: [
    { t: 'Gravity is universal', b: T`Newton did not discover gravity. He discovered that gravity is **universal**: the same pull that drops an apple also holds the Moon in orbit. One set of laws for the sky and the ground is called the **Newtonian synthesis**.` },
    { t: 'Everything pulls on everything', b: T`The pull gets bigger when either **mass** gets bigger, and weaker when the **distance between centres** gets bigger. Gravity is the weakest of the four fundamental forces.` },
    { t: 'The inverse-square law', b: T`Distance is **squared and upside down**. Twice as far means $\frac{1}{4}$ the pull. Three times as far means $\frac{1}{9}$. Half as far means $4$ times the pull. The force gets tiny far away but never reaches zero.` },
    { t: 'Weight and weightlessness', b: T`Weight is the force you press against a **supporting surface** (like a scale). Elevator speeding up going up: you weigh more. Speeding up going down: less. Steady speed: no change. Astronauts in orbit feel weightless because nothing supports them. They are in **free fall**. Gravity is still pulling on them.` },
    { t: 'Ocean tides', b: T`The Moon pulls harder on the near side of Earth than on the far side. That **difference in pulls** stretches the oceans into **two bulges**, so there are two high tides and two low tides a day. Sun, Earth and Moon lined up (new or full Moon) gives big **spring tides**. Half-way between gives small **neap tides**.` },
    { t: 'Gravitational fields', b: T`A field is how Earth pulls on things without touching them. Field lines point **inward** and are crowded where the pull is strong. Inside a planet the field shrinks to **zero at the centre**. Einstein described gravity as mass **warping space-time**, like a ball denting a waterbed.` },
    { t: 'Black holes', b: T`When a star shrinks, its surface gets closer to its centre, so gravity **at the surface** grows until not even light escapes. From far away nothing changes: same mass, same distance, same pull.` },
  ],

  facts: [
    T`$G = 6.67 \times 10^{-11}\ \text{N}{\cdot}\text{m}^2/\text{kg}^2$ and Earth's mass is $6 \times 10^{24}$ kg`,
    T`Distance $\times 2 \to$ force $\div 4$. Distance $\times 3 \to$ force $\div 9$. Distance $\div 2 \to$ force $\times 4$`,
    T`Always measure distance from the **centre** of the planet`,
    T`Two high tides and two low tides each day`,
    T`Spring tides: new or full Moon. Neap tides: half Moon`,
    T`Gravitational field at Earth's centre is zero`,
  ],

  traps: [
    { t: 'Forgetting to square the distance', wrong: T`"Three times as far, so one third of the force."`, right: T`Three times as far means $3^2 = 9$, so **one ninth** of the force.`, hook: 'Distance always gets squared. Mass never does.' },
    { t: 'Measuring from the surface', wrong: T`"One Earth radius above the surface is a distance of 1."`, right: T`You already start 1 radius from the centre. One radius **above the surface** is **2 radii from the centre**, so weight is $\frac{1}{4}$.`, hook: 'Count from the centre.' },
    { t: '"No gravity in space"', wrong: 'Astronauts float because there is no gravity up there.', right: 'Gravity is what keeps them in orbit. They feel weightless because nothing pushes up on them. They are falling around the Earth.', hook: 'Weightless means no support force. It does not mean no gravity.' },
    { t: 'What causes the tides', wrong: 'The Moon just pulls the ocean toward it, making one bulge.', right: 'The Moon pulls the near side harder than the far side. The difference stretches Earth into two bulges.', hook: 'Tides come from unequal tugs.' },
  ],

  formulas: [
    {
      id: 'gravity-ratio',
      name: 'Gravity ratio rule (inverse-square)',
      latex: T`F \sim \dfrac{m_1 m_2}{d^2}`,
      plain: 'Use this when a question asks how the force CHANGES. Mass change: multiply by the same number. Distance change: square the number, then do the opposite (farther = divide, closer = multiply).',
      triggers: ['twice as far', 'three times the distance', 'how does the force compare', 'mass doubles', 'Earth radii above the surface'],
      forms: [
        { for: 'F', label: 'new force', latex: T`F_{\text{new}} = F_{\text{old}} \times \dfrac{\text{mass factor}}{(\text{distance factor})^2}`, tip: 'Square the distance factor first.' },
      ],
    },
    {
      id: 'gravity',
      name: "Newton's law of gravity (with G)",
      latex: T`F_g = G\,\dfrac{m_1 m_2}{r^2}`,
      plain: 'On the test review. Use this when you are given the actual masses in kg and the distance in metres and need the force in newtons. G = 6.67 × 10⁻¹¹.',
      triggers: ['masses in kg', 'distance between centres in metres', 'find the force in newtons', 'G'],
      forms: [
        { for: 'F', label: 'force', latex: T`F_g = G\,\dfrac{m_1 m_2}{r^2}`, tip: 'Multiply the masses, multiply by G, then divide by the distance squared.' },
      ],
    },
    {
      id: 'weight',
      name: 'Weight',
      latex: T`W = m g`,
      plain: 'Weight is the pull of gravity on a mass. Mass is in kg, weight is in newtons.',
      triggers: ['how much does it weigh', 'weight in newtons', 'mass in kg'],
      forms: [
        { for: 'W', label: 'weight', latex: T`W = m \cdot g`, tip: 'Multiply mass by g.' },
        { for: 'm', label: 'mass', latex: T`m = \dfrac{W}{g}`, tip: 'Divide weight by g.' },
      ],
    },
  ],

  scenarios: [
    { id: 's9-1', q: 'A space probe coasts out to 3 times its original distance from the centre of Earth. How does Earth’s pull on it compare with before?', clues: ['3 times the distance', 'how does it compare'], f: 'gravity-ratio', why: 'No masses in kg and no G. It only asks how the force changes, so use the ratio rule: 3 squared is 9, so one ninth.' },
    { id: 's9-2', q: T`Find the force between a $6 \times 10^{24}$ kg planet and a $7 \times 10^{22}$ kg moon whose centres are $4 \times 10^{8}$ m apart.`, clues: ['two masses in kg', 'distance in metres', 'find the force'], f: 'gravity', why: 'Actual masses and an actual distance means the full equation with G.' },
    { id: 's9-3', q: 'A crate has a mass of 50 kg. How hard does Earth’s gravity pull on it at the surface?', clues: ['mass in kg', 'pull of gravity at the surface'], f: 'weight', why: 'Pull of gravity on a mass at the surface is its weight: W = mg.' },
    { id: 's9-4', q: 'If the mass of the Sun suddenly doubled, how would its pull on Earth change?', clues: ['mass doubled', 'how would it change'], f: 'gravity-ratio', why: 'A "how does it change" question. Mass doubles, so force doubles. No squaring for mass.' },
    { id: 's9-5', q: 'An astronaut weighs 900 N on the ground. What does she weigh in a rocket 2 Earth radii above the surface?', clues: ['weighs ... on the ground', 'Earth radii above the surface'], f: 'gravity-ratio', why: 'Her weight changes with distance from Earth’s centre. 2 radii above the surface is 3 radii from the centre, so divide by 9.' },
    { id: 's9-6', q: 'A bag of apples weighs 20 N on a grocery scale. What is its mass?', clues: ['weighs ... N', 'find mass'], f: 'weight', why: 'Weight and mass are linked by W = mg. Rearranged: m = W / g.' },
  ],

  questions: [
    { id: 'q9-1', q: 'What did Newton discover about gravity?', o: ['That gravity exists', 'That gravity is universal', 'That gravity only acts on Earth', 'That gravity pushes instead of pulls'], a: 1, why: 'People already knew things fall. Newton realised the same force reaches the Moon and the planets. Gravity is universal.' },
    { id: 'q9-2', q: 'The "Newtonian synthesis" is the idea that', o: ['planets move in perfect circles', 'heavy objects fall faster than light ones', 'the same laws apply to objects in the sky and objects on Earth', 'gravity is the strongest force'], a: 2, why: 'Before Newton, people thought the heavens followed different rules. Newton joined them: one set of laws for both.' },
    { id: 'q9-3', q: 'Two objects move until they are twice as far apart. The gravitational force between them is now', o: ['half as much', 'one quarter as much', 'twice as much', 'four times as much'], a: 1, why: T`Inverse-square law: $2^2 = 4$, and farther means weaker, so $\frac{1}{4}$.`, trap: 'Half is the answer if you forget to square.' },
    { id: 'q9-4', q: 'The mass of BOTH objects doubles and the distance stays the same. The force between them is', o: ['the same', 'twice as much', 'four times as much', 'one quarter as much'], a: 2, why: T`Force goes with $m_1 \times m_2$. Each doubling gives a factor of 2, so $2 \times 2 = 4$.` },
    { id: 'q9-5', q: 'Compared with the other fundamental forces, gravity is', o: ['the strongest', 'the weakest', 'equal to the others', 'not a real force'], a: 1, why: 'Gravity is the weakest of the four fundamental forces. It only seems strong because Earth is so massive.' },
    { id: 'q9-6', q: 'You stand on a bathroom scale in an elevator that is accelerating UPWARD. The scale reads', o: ['less than your normal weight', 'your normal weight', 'more than your normal weight', 'zero'], a: 2, why: 'Weight is the force against the supporting surface. Accelerating upward squeezes the scale springs more, so it reads more.' },
    { id: 'q9-7', q: 'In an elevator moving upward at CONSTANT speed, a scale reads', o: ['more than your normal weight', 'less than your normal weight', 'your normal weight', 'zero'], a: 2, why: 'No acceleration means no change in the support force. Only speeding up or slowing down changes the reading.', trap: 'Moving up is not the same as accelerating up.' },
    { id: 'q9-8', q: 'Astronauts in orbit feel weightless because', o: ['there is no gravity in space', 'they are too far from Earth to be pulled', 'they are in free fall with no support force', 'the spacecraft blocks gravity'], a: 2, why: 'Gravity is still pulling on them. It is what keeps them in orbit. They feel weightless because nothing pushes back on them.' },
    { id: 'q9-9', q: 'Ocean tides are caused mainly by', o: ['the wind', 'Earth spinning', 'differences in the Moon’s pull on opposite sides of Earth', 'the Sun heating the oceans'], a: 2, why: 'The Moon pulls the near side of Earth harder than the far side. Those unequal tugs stretch the oceans into two bulges.' },
    { id: 'q9-10', q: 'How many high tides does a typical coast get each day?', o: ['One', 'Two', 'Three', 'Four'], a: 1, why: 'There are two bulges on opposite sides of Earth, so two high tides and two low tides a day (a high tide about every 12 hours).' },
    { id: 'q9-11', q: 'The highest high tides (spring tides) happen when', o: ['it is springtime', 'the Moon is new or full', 'the Moon is half-way between new and full', 'the Moon is farthest from Earth'], a: 1, why: 'At new or full Moon the Sun, Earth and Moon line up, so the Sun’s and Moon’s effects add together.', trap: 'Spring tides have nothing to do with the season.' },
    { id: 'q9-12', q: 'Neap tides, the smallest tides, happen when', o: ['the Moon is full', 'the Moon is new', 'the Moon is half-way between new and full', 'there is an eclipse'], a: 2, why: 'At a half Moon the Sun and Moon pull at right angles, so their tides partly cancel.' },
    { id: 'q9-13', q: 'At the exact centre of Earth, the gravitational field is', o: ['strongest', 'the same as at the surface', 'half of the surface value', 'zero'], a: 3, why: 'At the centre you are pulled equally in every direction, so the pulls cancel. The field is zero.' },
    { id: 'q9-14', q: 'You fall into a tunnel drilled straight through Earth. As you fall toward the centre, your acceleration', o: ['increases', 'stays at g', 'decreases, reaching zero at the centre', 'is zero the whole way'], a: 2, why: 'The mass above you partly cancels the pull of the mass below. Acceleration shrinks to zero at the centre, but you are moving fast, so you coast through to the other side.' },
    { id: 'q9-15', q: 'If the Sun collapsed into a black hole with the same mass, Earth’s orbit would', o: ['spiral into the black hole', 'fly off into space', 'stay the same', 'speed up greatly'], a: 2, why: 'Same mass and same distance means the same force. Gravity only becomes huge near the tiny surface of the black hole.' },
    { id: 'q9-16', q: 'As you move very far from Earth, the pull of Earth’s gravity', o: ['reaches zero at the edge of the atmosphere', 'gets closer and closer to zero but never reaches it', 'stays constant', 'reverses direction'], a: 1, why: 'The inverse-square law makes the force shrink quickly, but it never becomes exactly zero.' },
    { id: 'q9-17', q: 'On a drawing of Earth’s gravitational field, the field lines are closest together', o: ['far from Earth', 'near Earth, where the force is strongest', 'at the Moon', 'nowhere, they are evenly spaced'], a: 1, why: 'Crowded field lines mean a stronger field. The arrows point inward because gravity always attracts.' },
    { id: 'q9-18', q: 'According to Einstein, gravity is', o: ['a magnetic effect', 'a warping of space-time by mass', 'a push from outer space', 'caused by Earth’s spin'], a: 1, why: 'Mass dents space-time like a heavy ball on a waterbed, and other objects roll toward the dent.' },
    { id: 'q9-19', q: T`In $F = G\,\frac{m_1 m_2}{d^2}$, the distance $d$ is measured`, o: ['between the surfaces of the objects', 'between the centres of the objects', 'from the object to the Sun', 'from the surface to the top of the atmosphere'], a: 1, why: 'Distance is always centre to centre. On Earth’s surface you are already one Earth radius from the centre.' },
    { id: 'q9-20', q: 'Earth is round because', o: ['it spins', 'gravity pulled all of its parts in toward the centre', 'the Moon shaped it', 'of the atmosphere pressing on it'], a: 1, why: 'Everything attracts everything else. Gravity pulled every part inward as far as it could go, which makes a sphere.' },
  ],

  problems: [
    {
      id: 'p9-farther', title: 'Farther apart', f: 'gravity-ratio',
      make(r) {
        const k = pick(r, [2, 3, 4, 5, 10]);
        const F0 = k * k * pick(r, [2, 3, 5, 8, 10, 20]);
        const [who, how] = pick(r, PAIRS);
        const ans = F0 / (k * k);
        return {
          prompt: T`${who} pull on each other with a gravitational force of **${F0} N**. ${how} until the distance between their centres is **${k} times** as great. What is the force between them now?`,
          givens: [{ s: T`F_{\text{old}}`, v: T`${F0}\text{ N}` }, { s: T`\text{distance}`, v: T`\times ${k}` }],
          steps: [
            { say: `The distance was multiplied by ${k}. Square that number.`, work: T`${k}^2 = ${k * k}`, v: k * k },
            { say: 'Farther apart means a weaker pull, so divide the old force by that.', work: T`\dfrac{${F0}}{${k * k}} = ${fmt(ans)}\text{ N}`, v: ans },
          ],
          answer: ans, unit: 'N',
          mistakes: [
            { v: F0 / k, msg: T`You divided by ${k}. Gravity uses distance **squared**, so divide by $${k}^2 = ${k * k}$.` },
            { v: F0 * k * k, msg: 'You multiplied. Farther apart means a weaker pull, so divide.' },
            { v: F0 * k, msg: T`Farther apart means weaker, so divide. And square the ${k} first.` },
          ],
        };
      },
    },
    {
      id: 'p9-closer', title: 'Closer together', f: 'gravity-ratio',
      make(r) {
        const k = pick(r, [2, 3, 4, 5]);
        const F0 = pick(r, [2, 5, 10, 20, 50]);
        const word = { 2: 'half', 3: 'one third', 4: 'one quarter', 5: 'one fifth' }[k];
        const ans = F0 * k * k;
        return {
          prompt: T`Two space rocks attract each other with a force of **${F0} N**. They move closer until the distance between their centres is **${word}** of what it was. What is the force now?`,
          givens: [{ s: T`F_{\text{old}}`, v: T`${F0}\text{ N}` }, { s: T`\text{distance}`, v: T`\div ${k}` }],
          steps: [
            { say: `The distance was divided by ${k}. Square that number.`, work: T`${k}^2 = ${k * k}`, v: k * k },
            { say: 'Closer together means a stronger pull, so multiply the old force by that.', work: T`${F0} \times ${k * k} = ${ans}\text{ N}`, v: ans },
          ],
          answer: ans, unit: 'N',
          mistakes: [
            { v: F0 * k, msg: T`You multiplied by ${k}. Gravity uses distance **squared**, so multiply by $${k}^2 = ${k * k}$.` },
            { v: F0 / (k * k), msg: 'You divided. Closer together means a stronger pull, so multiply.' },
            { v: F0 / k, msg: T`Closer means stronger, so multiply. And square the ${k} first.` },
          ],
        };
      },
    },
    {
      id: 'p9-mass', title: 'Changing the masses', f: 'gravity-ratio',
      make(r) {
        const a = pick(r, [2, 3, 4, 5]);
        const b = pick(r, [1, 1, 2, 3]);
        const F0 = pick(r, [10, 20, 30, 50, 100]);
        const w = { 2: 'doubles', 3: 'triples', 4: 'becomes 4 times as great', 5: 'becomes 5 times as great' };
        const ans = F0 * a * b;
        const change = b === 1
          ? `The mass of one of them ${w[a]}`
          : `The mass of one ${w[a]} and the mass of the other ${w[b]}`;
        const steps = b === 1
          ? [{ say: `Mass is not squared. Multiply the old force by ${a}.`, work: T`${F0} \times ${a} = ${ans}\text{ N}`, v: ans }]
          : [
            { say: 'Multiply the two mass factors together.', work: T`${a} \times ${b} = ${a * b}`, v: a * b },
            { say: 'Multiply the old force by that.', work: T`${F0} \times ${a * b} = ${ans}\text{ N}`, v: ans },
          ];
        return {
          prompt: T`Two objects attract each other with a gravitational force of **${F0} N**. ${change}, while the distance stays the same. What is the force now?`,
          givens: [{ s: T`F_{\text{old}}`, v: T`${F0}\text{ N}` }, { s: T`\text{mass factor}`, v: T`\times ${a * b}` }, { s: T`\text{distance}`, v: T`\text{same}` }],
          steps, answer: ans, unit: 'N',
          mistakes: [
            { v: F0 * a * a * b * b, msg: 'You squared the mass factor. Only distance gets squared. Mass multiplies directly.' },
            { v: F0 * (a + b), msg: 'Multiply the two mass factors together. Do not add them.' },
            { v: F0 / (a * b), msg: 'More mass means a stronger pull, so multiply.' },
            { v: F0 * a, msg: 'Both masses changed. Use both factors.' },
          ],
        };
      },
    },
    {
      id: 'p9-combo', title: 'Mass and distance both change', f: 'gravity-ratio',
      make(r) {
        const k = pick(r, [2, 3, 4]);
        const a = pick(r, [2, 3, 5]);
        const F0 = k * k * pick(r, [5, 10, 20]);
        const ans = (F0 * a) / (k * k);
        return {
          prompt: T`A moon is pulled toward its planet with a force of **${F0} N**. Imagine the planet's mass became **${a} times** as great and the moon moved out to **${k} times** the distance. What would the force be?`,
          givens: [{ s: T`F_{\text{old}}`, v: T`${F0}\text{ N}` }, { s: T`\text{mass}`, v: T`\times ${a}` }, { s: T`\text{distance}`, v: T`\times ${k}` }],
          steps: [
            { say: `Mass first. Multiply the old force by ${a}.`, work: T`${F0} \times ${a} = ${F0 * a}`, v: F0 * a },
            { say: `Now distance. Square the ${k}.`, work: T`${k}^2 = ${k * k}`, v: k * k },
            { say: 'Farther means weaker. Divide your first answer by the squared number.', work: T`\dfrac{${F0 * a}}{${k * k}} = ${fmt(ans)}\text{ N}`, v: ans },
          ],
          answer: ans, unit: 'N',
          mistakes: [
            { v: (F0 * a) / k, msg: T`You divided by ${k}. Square it first: divide by ${k * k}.` },
            { v: F0 / (k * k), msg: `You handled the distance but forgot the mass. Multiply by ${a} as well.` },
            { v: F0 * a, msg: `You handled the mass but forgot the distance. Divide by ${k * k}.` },
            { v: F0 * a * k * k, msg: 'Farther apart means weaker, so divide by the squared distance factor.' },
          ],
        };
      },
    },
    {
      id: 'p9-altitude', title: 'Weight above the surface', f: 'gravity-ratio',
      make(r) {
        const n = pick(r, [1, 1, 2, 3]);
        const c = n + 1;
        const W = c * c * pick(r, [20, 40, 50]);
        const ans = W / (c * c);
        const radii = n === 1 ? 'one Earth radius' : `${n} Earth radii`;
        return {
          prompt: T`An astronaut weighs **${W} N** standing on Earth's surface. What does she weigh in a rocket that is **${radii} above the surface**?`,
          givens: [{ s: T`W_{\text{surface}}`, v: T`${W}\text{ N}` }, { s: T`\text{height}`, v: T`${n}\text{ radii above surface}` }],
          steps: [
            { say: `Count from Earth's CENTRE. On the surface she is 1 radius from the centre. Now she is ${n} more. How many radii from the centre is that?`, work: T`1 + ${n} = ${c}`, v: c },
            { say: 'Square that number.', work: T`${c}^2 = ${c * c}`, v: c * c },
            { say: 'Farther means weaker. Divide her surface weight by it.', work: T`\dfrac{${W}}{${c * c}} = ${fmt(ans)}\text{ N}`, v: ans },
          ],
          answer: ans, unit: 'N',
          mistakes: [
            { v: W / (n * n), msg: T`You used ${n} as the distance. Distance is measured from Earth's **centre**: 1 radius to the surface plus ${n} more is ${c}.` },
            { v: W / c, msg: T`Right distance (${c} radii), but it has to be squared: divide by ${c * c}.` },
            { v: W / n, msg: T`Count from the centre (${c} radii), then square it.` },
          ],
        };
      },
    },
    {
      id: 'p9-weight', title: 'Weight from mass', f: 'weight', form: 'W',
      make(r, ctx) {
        const m = pick(r, [2, 5, 10, 20, 50, 60, 80]);
        const thing = pick(r, ['backpack', 'dog', 'crate', 'suitcase', 'student']);
        const ans = m * ctx.g;
        return {
          prompt: T`A ${thing} has a mass of **${m} kg**. What is its weight on Earth? Use $g = ${ctx.g}\text{ m/s}^2$.`,
          givens: [{ s: 'm', v: T`${m}\text{ kg}` }, { s: 'g', v: T`${ctx.g}\text{ m/s}^2` }],
          steps: [{ say: 'Multiply mass by g.', work: T`${m} \times ${ctx.g} = ${fmt(ans)}\text{ N}`, v: ans }],
          answer: ans, unit: 'N',
          mistakes: [
            { v: m / ctx.g, msg: 'You divided. Weight is mass times g.' },
            { v: m, msg: 'That is the mass in kg. Weight is a force in newtons: multiply by g.' },
          ],
        };
      },
    },
    {
      id: 'p9-mass-from-weight', title: 'Mass from weight', f: 'weight', form: 'm',
      make(r, ctx) {
        const m = pick(r, [3, 4, 5, 8, 10, 25, 40, 70]);
        const W = Math.round(m * ctx.g * 10) / 10;
        return {
          prompt: T`A box weighs **${W} N** on Earth. What is its mass? Use $g = ${ctx.g}\text{ m/s}^2$.`,
          givens: [{ s: 'W', v: T`${W}\text{ N}` }, { s: 'g', v: T`${ctx.g}\text{ m/s}^2` }],
          steps: [{ say: 'Divide the weight by g.', work: T`\dfrac{${W}}{${ctx.g}} = ${m}\text{ kg}`, v: m }],
          answer: m, unit: 'kg',
          mistakes: [{ v: W * ctx.g, msg: 'You multiplied. To undo "times g", divide by g.' }],
        };
      },
    },
    {
      id: 'p9-full', star: true, title: "Newton's gravitation equation (test review)", f: 'gravity',
      make(r) {
        const m1 = pick(r, [2, 3, 4, 5, 6, 8, 10]);
        const m2 = pick(r, [2, 3, 5, 6, 10, 20]);
        const d = pick(r, [2, 3, 4, 5, 10]);
        const G = 6.67e-11;
        const top = G * m1 * m2;
        const ans = top / (d * d);
        return {
          prompt: T`A **${m1} kg** ball and a **${m2} kg** ball are **${d} m** apart (centre to centre). Find the gravitational force between them. Use $G = 6.67 \times 10^{-11}$. Type your answer like 1.04e-10 or 1.04x10^-10.`,
          givens: [{ s: 'm_1', v: T`${m1}\text{ kg}` }, { s: 'm_2', v: T`${m2}\text{ kg}` }, { s: 'r', v: T`${d}\text{ m}` }, { s: 'G', v: T`6.67 \times 10^{-11}` }],
          steps: [
            { say: 'Multiply the two masses.', work: T`${m1} \times ${m2} = ${m1 * m2}`, v: m1 * m2 },
            { say: T`Multiply that by $G$. On a calculator: 6.67, then EE (or EXP), then -11, then × ${m1 * m2}.`, work: T`6.67 \times 10^{-11} \times ${m1 * m2} = ${sci(top)}`, v: top },
            { say: 'Square the distance.', work: T`${d}^2 = ${d * d}`, v: d * d },
            { say: 'Divide the top by the squared distance.', work: T`F_g = \dfrac{${sci(top)}}{${d * d}} = ${sci(ans)}\text{ N}`, v: ans },
          ],
          answer: ans, unit: 'N',
          mistakes: [
            { v: top / d, msg: T`You divided by ${d}. The distance has to be **squared**: divide by ${d * d}.` },
            { v: (m1 * m2) / (d * d), msg: T`You left out $G$. Multiply by $6.67 \times 10^{-11}$.` },
            { v: top, msg: 'That is the top of the fraction. Now divide by the distance squared.' },
            { v: (6.67 * m1 * m2) / (d * d), msg: T`The number part is right, but the power of ten is missing. Use the EE key for $\times 10^{-11}$.` },
            { v: top * d * d, msg: 'Divide by the distance squared. Do not multiply.' },
          ],
        };
      },
    },
  ],
};
