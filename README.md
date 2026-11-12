# Addie's Physics Study Hub

A personal study app for Addie's Conceptual Physics course (Hewitt), currently set up for the test on **Chapters 9–12**: Gravity, Projectile & Satellite Motion, The Atomic Nature of Matter, and Solids.

The content is written from the professor's lecture slides, the textbook chapter reviews, and Addie's own notes (including the items she starred as "on the test" and the Lab 5 and Lab 6 equations).

## What it does

- **Today** – one button starts a 12-question session mixing concepts, formula picking and math. Items she missed come back first; items she knows come back after 1, 2, 4, 7 days.
- **Math trainer** – every problem type has three levels, and she moves up or down automatically:
  1. **Guided**: pick the formula, pick the rearranged version, then one calculator step at a time.
  2. **Coached**: the givens and the rearranged formula are shown; she does the working.
  3. **On your own**: just the question and her formula sheet, like the test.
  Wrong answers get specific feedback ("you forgot to square the distance") instead of just the right number.
- **Formula finder** – read a word problem, choose which formula it calls for, then see the clue words.
- **Practice test** – no hints and no feedback until the end, then a score by chapter and a review of every miss.
- **Formula sheet** – every formula with its trigger words and rearranged forms, printable, since she brings her own sheet to the test.
- **Chapters** – short plain-English summaries, common traps, and per-chapter practice.

Progress is saved in the browser on the device she uses. There are no accounts and nothing is sent anywhere.

## Running it

It is a static site with no build step. Open it through any web server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. On GitHub Pages it is served from the repository root.

## Adding or changing content

Each chapter is one file in `js/content/`. A chapter lists its big ideas, traps, formulas, concept questions, formula-finder scenarios and math problem generators. Add the chapter to `js/content/index.js` and it appears everywhere.

Check the content after any change:

```bash
node --test
```

This verifies every answer key, runs each math generator hundreds of times to confirm the worked steps reach the stated answer, and renders all the maths notation.

## Layout

| Path | Purpose |
|---|---|
| `index.html`, `css/app.css` | Page shell and styling (light and dark, phone first) |
| `js/app.js` | Screens and navigation |
| `js/player.js` | Session and practice-test player, including the math trainer |
| `js/store.js` | Saved progress and the review schedule |
| `js/sheet.js` | Formula sheet |
| `js/content/` | All study content |
| `vendor/katex/` | Maths typesetting, bundled so the app does not depend on a CDN |
