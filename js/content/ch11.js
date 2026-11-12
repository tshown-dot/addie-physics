import { T, pick } from '../util.js';

// [name, protons, mass number]
const ISO = [
  ['carbon-12', 6, 12], ['carbon-14', 6, 14], ['oxygen-16', 8, 16], ['oxygen-18', 8, 18],
  ['sodium-23', 11, 23], ['chlorine-37', 17, 37], ['potassium-40', 19, 40], ['iron-56', 26, 56],
  ['cobalt-59', 27, 59], ['cobalt-60', 27, 60], ['gold-197', 79, 197], ['uranium-235', 92, 235], ['uranium-238', 92, 238],
];
// [name, protons, charge]
const IONS = [['sodium', 11, 1], ['calcium', 20, 2], ['aluminum', 13, 3], ['chlorine', 17, -1], ['oxygen', 8, -2], ['magnesium', 12, 2], ['fluorine', 9, -1]];
const sign = (c) => (c > 0 ? `+${c}` : `${c}`);

export default {
  id: 11,
  title: 'The Atomic Nature of Matter',
  icon: '⚛️',

  ideas: [
    { t: 'The atomic hypothesis', b: T`Aristotle thought matter was made of four elements: **earth, air, fire and water**. The Greeks proposed atoms, and **John Dalton** revived the idea in the 1800s. In 1827 **Robert Brown** saw tiny particles jiggling (**Brownian motion**), and **Einstein** later explained it as atoms bumping into them. That was the proof atoms exist.` },
    { t: 'What atoms are like', b: T`Atoms are **incredibly tiny**, **numerous**, **always moving** and **ageless**. The atoms in your body were made in ancient stars. They are smaller than the wavelength of visible light, so you can never see one with an ordinary microscope. A scanning tunneling microscope can image them.` },
    { t: 'Inside the atom', b: T`Almost all the mass is in the tiny **nucleus**, made of **nucleons**: positive **protons** and neutral **neutrons**. Nucleons are made of **quarks**. Light, negative **electrons** surround the nucleus and are responsible for chemistry. The electron has the least mass.` },
    { t: 'Elements and the periodic table', b: T`An element is made of only one kind of atom. **Hydrogen** is the lightest and most abundant. About 115 are known and about 90 occur in nature. The periodic table is ordered by **atomic number = number of protons**. The far right column holds the **noble gases**. Living things are mostly **oxygen, carbon, hydrogen, nitrogen and calcium**.` },
    { t: 'Ions and isotopes', b: T`Change the **electrons** and you get an **ion** (a charged atom). Lose electrons: positive ion. Gain electrons: negative ion. Change the **neutrons** and you get an **isotope**: same element, different mass number. **Mass number = protons + neutrons.**` },
    { t: 'Compounds, mixtures, molecules', b: T`A **compound** is different elements chemically bonded (salt, water). It can only be split by chemical means. A **mixture** is just stirred together with no bonding (**air**). A **molecule** is two or more atoms bonded together. Pulling molecules apart takes energy. Joining atoms releases it.` },
    { t: 'Antimatter and dark matter', b: T`Antimatter has **negative nuclei** and **positive electrons (positrons)**. Matter and antimatter cannot both exist in our environment because they destroy each other. **Dark matter** is unseen matter that makes up about **23%** of the universe. **Dark energy** is about **73%**.` },
  ],

  facts: [
    T`Atomic number = protons. Mass number = protons + neutrons`,
    T`Neutrons = mass number − protons`,
    T`Neutral atom: electrons = protons`,
    T`**Ion**: electrons added or removed. **Isotope**: neutrons added or removed`,
    T`**Air is a mixture.** Salt is a compound`,
    T`Brownian motion: Brown saw it (1827), Einstein explained it`,
    T`Hydrogen: lightest and most abundant. About 115 elements, 90 natural`,
    T`Living things: O, C, H, N, Ca`,
    T`Dark matter about 23%, dark energy about 73%`,
  ],

  traps: [
    { t: 'Ion or isotope?', wrong: 'An isotope is a charged atom.', right: 'Ion = electrons changed (charged). Isotope = neutrons changed (same element, different mass).', hook: 'IoN has a Net charge. Isotope: same spot in the table, different weight.' },
    { t: 'Atomic number or mass number?', wrong: 'Iron-56 has 56 protons.', right: 'The 56 is the mass number (protons + neutrons). Iron has 26 protons, so 56 − 26 = 30 neutrons.', hook: 'The number after the name counts everything in the nucleus.' },
    { t: 'Compound or mixture?', wrong: 'Air is a compound of oxygen and nitrogen.', right: 'Air is a mixture. Its gases are not chemically bonded to each other. Salt and water are compounds.', hook: 'Bonded = compound. Just mixed = mixture.' },
    { t: 'Positive ions', wrong: 'A positive ion has gained something positive.', right: 'A positive ion has LOST electrons. Protons never leave in ordinary chemistry.', hook: 'Lose negatives, become positive.' },
  ],

  formulas: [
    {
      id: 'mass-number', name: 'Mass number', latex: T`\text{mass number} = \text{protons} + \text{neutrons}`,
      plain: 'The number after an element name (iron-56) counts every particle in the nucleus.',
      triggers: ['iron-56', 'carbon-14', 'how many neutrons', 'mass number', 'nucleons'],
      forms: [
        { for: 'A', label: 'mass number', latex: T`\text{mass number} = \text{protons} + \text{neutrons}`, tip: 'Add them.' },
        { for: 'n', label: 'neutrons', latex: T`\text{neutrons} = \text{mass number} - \text{protons}`, tip: 'Subtract the protons.' },
        { for: 'p', label: 'protons', latex: T`\text{protons} = \text{mass number} - \text{neutrons}`, tip: 'Subtract the neutrons.' },
      ],
    },
    {
      id: 'ion-charge', name: 'Ion charge', latex: T`\text{charge} = \text{protons} - \text{electrons}`,
      plain: 'Each proton is +1 and each electron is −1. A neutral atom has the same number of each.',
      triggers: ['ion', 'net charge', 'lost electrons', 'gained electrons', 'how many electrons'],
      forms: [
        { for: 'q', label: 'charge', latex: T`\text{charge} = \text{protons} - \text{electrons}`, tip: 'Protons minus electrons.' },
        { for: 'e', label: 'electrons', latex: T`\text{electrons} = \text{protons} - \text{charge}`, tip: 'Protons minus the charge. Careful with negative charges.' },
      ],
    },
  ],

  scenarios: [
    { id: 's11-1', q: 'An atom of cobalt-60 has 27 protons. How many neutrons does it have?', clues: ['cobalt-60', '27 protons', 'how many neutrons'], f: 'mass-number', why: 'The 60 is the mass number: protons plus neutrons. Subtract the protons.' },
    { id: 's11-2', q: 'An atom has 11 protons and 10 electrons. What is its net charge?', clues: ['protons', 'electrons', 'net charge'], f: 'ion-charge', why: 'Charge is protons minus electrons.' },
    { id: 's11-3', q: 'A nucleus contains 8 protons and 10 neutrons. Which isotope of oxygen is it?', clues: ['protons and neutrons', 'which isotope'], f: 'mass-number', why: 'Isotopes are named by mass number: protons plus neutrons.' },
    { id: 's11-4', q: 'A calcium atom (20 protons) becomes an ion with charge +2. How many electrons does it have now?', clues: ['ion', 'charge +2', 'how many electrons'], f: 'ion-charge', why: 'Charge links protons and electrons. Rearranged: electrons = protons − charge.' },
  ],

  questions: [
    { id: 'q11-1', q: 'Aristotle believed all matter was a combination of', o: ['atoms and empty space', 'earth, air, fire and water', 'protons and electrons', 'hydrogen and helium'], a: 1, why: 'Aristotle’s four elements were earth, air, fire and water. The idea of atoms came from other Greek thinkers.' },
    { id: 'q11-2', q: 'Brownian motion is', o: ['the orbit of electrons around the nucleus', 'the jiggling of tiny visible particles as invisible atoms bump into them', 'the flow of electric current', 'the spinning of the nucleus'], a: 1, why: 'Robert Brown saw tiny grains jiggling under a microscope in 1827. They were being hit by fast-moving atoms and molecules.' },
    { id: 'q11-3', q: 'Who explained Brownian motion and so confirmed that atoms exist?', o: ['Robert Brown', 'John Dalton', 'Albert Einstein', 'Aristotle'], a: 2, why: 'Brown observed it. Einstein explained it in 1905, which was convincing evidence for atoms.', trap: 'Brown saw it. Einstein explained it.' },
    { id: 'q11-4', q: 'Which is NOT a characteristic of atoms?', o: ['They are incredibly tiny', 'They are numerous', 'They are always moving', 'They wear out with age'], a: 3, why: 'Atoms are ageless. The atoms in your body are older than the Sun and get recycled over and over.' },
    { id: 'q11-5', q: 'Atoms cannot be seen with visible light because', o: ['they move too fast', 'they are smaller than the wavelengths of light', 'they are transparent', 'they have no colour'], a: 1, why: 'Light waves are far bigger than atoms, so they diffract around them and cannot form an image.' },
    { id: 'q11-6', q: 'Nearly all the mass of an atom is in its', o: ['electrons', 'nucleus', 'outer shell', 'empty space'], a: 1, why: 'Protons and neutrons are each about 1800 times heavier than an electron, and they are all in the nucleus.' },
    { id: 'q11-7', q: 'Nucleons are', o: ['electrons and protons', 'protons and neutrons', 'neutrons and electrons', 'quarks and electrons'], a: 1, why: 'A nucleon is a particle in the nucleus: a proton (positive) or a neutron (neutral).' },
    { id: 'q11-8', q: 'The particles that make up protons and neutrons are called', o: ['ions', 'isotopes', 'quarks', 'positrons'], a: 2, why: 'Each nucleon is made of smaller particles called quarks.' },
    { id: 'q11-9', q: 'Which particle has the least mass?', o: ['Proton', 'Neutron', 'Electron', 'They are all about the same'], a: 2, why: 'The electron is by far the lightest. A proton or neutron is about 1800 times heavier.' },
    { id: 'q11-10', q: 'The lightest and most abundant element in the universe is', o: ['helium', 'oxygen', 'carbon', 'hydrogen'], a: 3, why: 'Hydrogen has just one proton and makes up most of the atoms in the universe.' },
    { id: 'q11-11', q: 'About how many elements occur naturally?', o: ['4', '26', '90', '1000'], a: 2, why: 'About 115 elements are known and about 90 occur in nature. The rest are made in labs and are unstable.' },
    { id: 'q11-12', q: 'Which of these is NOT one of the five most common elements in living things?', o: ['Oxygen', 'Carbon', 'Iron', 'Nitrogen'], a: 2, why: 'The five are oxygen, carbon, hydrogen, nitrogen and calcium.' },
    { id: 'q11-13', q: 'The atomic number of an element is the number of', o: ['neutrons in the nucleus', 'protons in the nucleus', 'nucleons in the nucleus', 'atoms in a molecule'], a: 1, why: 'The periodic table is ordered by atomic number, which is the number of protons. That number decides which element it is.' },
    { id: 'q11-14', q: 'If two protons are added to an oxygen nucleus (8 protons), the result is', o: ['a heavier isotope of oxygen', 'an oxygen ion', 'neon (10 protons)', 'carbon (6 protons)'], a: 2, why: 'Changing the number of protons changes the element. 8 + 2 = 10 protons is neon.', trap: 'Adding neutrons makes an isotope. Adding protons makes a new element.' },
    { id: 'q11-15', q: 'The noble gases are found', o: ['on the far left of the periodic table', 'on the far right, with outer shells filled', 'in the middle of the table', 'only in laboratories'], a: 1, why: 'The far-right column has atoms whose outer electron shells are full, so they rarely react.' },
    { id: 'q11-16', q: 'An ion is an atom that has', o: ['gained or lost neutrons', 'gained or lost electrons', 'gained or lost protons', 'split in half'], a: 1, why: 'Adding or removing electrons leaves the atom with a net charge. That is an ion.' },
    { id: 'q11-17', q: 'A positive ion has', o: ['extra protons', 'extra electrons', 'fewer electrons than protons', 'fewer neutrons than protons'], a: 2, why: 'It has lost one or more electrons, so the positive protons outnumber the negative electrons.' },
    { id: 'q11-18', q: 'Isotopes of an element differ in their number of', o: ['protons', 'electrons', 'neutrons', 'shells'], a: 2, why: 'Same number of protons (same element), different number of neutrons (different mass number).' },
    { id: 'q11-19', q: 'A neutral iron atom has 26 protons. How many electrons surround its nucleus?', o: ['1', '13', '26', '56'], a: 2, why: 'Neutral means the charges balance, so electrons = protons = 26.' },
    { id: 'q11-20', q: 'Air is', o: ['an element', 'a compound', 'a mixture', 'a molecule'], a: 2, why: 'Air is several gases mixed together without being chemically bonded to each other.', trap: 'Starred in your notes as a test item.' },
    { id: 'q11-21', q: 'Table salt (sodium chloride) is', o: ['an element', 'a compound', 'a mixture', 'an isotope'], a: 1, why: 'Sodium and chlorine atoms are chemically bonded. A compound is quite different from the elements it is made of.' },
    { id: 'q11-22', q: 'A compound can be separated into its elements', o: ['by filtering', 'only by chemical means', 'by shaking', 'by cooling'], a: 1, why: 'The atoms are bonded, so it takes a chemical reaction to pull them apart. A mixture can be separated physically.' },
    { id: 'q11-23', q: T`How many atoms are in one molecule of ammonia, $\text{NH}_3$?`, o: ['2', '3', '4', '5'], a: 2, why: 'One nitrogen atom plus three hydrogen atoms makes 4 atoms.' },
    { id: 'q11-24', q: 'Which statement about chemical reactions is correct?', o: ['Pulling molecules apart releases energy', 'Pulling molecules apart requires energy, and combining atoms releases energy', 'Neither needs or releases energy', 'Both always release energy'], a: 1, why: 'Breaking bonds takes energy (sunlight in photosynthesis). Forming bonds releases it (iron rusting).' },
    { id: 'q11-25', q: 'A positron is', o: ['a heavy proton', 'an electron with a positive charge', 'a neutron with a negative charge', 'a kind of quark'], a: 1, why: 'Antimatter is matter with the charges swapped. A positron has the same mass as an electron but a positive charge.' },
    { id: 'q11-26', q: 'Antimatter is not found in our everyday environment because', o: ['it is too heavy', 'it is invisible', 'matter and antimatter annihilate each other when they meet', 'it only exists in liquids'], a: 2, why: 'When a particle meets its antiparticle both are converted to energy, so antimatter cannot last around ordinary matter.' },
    { id: 'q11-27', q: 'Dark matter makes up about what share of the universe?', o: ['4%', '23%', '73%', '100%'], a: 1, why: 'About 23% is dark matter and about 73% is dark energy. Ordinary atoms are only a few percent.', trap: 'Dark matter 23. Dark energy 73.' },
    { id: 'q11-28', q: 'The atoms that make up a newborn baby were originally made', o: ['in the mother’s body', 'in the food the mother ate', 'in ancient stars', 'in Earth’s core'], a: 2, why: 'Atoms are ageless. Elements heavier than hydrogen were made inside stars long before the solar system formed.' },
    { id: 'q11-29', q: 'The chemical properties of an element are due mostly to its', o: ['protons', 'neutrons', 'electrons', 'mass number'], a: 2, why: 'Chemistry is about the outer parts of atoms. Bonding is done by electrons.' },
    { id: 'q11-30', q: 'Going from left to right across a row of the periodic table, atoms generally get', o: ['larger', 'smaller', 'lighter', 'more negative'], a: 1, why: 'More protons means a stronger pull from the nucleus, which draws the electron shells in closer.' },
  ],

  problems: [
    {
      id: 'p11-neutrons', title: 'Counting neutrons', f: 'mass-number', form: 'n',
      make(r) {
        const [name, z, a] = pick(r, ISO);
        return {
          prompt: T`An atom of **${name}** has **${z} protons**. How many neutrons does it have?`,
          givens: [{ s: T`\text{mass number}`, v: `${a}` }, { s: T`\text{protons}`, v: `${z}` }],
          steps: [{ say: `The number in the name (${a}) is protons plus neutrons. Subtract the protons.`, work: T`${a} - ${z} = ${a - z}`, v: a - z }],
          answer: a - z, unit: 'neutrons',
          mistakes: [
            { v: a, msg: `${a} is the mass number: protons AND neutrons together. Subtract the ${z} protons.` },
            { v: z, msg: 'That is the number of protons. Neutrons = mass number − protons.' },
            { v: a + z, msg: 'Subtract, do not add.' },
          ],
        };
      },
    },
    {
      id: 'p11-massnumber', title: 'Finding the mass number', f: 'mass-number', form: 'A',
      make(r) {
        const [name, z, a] = pick(r, ISO);
        const el = name.split('-')[0];
        return {
          prompt: T`A nucleus of ${el} contains **${z} protons** and **${a - z} neutrons**. What is its mass number?`,
          givens: [{ s: T`\text{protons}`, v: `${z}` }, { s: T`\text{neutrons}`, v: `${a - z}` }],
          steps: [{ say: 'Mass number counts everything in the nucleus. Add protons and neutrons.', work: T`${z} + ${a - z} = ${a}`, v: a }],
          answer: a, unit: '',
          mistakes: [
            { v: z, msg: 'That is the atomic number (protons only). Mass number also counts the neutrons.' },
            { v: a - z, msg: 'That is just the neutrons. Add the protons too.' },
          ],
        };
      },
    },
    {
      id: 'p11-charge', title: 'Charge of an ion', f: 'ion-charge', form: 'q',
      make(r) {
        const [name, z, c] = pick(r, IONS);
        const e = z - c;
        return {
          prompt: T`A ${name} atom has **${z} protons** and **${e} electrons**. What is its net charge? (Type a sign, like +2 or -1.)`,
          givens: [{ s: T`\text{protons}`, v: `${z}` }, { s: T`\text{electrons}`, v: `${e}` }],
          steps: [{ say: 'Protons are +1 each, electrons are −1 each. Do protons minus electrons.', work: T`${z} - ${e} = ${sign(c)}`, v: c }],
          answer: c, unit: '',
          mistakes: [{ v: -c, msg: 'Right size, wrong sign. Do protons minus electrons. More electrons than protons means negative.' }],
        };
      },
    },
    {
      id: 'p11-electrons', title: 'Electrons in an ion', f: 'ion-charge', form: 'e',
      make(r) {
        const [name, z, c] = pick(r, IONS);
        const e = z - c;
        const did = c > 0 ? `lost ${c}` : `gained ${-c}`;
        return {
          prompt: T`A ${name} atom has **${z} protons**. It becomes an ion with a charge of **${sign(c)}**. How many electrons does the ion have?`,
          givens: [{ s: T`\text{protons}`, v: `${z}` }, { s: T`\text{charge}`, v: sign(c) }],
          steps: [
            { say: 'A neutral atom has the same number of electrons as protons. How many is that?', work: T`${z}`, v: z },
            { say: `A charge of ${sign(c)} means it has ${did} electron${Math.abs(c) > 1 ? 's' : ''}. How many now?`, work: T`${z} ${c > 0 ? '-' : '+'} ${Math.abs(c)} = ${e}`, v: e },
          ],
          answer: e, unit: 'electrons',
          mistakes: [
            { v: z + c, msg: c > 0 ? 'A positive ion has LOST electrons. Subtract.' : 'A negative ion has GAINED electrons. Add.' },
            { v: z, msg: 'That is the neutral atom. An ion has gained or lost electrons.' },
          ],
        };
      },
    },
  ],
};
