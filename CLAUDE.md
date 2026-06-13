# SenoedIn — Claude Session Context

A hackathon-ready parody professional network for Seno. LinkedIn-inspired but centered on **cats, climbing, Let's Plays, and music compatibility**. Zero external API keys required in demo mode — every API feature degrades to deterministic fallbacks.

---

## Stack

- **Next.js 16.2.9** App Router, **TypeScript 5**, **React 19**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@theme {}` blocks. **NO tailwind.config.js**. Never add one.
- **Lucide React** for icons
- **localStorage** via `Store` interface (`lib/storage/index.ts`) with `LocalStore` as default
- PWA: `public/manifest.json`, apple-web-app meta tags, `viewport` export with `themeColor: '#d4a017'`

---

## Theme — Black & Gold

```css
--color-seno-bg:          #0a0a0a   /* page background */
--color-seno-card:        #111111   /* card backgrounds */
--color-seno-card-2:      #1a1a1a   /* secondary cards, inputs */
--color-seno-text:        #f0ede4   /* primary text */
--color-seno-muted:       #888888   /* secondary text */
--color-seno-dim:         #555555   /* tertiary text */
--color-seno-gold:        #d4a017   /* primary accent */
--color-seno-gold-light:  #e8b420   /* hover gold */
--color-seno-gold-tint:   rgba(212,160,23,0.08)  /* subtle gold bg */
--color-seno-border:      #1e1e1e   /* default border */
--color-seno-border-gold: rgba(212,160,23,0.3)   /* gold border */
```

**Button primary:** gold bg + `text-[#0a0a0a]` (black text). Never `text-white` on gold — invisible.

---

## Security Rules (Non-Negotiable)

- **Never expose GEMINI_API_KEY or YOUTUBE_API_KEY to client components.**
- Keep secret keys inside Next.js server Route Handlers (`app/api/`).
- Do not prefix secret keys with `NEXT_PUBLIC_`.
- Do not commit `.env` files.
- Always validate API outputs and return demo fallback data when API calls fail.

---

## Project Structure

```
app/
  page.tsx              → redirects to /feed
  feed/page.tsx         → cat post feed (mobile-first, no sidebars, max-w-xl)
  climbing/page.tsx     → route portfolio (upload photo → AI route analysis)
  games/page.tsx        → Watcher's Log (YouTube VOD reviews)
  music/page.tsx        → Tinder-style music swipe (endorse/pass)
  messages/page.tsx     → DM chat (inline data, no seed-messages dependency)
  profile/page.tsx      → profile page with skill bars, gold avatar
  api/
    climbing/route.ts   → Gemini Vision → climbing route fallback
    caption/route.ts    → Gemini → cat caption fallback
    music/route.ts      → Music compatibility (no API key needed for demo)

components/
  app-shell/
    AppShell.tsx        → wraps all pages
    Header.tsx          → top nav with gold SE logo
    MobileNav.tsx       → bottom tab bar (mobile)
  cats/                 → CatPost, CatFeed components
  climbing/
    RouteUploader.tsx   → camera/gallery upload + scanning UI
    RouteReport.tsx     → displays route with interactive hold markers
  games/
    ReviewCard.tsx      → YouTube thumbnail + colored metric bars
    ReviewForm.tsx      → submit new VOD review
  music/
    SwipeCard.tsx       → Tinder swipe with pointer events (NO motion/react)
    MatchList.tsx       → endorsed songs list
  shared/
    ProfileSidebar.tsx
    TrendingSidebar.tsx
  ui/
    Badge.tsx           → variants: gold, green, blue, orange, red, purple
    Button.tsx
    Slider.tsx
    Toast.tsx

data/
  seed-posts.ts         → cat posts (LinkedIn-parody, with placekitten.com photos)
  seed-climbing.ts      → 6 routes (4 gym + playground + tree)
  seed-games.ts         → Stampy VODs, Geometry Dash, Bed Wars
  seed-songs.ts         → Seno's actual favorites (Tobi Lou, Mitski, Steve Lacy, Frank Ocean, Mac DeMarco + Rebecca Sugar "Peace and Love on the Planet Earth" as FAVORITE)
  seed-messages.ts      → legacy seed (NOT used by messages/page.tsx — page has inline data)
  seed-profile.ts       → profile data incl. Crochet + Rubik's Cube skills

lib/
  types/index.ts        → all TypeScript interfaces
  storage/index.ts      → Store interface + LocalStore
  utils/fallbacks.ts    → cat caption + climbing fallbacks (8 gym + 2 non-gym)
```

---

## Pages Status

| Page | Status | Notes |
|---|---|---|
| `/feed` | ✅ Done | Cat posts, placekitten photos, LinkedIn-parody copy |
| `/climbing` | ✅ Done | Gym + playground + tree routes, Gemini fallback |
| `/games` | ✅ Done | YouTube thumbnail in ReviewCard, VOD framing |
| `/music` | ✅ Done | Pointer-events Tinder swipe; ENDORSE=right, PASS=left |
| `/messages` | ✅ Done | Figma-matched UI; inline data, Unsplash avatars |
| `/profile` | ✅ Done | Gold avatar, skill bars, dot-pattern banner |

---

## Key Implementation Details

### Tinder Swipe (SwipeCard.tsx)
Uses **native Pointer Events API** — no `motion/react` dependency:
```tsx
const onPointerDown = (e: React.PointerEvent) => {
  e.currentTarget.setPointerCapture(e.pointerId)  // drag lock
  startRef.current = { x: e.clientX, y: e.clientY }
  setIsDragging(true)
}
```
- `dragX > 0` → ENDORSE overlay on **RIGHT** side, green gradient from right
- `dragX < 0` → PASS overlay on **LEFT** side, red gradient from left
- `rotate = dragX * 0.08`
- `SWIPE_THRESHOLD = 90`
- Exit animation fires at 300ms then calls `onEndorse`/`onDecline`

### YouTube Thumbnails (ReviewCard.tsx)
No API key needed: `https://img.youtube.com/vi/${review.videoId}/hqdefault.jpg`

### Cat Photos (feed)
`placekitten.com` with deterministic sizes per post: `400x300`, `402x301`, `401x300`, `403x302`, `400x310`

### Climbing Route Analysis
- Route Handler at `app/api/climbing/route.ts`
- Calls Gemini Vision with base64 image → parses JSON response
- Falls back to `getRandomClimbReport()` from `lib/utils/fallbacks.ts`
- Supports: gym walls, playground equipment, trees, any surface

### CSS Build Gotcha — CRITICAL
If the old LinkedIn-style design (light background, white cards) appears:
1. Kill all processes on ports 3000 and 3001
2. Delete the `.next` directory entirely: `rm -rf .next`
3. Restart: `npm run dev`
This happens because the `.next` build cache serves stale compiled CSS even after `@theme {}` variables change.

### Toast Fix
`bg-seno-card border border-seno-border-gold` — do NOT use `bg-seno-dark` (maps to light cream color after theme inversion).

### RatingFields TypeScript
`lib/types/index.ts` has `[key: string]: number` index signature on `RatingFields`.
In components use `key: string & keyof RatingFields` to avoid the `'number'` key issue.

---

## Messages Page — Important Note
`app/messages/page.tsx` has **inline thread data** (THREADS array). It does NOT use `data/seed-messages.ts`. The inline data includes the Easter egg thread about the Aug 28 meeting (chocolate milk, bourbon cookies, climbing wall).

---

## Easter Eggs

| Location | Easter Egg |
|---|---|
| `data/seed-songs.ts` | Rebecca Sugar "Peace and Love on the Planet Earth" marked as FAVORITE |
| `data/seed-messages.ts` / `messages/page.tsx` | Thread with "Mysterious Stranger (Aug 28)" — chocolate milk, bourbon cookies, no Milky Way |
| `data/seed-games.ts` | Stampy's Sky Den, Diamond Dimensions, Quest to Kill the Ender Dragon |
| `data/seed-profile.ts` | Crochet + Rubik's Cube as skills (sk-9, sk-10) |
| `data/seed-climbing.ts` | Playground Monkey Bar Meridian, Annual Oak tree route |

---

## Pending / Future Work

- [ ] **npm run build** — verify zero TypeScript/ESLint errors before deploying
- [ ] **Games ReviewForm** — currently submits with 0–10 sliders; Figma shows 0–100. Consider updating scale.
- [ ] **Music page** — Spotify embed iframes work only when Spotify is logged in. The emoji fallback (`🎵`) shows otherwise — this is intentional.
- [ ] **AI captions** — Gemini API key optional; set `GEMINI_API_KEY` in `.env.local` for live captions/climbing analysis
- [ ] **PWA testing** — `public/manifest.json` exists; test "Add to Home Screen" on mobile Safari
- [ ] **Climbing RouteReport** — hold markers are decorative overlays using `%`-based `left`/`top` positioning. They don't correspond to real holds.

---

## Running Locally

```bash
npm run dev       # starts on port 3000
# If stale CSS: rm -rf .next && npm run dev
```

Optional `.env.local`:
```
GEMINI_API_KEY=your_key_here
```
Without it, all API features use deterministic fallbacks — fully demo-ready.
