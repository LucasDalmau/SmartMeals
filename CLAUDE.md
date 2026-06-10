# SmartMeals v3 — Project Context

## Mission

SmartMeals is a personal weekly meal planning web app, rebuilt from scratch. The v2.1 version is live but is being fully replaced with this v3 rebuild — a clean slate with better UI/UX, code architecture, mobile experience, and recipe data structure.

This rebuild is being done with Claude Fable 5 via Claude Code. The owner (Lucas) lives in Buenos Aires, trains at the gym regularly, cooks solo on weeknights and prepares one dinner-for-two per week. He values fast weeknight prep (15–30 min), efficient Sunday batch cooking, and high-protein meals.

## Core principles

- **Type safety first** — TypeScript strict mode, no `any`.
- **Mobile-first** — designed primarily for iOS PWA (added to home screen), with desktop as a polished secondary.
- **Internationalized from day one** — Spanish (default) and English. No hardcoded user-facing strings.
- **Auth required** — multi-user app. Every user has their own recipes, plans, shopping lists, pantry, and macro goals.
- **Deterministic logic only** — all suggestions (recipes, prep order, balance) are rule-based. No AI/LLM integration in v3. Can be added later without architectural changes.
- **Server-side where it matters** — use Next.js App Router conventions; server components by default, client components only where interactivity demands it.
- **Self-verifying work** — write tests for non-trivial business logic (ingredient aggregation, macro scaling, prep generation, pantry matching). Use Playwright or similar to verify UI changes against design intent when possible.

## Stack

- **Framework:** Next.js (latest stable, App Router)
- **Language:** TypeScript (strict)
- **Auth:** NextAuth.js (Auth.js v5) with Google provider
- **Database:** Vercel Postgres with Drizzle ORM (preferred for type safety) — if Drizzle is impractical, fall back to Prisma
- **Styling:** Tailwind CSS + shadcn/ui as base component library
- **i18n:** next-intl (Spanish + English)
- **State:** React Server Components + minimal client state via Zustand where needed
- **Deploy:** Vercel, connected to GitHub repo `LucasDalmau/SmartMeals`
- **PWA:** next-pwa or equivalent — installable, offline-capable for viewing saved recipes and shopping lists

## Features — required in v3

### Migrated from v2.1
1. **Smart shopping list with ingredient aggregation** — combines duplicate ingredients across selected recipes, summing quantities with unit awareness (e.g., 200g + 150g chicken = 350g).
2. **Supermarket mode** — full-screen view with checkboxes per item, progress bar, persists across sessions.
3. **Macro tracking** — weekly totals and daily averages of protein, carbs, fats, calories. Two-person meal macros are pre-divided to personal portion.
4. **Collapsible categories** in recipe browsing.
5. **Ingredient-based search** — find recipes that use an ingredient.
6. **Dark/light mode** with persistence.

### New in v3

#### Planning
7. **Visual weekly calendar** — days Mon–Sun, each with slots: Breakfast, Lunch, Snack, Dinner. Tap any slot to assign a recipe. A recipe can be assigned to any slot on any day.
8. **Recipe pool ("to prepare")** — a staging area where you add recipes you plan to cook (e.g. Sunday batch), without assigning them to a specific day yet. From the pool, drag or tap to assign to a day/slot later.
9. **Adjustable portions** — per-recipe slider/input to change number of servings. Ingredient quantities and macros scale proportionally. Default: 1 serving, except "for two" recipes which default to 2.

#### Recipes
10. **Recipe variations / suggestions** — for each recipe, surface 2–3 related recipes (same protein, same category, or same prep style). Deterministic: based on shared tags or category.
11. **Favorite recipes** — star/heart any recipe. Favorites appear first in browsing and in suggestions.
12. **Notes per recipe** — free-text field per user per recipe ("next time less salt", "add lemon"). Stored in DB per user.
13. **Freezer-friendly tag** — recipes tagged `freezable: true` show a freezer badge. Filter by this tag.
14. **Custom recipe creator** — users can create their own recipes with the same schema as built-in ones.

#### Cooking
15. **Integrated cooking timer** — per recipe step, multiple parallel timers, sound + push notification when done.
16. **Cooking mode** — full-screen, always-on display (wake lock API), large text, step-by-step, visible timers. Activated from recipe detail. Designed for use with hands occupied.

#### Pantry & suggestions
17. **Pantry inventory (light)** — users maintain a list of ingredients they currently have. Simple: ingredient name + rough quantity (enough / running low / out). Not a precise stock tracker.
18. **Pantry-based recipe suggestions** — given the user's pantry, rank recipes by ingredient match % (how many of the recipe's ingredients the user already has). Fully deterministic: sorted by overlap score.
19. **Proactive shopping list** — shopping list is generated from: (a) ingredients needed for planned recipes, minus (b) ingredients already in pantry marked as "enough". User can override.

#### Macros & goals
20. **Macro goal calculator** — in user profile, input: age, height, weight, gender, activity level (sedentary / light / moderate / active / very active), and goal (lose fat / maintain / build muscle). Calculate TDEE using Mifflin-St Jeor formula, then apply macro split based on goal. Store as user's weekly targets.
21. **Progress vs. goal** — macro tracking screen shows weekly totals vs. calculated targets, with visual progress bars and a daily average comparison.
22. **Weekly balance suggestions** — deterministic: if by midweek the user is tracking below protein target, surface the top 3 high-protein recipes from the pantry suggestions. Rule-based, no ML.

#### Prep
23. **Dynamic Sunday prep system** — given the selected weekly recipes (from plan + pool), generate:
    - What to cook fully (can be stored 4+ days)
    - What to pre-cut / pre-portion
    - What to freeze
    - Optimized execution order: parallel tasks grouped together (e.g. "start oven → while heating, chop vegetables → put chicken in → while chicken cooks, make sauce")
    This is derived from `prepDependencies` and `cookTimeMinutes` on each recipe, not hardcoded.

#### Profile & onboarding
24. **User profile** — name, avatar (Google photo), language preference, dark/light mode preference, macro goals (from calculator).
25. **Onboarding flow** — first login triggers a 3-step setup: (1) fill profile + macro calculator, (2) add a few pantry items, (3) assign first week's recipes. Skippable.

## Data model — recipe schema

```ts
type Recipe = {
  id: string;
  slug: string;
  nameEs: string;
  nameEn: string;
  category: Category; // enum: 'poultry' | 'beef' | 'pasta' | 'vegetarian' | 'for-two' | 'breakfast' | 'snack'
  difficulty: 1 | 2 | 3;
  servingsDefault: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: Ingredient[];
  steps: Step[];
  macrosPerServing: { protein: number; carbs: number; fats: number; calories: number };
  prepDependencies: PrepItem[];   // what can be batch-prepped Sunday, with storage time
  freezable: boolean;             // shows freezer badge, included in freeze list on prep view
  tags: string[];                 // 'high-protein' | 'quick' | 'asian' | 'classic' | etc.
  variationIds: string[];         // related recipe IDs for suggestions
  mealSlots: MealSlot[];          // which slots this recipe is appropriate for: breakfast | lunch | snack | dinner
};

type Ingredient = {
  id: string;
  nameEs: string;
  nameEn: string;
  amount: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tsp' | 'tbsp' | 'unit' | 'cup' | 'pinch';
  category: 'protein' | 'produce' | 'pantry' | 'dairy' | 'frozen' | 'other';
};

type Step = {
  order: number;
  textEs: string;
  textEn: string;
  timerSeconds?: number;
  canParallelize?: boolean; // true = this step can run while another timer is active
};

type PrepItem = {
  nameEs: string;
  nameEn: string;
  action: 'cook' | 'cut' | 'portion' | 'freeze' | 'marinate';
  durationMinutes: number;
  storagedays: number; // how many days it keeps in fridge
  freezable: boolean;
};

type PantryItem = {
  ingredientId: string;
  status: 'enough' | 'low' | 'out';
};

type MacroGoal = {
  userId: string;
  age: number;
  heightCm: number;
  weightKg: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose-fat' | 'maintain' | 'build-muscle';
  // Calculated fields (derived, stored for performance):
  tdee: number;
  weeklyTargets: { protein: number; carbs: number; fats: number; calories: number };
};
```

All user-facing text fields must have both `Es` and `En` variants — or use i18n keys. Decide which pattern is cleaner at schema design time; justify briefly in code comments.

## Seed data

Start with ~10 **traditional Argentine recipes** covering variety across categories. Suggested list:

- Milanesa con puré (beef, dinner)
- Empanadas de carne al horno (beef, dinner / snack)
- Pollo al horno con papas (poultry, dinner)
- Fideos con tuco (pasta, dinner)
- Bife a la plancha con ensalada (beef, dinner)
- Tortilla de papas (vegetarian, lunch / dinner)
- Locro (beef/vegetarian, for-two)
- Asado de tira (beef, for-two)
- Tostadas con huevo y palta (breakfast)
- Licuado de banana con avena y proteína (breakfast / snack)

Each must have: full macros per serving, full ingredient list with quantities, full steps with timers and `canParallelize` where applicable, `prepDependencies`, `freezable`, `mealSlots`, and `variationIds` (can be empty array for seed).

Do not pad the seed. The goal is to validate the schema and every UX flow end-to-end. Lucas will add recipes manually after launch.

## Design direction

The direction is **open** — Fable should propose a deliberate aesthetic grounded in the subject. Constraints:
- Avoid AI-design defaults: cream/terracotta, dark-with-acid-green, newspaper-column layouts.
- Mobile is the primary canvas. Bottom nav on mobile, sidebar nav on desktop.
- Large tap targets (min 44px). Cooking mode must be usable with wet/oily hands.
- Document the chosen direction in `DESIGN.md` at the repo root with 2–3 sentences of justification before writing any component.
- Every color, type, and spacing decision must derive from that document.

Typography: pair a display face (personality, used for recipe titles and hero text) with a body face (legible at 13px). No system fonts.

## Code organization

```
src/
├── app/
│   ├── (auth)/             # sign-in, onboarding
│   ├── (app)/
│   │   ├── plan/           # weekly calendar + recipe pool
│   │   ├── recipes/        # browse, search, detail, cooking mode
│   │   ├── shopping/       # smart list + supermarket mode
│   │   ├── prep/           # Sunday prep view
│   │   ├── pantry/         # inventory management
│   │   ├── macros/         # tracking + progress vs goal
│   │   └── profile/        # user settings, macro calculator
│   └── api/
├── components/
│   ├── ui/                 # shadcn primitives
│   └── domain/             # MealCard, DaySlot, ShoppingItem, PrepStep, PantryRow, etc.
├── lib/
│   ├── db/                 # Drizzle schema + client
│   ├── auth.ts
│   ├── i18n/
│   ├── aggregation.ts      # shopping list ingredient aggregation
│   ├── scaling.ts          # portion scaling (ingredients + macros)
│   ├── prep.ts             # prep checklist + execution order algorithm
│   ├── pantry.ts           # recipe match scoring against pantry
│   ├── macros.ts           # TDEE + macro split calculation (Mifflin-St Jeor)
│   └── suggestions.ts      # weekly balance suggestions (deterministic)
├── data/
│   └── seed/
└── types/
```

## Business logic specifications

### Macro calculator (lib/macros.ts)
Use **Mifflin-St Jeor** formula:
- Male BMR: `(10 × weight_kg) + (6.25 × height_cm) − (5 × age) + 5`
- Female BMR: `(10 × weight_kg) + (6.25 × height_cm) − (5 × age) − 161`

Activity multipliers: sedentary 1.2 / light 1.375 / moderate 1.55 / active 1.725 / very-active 1.9

Macro splits by goal (% of calories):
- Lose fat: protein 35% / carbs 35% / fats 30%
- Maintain: protein 30% / carbs 40% / fats 30%
- Build muscle: protein 30% / carbs 45% / fats 25%

Protein: 4 kcal/g · Carbs: 4 kcal/g · Fats: 9 kcal/g

### Prep execution order (lib/prep.ts)
Group tasks by whether they can run in parallel (oven time, simmering = parallelizable). Output a flat ordered list like:
1. Start tasks that need the most passive time first (longest `durationMinutes` with `action: 'cook'`)
2. While those run, schedule active tasks (`action: 'cut'`, `action: 'portion'`)
3. Freeze tasks always last

### Pantry match score (lib/pantry.ts)
`score = ingredientsInPantry / totalIngredients` — sort descending. Show match % on recipe cards in suggestion context.

### Weekly balance suggestions (lib/suggestions.ts)
Trigger condition: day >= Wednesday AND remaining protein target for week > (days remaining × daily protein target × 0.9).
Output: top 3 recipes sorted by `macrosPerServing.protein` descending, filtered to pantry score >= 0.5.

## Working agreements with Fable

- **Plan before coding.** For each major feature or module, produce a short plan (data flow, files touched, edge cases, tests needed) before writing code. Wait for Lucas to approve or redirect.
- **Tests for all business logic.** `aggregation`, `scaling`, `prep`, `pantry`, `macros`, `suggestions` must have unit tests with edge cases.
- **Self-verify visually.** After implementing any UI, describe what you see vs. the DESIGN.md intent. Fix mismatches before moving on.
- **Small commits, descriptive messages.** Format: `feat(plan): add recipe pool staging area`. Each commit must leave the app in a working, deployable state.
- **Deploy after each feature.** Push to `main`, verify Vercel deploy succeeded, confirm no console errors before starting next feature.
- **Ask before improvising.** If a feature reveals an undecided detail, surface it to Lucas rather than assuming.
- **Never use `any` in TypeScript.** If a type is genuinely unknown, use `unknown` and narrow it.

## Out of scope for v3

- AI/LLM-powered suggestions (deterministic logic only in v3)
- Social features (sharing recipes with other users)
- Photo uploads for custom recipes
- Barcode scanner for pantry items
- Apple Health / Google Fit integration
- Grocery delivery integration
- Nutritionist-grade macro accuracy (USDA database)
- Streak tracking / gamification

These may be added in v4+. Don't build for them, but don't make architectural choices that block them either.

## Amendments — agreed with Lucas on 2026-06-10 (override the sections above where they conflict)

1. **Spanish-only at launch.** English is deferred to a later release. next-intl is still wired from day one with a single `es` locale (no hardcoded user-facing strings), but DB content uses single-language Spanish fields (`name`, `description`, `text`) instead of `nameEs`/`nameEn` pairs. Adding English later = new locale JSON + a migration adding `*En` columns.
2. **Seed expanded.** First the 10 Argentine recipes (hand-written, to validate the schema), then an import of the 31 v2 dinners + 12 v2 snacks from `src/data/legacy/meals-v2.js`, enriched with estimated step timers, `mealSlots`, `freezable` and `prepDependencies` (mapped from v2's `PREP_ITEMS`). Calories are recomputed from macros on import; discrepancies >5% get logged for review.
3. **Units.** The `Ingredient.unit` enum adds `'clove'` and `'slice'` (v2 data uses "dientes" and "rebanadas"; real units are needed for shopping-list aggregation).
4. **Navigation.** 5 bottom tabs: Plan, Recetas, Compras, Macros, Perfil. Prep is a featured card inside Plan (it derives from the planned week). Pantry is a segment inside Compras (it feeds the proactive list).
5. **Plan opens on today** (hero of the current day, week below), and **weekly plans are persisted keyed by ISO week** with prev/next navigation.
6. **Design source of truth:** `DESIGN.md` (based on the approved prototype, kept at `docs/prototype-approved.jsx`).
7. **Repo:** local folder is `meal-plan-v2` (cleaned in place); remote is `LucasDalmau/SmartMeals` — pushing to main replaces the live v2.1.
