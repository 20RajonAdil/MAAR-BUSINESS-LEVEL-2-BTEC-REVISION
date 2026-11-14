# MAAR BUSINESS LEVEL 2 BTEC – Revision Platform

An interactive revision classroom for **BTEC Level 2 Business, Unit 2 – Finance for Business**.
React + TypeScript + Vite. No backend, no API keys, no paid services. Works offline after the first visit.

**Learning journey:** LEARN → UNDERSTAND → TEST MY KNOWLEDGE → CHECK RESULTS → REVISE → TRY AGAIN

Live site: https://maarbusinesslevel2btecrevision.vercel.app

## Subjects

| Subject | Status | Content |
|---|---|---|
| **Finance** (Unit 2) | Live | 15 topics · 91 slides · 179 questions · Formula Test |
| **Marketing** (Unit 9) | Live | 7 topics · 66 slides · 119 questions · quick revision · mixed exam |

Marketing was built from `Lesson 01, 02, 04, 05, 06, 07, 08` and the Marketing `Revision` deck. **Lesson 03 was not in the uploaded pack**, so topic numbers go 1, 2, 4, 5, 6, 7, 8 on purpose. When it arrives, add a topic file in `src/data/marketing/` and insert it in `src/data/subjects.ts` between `markets` and `research`.

## What is in it

| Feature | Where |
|---|---|
| Three-dot (⋮) subject menu: **Finance** (active) and **Marketing** (Coming soon) | top-right of every page |
| 15 Finance topics, 91 presentation slides (Previous/Next, slide counter, progress bar, keyboard + swipe) | `src/data/finance/*` |
| **TEST MY KNOWLEDGE** at the end of every topic – 179 questions (100 original course questions, 79 generated practice questions) | `Quiz` |
| MCQ, multi-select, true/false, fill-in-the-blank, calculation and written answers with tolerant marking | `src/lib/check.ts` |
| ✓ / ✗ feedback, correct answer, explanation and **REVISE THIS TOPIC** (jumps to the exact slide) | `Quiz`, `Results` |
| Results page: score, correct/incorrect, topics needing revision, retry / revisit / topic menu | `Results` |
| **Formulas You MUST Know** topic: one slide with all 11 course formulas, then short slides with worked examples | `src/data/finance/t15-formulas.ts` |
| **Formula Test**: all 11 formulas in random order and mixed formats (pick the formula, complete it, true/false, name the measure, calculate with fresh random numbers). Weak formulas come back as extra questions. After **3 attempts** a personal **improvement report** shows the score trend, a formula-by-formula table, whether the problem is recall or calculation, and which slide to revise | `#/finance/formulas` |
| Quick revision: 14 formulas with worked examples, 27 definitions, exam tips, common mistakes | `#/finance/revise` |
| Search (Ctrl/⌘ + K) across topics, slides, definitions and formulas | `SearchModal` |
| Mixed-topic practice exam (28 questions, 2 per topic) | `#/finance/exam` |

## Design, icons and mobile

* **Hero:** inspired by the MAAR.Quran hero (arch outline, italic-serif headline with shimmer, animated orb, stats). The orb carries the logo and orbiting subject icons; the accent colour changes per subject (`data-subject`). Text is set in `subjects.ts` (`hero`).
* **Icons:** every icon is inline SVG from `src/components/Icon.tsx` (Lucide). There are no emoji anywhere; `src/noemoji.test.ts` fails the build if one is added. Topic icons are names such as `rocket` in the topic data.
* **Fonts:** Plus Jakarta Sans and Instrument Serif are self-hosted (`src/assets/fonts`), so nothing is requested from Google and they work offline.
* **Phones:** full-screen search sheet (16px field, 44px+ tap rows, recent searches, filter chips, follows the on-screen keyboard), bottom navigation, bottom-sheet subject switcher, safe-area support for notches, no zoom-on-focus.

## Offline (automatic)

The site is a PWA. `vite.config.ts` lists every file of each build and writes `dist/sw.js` from `sw-template.js`, so **new content is cached automatically with no extra step**.

* First visit: the service worker saves the whole site; the header shows **Offline ready**.
* Offline: pages, slides, charts, quizzes, search, formula test and progress all work; the header shows **Offline**.
* Updates: a new build installs in the background, old files are removed, and a small **“A new version is ready · Refresh”** message appears. Nobody is interrupted mid-quiz.
* Installable from the browser (manifest with maskable icons and Finance/Marketing shortcuts).
* The service worker runs only on the built site over HTTPS or localhost (not in `npm run dev`).

## Logo

The logo is `public/icon-192.png` (also used as favicon, home-screen icon and in the header, hero and footer). Replace that file (and `icon-512.png`, `favicon.png`, `apple-touch-icon.png`) to change it.

## Commands

```bash
npm install
npm run dev        # local development
npm test           # unit tests: answer-checking engine and the formula-test generator (2,000 random questions)
npm run audit      # data audit: slide links, answer indexes, and independent re-calculation of 64+ numeric answers
npm run build      # type-check + production build into dist/
```

## 404 page
Any address that is not a real page shows a themed 404 page: a mistyped path (`/anything`) gets `dist/404.html` (served by Vercel and GitHub Pages, and by the offline service worker), and a mistyped in-app address (`#/finance/quizz/x`, an unknown topic or an out-of-range slide) shows the same page inside the app. The design lives in `src/assets/not-found.html` and `src/styles/notfound.css`; the build copies it into `dist/404.html`.

## Deploying

* **GitHub Pages:** push to `main`; `.github/workflows/deploy.yml` tests, audits, builds and deploys. In the repo go to *Settings → Pages → Source: GitHub Actions* once.
* **Vercel / Netlify:** framework preset *Vite*, build command `npm run build`, output `dist`.
* The build uses relative paths and a hash router, so it works under any sub-path.

## Adding another subject (or Marketing Lesson 03)

1. Create `src/data/marketing/…` topics using the same `Topic` shape (`slides` + `questions`, see `src/types.ts`).
2. In `src/data/subjects.ts` add the topics (and `quick` revision data) to the subject and set `status: 'active'`.
3. Menu, topic cards, slides, quizzes, results, search and the mixed exam all work automatically.
4. Run `npm run audit` – it checks every question's slide link and answer index.

## Source-material corrections (please check with your teacher)

The uploaded decks contain a few errors. They were **not** copied blindly. Each corrected question shows a “Note on the source” after you answer it.

| Where | Problem in the source | What this site does |
|---|---|---|
| Lesson 06 worked example | 5,600 × £3.75 shown as £2,100 | Uses **£21,000** |
| Lesson 05 Q3 | Option A £6,560.71; the correct sum is £6,560.94 | Type-in question, answer £6,560.94 |
| Lesson 10 Q2 | None of the four options (£50,000 / £72,000 / £18,000 / £22,000) equals the correct net profit | Type-in question, answer **£8,000** |
| Lesson 11 slide “Other expenses” | Says “£330 to £3,100”; the table shows £3,330 | Uses £3,330 |
| Lesson 12 “problems” slide | Inventory fall quoted as £2,180 (actual £2,490); net current assets “decreased by £2,810” (actual fall £6,860) | Uses the corrected figures |
| Lesson 04 slide title | Titled “Fixed Costs” but defines variable costs | Titled correctly |
| Lesson 05 Q4/Q8–Q10 | “$” instead of “£” | Treated as £ |
| Several lesson decks | Most lesson questions have **no answer key** | Answers were worked out from the lesson content and are flagged “answer inferred”. Please confirm any you are unsure about. |

The lesson decks 01 and 02 contain no questions (they link to external quizzes); practice questions for those topics are generated and labelled “Practice question”.

## Limitations

* Written/evaluation questions (e.g. Sarah's café, Ryan's cash flow, Zumiera's decision) are marked by **key-idea matching**, not by understanding. Always compare with the model answer.
* The images inside the PowerPoint files (e.g. clip-art, timers) are not reproduced; charts and tables were redrawn as live SVG/HTML from their data.
* Progress and best scores are stored in the browser (`localStorage`) on each device.
* Offline mode needs one online visit first, and a browser that supports service workers (all current ones do). Private/incognito windows may clear it when closed.

## Marketing: things to check with your teacher

| Where | Issue | What this site does |
|---|---|---|
| Product life cycle | Lesson 07 lists *Development, Introduction, Growth, Maturity, Decline*; the Revision deck lists *Development, Growth, Maturity, Saturation, Decline* (the diagram has five blanked boxes) | Slides show the lesson version with a warning; the Revision question follows the Revision deck and says so |
| Below-the-line promotion | The Revision deck lists “advertising” as a below-the-line example, but Lesson 08 treats mass-media advertising (TV, billboards) as above the line | Both shown with a warning; the quiz options leave “advertising” out |
| Classroom “Apply it” activities | No answer keys | Converted to questions where an answer follows from the lesson's definitions, flagged “answer inferred” |
| Exam practice questions | Only brief marking guidance is given | Model answers were written from that guidance and are flagged; written answers are marked by key ideas |
| Mock-exam slide | Date (20 Oct 2026) has passed | Not included |

Lesson boilerplate (the repeated starter and plenary slides, speaker prompts) was not turned into slides; every content slide, definition, activity prompt and piece of marking guidance was kept.
