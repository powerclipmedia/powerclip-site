# PowerClip Component Board

Status: local preview reference board, 13 September 2026. The PowerClip 2.0 Brand Guidelines are a working draft; exact tokens, radii, and motion timings remain provisional. All examples below are free/copy-paste references to adapt, not production dependencies.

## Direction

- Use editorial hierarchy first, then technical/system detail.
- Keep Brand Growth, Distribution, and Operations distinct in messaging while sharing one visual identity.
- Use #070707 surfaces, soft gray/white type, PowerClip purple as the working accent, fine borders, and restrained atmospheric glow.
- Keep interactions precise and reduced-motion safe. Reject generic SaaS dashboards, noisy gradients, glassmorphism, hype, and invented traction.

## Hero

| Reference | Source / direct link | PowerClip use | Borrow | Reject | Implementation notes |
|---|---|---|---|---|---|
| Animated Beam | Magic UI — [Animated Beam](https://magicui.design/docs/components/animated-beam) | Connect Brief → Build → Report in the hero | Path-following signal and node relationships | Rainbow gradients, infinite visual noise | Custom SVG path with purple endpoint, short loop, reduced-motion fallback; implemented in `app/components.tsx`. |
| Background Beams | Aceternity UI — [Background Beams](https://ui.aceternity.com/components/background-beams) | Add depth behind a major campaign or hero moment | Slow atmospheric movement behind content | Full-screen neon ribbons competing with the headline | Prefer the existing faint grid and one restrained hero drift; keep text contrast first. |
| Border Beam | Magic UI — [Border Beam](https://magicui.design/docs/components/border-beam) | Signal a featured system card or CTA | A single perimeter trace that rewards attention | Constant glowing frames around every card | Local `BorderBeam` wrapper uses a thin purple trace and a 9s loop; reduced motion disables it. |

## Growth Engine

| Reference | Source / direct link | PowerClip use | Borrow | Reject | Implementation notes |
|---|---|---|---|---|---|
| Bento Grid | Magic UI — [Bento Grid](https://magicui.design/docs/components/bento-grid) | House the connected growth-system story | Unequal modules with clear hierarchy | Generic feature-card mosaic with filler copy | Custom CSS grid in `GrowthEngineBoard`; modules map to system ideas, not product claims. |
| Animated List | Magic UI — [Animated List](https://magicui.design/docs/components/animated-list) | Sequence a brief, build, and report handoff | Staggered event/list reveal | Fake notifications or fabricated recent activity | Local CSS-staggered list uses illustrative workflow labels only. |
| Interactive Grid | Magic UI — [Interactive Grid](https://magicui.design/docs/components/interactive-grid) | Explore service lanes or campaign structure | Focus/hover-driven grid response | Cursor-following spectacle that hides content | Candidate for a later service explorer; current lane buttons keep keyboard access explicit. |

## Brand Growth

| Reference | Source / direct link | PowerClip use | Borrow | Reject | Implementation notes |
|---|---|---|---|---|---|
| Compare | Aceternity UI — [Compare](https://ui.aceternity.com/components/compare) | Explain disconnected vs connected growth work | Direct before/after reveal with a draggable handle | Claiming a client result or implying guaranteed uplift | `CompareSlider` is a conceptual system comparison and is labeled illustrative. |
| Glowing Effect | Aceternity UI — [Glowing Effect](https://ui.aceternity.com/components/glowing-effect) | Draw focus to one useful search or reputation step | Contextual highlight around a chosen element | Glow as a default card treatment | Candidate for a service detail page; keep the homepage on fine borders and one accent. |

## Distribution

| Reference | Source / direct link | PowerClip use | Borrow | Reject | Implementation notes |
|---|---|---|---|---|---|
| Timeline | Aceternity UI — [Timeline](https://ui.aceternity.com/components/timeline) | Show campaign flow from source content to reporting | Scroll-following progress and staged narrative | Long chronology or fake campaign milestones | Local `ScrollTimeline` is used for the engagement path; a campaign version can reuse the pattern later. |
| Scroll Based Velocity | Magic UI — [Scroll Based Velocity](https://magicui.design/docs/components/scroll-based-velocity) | Add a single editorial transition between distribution sections | Scroll-responsive type movement | Perpetual ticker motion and unreadable copy | Candidate for campaign/editorial pages only; do not use near forms or dense UI. |

## Operations

| Reference | Source / direct link | PowerClip use | Borrow | Reject | Implementation notes |
|---|---|---|---|---|---|
| Chart | shadcn/ui — [Chart](https://ui.shadcn.com/docs/components/base/chart) | Present readable reporting and operational signals | Accessible chart container, grid, tooltip, legend patterns | Decorative metrics without a data source | Keep chart values explicitly illustrative until real client data exists; current homepage uses a labeled relative signal view. |
| Interactive Bar Chart | shadcn/ui — [Bar charts](https://ui.shadcn.com/charts/bar) | Compare channels, stages, or workflow volume when real data exists | Controlled active state and clear comparison | Fake growth curves or vanity totals | Candidate for CRM/reporting surfaces; use real Supabase-backed data only. |

## Process

| Reference | Source / direct link | PowerClip use | Borrow | Reject | Implementation notes |
|---|---|---|---|---|---|
| Scroll Progress | Aceternity UI — [Scroll Progress](https://ui.aceternity.com/components/scroll-progress) | Keep long service/process pages oriented | Small progress cue tied to reading position | Large floating progress chrome | Current timeline uses an in-flow progress rail so the structure remains understandable without motion. |
| Card Stack | Aceternity UI — [Card Stack](https://ui.aceternity.com/components/card-stack) | Rotate a small set of process principles or proof cards | Controlled depth and emphasis | Auto-rotating testimonials or invented proof | Candidate for a case-study surface after verified examples exist. |

## CTA

| Reference | Source / direct link | PowerClip use | Borrow | Reject | Implementation notes |
|---|---|---|---|---|---|
| Shimmer Button | Magic UI — [Shimmer Button](https://magicui.design/docs/components/shimmer-button) | Give a single primary CTA a subtle response | Short hover/focus shimmer | Always-on shine or high-saturation gradients | Keep the existing pill CTA and use shimmer only if it improves focus and passes reduced-motion checks. |

## Implemented first pass

- `AnimatedBeam`: custom SVG path in the hero-adjacent growth engine board.
- `BorderBeam`: one restrained perimeter trace on the connected-signal module.
- Custom bento system: four modules for connected signal, work sequence, illustrative system view, and lane selection.
- Interactive chart treatment: relative illustrative bars with lane selection and a clear non-live label.
- Animated list: CSS staggered handoff sequence with keyboard-safe lane controls.
- Compare/before-after: range-controlled conceptual comparison.
- Scroll/timeline interaction: `ScrollTimeline` with observer-driven active step and in-flow progress rail.
- Hero background motion: slow grid drift, disabled under reduced motion.

## Remaining candidates

The next strongest candidates are a real-data shadcn chart in the Operations surface, a service-page Glowing Effect used only for a selected state, and a distribution-page scroll transition after route-specific content is confirmed. No production deployment is part of this board.
