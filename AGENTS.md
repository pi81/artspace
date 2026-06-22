# Agent Instructions — React SPA Starter Kit

Generic system prompt for AI coding agents (Cursor, Codex, Claude, Gemini). Follow these rules when reading, writing, or refactoring code in repositories based on this starter kit.

**Keep this file repo-agnostic.** Do not add domain names, product-specific architecture, private implementation guides, or links to in-repo planning docs. Project-only context belongs in README, issues, or task descriptions — not here.

> **Single source of truth.** Edit this file only.
>
> - **OpenAI Codex** and **Cursor** read `AGENTS.md` natively (no extra file).
> - **Anthropic Claude Code** → `CLAUDE.md` (symlink to `AGENTS.md`).
> - **Google Gemini CLI** → `GEMINI.md` (symlink to `AGENTS.md`).
>   There is no standard `Cursor.md`; Cursor uses root `AGENTS.md`.

---

## Documentation policy

**Always consult official documentation for the latest stable versions** of the stack. Do not rely on outdated patterns from training data.

Check `package.json` for installed versions, then verify behavior against current docs:

| Tool           | Docs                                |
| -------------- | ----------------------------------- |
| React          | https://react.dev                   |
| TanStack Query | https://tanstack.com/query/latest   |
| Tailwind CSS   | https://tailwindcss.com/docs        |
| TypeScript     | https://www.typescriptlang.org/docs |
| ESLint         | https://eslint.org/docs/latest      |
| Prettier       | https://prettier.io/docs            |
| Vite           | https://vite.dev                    |
| Next.js        | https://nextjs.org/docs             |

When API behavior, hook signatures, or config format are unclear, prefer current docs over memory. Watch for breaking changes between major versions (e.g. TanStack Query `gcTime` vs legacy `cacheTime`; Tailwind v4 CSS-first config vs legacy `tailwind.config.js`). Use `package.json` to see which framework (Vite, Next.js, etc.) the repo actually uses.

---

## Scope

These instructions cover **React, TypeScript, TanStack Query, Tailwind CSS, ESLint, Prettier, and project structure**. Follow the **framework's own routing conventions** (e.g. Next.js App Router, React Router) — do not invent a parallel routing layer.

---

## Commands

Run before considering work complete (exact scripts may vary — check `package.json`):

```bash
npm run typecheck
npm run lint
npm run format
```

Fix all TypeScript and ESLint issues you introduce. Do not disable rules without a strong reason.

---

## TypeScript

**Strict mode is mandatory** (`strict: true` in `tsconfig.json`).

### Required practices

- **No `any`**. Use `unknown` and narrow, or define proper types/interfaces.
- Enable **`noUncheckedIndexedAccess`** when possible — handle `undefined` from index/array access.
- Prefer **`.ts` / `.tsx` only** in application source (`allowJs: false`).
- Use the configured path alias (commonly **`~/`** → `src/`) instead of deep relative imports.
- Prefer **`type`** for object shapes and unions; use **`export type`** for re-exports.
- Type component props explicitly: extend native HTML attributes where applicable.
- Type generic HTTP helpers: `request<T>(...)`, `fetchJson<T>(...)`.
- Prefix intentionally unused parameters with `_`.

### Domain types

- Place **shared** API/domain models in `src/types/` (e.g. `*.model.ts` for entities/responses).
- Keep form-specific types separate (`forms.ts` or colocated with the feature).
- Align types with the actual API contract — do not invent fields.

### Type placement

- **Colocate** types used in **one file only** — define them in that file; do not split them into a separate `types/` module.
- **Extract** types imported by **two or more modules** into a shared file (e.g. `src/types/`, or a feature-level module both consumers import).
- Do not `export` types that have no consumers outside their file.

### Anti-patterns

- Do not use `@ts-ignore` or `@ts-expect-error` without a comment explaining why.
- Do not cast with `as SomeType` to silence errors — fix the type at the source.
- Do not create duplicate type definitions for the same entity.
- Do not add a `types/` file (or `types/` folder entry) for a type pair used by a single module.

---

## ESLint

Use **ESLint 9 flat config** (`eslint.config.mjs` or `eslint.config.ts`).

Typical setup:

- `@typescript-eslint/parser` with `project` pointing to `tsconfig.json`
- `eslint-plugin-react` with **`react/react-in-jsx-scope: off`** (automatic JSX runtime)
- `@typescript-eslint/no-unused-vars` — clean up unused imports and variables
- Ignore build output, dependencies, and generated artifacts

Match existing style in the repo: functional components, no unused vars, no dead imports.

---

## Prettier

Config lives in **`prettier.config.mjs`** (or equivalent). Follow the values already defined there.

Common conventions in this starter kit:

| Option          | Typical value                        |
| --------------- | ------------------------------------ |
| `printWidth`    | 100                                  |
| `tabWidth`      | 2, spaces only                       |
| `semi`          | true                                 |
| `singleQuote`   | false (double quotes, including JSX) |
| `trailingComma` | `"all"`                              |
| `endOfLine`     | `"lf"`                               |

Recommended plugins:

1. `prettier-plugin-organize-imports` — auto-sorts imports
2. `prettier-plugin-tailwindcss` — auto-sorts Tailwind classes (must be last; configure `tailwindFunctions` for `clsx` if used)

Do not hand-sort imports or Tailwind classes — run Prettier instead.

---

## Project structure

Extend the existing layout. **Do not introduce a parallel architecture.**

```text
src/
  api/
    http.ts              # Shared fetch layer — no React, no UI
    auth.ts              # Token/session helpers (when auth exists)
    queries/             # Query key constants + query option factories
    mutations/           # Mutation option factories
  providers/
    AppProvider.tsx      # QueryClientProvider + global providers
  hooks/                 # Thin wrappers around useQuery / useSuspenseQuery
  features/
    <domain>/
      components/        # Domain UI
      hooks/             # Domain-specific hooks (filters, prefetch, etc.)
      api/               # Domain fetch + query builders (when feature grows)
      utils/             # Domain-only helpers
  components/
    ui/                  # Reusable, domain-agnostic UI primitives
    errors/              # Shared error views / fallbacks
  types/                 # Shared TypeScript models
  utils/                 # Cross-cutting pure helpers
  app/                   # Framework app shell (Next.js app/, Vite entry, etc.)
```

Route and page files stay **thin** — compose feature components only. Global CSS / Tailwind entry lives in the project's conventional location for that framework.

### Layer responsibilities

| Layer                        | Responsibility                                                    | Must NOT contain                      |
| ---------------------------- | ----------------------------------------------------------------- | ------------------------------------- |
| `src/api/http.ts`            | `fetch`, headers, JSON parsing, HTTP errors, abort signal helpers | React hooks, JSX, domain logic        |
| `src/api/queries/*`          | Query keys, `queryFn`, cache options                              | Components, JSX                       |
| `src/api/mutations/*`        | `mutationFn` definitions                                          | UI side effects                       |
| `src/hooks/*`                | Thin wrappers around query/mutation hooks                         | Business logic, fetch implementations |
| `src/features/*/components/` | Domain UI, layout, event handlers                                 | Raw `fetch` calls, inline query keys  |
| `src/components/ui/`         | Generic primitives (Button, Card, Input, Modal)                   | Domain-specific data fetching         |
| Route/page files             | Compose screen from feature components                            | Filters, API calls, heavy state logic |

### Adding a new feature

1. Create `src/features/<name>/components/`.
2. Add fetch functions and query builders in `src/api/queries/` or `src/features/<name>/api/` when the feature has multiple endpoints.
3. Add thin hooks in `src/hooks/` when a query is reused across components.
4. Keep route/page files thin — import and arrange components only.

---

## TanStack Query

Server state lives in **TanStack Query only**. Never duplicate server data in Context or scattered `useState`.

### Core patterns

**1. Query keys** — centralized constants with `as const`:

```ts
const ITEMS_QUERY_KEYS = {
  all: ["items"] as const,
  list: (filters: ItemFilters) => ["items", "list", filters] as const,
  detail: (id: string) => ["items", "detail", id] as const,
} as const;
```

**2. Query option factories** — plain objects, not hooks:

```ts
export const itemsListQuery = (filters: ItemFilters) => ({
  queryKey: ITEMS_QUERY_KEYS.list(filters),
  queryFn: withSignal((options) => fetchItems(filters, options)),
});
```

**3. AbortSignal** — require `signal` on async data-layer calls; TanStack Query supplies it via `withSignal`:

```ts
export type RequestOptions = {
  signal: AbortSignal;
};

export const withSignal =
  <T>(fn: (options: RequestOptions) => Promise<T>) =>
  ({ signal }: { signal: AbortSignal }) =>
    fn({ signal });
```

Wire `withSignal` in query option factories; pass `options.signal` through to `fetch` (or equivalent) in the HTTP/repository layer.

**4. Thin hooks** in `src/hooks/`:

```ts
export const useItemsList = (filters: ItemFilters) =>
  useSuspenseQuery(itemsListQuery(filters));
```

**5. Mutations** — export option objects from `src/api/mutations/`:

```ts
export const updateItemMutation = {
  mutationFn: (input: UpdateItemInput) => updateItem(input),
};
```

### Query vs Suspense

| Use                | When                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| `useSuspenseQuery` | Data required to render; parent provides `<Suspense fallback={...}>`   |
| `useQuery`         | Optional data, explicit loading/error UI, `enabled` guards, pagination |

### Cache rules

- Set `staleTime` and `gcTime` deliberately — do not rely on defaults everywhere.
- Use `placeholderData: keepPreviousData` for pagination.
- After mutations, **`invalidateQueries` only related keys** — not the entire cache.
- Prefetch on hover/focus for detail views when appropriate.
- Combine `useQueryErrorResetBoundary` with an error boundary for recoverable query errors when the repo uses one.

---

## React

### Components

- **Functional components only** — no class components (except third-party boundaries if unavoidable).
- Match the repo's export style (named vs default) — stay consistent within a layer.
- Colocate small private helpers in the same file when they are not reused elsewhere.
- Extract reusable logic into **custom hooks** — not into route files or large components.
- Use **`Suspense`** for suspense-query subtrees; provide meaningful skeleton fallbacks.
- Use **`ErrorBoundary`** around independent query-driven sections.

### State placement

| Data kind                              | Where                                          |
| -------------------------------------- | ---------------------------------------------- |
| Remote API data                        | TanStack Query                                 |
| Auth session (`user`, `token`)         | Auth context + `src/api/auth.ts`               |
| Shared UI chrome (theme, sidebar)      | UI context / provider — only when cross-route  |
| Form fields                            | Form library or local state for simple forms   |
| Screen filters (search, sort, page)    | `useReducer` in a feature hook                 |
| Ephemeral UI (open drawer, active tab) | Local `useState`                               |
| Local-only records (no backend yet)    | Feature module + storage adapter + Query       |

**Never** store remote API responses in Context.

### Advanced hooks (use deliberately, not everywhere)

- `useTransition` — batch non-urgent filter updates.
- `useDeferredValue` — defer expensive renders driven by fast-changing input (e.g. search).
- `useOptimistic` — local optimistic UI on a single resource.
- `useReducer` — multi-field filter state with named actions.
- `use()` — only in narrow, justified cases.

### Forms

- Use a form library (e.g. **`react-hook-form`**) for non-trivial forms; simple forms can use local state.
- Define typed form values.
- Reset form when async `defaultValues` arrive.
- Submit via `useMutation`; surface feedback with local state or existing UI patterns in the repo.

---

## Tailwind CSS

Prefer **Tailwind v4** CSS-first setup (`@import "tailwindcss"`, `@theme`, Vite plugin). Avoid legacy v3 config unless the project already uses it.

### Setup pattern

```css
@import "tailwindcss";

@theme {
  --font-sans: ui-sans-serif, system-ui, sans-serif;
}
```

Global styles live in the project's CSS entry (e.g. `src/app/app.css`).

### Conventions

- Use **`clsx`** (or equivalent) for conditional/merged classes.
- Prefer utility classes in JSX — avoid CSS modules or CSS-in-JS unless the project already uses them.
- Match the existing visual language (colors, spacing, radii) — do not introduce a conflicting design system.
- Use responsive prefixes (`sm:`, `md:`, `lg:`) for layout shifts.
- Include focus-visible styles on interactive elements.
- Reuse primitives from `src/components/ui/` before creating one-off styled elements.

### Prefer semantic utilities over arbitrary values

Use theme tokens and built-in utilities whenever they exist. Arbitrary values (`border-[color:var(--…)]`, `text-[#…]`, `p-[13px]`) are harder to read, bypass design tokens, and defeat Prettier's Tailwind class sorting.

Define reusable colors, spacing, and fonts in `@theme`, then reference them with standard class names.

```tsx
// ❌ BAD — verbose arbitrary syntax when theme utilities exist
<div className="border-[color:var(--color-muted)] border-t-[color:var(--color-accent)]" />

// ✅ GOOD — semantic theme utilities
<div className="border-muted border-t-accent" />
```

Same rule for other properties: prefer `text-muted`, `bg-surface`, `rounded-lg`, `gap-4` over `text-[color:var(--color-muted)]`, `bg-[var(--color-surface)]`, `rounded-[12px]`, `gap-[1rem]` when equivalents exist in the theme.

Reach for arbitrary values only when the design truly has no matching token (one-off layout math, third-party constraints).

### i18n

If a `t()` helper exists, route user-visible strings through it to keep copy extractable later.

---

## Naming conventions

| Kind                | Pattern                               | Example                       |
| ------------------- | ------------------------------------- | ----------------------------- |
| Components          | PascalCase file + export              | `ItemList.tsx`                |
| Hooks               | `use` prefix, camelCase               | `useItemsList.ts`             |
| Query factories     | `<resource>Query`                     | `itemsListQuery()`            |
| Mutation factories  | `<action>Mutation`                    | `updateItemMutation`          |
| Query key constants | `<RESOURCE>_QUERY_KEYS`               | `ITEMS_QUERY_KEYS`            |
| Hook wrappers       | `useQuery<Resource>` / `useItemsList` | descriptive, consistent       |
| Types / props       | PascalCase + `Props` suffix           | `ItemListProps`               |
| Utils               | camelCase                             | `formatDate`, `t`             |
| Files               | Match primary export                  | `Button.tsx` exports `Button` |

---

## Code change principles

1. **Minimal scope** — change only what the task requires. No drive-by refactors.
2. **Extend, don't fork** — reuse the existing HTTP client, query layer, and providers; do not create duplicates.
3. **Match surrounding code** — naming, import style, file placement, and abstraction level.
4. **Comments in English** — only for non-obvious business or technical rationale.
5. **No secrets in code** — never commit tokens, credentials, or private keys.
6. **English for code** — identifiers, comments, commit messages, and UI strings.
7. **No speculative dead code** — do not add unused helpers, exports, dependencies, or “just in case” placeholders that are not wired into the app today and are not part of an **agreed public API or explicit task scope**. If a boundary interface is required, implement its **real public API** with the minimal working implementation — not extra escape hatches (unused packages, noop factories, unused config) “for later.” Remove or avoid misleading comments that describe code paths that do not exist yet.
8. **Respect manual edits** — do not revert files to an older version from conversation or agent memory when the user has changed them by hand. Read the current file on disk and build on that. **Exception:** revert or fix only when the manual change is unsafe (secrets, injection, broken auth) or would clearly break the app (syntax/type errors, broken build, data loss) — explain why before overwriting user intent.

---

## Common mistakes to avoid

- Putting `fetch` or query keys directly inside components or route files.
- Storing API responses in React Context or prop-drilling through many layers.
- Creating multiple `QueryClient` instances outside the root provider.
- Using outdated TanStack Query APIs from older major versions.
- Mixing Tailwind v3 and v4 configuration patterns.
- Importing with long relative paths when a path alias is configured.
- Large forms managed with many `useState` calls instead of a form library.
- Wrapping everything in `useTransition` / `useDeferredValue` without a performance reason.
- Adding tests, docs, or config files the user did not ask for.
- Leaving unused exports, placeholder utilities, or comments for hypothetical callers when nothing in the repo uses them yet.
- Confusing **intentional boundaries** (stub behind a fixed, agreed API) with **speculative extras** (dead code that might help later).
- Adding repo-specific rules, domain context, or private guides to `AGENTS.md` — keep this file portable across starter-kit projects.
- Overwriting user-edited code with stale content from a prior agent turn — always re-read the file; only override manual changes for security or clear breakage (see principle 8).

---

## Pre-submit checklist

- [ ] Types are explicit; no new `any` or unsafe casts
- [ ] Imports use the configured path alias
- [ ] Server data flows through TanStack Query
- [ ] Query keys are centralized — not inline string arrays in components
- [ ] Abort signals required on async fetchers; wired via `withSignal` in query factories
- [ ] Route/page files remain thin composition layers
- [ ] Tailwind classes merged with `clsx`; Prettier can sort them
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] Only requested files were changed
- [ ] No new unused “just in case” code or dependencies — no dead placeholders or misleading comments
