# Graph Report - /Users/telkom_760047/Github/andra-portfolio  (2026-07-31)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 192 nodes · 214 edges · 25 communities (16 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70696cb9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- about/page.jsx
- package.json
- app/layout.jsx
- about.jsx
- skills.jsx
- [slug]/page.jsx
- quote.jsx
- (root)/layout.jsx
- nprogress
- about/layout.jsx
- projects/layout.jsx
- .eslintrc.json
- compilerOptions
- next.config.js
- next-sitemap.config.js

## God Nodes (most connected - your core abstractions)
1. `Hr()` - 7 edges
2. `scripts` - 7 edges
3. `getNowPlayingItem()` - 4 edges
4. `Button()` - 4 edges
5. `FixedButton()` - 4 edges
6. `author` - 4 edges
7. `Card()` - 3 edges
8. `getNowPlaying()` - 3 edges
9. `Experience()` - 3 edges
10. `useIntersectionObserver()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `TopProgressbar()` --references--> `nprogress`  [EXTRACTED]
  components/TopProgressbar.jsx → package.json
- `Card()` --calls--> `getNowPlayingItem()`  [EXTRACTED]
  app/about/components/about/spotify/card.jsx → app/about/components/about/spotify/fetch.js
- `Quote()` --calls--> `useIntersectionObserver()`  [EXTRACTED]
  app/about/components/quote/quote.jsx → app/about/components/quote/useIntersectionObserver.js

## Import Cycles
- None detected.

## Communities (25 total, 9 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.05
Nodes (41): eslint, eslint-config-next, @fortawesome/fontawesome-svg-core, @fortawesome/free-brands-svg-icons, @fortawesome/free-regular-svg-icons, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome, framer-motion (+33 more)

### Community 1 - "about/page.jsx"
Cohesion: 0.10
Nodes (12): Education(), Experience(), experiences, formatDateRange(), ProjectCard(), category, socialLinks, Button() (+4 more)

### Community 2 - "package.json"
Cohesion: 0.09
Nodes (22): cross-env, @next/bundle-analyzer, author, email, name, url, devDependencies, cross-env (+14 more)

### Community 3 - "app/layout.jsx"
Cohesion: 0.13
Nodes (12): firaCode, jost, jsonLd, metadata, poppins, Chat, ChatConditional(), ClientTopProgressBar() (+4 more)

### Community 4 - "about.jsx"
Cohesion: 0.29
Nodes (6): About(), PlayingAnimation(), Card(), getAccessToken(), getNowPlaying(), getNowPlayingItem()

### Community 5 - "skills.jsx"
Cohesion: 0.25
Nodes (7): ActivityIcon(), CodepenIcon(), MobileIcon(), WebhookIcon(), skillCategories, Skills(), tagVariants

### Community 9 - "nprogress"
Cohesion: 0.50
Nodes (3): TopProgressbar(), nprogress, nprogress

## Knowledge Gaps
- **59 isolated node(s):** `extends`, `next/core-web-vitals`, `socialLinks`, `experiences`, `skillCategories` (+54 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `nprogress`, `package.json`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `socialLinks` to the rest of the system?**
  _59 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `about/page.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09803921568627451 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `app/layout.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._