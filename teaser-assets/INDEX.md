# Teaser Assets · Index

Production-ready SVG keyframes (1920×1080 masters, 1080×1920 verticals). Tokens mirror `src/app/globals.css`. All content grounded in real site copy and real component data (notably `GalateaDashboard.tsx`). No invented features.

## Design tokens

| Token | Value | Use |
|-------|-------|-----|
| `bg` | `#030303` | Full-bleed background |
| `card` | `#0A0A0A` | Glass card surface |
| `border` | `#ffffff @ 0.05` | Hairline separators |
| Galatea | `#10B981` | Emerald, flagship |
| Atlas | `#6366F1` | Indigo |
| Igea | `#22D3EE` | Cyan · coming soon |
| Hermès | `#F59E0B` | Amber · coming soon |
| Font | Inter (variable) | Headlines, UI, captions |
| Mono | ui-monospace | Times, numeric tickers |

---

## Part 1 · Filò suite teaser (30s master, 15s short)

Directory: `teaser-assets/filo-suite/`

| File | Scene | Timing | Purpose |
|------|-------|--------|---------|
| `KF-00_pulse-origin.svg` | Cold open | 0:00–0:03 | Single white pulse on horizontal gradient line — ecosystem origin |
| `KF-01_brand-lockup.svg` | Brand reveal | 0:03–0:06 | Filò symbol + wordmark, centered |
| `KF-02_proposition.svg` | Positioning | 0:06–0:10 | "Non un software. Un ecosistema." |
| `KF-03_bridge.svg` | Transition | 0:10–0:12 | 4 dots + "QUATTRO SISTEMI. UN'UNICA INTELLIGENZA." |
| `KF-04_galatea-card.svg` | Product 1 | 0:12–0:17 | Galatea mini dashboard — real appointments (Giulia, Marco, Elena), AI Assistant ring |
| `KF-05_galatea-atlas-swap.svg` | Transition | 0:17–0:18 | Card swap motion frame |
| `KF-06_atlas-card.svg` | Product 2 | 0:18–0:22 | Atlas funnel (12.4k / 3.870 / 412) + 3.3% conversion KPI |
| `KF-07_igea-card.svg` | Product 3 | 0:22–0:24 | Igea coming-soon, diagnostic grid + medical cross |
| `KF-08_hermes-card.svg` | Product 4 | 0:24–0:26 | Hermès coming-soon, B2B flow diagram |
| `KF-09_suite-view.svg` | Recap | 0:26–0:28 | All 4 tiles under Filò wordmark (Igea/Hermès at 70% opacity) |
| `KF-10_final-cta.svg` | CTA | 0:28–0:30 | Filò lockup + "Parla con Filò →" pill + filo.it |

### Vertical 9:16 (1080×1920)
`teaser-assets/filo-suite/vertical/`
- `V-KF-02_proposition.svg` — headline centered for 9:16
- `V-KF-04_galatea-card.svg` — mini-dashboard reflowed vertical
- `V-KF-10_final-cta.svg` — stacked lockup + CTA

### Horizontal 16:9
Master files (`KF-*`) are already 1920×1080 — use directly for web, YouTube, landing hero loop.

---

## Part 2 · Galatea product-led teaser (20–30s)

Directory: `teaser-assets/galatea-teaser/`

| File | Scene | Timing | Purpose |
|------|-------|--------|---------|
| `G-01_cold-open.svg` | Hook | 0:00–0:03 | "Ogni messaggio perso è un cliente perso." |
| `G-02_chat-inbound.svg` | Problem | 0:03–0:07 | Marco Verdi WA message at 11:02 — delay request |
| `G-03_chat-ai-reply.svg` | Solution | 0:07–0:13 | Galatea auto-reply → reschedule to 11:30 · "Gestito da Galatea" badge |
| `G-04_booking-update.svg` | System | 0:13–0:18 | Agenda row updates 11:15 → 11:30, rest of day intact |
| `G-05_reminder.svg` | Retention | 0:18–0:22 | Giulia receives automated reminder, replies OK, confirm registered |
| `G-06_dashboard-kpis.svg` | Proof | 0:22–0:26 | 128 prenotazioni AI, 42h, 14 no-show evitati, €3.840 |
| `G-07_final-cta.svg` | CTA | 0:26–0:30 | "Prova Galatea gratis →" + filo.it/galatea · ecosystem footer |

### Vertical 9:16
`teaser-assets/galatea-teaser/vertical/`
- `VG-02_chat-sequence.svg` — chat condensed into single vertical frame
- `VG-06_kpis.svg` — KPI stack for stories/reels
- `VG-07_final-cta.svg` — stacked CTA

### Horizontal 16:9
Master files (`G-*`) are already 1920×1080.

---

## Grounding references

| Asset element | Source of truth |
|---------------|-----------------|
| Galatea appointments (Giulia, Marco, Elena, Chiara, Sofia) | `src/components/products/dashboards/GalateaDashboard.tsx` |
| Marco Verdi chat dialog (11:15 → 11:30) | GalateaDashboard WhatsApp simulation |
| KPIs (128, 42h, 14, €3.840) | GalateaDashboard KPI tiles |
| Atlas funnel labels | Site Products section copy |
| Product status (available vs coming soon) | Product config in source |
| Typography, spacing, tokens | `src/app/globals.css` + Tailwind 4 theme |

## Export notes

- All SVGs are viewBox-normalized — scale losslessly to any delivery size.
- For video: rasterize at 2× target resolution (3840×2160 for 4K master) to preserve type crispness through motion.
- For Figma/After Effects: open SVG directly; text remains editable.
- Transitions between keyframes: use timing spec from production package (fade 300ms, swap 500ms ease-out, KPI counter 800ms).
- CTA button on `KF-10` / `G-07` is designed as a single hit-area — in interactive web hero, bind to `#contact` anchor.
