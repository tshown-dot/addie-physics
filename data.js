// Data bank for Addie's Physics Test 2 Prep
// Chapters 5, 6, 7, 8 (Newton's 3rd Law, Momentum, Energy, Rotational Motion)
// Tailored specifically to Addie's learning style:
// - Beautiful, clear textbook-grade KaTeX/LaTeX formatting
// - Brute "When to use this formula" keyword triggers
// - Plain English explanations (zero confusing jargon)
// - Step-by-step algebra lifelines (pre-rearranged equations)
// - Trap warnings (especially horizontal vs. vertical g=9.8)

const FORMULAS = [
  {
    id: "momentum",
    name: "Linear Momentum",
    latex: "p = m v",
    displayLatex: "p = m v",
    topic: "Chapter 6: Momentum",
    triggerKeywords: ["momentum", "moving mass", "mass times velocity", "inertia in motion"],
    plainEnglish: "Momentum is how hard something is to stop. Big mass or high speed means huge momentum.",
    variables: [
      { sym: "p", name: "Momentum", unit: "\\text{kg}\\cdot\\text{m/s}" },
      { sym: "m", name: "Mass", unit: "\\text{kg}" },
      { sym: "v", name: "Velocity (Speed)", unit: "\\text{m/s}" }
    ],
    algebraLifeline: [
      { find: "p \\text{ (Momentum)}", formulaLatex: "p = m \\cdot v", tip: "Multiply mass by speed directly." },
      { find: "m \\text{ (Mass)}", formulaLatex: "m = \\frac{p}{v}", tip: "Divide momentum by velocity." },
      { find: "v \\text{ (Velocity)}", formulaLatex: "v = \\frac{p}{m}", tip: "Divide momentum by mass." }
    ],
    example: "A $1000\\text{ kg}$ car moves at $20\\text{ m/s}$. $p = (1000)(20) = 20{,}000\\text{ kg}\\cdot\\text{m/s}$."
  },
  {
    id: "impulse-momentum",
    name: "Impulse-Momentum Theorem",
    latex: "F \\Delta t = \\Delta p = m(v_f - v_i)",
    displayLatex: "F \\Delta t = \\Delta p = m(v_f - v_i)",
    topic: "Chapter 6: Momentum",
    triggerKeywords: ["cushion", "airbag", "follow-through", "impact force", "catch the ball", "contact time", "change in momentum"],
    plainEnglish: "Impulse is Force times Time. To reduce injury force (like hitting an airbag), make the impact time longer! Change in momentum stays the same.",
    variables: [
      { sym: "F", name: "Force", unit: "\\text{N}" },
      { sym: "\\Delta t", name: "Time of contact", unit: "\\text{s}" },
      { sym: "\\Delta p", name: "Change in momentum", unit: "\\text{kg}\\cdot\\text{m/s}" },
      { sym: "m", name: "Mass", unit: "\\text{kg}" },
      { sym: "v_f - v_i", name: "Change in velocity", unit: "\\text{m/s}" }
    ],
    algebraLifeline: [
      { find: "F \\text{ (Impact Force)}", formulaLatex: "F = \\frac{\\Delta p}{\\Delta t}", tip: "Divide momentum change by time. Bigger time = smaller force!" },
      { find: "\\Delta t \\text{ (Time needed)}", formulaLatex: "\\Delta t = \\frac{\\Delta p}{F}", tip: "Divide momentum change by force." },
      { find: "\\Delta p \\text{ (Momentum Change)}", formulaLatex: "\\Delta p = F \\cdot \\Delta t", tip: "Multiply force by contact time." }
    ],
    example: "A $0.5\\text{ kg}$ ball at $20\\text{ m/s}$ stops in $0.1\\text{ s}$. $\\Delta p = -10\\text{ kg}\\cdot\\text{m/s}$. $F = \\frac{10}{0.1} = 100\\text{ N}$."
  },
  {
    id: "inelastic-collision",
    name: "Inelastic Collision (Stick Together)",
    latex: "(m_1 + m_2) v_f = m_1 v_1 + m_2 v_2",
    displayLatex: "(m_1 + m_2) v_f = m_1 v_1 + m_2 v_2",
    topic: "Chapter 6: Momentum",
    triggerKeywords: ["collide and stick", "couple together", "tackled and move together", "two railcars hook"],
    plainEnglish: "When two objects stick together, their combined mass moves together. Total momentum BEFORE equals total momentum AFTER.",
    variables: [
      { sym: "m_1, m_2", name: "Masses of objects", unit: "\\text{kg}" },
      { sym: "v_1, v_2", name: "Initial speeds", unit: "\\text{m/s}" },
      { sym: "v_f", name: "Final speed of stuck objects", unit: "\\text{m/s}" }
    ],
    algebraLifeline: [
      { find: "v_f \\text{ (Final Speed)}", formulaLatex: "v_f = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}", tip: "Calculate total momentum before, then divide by combined mass." }
    ],
    example: "A $2\\text{ kg}$ cart at $6\\text{ m/s}$ hits a stationary $4\\text{ kg}$ cart and sticks: $v_f = \\frac{2(6) + 4(0)}{2 + 4} = \\frac{12}{6} = 2\\text{ m/s}$."
  },
  {
    id: "kinetic-energy",
    name: "Kinetic Energy",
    latex: "KE = \\frac{1}{2} m v^2",
    displayLatex: "KE = \\frac{1}{2} m v^2",
    topic: "Chapter 7: Energy",
    triggerKeywords: ["kinetic energy", "energy of motion", "speed doubles energy quadruples", "skidding distance"],
    plainEnglish: "Energy an object has because it is moving. SPEED IS SQUARED! If you drive twice as fast ($2\\times$), your energy is 4 times as big ($2^2 = 4$).",
    variables: [
      { sym: "KE", name: "Kinetic Energy", unit: "\\text{J (Joules)}" },
      { sym: "m", name: "Mass", unit: "\\text{kg}" },
      { sym: "v", name: "Velocity (Speed)", unit: "\\text{m/s}" }
    ],
    algebraLifeline: [
      { find: "KE \\text{ (Kinetic Energy)}", formulaLatex: "KE = \\frac{1}{2} m v^2", tip: "Square speed first ($v^2$), multiply by mass, then divide by 2." },
      { find: "m \\text{ (Mass)}", formulaLatex: "m = \\frac{2 \\cdot KE}{v^2}", tip: "Double the KE, then divide by speed squared." },
      { find: "v \\text{ (Velocity)}", formulaLatex: "v = \\sqrt{\\frac{2 \\cdot KE}{m}}", tip: "Double KE, divide by mass, then take the SQUARE ROOT on your calculator!" }
    ],
    example: "From Addie's notes: A $4\\text{ kg}$ box moves at $15\\text{ m/s}$. $KE = \\frac{1}{2}(4)(15^2) = 2 \\times 225 = 450\\text{ Joules}$."
  },
  {
    id: "potential-energy",
    name: "Gravitational Potential Energy",
    latex: "PE = m g h",
    displayLatex: "PE = m g h",
    topic: "Chapter 7: Energy",
    triggerKeywords: ["potential energy", "stored energy", "height", "elevated", "lifted against gravity"],
    plainEnglish: "Energy stored because of an object's height above ground. Only applies VERTICALLY (going up or down).",
    variables: [
      { sym: "PE", name: "Potential Energy", unit: "\\text{J}" },
      { sym: "m", name: "Mass", unit: "\\text{kg}" },
      { sym: "g", name: "Gravity acceleration", unit: "9.8\\text{ m/s}^2" },
      { sym: "h", name: "Height", unit: "\\text{m}" }
    ],
    algebraLifeline: [
      { find: "PE", formulaLatex: "PE = m g h", tip: "Multiply mass $\\times$ 9.8 $\\times$ height." },
      { find: "h \\text{ (Height)}", formulaLatex: "h = \\frac{PE}{m g}", tip: "Divide PE by the object's weight ($m g$)." }
    ],
    example: "A $2\\text{ kg}$ book lifted $3\\text{ m}$: $PE = (2)(9.8)(3) = 58.8\\text{ J}$."
  },
  {
    id: "work-energy",
    name: "Work & Work-Energy Theorem",
    latex: "W = F d = \\Delta KE",
    displayLatex: "W = F d = \\Delta KE",
    topic: "Chapter 7: Energy",
    triggerKeywords: ["work done", "force over distance", "stopping distance", "skid marks"],
    plainEnglish: "Work = pushing a force through a distance. Work changes kinetic energy. If a car goes $3\\times$ faster, it has $9\\times$ more KE, so it takes $9\\times$ more distance to stop!",
    variables: [
      { sym: "W", name: "Work", unit: "\\text{J}" },
      { sym: "F", name: "Force", unit: "\\text{N}" },
      { sym: "d", name: "Distance", unit: "\\text{m}" }
    ],
    algebraLifeline: [
      { find: "W \\text{ (Work)}", formulaLatex: "W = F \\cdot d", tip: "Force multiplied by distance." },
      { find: "d \\text{ (Stopping Distance)}", formulaLatex: "d = \\frac{KE}{F_{\\text{friction}}}", tip: "Divide total kinetic energy by braking force." },
      { find: "F \\text{ (Braking Force)}", formulaLatex: "F = \\frac{KE}{d}", tip: "Divide energy to stop by distance." }
    ],
    example: "Pushing a cart with $50\\text{ N}$ for $10\\text{ m}$: $W = (50)(10) = 500\\text{ J}$."
  },
  {
    id: "centripetal-acceleration",
    name: "Centripetal Acceleration",
    latex: "a_c = \\frac{v^2}{r}",
    displayLatex: "a_c = \\frac{v^2}{r}",
    topic: "Chapter 8: Rotational Motion",
    triggerKeywords: ["centripetal acceleration", "turning a curve", "circular path", "spinning cylinder", "outer edge acceleration"],
    plainEnglish: "Acceleration directed INWARD toward the center of a circle. Even at constant speed, turning is accelerating because direction changes!",
    variables: [
      { sym: "a_c", name: "Centripetal Acceleration", unit: "\\text{m/s}^2" },
      { sym: "v", name: "Linear Speed", unit: "\\text{m/s}" },
      { sym: "r", name: "Radius of circle", unit: "\\text{m}" }
    ],
    algebraLifeline: [
      { find: "a_c \\text{ (Acceleration)}", formulaLatex: "a_c = \\frac{v^2}{r}", tip: "Square speed first, then divide by radius." },
      { find: "r \\text{ (Radius)}", formulaLatex: "r = \\frac{v^2}{a_c}", tip: "Square speed, then divide by acceleration." },
      { find: "v \\text{ (Speed needed)}", formulaLatex: "v = \\sqrt{a_c \\cdot r}", tip: "Multiply $a_c$ by radius, then take the square root." }
    ],
    example: "From Addie's notes: Space habitat with radius $r = 600\\text{ m}$ spinning at $v = 40\\text{ m/s}$. $a_c = \\frac{40^2}{600} = \\frac{1600}{600} = 2.67\\text{ m/s}^2$."
  },
  {
    id: "centripetal-force",
    name: "Centripetal Force",
    latex: "F_c = \\frac{m v^2}{r} = m a_c",
    displayLatex: "F_c = \\frac{m v^2}{r} = m a_c",
    topic: "Chapter 8: Rotational Motion",
    triggerKeywords: ["centripetal force", "inward force", "friction to keep car on road", "tension on string in circle"],
    plainEnglish: "Any force that pulls or pushes an object INWARD to keep it moving in a circle. Friction on tires, tension on a string, or gravity on the Moon.",
    variables: [
      { sym: "F_c", name: "Centripetal Force", unit: "\\text{N}" },
      { sym: "m", name: "Mass", unit: "\\text{kg}" },
      { sym: "v", name: "Velocity", unit: "\\text{m/s}" },
      { sym: "r", name: "Radius", unit: "\\text{m}" }
    ],
    algebraLifeline: [
      { find: "F_c \\text{ (Centripetal Force)}", formulaLatex: "F_c = \\frac{m v^2}{r}", tip: "Mass $\\times$ speed squared, divided by radius." }
    ],
    example: "A $1000\\text{ kg}$ car takes a $50\\text{ m}$ radius turn at $10\\text{ m/s}$. $F_c = \\frac{(1000)(10^2)}{50} = 2000\\text{ N}$ inward friction."
  },
  {
    id: "torque",
    name: "Torque (Twisting Force)",
    latex: "\\tau = F \\times d_\\perp",
    displayLatex: "\\tau = F \\times d_\\perp",
    topic: "Chapter 8: Rotational Motion",
    triggerKeywords: ["torque", "wrench", "lever arm", "see-saw balance", "opening a door", "rotation balance"],
    plainEnglish: "Torque makes things rotate. To maximize torque, push with maximum force at the FURTHEST point from the pivot (hinge) at a $90^\\circ$ right angle.",
    variables: [
      { sym: "\\tau", name: "Torque", unit: "\\text{N}\\cdot\\text{m}" },
      { sym: "F", name: "Force", unit: "\\text{N}" },
      { sym: "d_\\perp", name: "Lever Arm Distance", unit: "\\text{m}" }
    ],
    algebraLifeline: [
      { find: "\\tau \\text{ (Torque)}", formulaLatex: "\\tau = F \\cdot d", tip: "Force multiplied by distance from pivot." },
      { find: "F \\text{ (Force needed)}", formulaLatex: "F = \\frac{\\tau}{d}", tip: "Torque divided by lever arm. Longer wrench = less force needed!" }
    ],
    example: "Pulling a $0.25\\text{ m}$ wrench with $80\\text{ N}$: $\\tau = (80)(0.25) = 20\\text{ N}\\cdot\\text{m}$."
  }
];

const TRAPS = [
  {
    id: "trap-gravity",
    title: "🚨 The '$g = 9.8\\text{ m/s}^2$' Trap (Addie's Test 1 Pitfall!)",
    badge: "CRITICAL EXAM TRAP",
    color: "#ff4d4f",
    description: "Do NOT plug in $g = 9.8\\text{ m/s}^2$ unless the object is physically falling, rising vertically, or calculating weight ($W = mg$)!",
    rule: "Horizontal motion (like a car braking, a cart rolling, or two pucks colliding) uses $a = \\frac{\\Delta v}{\\Delta t}$ or $F = ma$. Gravity $g = 9.8\\text{ m/s}^2$ is ONLY for vertical motion and weight.",
    mnemonic: "Ask yourself: Is it moving up/down in the air? If NO, put $g = 9.8$ away!"
  },
  {
    id: "trap-third-law",
    title: "🚨 Newton's 3rd Law: Bug vs. Windshield",
    badge: "CONCEPTUAL TRAP",
    color: "#fa8c16",
    description: "When a massive semi-truck hits a tiny mosquito, which exerts more force?",
    rule: "THE FORCES ARE EXACTLY EQUAL! ($F_{\\text{truck}} = -F_{\\text{bug}}$). The bug splatters because its mass is tiny, so its acceleration is huge ($a = \\frac{F}{m}$). The interaction forces are ALWAYS identical.",
    mnemonic: "Action = -Reaction. Forces are ALWAYS twins in size, no exceptions!"
  },
  {
    id: "trap-speed-squared",
    title: "🚨 The Speed-Squared Trap ($KE$ and Stopping Distance)",
    badge: "MATH & CONCEPT TRAP",
    color: "#722ed1",
    description: "If your car goes $2\\times$ as fast, how much further does it skid to stop?",
    rule: "It skids $4\\text{ TIMES}$ as far, NOT $2\\text{ times}$! $KE = \\frac{1}{2} m v^2$. When speed is $2\\times$, energy is $2^2 = 4\\times$. When speed is $3\\times$, energy is $3^2 = 9\\times$!",
    mnemonic: "Speed is SQUARED in kinetic energy and stopping distance ($d \\propto v^2$)."
  },
  {
    id: "trap-bouncing",
    title: "🚨 Bouncing vs. Stopping (Impulse)",
    badge: "CONCEPTUAL TRAP",
    color: "#13c2c2",
    description: "Does stopping a ball or bouncing it back take more impulse?",
    rule: "BOUNCING takes roughly DOUBLE the impulse! Stopping takes $\\Delta p = m(0 - v) = -mv$. Bouncing back takes $\\Delta p = m(-v - v) = -2mv$. A flowerpot falling on your head hurts worse if it bounces!",
    mnemonic: "Bounce = Double the punch (double the impulse, $\\approx 2mv$)."
  },
  {
    id: "trap-centrifugal",
    title: "🚨 'Centrifugal Force' Is Not a Real Outward Pull",
    badge: "CONCEPTUAL TRAP",
    color: "#eb2f96",
    description: "When you turn sharp in a car, are you pushed outward by an outward force?",
    rule: "NO! There is NO outward force. Your body has INERTIA and just wants to continue traveling straight. The only real force is the INWARD centripetal force ($F_c = \\frac{m v^2}{r}$) from the door/seatbelt pushing you into the curve.",
    mnemonic: "Centripetal = Center-seeking (real inward pull). Centrifugal = Just inertia feeling thrown."
  }
];

// Conceptual Question Bank from Hewitt practice exams (Chapters 5, 6, 7, 8)
const CONCEPT_QUESTIONS = [
  // Chapter 5: Newton's Third Law
  {
    id: "c5-1",
    chapter: 5,
    chapterTitle: "Chapter 5: Newton's Third Law",
    question: "A player catches a ball. The action force is the impact of the ball against the player's glove. What is the reaction force?",
    options: [
      "The player's grip on the glove",
      "The force the glove exerts on the ball",
      "Friction of the ground on the player's shoes",
      "The muscular effort of the player's arm"
    ],
    correct: 1,
    plainEnglish: "Newton's 3rd Law is a simple mirror sentence: If object A pushes object B, then object B pushes object A. Action: Ball hits glove. Reaction: Glove pushes ball.",
    trapTip: "Don't bring in third objects like shoes or arm muscles. Just swap the two interacting objects!"
  },
  {
    id: "c5-2",
    chapter: 5,
    chapterTitle: "Chapter 5: Newton's Third Law",
    question: "A high-speed truck hits a flying bug splattering it on the windshield. Compared to the force of the truck on the bug, the force of the bug on the truck is:",
    options: [
      "Much smaller because the bug has tiny mass",
      "Much larger because the truck has more momentum",
      "Exactly the same size",
      "Zero because the bug gets squashed"
    ],
    correct: 2,
    plainEnglish: "Newton's 3rd law NEVER allows one force to be larger than the other. Truck on bug = bug on truck ($F_{\\text{truck}} = -F_{\\text{bug}}$). The bug splatters because its mass is tiny, so its acceleration is huge ($a = \\frac{F}{m}$).",
    trapTip: "Common intuition says 'truck hits harder.' Physics says: Forces are identical; damages differ because masses differ!"
  },
  {
    id: "c5-3",
    chapter: 5,
    chapterTitle: "Chapter 5: Newton's Third Law",
    question: "A person is attracted toward the center of the Earth by a $500\\text{ N}$ gravitational force. The force with which Earth is attracted toward the person is:",
    options: [
      "Very very small, practically zero",
      "Exactly $500\\text{ N}$",
      "Dependent on the person's volume",
      "Equal to Earth's mass multiplied by $500$"
    ],
    correct: 1,
    plainEnglish: "If Earth pulls you down with $500\\text{ N}$, YOU pull the entire planet Earth up with exactly $500\\text{ N}$! Earth doesn't move noticeably because its mass is $6 \\times 10^{24}\\text{ kg}$.",
    trapTip: "Remember the mirror rule: Earth pulls Person = Person pulls Earth with the identical force."
  },
  {
    id: "c5-4",
    chapter: 5,
    chapterTitle: "Chapter 5: Newton's Third Law",
    question: "A karate chop breaks a wood board. How does the force exerted on the board compare to the force exerted on the hand?",
    options: [
      "The force on the board is greater to break it",
      "The force on the hand is greater",
      "The forces are equal in magnitude",
      "The hand exerts force, but the board exerts no force"
    ],
    correct: 2,
    plainEnglish: "Both feel the exact same force. The board breaks because wood has a lower breaking threshold than human bone and muscle.",
    trapTip: "Newton's 3rd law pairs are always equal in magnitude and opposite in direction."
  },
  {
    id: "c5-5",
    chapter: 5,
    chapterTitle: "Chapter 5: Newton's Third Law",
    question: "Two people pull on opposite ends of a rope in a tug-of-war. Each pulls with $400\\text{ N}$ of force. What is the tension in the rope?",
    options: [
      "$0\\text{ N}$ (they cancel out)",
      "$400\\text{ N}$",
      "$800\\text{ N}$",
      "$200\\text{ N}$"
    ],
    correct: 1,
    plainEnglish: "Tension throughout a single rope pulled by $400\\text{ N}$ at each end is $400\\text{ N}$. If you tied one end to a solid tree and pulled with $400\\text{ N}$, the tree pulls back with $400\\text{ N}$ and the rope feels $400\\text{ N}$.",
    trapTip: "Do NOT add $400 + 400 = 800\\text{ N}$! A rope holding $400\\text{ N}$ must have $400\\text{ N}$ pulling both ways to remain in equilibrium."
  },

  // Chapter 6: Momentum
  {
    id: "c6-1",
    chapter: 6,
    chapterTitle: "Chapter 6: Momentum & Impulse",
    question: "Which has a greater momentum: a heavy truck parked at the curb, or a moving skateboard?",
    options: [
      "The truck, because it has vastly more mass",
      "The skateboard, because it has velocity while the truck's velocity is zero",
      "Both have the same momentum",
      "It depends on the truck's weight"
    ],
    correct: 1,
    plainEnglish: "Momentum formula is $p = m v$. If velocity is ZERO, momentum is ZERO! No matter how heavy the parked truck is, $p = m \\times 0 = 0$.",
    trapTip: "Inertia is just mass (the truck has huge inertia). But MOMENTUM requires motion ($p = mv$)."
  },
  {
    id: "c6-2",
    chapter: 6,
    chapterTitle: "Chapter 6: Momentum & Impulse",
    question: "Why does an airbag in a car reduce the severity of injuries during a crash?",
    options: [
      "It reduces the total change in momentum required to stop you",
      "It lengthens the time of impact ($\\Delta t$), which reduces the impact force ($F$)",
      "It absorbs the gravity acting on your body",
      "It increases the impulse delivered to your head"
    ],
    correct: 1,
    plainEnglish: "Your momentum change ($\\Delta p$) is fixed (you must come to a stop). Since $F \\Delta t = \\Delta p$, increasing the time ($\\Delta t$) by cushioning makes the impact force ($F = \\frac{\\Delta p}{\\Delta t}$) much smaller!",
    trapTip: "The airbag does NOT reduce the impulse or change in momentum—it spreads that impulse over a longer time."
  },
  {
    id: "c6-3",
    chapter: 6,
    chapterTitle: "Chapter 6: Momentum & Impulse",
    question: "A heavy rifle fires a light bullet. How does the recoil speed of the rifle compare to the speed of the bullet?",
    options: [
      "The rifle recoils at the exact same speed as the bullet",
      "The rifle recoils at a much lower speed because it has much greater mass",
      "The rifle has greater speed because it is heavier",
      "The rifle does not move at all"
    ],
    correct: 1,
    plainEnglish: "Momentum is conserved: $m_{\\text{rifle}} v_{\\text{rifle}} = m_{\\text{bullet}} v_{\\text{bullet}}$. Since the rifle is very heavy, its speed $v_{\\text{rifle}} = \\frac{m_{\\text{bullet}} v_{\\text{bullet}}}{m_{\\text{rifle}}}$ is small.",
    trapTip: "Both experience the SAME magnitude of momentum, but because $m_{\\text{rifle}}$ is huge, $v_{\\text{rifle}}$ is small."
  },
  {
    id: "c6-4",
    chapter: 6,
    chapterTitle: "Chapter 6: Momentum & Impulse",
    question: "A red rubber ball and a lump of sticky clay have equal mass and are thrown at a wall at equal speeds. The ball bounces off; the clay sticks. Which delivers a greater impulse to the wall?",
    options: [
      "The clay, because all its energy goes into the wall",
      "The bouncing rubber ball",
      "Both deliver the exact same impulse",
      "Neither delivers impulse because momentum is conserved"
    ],
    correct: 1,
    plainEnglish: "Bouncing requires stopping AND reversing direction! Stopping takes $\\Delta p = mv$. Bouncing back takes $\\Delta p = 2mv$. Bouncing delivers roughly twice the impulse to the wall.",
    trapTip: "Bouncing is always a bigger impulse than merely stopping."
  },
  {
    id: "c6-5",
    chapter: 6,
    chapterTitle: "Chapter 6: Momentum & Impulse",
    question: "A $5\\text{ kg}$ freight car moving at $4\\text{ m/s}$ collides with an identical stationary $5\\text{ kg}$ freight car, and they couple together. What is their combined speed after the collision?",
    options: [
      "$4\\text{ m/s}$",
      "$2\\text{ m/s}$",
      "$1\\text{ m/s}$",
      "$0\\text{ m/s}$"
    ],
    correct: 1,
    plainEnglish: "Initial momentum = $(5\\text{ kg})(4\\text{ m/s}) = 20\\text{ kg}\\cdot\\text{m/s}$. After sticking, total mass = $5 + 5 = 10\\text{ kg}$. Speed $v_f = \\frac{20}{10} = 2\\text{ m/s}$. (Mass doubled, so speed halved!)",
    trapTip: "When identical masses stick to a stationary one, the speed is simply cut in half."
  },

  // Chapter 7: Energy
  {
    id: "c7-1",
    chapter: 7,
    chapterTitle: "Chapter 7: Energy & Work",
    question: "If a car's speed increases from $30\\text{ km/h}$ to $60\\text{ km/h}$ (speed doubles), what happens to its kinetic energy?",
    options: [
      "It doubles ($2\\times$)",
      "It triples ($3\\times$)",
      "It quadruples ($4\\times$)",
      "It stays the same"
    ],
    correct: 2,
    plainEnglish: "Kinetic energy formula is $KE = \\frac{1}{2} m v^2$. Because velocity is SQUARED, doubling speed makes energy $2^2 = 4$ times as great!",
    trapTip: "Always square the speed change factor! Double speed $\\to 4\\times KE$. Triple speed $\\to 9\\times KE$."
  },
  {
    id: "c7-2",
    chapter: 7,
    chapterTitle: "Chapter 7: Energy & Work",
    question: "A car traveling at $50\\text{ km/h}$ skids $15\\text{ m}$ to a stop. If the same car travels at $100\\text{ km/h}$ (twice as fast), how far will it skid with locked brakes?",
    options: [
      "$30\\text{ meters}$",
      "$45\\text{ meters}$",
      "$60\\text{ meters}$",
      "$15\\text{ meters}$"
    ],
    correct: 2,
    plainEnglish: "Twice the speed means $4\\times$ the kinetic energy ($2^2 = 4$). Braking work is $W = F \\cdot d$. Since braking friction $F$ is constant, stopping distance must be 4 times longer: $15\\text{ m} \\times 4 = 60\\text{ meters}$!",
    trapTip: "Stopping distance is proportional to speed SQUARED ($d \\propto v^2$), not linear speed!"
  },
  {
    id: "c7-3",
    chapter: 7,
    chapterTitle: "Chapter 7: Energy & Work",
    question: "A $100\\text{ N}$ box is pushed $5\\text{ m}$ across a frictionless floor at constant speed. Then it is lifted $5\\text{ m}$ vertically. In which action is work done against gravity?",
    options: [
      "Only when pushed horizontally",
      "Only when lifted vertically",
      "Equally in both actions",
      "Neither, because energy is conserved"
    ],
    correct: 1,
    plainEnglish: "Gravity acts straight DOWN. To do work against gravity, movement must be VERTICAL ($W = mgh$). Pushing horizontally on a level floor does ZERO work against gravity.",
    trapTip: "Work = Force $\\times$ distance in the direction of the force. Horizontal motion is perpendicular to gravity ($90^\\circ$), so gravity does no work."
  },
  {
    id: "c7-4",
    chapter: 7,
    chapterTitle: "Chapter 7: Energy & Work",
    question: "A roller coaster car starts from rest at the top of a $20\\text{-meter}$ high hill. Ignoring friction, what happens to its potential energy as it reaches the bottom?",
    options: [
      "It is completely lost and destroyed",
      "It turns entirely into kinetic energy",
      "It turns into mass",
      "It stays constant as potential energy"
    ],
    correct: 1,
    plainEnglish: "Conservation of energy: Energy cannot be created or destroyed. The gravitational potential energy at the top ($mgh$) transforms completely into kinetic energy ($\\frac{1}{2} mv^2$) at the bottom.",
    trapTip: "Total Mechanical Energy ($PE + KE$) remains constant if there is no friction."
  },
  {
    id: "c7-5",
    chapter: 7,
    chapterTitle: "Chapter 7: Energy & Work",
    question: "Which requires more work: lifting a $50\\text{ kg}$ sack vertically $2\\text{ m}$, or lifting a $25\\text{ kg}$ sack vertically $4\\text{ m}$?",
    options: [
      "Lifting the $50\\text{ kg}$ sack",
      "Lifting the $25\\text{ kg}$ sack",
      "Both require the exact same amount of work",
      "Neither requires work if done slowly"
    ],
    correct: 2,
    plainEnglish: "Work $= F \\cdot d = mgh$. Sack 1: $(50)(g)(2) = 100g$. Sack 2: $(25)(g)(4) = 100g$. Both require identical work (approx. $980\\text{ Joules}$)!",
    trapTip: "Half the weight over twice the height equals the exact same product: $50 \\times 2 = 25 \\times 4 = 100$."
  },

  // Chapter 8: Rotational Motion
  {
    id: "c8-1",
    chapter: 8,
    chapterTitle: "Chapter 8: Rotational Motion",
    question: "On a rotating carousel (merry-go-round), which horse has a greater linear (tangential) speed?",
    options: [
      "A horse near the center hub",
      "A horse on the outer rim",
      "Both horses have the same linear speed",
      "Neither has linear speed because it is rotating"
    ],
    correct: 1,
    plainEnglish: "Both horses complete one full circle in the same time (same rotational speed $\\omega$ in RPM). But the outside horse travels around a much bigger circumference, so its linear speed ($v = r \\omega$) is much greater!",
    trapTip: "Rotational speed (RPM) is the SAME for both. Linear speed ($v = r\\omega$) is GREATER on the outer edge."
  },
  {
    id: "c8-2",
    chapter: 8,
    chapterTitle: "Chapter 8: Rotational Motion",
    question: "To easily loosen a tight nut with a wrench, you should:",
    options: [
      "Use a shorter wrench and pull near the nut",
      "Use a longer wrench and pull at the very end of the handle",
      "Pull at a $30^\\circ$ angle to the wrench",
      "Apply force as close to the axis as possible"
    ],
    correct: 1,
    plainEnglish: "Torque $= F \\times d_\\perp$. A longer wrench gives you a bigger lever arm ($d$). With a longer handle, you get way more torque from the same muscle force!",
    trapTip: "Lever arm is distance from the pivot. Always maximize lever arm to maximize torque."
  },
  {
    id: "c8-3",
    chapter: 8,
    chapterTitle: "Chapter 8: Rotational Motion",
    question: "When a spinning figure skater pulls her outstretched arms tightly in toward her chest, what happens?",
    options: [
      "She slows down because of air resistance",
      "She spins faster because her rotational inertia decreases and angular momentum is conserved",
      "Her rotational inertia increases",
      "Her angular momentum doubles"
    ],
    correct: 1,
    plainEnglish: "Angular momentum ($L = I \\omega$) is conserved! Pulling mass closer to the axis reduces her rotational inertia ($I$). To keep $L$ constant, her spin rate ($\\omega$) must speed up dramatically!",
    trapTip: "Angular momentum stays CONSTANT. Rotational inertia goes DOWN, so rotational speed goes UP."
  },
  {
    id: "c8-4",
    chapter: 8,
    chapterTitle: "Chapter 8: Rotational Motion",
    question: "A car drives around a sharp horizontal curve at constant speed. What is the direction of the net force acting on the car?",
    options: [
      "Outward, pushing the car off the road",
      "Forward, in the direction of the car's headlights",
      "Inward, toward the center of the curve",
      "Straight downward into the pavement"
    ],
    correct: 2,
    plainEnglish: "Centripetal means 'center-seeking.' To turn in a circle, the force MUST point INWARD toward the center of the curve ($F_c = \\frac{m v^2}{r}$), provided by tire friction.",
    trapTip: "Even though you FEEL thrown outward, the actual physical force is INWARD friction."
  },
  {
    id: "c8-5",
    chapter: 8,
    chapterTitle: "Chapter 8: Rotational Motion",
    question: "Why does a tightrope walker carry a long, heavy pole?",
    options: [
      "To increase her total weight so she presses harder into the wire",
      "To increase her rotational inertia ($I$), making it much harder to tip over quickly",
      "To create an upward lift force like airplane wings",
      "To lower her center of gravity below the wire entirely"
    ],
    correct: 1,
    plainEnglish: "The long pole puts mass far out from her body, greatly increasing her rotational inertia ($I = m r^2$). This makes it resist tipping over, giving her plenty of time to re-balance!",
    trapTip: "Rotational inertia resists changes in rotation. Mass far from the pivot = huge resistance to toppling."
  }
];

// Math Problem Templates for Scaffolded Math Lab
const MATH_TEMPLATES = [
  {
    id: "prob-ke",
    title: "Kinetic Energy Calculation",
    topic: "Energy (Addie's Notes Page 1!)",
    badge: "Direct Exam Problem",
    generate: () => {
      const masses = [2, 3, 4, 5, 6, 8, 10];
      const velocities = [10, 12, 14, 15, 18, 20];
      const m = masses[Math.floor(Math.random() * masses.length)];
      const v = velocities[Math.floor(Math.random() * velocities.length)];
      const vSquared = v * v;
      const answer = 0.5 * m * vSquared;
      
      return {
        prompt: `A box with a mass of <strong>$m = ${m}\\text{ kg}$</strong> is sliding across a smooth floor at a constant speed of <strong>$v = ${v}\\text{ m/s}$</strong>. What is its kinetic energy?`,
        givens: [
          { label: "Mass (m)", val: `$${m}\\text{ kg}$` },
          { label: "Speed (v)", val: `$${v}\\text{ m/s}$` },
          { label: "Goal", val: "$KE \\text{ in Joules}$" }
        ],
        formulaName: "Kinetic Energy Formula",
        displayFormulaLatex: "KE = \\frac{1}{2} m v^2",
        algebraStepsLatex: [
          `Write down the standard equation: $$KE = \\frac{1}{2} m v^2$$`,
          `Square the speed first: $$v^2 = (${v}\\text{ m/s})^2 = ${vSquared}\\text{ m}^2/\\text{s}^2$$`,
          `Multiply mass by speed squared: $$m \\cdot v^2 = (${m}\\text{ kg})(${vSquared}) = ${m * vSquared}$$`,
          `Multiply by $\\frac{1}{2}$ (or divide by 2): $$KE = \\frac{${m * vSquared}}{2} = \\mathbf{${answer}\\text{ Joules}}$$`
        ],
        answer: answer,
        unit: "J",
        trapAlert: `⚠️ Remember to SQUARE the speed first: $${v}^2 = ${vSquared}$ BEFORE multiplying! Do not do $\\frac{1}{2} m v$ and then square.`
      };
    }
  },
  {
    id: "prob-velocity-from-ke",
    title: "Find Speed from Kinetic Energy (Algebra Rearrangement)",
    topic: "Energy / Algebra Practice",
    badge: "Algebra Lifeline",
    generate: () => {
      const vList = [4, 5, 6, 8, 10, 12];
      const mList = [2, 4, 8];
      const v = vList[Math.floor(Math.random() * vList.length)];
      const m = mList[Math.floor(Math.random() * mList.length)];
      const ke = 0.5 * m * (v * v);
      
      return {
        prompt: `An object of mass <strong>$m = ${m}\\text{ kg}$</strong> has a kinetic energy of <strong>$KE = ${ke}\\text{ Joules}$</strong>. What is its speed (velocity)?`,
        givens: [
          { label: "Mass (m)", val: `$${m}\\text{ kg}$` },
          { label: "Kinetic Energy (KE)", val: `$${ke}\\text{ J}$` },
          { label: "Goal", val: "$v \\text{ in m/s}$" }
        ],
        formulaName: "Rearranged KE Formula (Solved for v)",
        displayFormulaLatex: "v = \\sqrt{\\frac{2 \\cdot KE}{m}}",
        algebraStepsLatex: [
          `Start with the base formula: $$KE = \\frac{1}{2} m v^2$$`,
          `Multiply both sides by 2 and divide by $m$ to isolate $v^2$: $$v^2 = \\frac{2 \\cdot KE}{m}$$`,
          `Plug in the known values: $$v^2 = \\frac{2 \\times ${ke}}{${m}} = \\frac{${2 * ke}}{${m}} = ${v * v}$$`,
          `Take the square root of both sides: $$v = \\sqrt{${v * v}} = \\mathbf{${v}\\text{ m/s}}$$`
        ],
        answer: v,
        unit: "m/s",
        trapAlert: `⚠️ Addie's Algebra Lifeline: Don't forget the final square root! If your calculator shows $${v * v}$, hit the $\\sqrt{\\phantom{x}}$ button to get $${v}$.`
      };
    }
  },
  {
    id: "prob-centripetal-accel",
    title: "Centripetal Acceleration (Outer Edge / Habitat)",
    topic: "Rotational Motion (Addie's Notes Page 1!)",
    badge: "Direct Exam Problem",
    generate: () => {
      const scenarios = [
        { v: 40, r: 600, desc: "A rotating cylindrical spaceship with radius $r = 600\\text{ m}$ spinning at tangential speed $v = 40\\text{ m/s}$" },
        { v: 30, r: 450, desc: "A circular space station with radius $r = 450\\text{ m}$ rotating at speed $v = 30\\text{ m/s}$" },
        { v: 20, r: 100, desc: "A racecar driving along a curved track of radius $r = 100\\text{ m}$ at speed $v = 20\\text{ m/s}$" },
        { v: 10, r: 25, desc: "A cyclist cornering a round track with radius $r = 25\\text{ m}$ at speed $v = 10\\text{ m/s}$" },
        { v: 15, r: 75, desc: "A theme park centrifuge ride with radius $r = 75\\text{ m}$ spinning riders at $v = 15\\text{ m/s}$" }
      ];
      const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
      const v2 = sc.v * sc.v;
      const rawAns = v2 / sc.r;
      const answer = Math.round(rawAns * 100) / 100;

      return {
        prompt: `${sc.desc}. What is the centripetal acceleration on the outer edge?`,
        givens: [
          { label: "Speed (v)", val: `$${sc.v}\\text{ m/s}$` },
          { label: "Radius (r)", val: `$${sc.r}\\text{ m}$` },
          { label: "Goal", val: "$a_c \\text{ in m/s}^2$" }
        ],
        formulaName: "Centripetal Acceleration Formula",
        displayFormulaLatex: "a_c = \\frac{v^2}{r}",
        algebraStepsLatex: [
          `Identify the inward acceleration formula: $$a_c = \\frac{v^2}{r}$$`,
          `Square the speed: $$v^2 = (${sc.v})^2 = ${v2}$$`,
          `Divide by the radius: $$a_c = \\frac{${v2}}{${sc.r}} = \\mathbf{${answer}\\text{ m/s}^2}$$`
        ],
        answer: answer,
        unit: "m/s²",
        trapAlert: `⚠️ Do NOT plug in $g = 9.8\\text{ m/s}^2$! This acceleration is caused purely by rotation (turning in a circle), so you must calculate $\\frac{v^2}{r}$.`
      };
    }
  },
  {
    id: "prob-momentum-change",
    title: "Change in Momentum (\\Delta p = m \\Delta v)",
    topic: "Momentum (Addie's Notes Page 1!)",
    badge: "Direct Exam Problem",
    generate: () => {
      const masses = [500, 800, 1000, 1200, 1500];
      const v1s = [10, 15, 20, 25];
      const v2s = [0, 5, 8];
      const m = masses[Math.floor(Math.random() * masses.length)];
      const v1 = v1s[Math.floor(Math.random() * v1s.length)];
      const v2 = v2s[Math.floor(Math.random() * v2s.length)];
      const deltaV = v2 - v1;
      const rawAns = m * deltaV;
      const absAns = Math.abs(rawAns);

      return {
        prompt: `A <strong>$m = ${m}\\text{ kg}$</strong> car traveling horizontally at <strong>$v_1 = ${v1}\\text{ m/s}$</strong> slows down to <strong>$v_2 = ${v2}\\text{ m/s}$</strong>. What is the magnitude of the car's change in momentum?`,
        givens: [
          { label: "Mass (m)", val: `$${m}\\text{ kg}$` },
          { label: "Initial Velocity (v1)", val: `$${v1}\\text{ m/s}$` },
          { label: "Final Velocity (v2)", val: `$${v2}\\text{ m/s}$` },
          { label: "Goal", val: "$|\\Delta p| \\text{ in kg}\\cdot\\text{m/s}$" }
        ],
        formulaName: "Change in Momentum Formula",
        displayFormulaLatex: "\\Delta p = m(v_2 - v_1) = m v_2 - m v_1",
        algebraStepsLatex: [
          `Formula from notes: $$\\Delta p = m(v_2 - v_1)$$`,
          `Calculate velocity change: $$\\Delta v = v_2 - v_1 = ${v2} - ${v1} = ${deltaV}\\text{ m/s}$$`,
          `Multiply by mass: $$\\Delta p = (${m}\\text{ kg})(${deltaV}\\text{ m/s}) = ${rawAns}\\text{ kg}\\cdot\\text{m/s}$$`,
          `Magnitude (size without negative sign): $$|\\Delta p| = \\mathbf{${absAns}\\text{ kg}\\cdot\\text{m/s}}$$`
        ],
        answer: absAns,
        unit: "kg·m/s",
        trapAlert: `⚠️ THE #1 TEST 1 TRAP: This is a car moving HORIZONTALLY. Do NOT use $g = 9.8\\text{ m/s}^2$! Gravity is only for vertical falling.`
      };
    }
  },
  {
    id: "prob-inelastic-collision",
    title: "Collision & Sticking Together (Inelastic)",
    topic: "Momentum Conservation",
    badge: "Frequent Exam Type",
    generate: () => {
      const m1List = [2, 3, 4, 5];
      const v1List = [6, 8, 10, 12];
      const m2List = [2, 3, 4, 6];
      const m1 = m1List[Math.floor(Math.random() * m1List.length)];
      const v1 = v1List[Math.floor(Math.random() * v1List.length)];
      const m2 = m2List[Math.floor(Math.random() * m2List.length)];
      const totalP = m1 * v1;
      const totalM = m1 + m2;
      const rawAns = totalP / totalM;
      const answer = Math.round(rawAns * 100) / 100;

      return {
        prompt: `A <strong>$m_1 = ${m1}\\text{ kg}$</strong> toy cart moving at <strong>$v_1 = ${v1}\\text{ m/s}$</strong> collides with a stationary (at rest, $v_2 = 0$) <strong>$m_2 = ${m2}\\text{ kg}$</strong> cart. If they latch and stick together, what is their final speed?`,
        givens: [
          { label: "Cart 1 (m1, v1)", val: `$${m1}\\text{ kg}, ${v1}\\text{ m/s}$` },
          { label: "Cart 2 (m2, v2)", val: `$${m2}\\text{ kg}, 0\\text{ m/s}$` },
          { label: "Goal", val: "$v_f \\text{ in m/s}$" }
        ],
        formulaName: "Conservation of Momentum (Inelastic)",
        displayFormulaLatex: "v_f = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}",
        algebraStepsLatex: [
          `Calculate total initial momentum: $$p_{\\text{initial}} = m_1 v_1 + m_2(0) = (${m1})(${v1}) = ${totalP}\\text{ kg}\\cdot\\text{m/s}$$`,
          `Calculate combined mass: $$m_{\\text{total}} = m_1 + m_2 = ${m1} + ${m2} = ${totalM}\\text{ kg}$$`,
          `Solve for final speed: $$v_f = \\frac{p_{\\text{initial}}}{m_{\\text{total}}} = \\frac{${totalP}}{${totalM}} = \\mathbf{${answer}\\text{ m/s}}$$`
        ],
        answer: answer,
        unit: "m/s",
        trapAlert: `⚠️ Keyword Trigger: 'Stick together' means masses combine! Always divide total initial momentum by $(m_1 + m_2)$.`
      };
    }
  }
];
