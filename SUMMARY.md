# Project Status Summary — NeoSkills Landing Page

## Goal
Fix stale PMI® data in admin and implement Sprint 1 design improvements (trust badges, feature cards, FAQ, accreditation badges) with professional blue color refresh.

## Constraints & Preferences
- Admin must show correct exam body immediately after deploy — no stale PMI for any course
- 44 certification courses show correct exam body; 9 general courses correctly hide the section (empty string)
- Admin edits to examBody/examBodyUrl/certValidity/careerOpportunities intentionally not persisted — derived from course title/category
- Admin can edit enrollmentCount, course content, pricing, syllabus
- Admin password fallback: `neoskills2026`
- Single Total Program Fee (₹) field in admin instead of separate Training/Exam/Support
- New primary color: `#003B7A` (deep navy), primary-light: `#0057B8`

## Progress
### Done
- Root cause identified: Render backend has stale PMI® data for every course (examBody: "PMI®", careerOpportunities: PMP roles, certValidity: "3 years")
- `examBodyInfo()` maps 44/53 courses correctly; 9 general courses correctly return empty (no section shown)
- Fixed admin merge: case-insensitive slug matching + title fallback + `??` over `||` for computed fields
- Same `??` fix applied in `courseService.js` public merge
- **Display-level override added** — `selected` computation now forces examBody/examBodyUrl/certValidity/careerOpportunities from gen data via `getAllResolvedCourses()`, bypassing merge entirely for these fields
- **Fix verified working** — user confirmed in incognito window after deploying commit `f6a6a8f`; previous failures were due to browser caching old AdminDashboard JS despite deploy
- WhatsApp changed to `wa.me/919975214585`, US phone to `+1 (216) 232-0274`
- Pricing simplified to single Total Program Fee (₹) field in admin
- `getTotal()` in catalogBuilder.js updated to check `feeDetails.total` first
- `handleSave` simplified — no cleanup logic, sends form values as-is
- Competitor deep research completed: KnowledgeHut, Koenig, Simplilearn, TKA, Knowlathon — all pages analyzed
- **Color refresh**: primary blue changed from `#0056D2` to `#003B7A` (deep navy) + added `primary-light: #0057B8`
- **TrustBadges component created** — 5-stat grid (50K+ trained, 50+ courses, 95% placement, 4.8/5 rating, 7+ cities) with hover effects, added to homepage between HeroSection and PartneringSection
- **Why This Course feature cards** added to CourseDetail page — 6-card grid (accredited curriculum, expert instructors, flexible learning, career support, lifetime access, money-back guarantee) between "About This Program" and curriculum sections
- **FAQ accordion** added to CourseDetail page — 5 questions with animated expand/collapse, placed between sidebar and "Other Programs" section
- **Accreditation badges** already existed in PartneringSection (PMI, AWS, Microsoft, PeopleCert, SPCT, Scrum Alliance, IEEE) — no new component needed

### In Progress
- (none — all Sprint 1 items complete)

### Next Steps
1. Commit all Sprint 1 changes, push, deploy to Render with clean build
2. Verify with incognito window (remember: hard refresh / incognito required for SPA cache)
3. Begin Sprint 2 items: mega-menu, autocomplete search, trainer bios, multiple CTAs

## Key Decisions
- `??` (nullish coalescing) replaces `||` (logical OR) for computed fields — empty string from gen is preserved instead of falling through to stale API value
- Display-level override uses `useMemo` with direct `getAllResolvedCourses()` lookup — guaranteed to show correct examBody regardless of merge state
- Primary color changed from `#0056D2` to deeper `#003B7A` for more professional look; `primary-light` added for hover/gradient variants
- Trust badges placed between HeroSection and PartneringSection for maximum visibility after hero
- Feature cards positioned between "About This Program" and curriculum for logical flow
- FAQ accordion placed after the main content sidebar, before related courses

## Critical Context
- Previous deploy with `??` fix still showed PMI in user's regular browser — **browser cache** served old AdminDashboard JS despite new content hashes in HTML
- Fix only verified after testing in **incognito/private window** which bypasses all cache
- `getAllResolvedCourses()` from catalogBuilder.js is synchronous — always available when admin loads
- Key lesson: after Render deploy, always **Cmd+Shift+R** (hard refresh) or test in incognito; normal refresh is not enough for SPA chunks
- `examBodyInfo()` mapping logic determines exam body by title keyword matching — all general courses (Advanced Data Engineering, AI in Testing, etc.) correctly return empty string

## Relevant Files
- `src/components/CourseDetail.jsx`:334-367 — Why This Course feature cards grid
- `src/components/CourseDetail.jsx`:725-769 — FAQ accordion section
- `src/components/AdminDashboard.jsx`:407-421 — `selected` computed via `useMemo` forcing examBody from gen data
- `src/components/TrustBadges.jsx` — 5-stat grid below hero on homepage
- `src/components/PartneringSection.jsx` — Accreditation partner logos carousel (PMI, AWS, Microsoft, PeopleCert, etc.)
- `src/App.jsx:132` — TrustBadges inserted between HeroSection and PartneringSection
- `tailwind.config.js:9-10` — primary: `#003B7A`, primary-light: `#0057B8`
- `src/data/catalogBuilder.js:340-445` — `examBodyInfo()` + `defaultCareerRoles()` — maps all 53 courses
- `src/data/courseService.js:148-155` — Public `loadCourseBySlug` — `normalizeKey()` + title fallback
