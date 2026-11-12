import { T, pick, fmt } from '../util.js';

const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [60, 80, 100], [30, 40, 50]];

export default {
  id: 10,
  title: 'Projectile & Satellite Motion',
  icon: '🛰️',

  ideas: [
    { t: 'Two motions at once', b: T`A projectile moves **sideways** and **up/down** at the same time, and the two do not affect each other. Sideways: constant speed, because gravity does not pull sideways. Up/down: accelerates at $g$, exactly like a dropped ball. Together they make a curved path called a **parabola**.` },
    { t: 'Falling below the straight line', b: T`With no gravity a thrown ball would follow a straight line. With gravity it falls below that line by $d = \frac{1}{2} g t^2$ (about $5t^2$ metres): 5 m after 1 s, 20 m after 2 s, 45 m after 3 s. This is true for any launch angle.` },
    { t: 'Launch angles', b: T`Two angles that **add to 90°** give the same range (30° and 60°, 15° and 75°). The longest range is at **45°**. With air resistance the best angle is lower than 45°. Without air resistance, time going up equals time coming down.` },
    { t: 'Satellites are falling', b: T`A satellite is a projectile moving so fast that it falls **around** Earth instead of into it. Earth's surface drops 5 m for every 8 km, so the speed needed near Earth is **8 km/s**. Satellites must be above the atmosphere (150 km or more) so air drag does not slow them. They are NOT above gravity.` },
    { t: 'Circular orbits', b: T`Gravity pulls at a right angle to the motion, so it changes the **direction** but not the **speed**. Speed, KE and PE all stay the same. A close orbit takes about **90 minutes**. Higher orbits take longer.` },
    { t: 'Elliptical orbits', b: T`Faster than 8 km/s gives an oval orbit. The satellite is **fastest when closest** (perigee) and **slowest when farthest** (apogee). PE is biggest at apogee, KE is biggest at perigee, and **KE + PE is the same everywhere**.` },
    { t: "Kepler's laws", b: T`Kepler used **Tycho Brahe's** data. **1:** orbits are ellipses with the Sun at one focus. **2:** a line from the Sun sweeps equal areas in equal times (so planets move faster when closer). **3:** $T^2 \sim r^3$, so farther planets take longer to orbit.` },
    { t: 'Escape speed', b: T`Launch at **11.2 km/s** and an object can leave Earth for good. It outruns Earth's gravity but never gets "beyond" it. Pioneer 10 (1972) was the first probe to escape the solar system, with help from Jupiter.` },
  ],

  facts: [
    T`Sideways speed never changes. Up/down speed changes by $g$ every second`,
    T`Fall distance: $d = \frac{1}{2} g t^2$ (about $5t^2$)`,
    T`Same range when angles add to 90°. Maximum range at 45°`,
    T`Orbital speed near Earth: **8 km/s**. Earth curves 5 m per 8 km`,
    T`Close orbit period: about **90 minutes**`,
    T`Escape speed from Earth: **11.2 km/s**`,
    T`Ellipse: fastest at perigee (closest), slowest at apogee (farthest)`,
    T`Kepler: ellipses, equal areas in equal times, $T^2 \sim r^3$`,
  ],

  traps: [
    { t: 'Using g for sideways motion', wrong: 'Plugging 9.8 into the horizontal distance.', right: T`Gravity only acts up and down. Sideways distance is just speed times time: $x = v t$.`, hook: 'Sideways: no g. Up/down: g.' },
    { t: 'A fast ball stays up longer', wrong: 'A ball rolled off a table faster takes longer to hit the floor.', right: 'Time in the air depends only on height. A bullet fired level and a bullet dropped from the same height land together.', hook: 'Height sets the time. Speed sets how far.' },
    { t: 'Zero speed at the top', wrong: 'At the top of its arc a thrown ball has stopped.', right: 'Only the up/down part of its speed is zero. It is still moving sideways, and gravity is still accelerating it at g.', hook: 'Top of the arc: minimum speed, not zero.' },
    { t: 'Satellites are beyond gravity', wrong: 'The space station floats because gravity is gone up there.', right: 'Gravity is the only force on it. It is in free fall around Earth. It is above the atmosphere, not above gravity.', hook: 'Above the air. Not above gravity.' },
    { t: 'Fired at an upward angle vs dropped', wrong: 'They always land at the same time.', right: 'Only if the shot is perfectly horizontal. A pellet fired at an upward angle spends extra time going up, so the dropped one lands first.', hook: 'Same time only for a level shot.' },
  ],

  formulas: [
    {
      id: 'fall-distance', name: 'Fall distance', latex: T`d = \tfrac{1}{2}\, g\, t^2`,
      plain: 'How far something has fallen straight down after t seconds. It works for a dropped ball AND for the up/down part of a thrown ball.',
      triggers: ['how far does it fall', 'dropped', 'below the straight line', 'height of the cliff', 'how long to hit the ground'],
      forms: [
        { for: 'd', label: 'distance fallen', latex: T`d = \tfrac{1}{2}\, g\, t^2`, tip: 'Square the time first, multiply by g, then halve.' },
        { for: 't', label: 'time to fall', latex: T`t = \sqrt{\dfrac{2d}{g}}`, tip: 'Double the height, divide by g, then take the square root.' },
      ],
    },
    {
      id: 'horizontal-distance', name: 'Sideways distance', latex: T`x = v\, t`,
      plain: 'How far a projectile travels sideways. Sideways speed stays constant, so no g is needed.',
      triggers: ['how far from the base', 'lands how far away', 'horizontal distance', 'rolls off a table'],
      forms: [
        { for: 'x', label: 'distance', latex: T`x = v \cdot t`, tip: 'Multiply sideways speed by time in the air.' },
        { for: 'v', label: 'speed', latex: T`v = \dfrac{x}{t}`, tip: 'Divide distance by time.' },
        { for: 't', label: 'time', latex: T`t = \dfrac{x}{v}`, tip: 'Divide distance by speed.' },
      ],
    },
    {
      id: 'fall-speed', name: 'Falling speed', latex: T`v = g\, t`,
      plain: 'How fast something is moving downward after falling from rest for t seconds.',
      triggers: ['how fast is it falling', 'vertical speed after ... seconds', 'downward speed'],
      forms: [
        { for: 'v', label: 'speed', latex: T`v = g \cdot t`, tip: 'Multiply g by the time.' },
        { for: 't', label: 'time', latex: T`t = \dfrac{v}{g}`, tip: 'Divide the speed by g.' },
      ],
    },
    {
      id: 'resultant', name: 'Combined speed (Pythagorean theorem)', latex: T`v = \sqrt{v_x^{\,2} + v_y^{\,2}}`,
      plain: 'Two speeds at right angles (sideways and downward, or north and east) combine with the Pythagorean theorem.',
      triggers: ['north and east', 'crosswind', 'ground speed', 'sideways and downward', 'actual speed of a projectile'],
      forms: [
        { for: 'v', label: 'combined speed', latex: T`v = \sqrt{v_x^{\,2} + v_y^{\,2}}`, tip: 'Square each one, add them, then take the square root.' },
      ],
    },
    {
      id: 'range', name: 'Range equation (Lab 5)', latex: T`R = \dfrac{v^2 \sin(2\theta)}{g}`,
      plain: 'How far a projectile launched at an angle lands, back at the same height. Double the angle before taking the sine.',
      triggers: ['launched at an angle', 'how far will it go', 'range', 'launcher'],
      forms: [
        { for: 'R', label: 'range', latex: T`R = \dfrac{v^2 \sin(2\theta)}{g}`, tip: 'Square the speed, double the angle, take its sine, multiply, divide by g. Calculator in DEGREE mode.' },
      ],
    },
    {
      id: 'ramp', name: 'Ramp motion (Lab 6)', latex: T`a = g \sin\theta \qquad v_f^{\,2} = v_i^{\,2} + 2 a\, \Delta x`,
      plain: 'A ramp waters gravity down to g times the sine of the angle. Then use the speed equation to find the speed at the bottom.',
      triggers: ['ramp', 'incline', 'angle of the ramp', 'speed at the bottom'],
      forms: [
        { for: 'a', label: 'acceleration', latex: T`a = g \sin\theta`, tip: 'Sine of the angle (degree mode), times g.' },
        { for: 'v', label: 'final speed from rest', latex: T`v_f = \sqrt{2 a\, \Delta x}`, tip: 'Multiply 2 by a by the ramp length, then square root.' },
        { for: 't', label: 'time from rest', latex: T`t = \dfrac{v_f}{a}`, tip: 'Divide final speed by acceleration.' },
      ],
    },
    {
      id: 'orbit-energy', name: 'Orbit energy', latex: T`KE + PE = \text{total (constant)}`,
      plain: 'A satellite trades kinetic energy for potential energy and back. The total never changes.',
      triggers: ['satellite', 'kinetic energy at one point', 'potential energy later', 'elliptical orbit'],
      forms: [
        { for: 'E', label: 'total energy', latex: T`E = KE + PE`, tip: 'Add them.' },
        { for: 'KE', label: 'kinetic energy', latex: T`KE = E - PE`, tip: 'Total minus potential.' },
        { for: 'PE', label: 'potential energy', latex: T`PE = E - KE`, tip: 'Total minus kinetic.' },
      ],
    },
  ],

  scenarios: [
    { id: 's10-1', q: 'A stone is thrown horizontally from a bridge. How far below the bridge is it after 3 seconds?', clues: ['how far below', 'after 3 seconds'], f: 'fall-distance', why: 'It asks for the up/down distance. The sideways throw does not matter. Fall distance is ½gt².' },
    { id: 's10-2', q: 'A ball rolls off a table at 2 m/s and is in the air for 0.5 s. How far from the edge of the table does it land?', clues: ['rolls off at 2 m/s', 'in the air for 0.5 s', 'how far from the edge'], f: 'horizontal-distance', why: 'Sideways distance with a known speed and time is x = vt. No g.' },
    { id: 's10-3', q: 'A cannonball is fired at an upward angle. After 2 seconds, how far beneath its straight no-gravity path is it?', clues: ['beneath the straight path', 'after 2 seconds'], f: 'fall-distance', why: 'Distance below the straight line is always ½gt², no matter the angle.' },
    { id: 's10-4', q: 'A satellite in an elliptical orbit has 4500 MJ of kinetic energy and 5000 MJ of potential energy. Later its potential energy is 6000 MJ. What is its kinetic energy then?', clues: ['satellite', 'kinetic and potential energy', 'later in its orbit'], f: 'orbit-energy', why: 'KE + PE stays the same all the way around the orbit.' },
    { id: 's10-5', q: 'A rock is dropped from a bridge. How fast is it moving after falling for 4 seconds?', clues: ['dropped', 'how fast', 'after 4 seconds'], f: 'fall-speed', why: 'Speed gained while falling is v = gt.' },
    { id: 's10-6', q: 'An airplane flies north at 80 km/h while a crosswind blows east at 60 km/h. What is its ground speed?', clues: ['north', 'east', 'crosswind'], f: 'resultant', why: 'Two speeds at right angles combine with the Pythagorean theorem.' },
    { id: 's10-7', q: 'A diver runs straight off a 20 m cliff. How long is she in the air?', clues: ['20 m cliff', 'how long in the air'], f: 'fall-distance', why: 'Time in the air depends only on the height. Rearrange the fall distance formula to solve for t.' },
    { id: 's10-8', q: 'A marble launcher fires at 3.2 m/s at an angle of 40° above the table. How far away does the marble land?', clues: ['launcher', 'angle of 40°', 'how far away'], f: 'range', why: 'Launch speed and angle with landing at the same height is the range equation from Lab 5.' },
    { id: 's10-9', q: 'A ball is thrown horizontally at 10 m/s. One second later it is also moving downward at 10 m/s. What is its actual speed?', clues: ['horizontally 10 m/s', 'downward 10 m/s', 'actual speed'], f: 'resultant', why: 'Sideways and downward speeds are at right angles, so combine them with the Pythagorean theorem.' },
    { id: 's10-10', q: 'A cart is released at the top of a 0.32 m ramp tilted at 16°. How fast is it moving at the bottom?', clues: ['ramp', '16°', 'speed at the bottom'], f: 'ramp', why: 'On a ramp the acceleration is g·sin(angle). Then use v² = 2aΔx.' },
  ],

  questions: [
    { id: 'q10-1', q: 'With no air resistance, the horizontal part of a projectile’s velocity', o: ['increases', 'decreases', 'stays constant', 'is zero'], a: 2, why: 'There is no sideways force, so the sideways speed never changes. Only the up/down speed changes.' },
    { id: 'q10-2', q: 'The horizontal ACCELERATION of a projectile (no air resistance) is', o: ['g', 'half of g', 'zero', 'different at every point'], a: 2, why: 'Gravity pulls straight down. With no sideways force there is no sideways acceleration.' },
    { id: 'q10-3', q: 'A bullet is fired perfectly horizontally while another is dropped from the same height at the same moment. Which hits the ground first?', o: ['The dropped one', 'The fired one', 'They hit at the same time', 'It depends on their masses'], a: 2, why: 'Both start with zero up/down speed and fall the same height. Sideways speed does not change the fall.' },
    { id: 'q10-4', q: 'A pellet is fired at 10° ABOVE the horizontal while another is dropped from beside it. Which hits the ground first?', o: ['The dropped one', 'The fired one', 'They hit at the same time', 'It depends on their masses'], a: 0, why: 'The fired pellet starts out moving upward, so it spends extra time in the air. They only tie when the shot is perfectly level.', trap: 'Check whether the shot is level or angled.' },
    { id: 'q10-5', q: 'The curved path of a projectile is called', o: ['an ellipse', 'a parabola', 'a circle', 'a catenary'], a: 1, why: 'Constant sideways speed plus constant downward acceleration traces out a parabola.' },
    { id: 'q10-6', q: 'A ball thrown at 40° goes just as far as a ball thrown at the same speed at', o: ['45°', '50°', '60°', '80°'], a: 1, why: 'Launch angles that add up to 90° give the same range: 40 + 50 = 90.' },
    { id: 'q10-7', q: 'With no air resistance, the greatest range comes from launching at', o: ['30°', '45°', '60°', '90°'], a: 1, why: '45° gives the maximum range. With air resistance the best angle is lower than 45°.' },
    { id: 'q10-8', q: 'You throw a ball into the air and a straight-line path would have it at a certain point after 1 second. Because of gravity, the ball is actually about', o: ['1 m below that point', '5 m below that point', '10 m below that point', 'exactly at that point'], a: 1, why: T`It falls $\frac{1}{2} g t^2 = 5 \times 1^2 = 5$ m below the straight line (4.9 m to be exact).`, trap: '10 m/s is the speed it gains. 5 m is the distance it falls.' },
    { id: 'q10-9', q: 'At the very top of its path, a ball thrown at an angle has', o: ['zero velocity and zero acceleration', 'zero velocity but acceleration g', 'only its horizontal velocity, and acceleration g', 'its greatest speed'], a: 2, why: 'Only the up/down part of the velocity is zero at the top. It is still moving sideways and gravity never switches off.' },
    { id: 'q10-10', q: 'Without air resistance, the time for a projectile to rise to its highest point compared with the time to fall back to the same level is', o: ['shorter', 'the same', 'longer', 'twice as long'], a: 1, why: 'The trip up and the trip down are mirror images. It also returns with the same speed it left with.' },
    { id: 'q10-11', q: 'A ball rolled off a table faster will', o: ['take longer to reach the floor', 'take less time to reach the floor', 'take the same time but land farther away', 'land in the same spot'], a: 2, why: 'Fall time depends only on the height of the table. More sideways speed just carries it farther in that same time.' },
    { id: 'q10-12', q: 'A satellite is best described as', o: ['an object beyond the pull of gravity', 'a projectile that falls around Earth instead of into it', 'an object held up by centrifugal force', 'an object with no forces on it'], a: 1, why: 'It is always falling, but it moves sideways so fast that the ground curves away beneath it.' },
    { id: 'q10-13', q: 'The speed needed for a circular orbit close to Earth is about', o: ['8 m/s', '8 km/s', '11.2 km/s', '90 km/s'], a: 1, why: 'At 8 km/s the 5 m a satellite falls each second matches the 5 m Earth curves away over 8 km.', trap: '11.2 km/s is escape speed, not orbital speed.' },
    { id: 'q10-14', q: 'Earth’s surface drops about 5 m for every', o: ['8 metres along the surface', '8 kilometres along the surface', '80 kilometres along the surface', '5 kilometres along the surface'], a: 1, why: '5 m of drop for every 8000 m (8 km). That is why orbital speed is 8 km per second.' },
    { id: 'q10-15', q: 'Satellites are placed 150 km or more above Earth mainly to be above Earth’s', o: ['gravity', 'atmosphere', 'magnetic field', 'weather satellites'], a: 1, why: 'Air drag would slow them down. They are not above gravity. Gravity is what keeps them in orbit.' },
    { id: 'q10-16', q: 'Gravity does not change the speed of a satellite in a circular orbit because', o: ['there is no gravity that high', 'gravity pulls at a right angle to its motion', 'the satellite is too heavy', 'the satellite has no mass'], a: 1, why: 'A force at a right angle to the motion can only change direction. No part of the force acts forward or backward.' },
    { id: 'q10-17', q: 'A satellite in close orbit circles Earth about once every', o: ['90 seconds', '90 minutes', '24 hours', '28 days'], a: 1, why: 'About 90 minutes near Earth. Satellites in higher orbits take longer.' },
    { id: 'q10-18', q: 'A satellite in an ELLIPTICAL orbit moves fastest when it is', o: ['closest to Earth', 'farthest from Earth', 'moving away from Earth', 'at any point, because its speed is constant'], a: 0, why: 'As it falls toward Earth it gains speed, like a ball rolling downhill. It is fastest at the closest point (perigee).' },
    { id: 'q10-19', q: 'In an elliptical orbit, a satellite’s potential energy is greatest', o: ['at perigee, the closest point', 'at apogee, the farthest point', 'half-way between', 'nowhere, it is constant'], a: 1, why: 'PE grows with distance from Earth, so it is biggest at apogee. That is also where KE and speed are smallest.' },
    { id: 'q10-20', q: 'For a satellite in an elliptical orbit, the sum KE + PE is', o: ['greatest at perigee', 'greatest at apogee', 'the same everywhere', 'zero'], a: 2, why: 'Energy is conserved. Whatever KE it loses climbing away, it gains as PE.' },
    { id: 'q10-21', q: 'Which of these change for a satellite in a CIRCULAR orbit?', o: ['Speed', 'Kinetic energy', 'Potential energy', 'None of these'], a: 3, why: 'In a circular orbit the distance and the speed never change, so KE and PE stay constant too.' },
    { id: 'q10-22', q: 'Kepler’s first law says each planet’s path is', o: ['a circle with the Sun at the centre', 'an ellipse with the Sun at one focus', 'a parabola', 'a straight line bent by the Sun'], a: 1, why: 'Kepler found the orbits were ellipses, not circles, with the Sun at one focus.' },
    { id: 'q10-23', q: 'Kepler’s second law (equal areas in equal times) means a planet moves', o: ['at constant speed', 'faster when it is nearer the Sun', 'faster when it is farther from the Sun', 'only in circles'], a: 1, why: 'To sweep the same area when close to the Sun, the planet must cover more of its path, so it moves faster.' },
    { id: 'q10-24', q: 'Kepler’s third law says that planets farther from the Sun', o: ['take longer to orbit', 'take less time to orbit', 'all take one year', 'do not orbit'], a: 0, why: T`$T^2 \sim r^3$: the bigger the average distance, the longer the period.` },
    { id: 'q10-25', q: 'Whose observations did Kepler use to work out his laws?', o: ['Newton', 'Galileo', 'Tycho Brahe', 'Einstein'], a: 2, why: 'Kepler was assistant to Tycho Brahe and used Brahe’s careful measurements of the planets.' },
    { id: 'q10-26', q: 'The escape speed from Earth is about', o: ['8 km/s', '11.2 km/s', '90 km/s', '300,000 km/s'], a: 1, why: '11.2 km/s. Slower than that and the object eventually falls back or stays in orbit.' },
    { id: 'q10-27', q: 'The Moon does not crash into Earth because', o: ['Earth’s gravity does not reach it', 'other planets hold it up', 'it has enough sideways (tangential) speed', 'it has less mass than Earth'], a: 2, why: 'The Moon is falling toward Earth all the time, but its sideways speed makes it fall around Earth.' },
    { id: 'q10-28', q: 'A projectile near Earth is given a horizontal speed greater than 8 km/s (but less than escape speed). Its path is', o: ['a circle', 'an ellipse', 'a straight line', 'a spiral into Earth'], a: 1, why: 'Too fast for a circle, so it overshoots, slows as it climbs, then falls back and speeds up again. That is an ellipse.' },
  ],

  problems: [
    {
      id: 'p10-fall', title: 'How far it falls', f: 'fall-distance', form: 'd',
      make(r, ctx) {
        const g = ctx.g, t = pick(r, [1, 2, 3, 4, 5]);
        const v = pick(r, [0, 0, 8, 12, 15]);
        const ans = 0.5 * g * t * t;
        const prompt = v === 0
          ? T`A rock is dropped from a high bridge. How far has it fallen after **${t} s**? Use $g = ${g}\text{ m/s}^2$.`
          : T`A ball is thrown **horizontally at ${v} m/s** from a tall cliff. How far has it fallen (straight down) after **${t} s**? Use $g = ${g}\text{ m/s}^2$.`;
        return {
          prompt,
          givens: [{ s: 't', v: T`${t}\text{ s}` }, { s: 'g', v: T`${g}\text{ m/s}^2` }],
          steps: [
            { say: 'Square the time.', work: T`${t}^2 = ${t * t}`, v: t * t },
            { say: 'Multiply by g.', work: T`${t * t} \times ${g} = ${fmt(g * t * t)}`, v: g * t * t },
            { say: 'Take half of that.', work: T`\dfrac{${fmt(g * t * t)}}{2} = ${fmt(ans)}\text{ m}`, v: ans },
          ],
          answer: ans, unit: 'm',
          mistakes: [
            { v: g * t * t, msg: T`You forgot the $\frac{1}{2}$. Halve your answer.` },
            { v: 0.5 * g * t, msg: 'You forgot to square the time.' },
            { v: g * t, msg: T`That is the falling **speed** ($v = gt$). Distance fallen is $\frac{1}{2} g t^2$.` },
            { v: v * t, msg: 'That is how far it went sideways. The question asks how far it FELL, which needs g.' },
          ],
        };
      },
    },
    {
      id: 'p10-sideways', title: 'How far it travels sideways', f: 'horizontal-distance', form: 'x',
      make(r, ctx) {
        const v = pick(r, [2, 3, 4, 6, 8, 12, 20]);
        const t = pick(r, [0.4, 0.5, 0.6, 2, 3]);
        const ans = r2(v * t);
        const fall = 0.5 * ctx.g * t * t;
        return {
          prompt: T`A ball rolls off the edge of a ${t < 1 ? 'table' : 'cliff'} at **${v} m/s** and is in the air for **${t} s**. How far from the base does it land?`,
          givens: [{ s: 'v', v: T`${v}\text{ m/s}` }, { s: 't', v: T`${t}\text{ s}` }],
          steps: [{ say: 'Sideways speed never changes. Multiply speed by time.', work: T`${v} \times ${t} = ${fmt(ans)}\text{ m}`, v: ans }],
          answer: ans, unit: 'm',
          mistakes: [
            { v: fall, msg: T`That is how far it **fell**. Sideways there is no gravity: use $x = vt$.` },
            { v: v * ctx.g * t, msg: 'No g for sideways motion. Just speed times time.' },
            { v: v / t, msg: 'Multiply speed by time. Do not divide.' },
          ],
        };
      },
    },
    {
      id: 'p10-time', title: 'Time to hit the ground', f: 'fall-distance', form: 't',
      make(r, ctx) {
        const g = ctx.g, t = pick(r, [1, 2, 3, 4]);
        const h = r1(0.5 * g * t * t);
        return {
          prompt: T`A stone is dropped from a cliff **${h} m** high. How long does it take to reach the ground? Use $g = ${g}\text{ m/s}^2$.`,
          givens: [{ s: 'd', v: T`${h}\text{ m}` }, { s: 'g', v: T`${g}\text{ m/s}^2` }],
          steps: [
            { say: 'Double the height.', work: T`2 \times ${h} = ${fmt(2 * h)}`, v: 2 * h },
            { say: 'Divide by g.', work: T`\dfrac{${fmt(2 * h)}}{${g}} = ${fmt(t * t)}`, v: t * t },
            { say: 'Take the square root.', work: T`\sqrt{${fmt(t * t)}} = ${t}\text{ s}`, v: t },
          ],
          answer: t, unit: 's',
          mistakes: [
            { v: t * t, msg: 'Nearly. You still need to take the square root.' },
            { v: h / g, msg: 'Double the height first, and take the square root at the end.' },
            { v: Math.sqrt(h / g), msg: 'You forgot to double the height before dividing by g.' },
          ],
        };
      },
    },
    {
      id: 'p10-land', title: 'Two steps: where does it land?', f: 'fall-distance', form: 't',
      make(r, ctx) {
        const g = ctx.g, t = pick(r, [1, 2, 3]);
        const v = pick(r, [5, 8, 10, 12, 15]);
        const h = r1(0.5 * g * t * t);
        const ans = v * t;
        return {
          prompt: T`A ball is thrown **horizontally at ${v} m/s** from the top of a building **${h} m** high. How far from the base of the building does it land? Use $g = ${g}\text{ m/s}^2$.`,
          givens: [{ s: 'v', v: T`${v}\text{ m/s}` }, { s: 'd', v: T`${h}\text{ m}` }, { s: 'g', v: T`${g}\text{ m/s}^2` }],
          steps: [
            { say: 'First find the time in the air. Double the height.', work: T`2 \times ${h} = ${fmt(2 * h)}`, v: 2 * h },
            { say: 'Divide by g.', work: T`\dfrac{${fmt(2 * h)}}{${g}} = ${fmt(t * t)}`, v: t * t },
            { say: 'Square root gives the time.', work: T`t = \sqrt{${fmt(t * t)}} = ${t}\text{ s}`, v: t },
            { say: 'Now go sideways: multiply the throw speed by that time.', work: T`x = ${v} \times ${t} = ${ans}\text{ m}`, v: ans },
          ],
          answer: ans, unit: 'm',
          mistakes: [
            { v: t, msg: T`That is the time in the air. Now multiply by the sideways speed: $x = vt$.` },
            { v: v * h, msg: 'You multiplied speed by height. You need the TIME in the air first.' },
            { v: v * t * t, msg: 'You forgot the square root when finding the time.' },
          ],
        };
      },
    },
    {
      id: 'p10-vspeed', title: 'Falling speed', f: 'fall-speed', form: 'v',
      make(r, ctx) {
        const g = ctx.g, t = pick(r, [1, 2, 3, 4, 5, 1.5, 2.5]);
        const ans = r2(g * t);
        return {
          prompt: T`A dropped rock has been falling for **${t} s**. How fast is it moving? Use $g = ${g}\text{ m/s}^2$.`,
          givens: [{ s: 't', v: T`${t}\text{ s}` }, { s: 'g', v: T`${g}\text{ m/s}^2` }],
          steps: [{ say: 'It gains g of speed every second. Multiply g by the time.', work: T`${g} \times ${t} = ${fmt(ans)}\text{ m/s}`, v: ans }],
          answer: ans, unit: 'm/s',
          mistakes: [
            { v: 0.5 * g * t * t, msg: T`That is the **distance** fallen. Speed is $v = gt$.` },
            { v: g * t * t, msg: T`Do not square the time for speed. $v = gt$.` },
          ],
        };
      },
    },
    {
      id: 'p10-pythag', title: 'Combined speed', f: 'resultant',
      make(r) {
        const [a, b, c] = pick(r, TRIPLES);
        const big = c >= 50;
        const prompt = big
          ? T`An airplane flies **north at ${b} km/h** while a crosswind blows **east at ${a} km/h**. What is the plane's ground speed?`
          : T`At one moment a projectile is moving **${a} m/s sideways** and **${b} m/s downward**. What is its actual speed?`;
        return {
          prompt,
          givens: [{ s: 'v_x', v: T`${a}` }, { s: 'v_y', v: T`${b}` }],
          steps: [
            { say: `Square the first speed (${a}).`, work: T`${a}^2 = ${a * a}`, v: a * a },
            { say: `Square the second speed (${b}).`, work: T`${b}^2 = ${b * b}`, v: b * b },
            { say: 'Add the two squares.', work: T`${a * a} + ${b * b} = ${c * c}`, v: c * c },
            { say: 'Take the square root.', work: T`\sqrt{${c * c}} = ${c}`, v: c },
          ],
          answer: c, unit: big ? 'km/h' : 'm/s',
          mistakes: [
            { v: a + b, msg: 'You added the speeds. They are at right angles, so square each, add, then square root.' },
            { v: c * c, msg: 'Nearly. Take the square root of that.' },
            { v: Math.sqrt(a + b), msg: 'Square each speed BEFORE adding.' },
          ],
        };
      },
    },
    {
      id: 'p10-thrown-speed', title: 'Speed of a thrown ball a moment later', f: 'resultant',
      make(r, ctx) {
        const g = ctx.g, t = pick(r, [1, 2]);
        const vx = pick(r, [10, 15, 20]);
        const vy = g * t;
        const sum = vx * vx + vy * vy;
        const ans = Math.sqrt(sum);
        return {
          prompt: T`A ball is thrown **horizontally at ${vx} m/s** from a cliff. What is its speed **${t} s** later? Use $g = ${g}\text{ m/s}^2$.`,
          givens: [{ s: 'v_x', v: T`${vx}\text{ m/s}` }, { s: 't', v: T`${t}\text{ s}` }, { s: 'g', v: T`${g}\text{ m/s}^2` }],
          steps: [
            { say: 'Find the downward speed it has gained: g times the time.', work: T`v_y = ${g} \times ${t} = ${fmt(vy)}`, v: vy },
            { say: `Square the sideways speed (${vx}).`, work: T`${vx}^2 = ${vx * vx}`, v: vx * vx },
            { say: `Square the downward speed (${fmt(vy)}).`, work: T`${fmt(vy)}^2 = ${fmt(vy * vy)}`, v: vy * vy },
            { say: 'Add the two squares.', work: T`${vx * vx} + ${fmt(vy * vy)} = ${fmt(sum)}`, v: sum },
            { say: 'Take the square root.', work: T`\sqrt{${fmt(sum)}} = ${fmt(r1(ans))}\text{ m/s}`, v: ans },
          ],
          answer: ans, unit: 'm/s',
          mistakes: [
            { v: vx, msg: 'That is only the sideways speed. It has also picked up downward speed. Combine the two.' },
            { v: vx + vy, msg: 'The two speeds are at right angles. Square each, add, then take the square root.' },
            { v: vy, msg: 'That is only the downward speed. Combine it with the sideways speed.' },
          ],
        };
      },
    },
    {
      id: 'p10-range', title: 'Range equation (Lab 5)', f: 'range',
      make(r, ctx) {
        const g = ctx.g;
        const v = pick(r, [3.2, 4, 5, 6, 10]);
        const th = pick(r, [15, 20, 30, 40, 45]);
        const s = Math.sin((2 * th * Math.PI) / 180);
        const ans = (v * v * s) / g;
        return {
          prompt: T`A launcher fires a marble at **${v} m/s** at an angle of **${th}°** above the table. How far away does it land (back at launch height)? Use $g = ${g}\text{ m/s}^2$ and make sure your calculator is in degree mode.`,
          givens: [{ s: 'v', v: T`${v}\text{ m/s}` }, { s: T`\theta`, v: T`${th}^\circ` }, { s: 'g', v: T`${g}\text{ m/s}^2` }],
          steps: [
            { say: 'Square the launch speed.', work: T`${v}^2 = ${fmt(v * v)}`, v: v * v },
            { say: 'Double the angle.', work: T`2 \times ${th} = ${2 * th}^\circ`, v: 2 * th },
            { say: `Take the sine of ${2 * th}° on your calculator.`, work: T`\sin(${2 * th}^\circ) = ${fmt(s)}`, v: s },
            { say: 'Multiply the squared speed by that sine.', work: T`${fmt(v * v)} \times ${fmt(s)} = ${fmt(v * v * s)}`, v: v * v * s },
            { say: 'Divide by g.', work: T`\dfrac{${fmt(v * v * s)}}{${g}} = ${fmt(r2(ans))}\text{ m}`, v: ans },
          ],
          answer: ans, unit: 'm',
          mistakes: [
            { v: (v * v * Math.sin((th * Math.PI) / 180)) / g, msg: 'You forgot to double the angle before taking the sine.' },
            { v: (v * s) / g, msg: 'You forgot to square the speed.' },
            { v: (v * v * Math.sin(2 * th)) / g, msg: 'Your calculator is in radian mode. Switch it to degrees.' },
            { v: v * v * s, msg: 'Nearly. Divide by g.' },
          ],
        };
      },
    },
    {
      id: 'p10-ramp', title: 'Ramp speed (Lab 6)', f: 'ramp', form: 'v',
      make(r, ctx) {
        const g = ctx.g;
        const th = pick(r, [10, 16, 20, 30]);
        const L = pick(r, [0.32, 0.5, 0.8, 1.2]);
        const a = g * Math.sin((th * Math.PI) / 180);
        const v2 = 2 * a * L;
        const ans = Math.sqrt(v2);
        return {
          prompt: T`A ball starts from rest at the top of a ramp **${L} m** long, tilted at **${th}°**. How fast is it moving at the bottom? Use $g = ${g}\text{ m/s}^2$ (degree mode).`,
          givens: [{ s: T`\theta`, v: T`${th}^\circ` }, { s: T`\Delta x`, v: T`${L}\text{ m}` }, { s: 'v_i', v: '0' }],
          steps: [
            { say: `Find the acceleration down the ramp: g times sin(${th}°).`, work: T`a = ${g} \times \sin(${th}^\circ) = ${fmt(r2(a))}\text{ m/s}^2`, v: a },
            { say: 'Multiply 2 × acceleration × ramp length.', work: T`2 \times ${fmt(r2(a))} \times ${L} = ${fmt(v2)}`, v: v2 },
            { say: 'Take the square root.', work: T`v_f = \sqrt{${fmt(v2)}} = ${fmt(r2(ans))}\text{ m/s}`, v: ans },
          ],
          answer: ans, unit: 'm/s',
          mistakes: [
            { v: v2, msg: 'Nearly. Take the square root.' },
            { v: Math.sqrt(2 * g * L), msg: T`You used the full $g$. On a ramp the acceleration is $g \sin\theta$.` },
            { v: Math.sqrt(a * L), msg: T`Do not forget the 2 in $v_f^2 = 2a\Delta x$.` },
            { v: a, msg: 'That is the acceleration. Now use it to find the speed at the bottom.' },
          ],
        };
      },
    },
    {
      id: 'p10-energy', title: 'Satellite energy', f: 'orbit-energy',
      make(r) {
        const pe1 = pick(r, [4000, 5000, 6000]);
        const ke1 = pick(r, [3500, 4500, 5500]);
        const total = pe1 + ke1;
        const pe2 = pe1 + pick(r, [500, 1000, 1500]);
        const ans = total - pe2;
        return {
          prompt: T`At one point in its elliptical orbit a satellite has **${pe1} MJ** of potential energy and **${ke1} MJ** of kinetic energy. Later its potential energy is **${pe2} MJ**. What is its kinetic energy at that later point?`,
          givens: [{ s: 'PE_1', v: T`${pe1}` }, { s: 'KE_1', v: T`${ke1}` }, { s: 'PE_2', v: T`${pe2}` }],
          steps: [
            { say: 'Find the total energy: add the first KE and PE.', work: T`${ke1} + ${pe1} = ${total}`, v: total },
            { say: 'The total never changes. Subtract the new PE from it.', work: T`${total} - ${pe2} = ${ans}\text{ MJ}`, v: ans },
          ],
          answer: ans, unit: 'MJ',
          mistakes: [
            { v: ke1, msg: 'KE changes in an elliptical orbit. PE went up, so KE must have gone down by the same amount.' },
            { v: total, msg: 'That is the total energy. Subtract the new PE to get the KE.' },
            { v: ke1 + (pe2 - pe1), msg: 'PE went UP, so KE goes DOWN. Subtract instead of adding.' },
          ],
        };
      },
    },
  ],
};
