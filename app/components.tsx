'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { HOME_FAQ, type FAQItem } from './faq';

const logo = '/powerclip-mark-white.png?v=20260912';
const formEndpoint = 'https://api.web3forms.com/submit';
const formAccessKey = '3a77a838-979c-491b-a99b-565192990999';

const navGroups = [
  { label: 'Brand Growth', href: '/grow', items: [['Website + SEO', '/website-seo'], ['Ranking + Reviews', '/ranking-reviews']] },
  { label: 'Distribution', href: '/brands', items: [['Brand Campaigns', '/brand-campaigns'], ['Clippers', '/clippers'], ['Paid Ads', '/paid-ads']] },
  { label: 'Operations', href: '/operations', items: [['CRMs + Reporting', '/operations#crms-reporting'], ['Automations', '/automations']] },
] as const;

function navId(label: string) {
  return `nav-menu-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeMenus = () => { setMenuOpen(false); setOpenGroup(null); setMobileGroup(null); };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const activeGroup = (document.activeElement as HTMLElement | null)?.closest<HTMLElement>('[data-nav-group]')?.dataset.navGroup;
      setMenuOpen(false);
      setOpenGroup(null);
      setMobileGroup(null);
      if (activeGroup) triggerRefs.current[activeGroup]?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeMenus();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return <nav ref={navRef} className="nav" aria-label="Primary navigation">
    <Link href="/" className="brand" onClick={closeMenus}><img src={logo} alt="" width="30" height="38" /><span>PowerClip</span></Link>
    <div className="navlinks">
      {navGroups.map((group) => {
        const menuId = navId(group.label);
        const isOpen = openGroup === group.label;
        return <div className="nav-group" data-nav-group={group.label} key={group.label} onMouseEnter={() => setOpenGroup(group.label)} onMouseLeave={() => setOpenGroup(null)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenGroup(null); }}>
          <button ref={(element) => { triggerRefs.current[group.label] = element; }} id={`${menuId}-trigger`} className="nav-group-trigger" type="button" aria-haspopup="menu" aria-controls={menuId} aria-expanded={isOpen} onFocus={() => setOpenGroup(group.label)} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpenGroup(group.label); } }} onClick={() => setOpenGroup(group.label)}>{group.label}<span aria-hidden="true">⌄</span></button>
          <div id={menuId} className={`nav-dropdown${isOpen ? ' is-open' : ''}`} role="menu" aria-labelledby={`${menuId}-trigger`} aria-label={`${group.label} menu`}>
            {group.items.map(([label, href]) => <Link href={href} role="menuitem" key={label} onClick={closeMenus}>{label}<span aria-hidden="true">↗</span></Link>)}
          </div>
        </div>;
      })}
      <Link href="/contact" onClick={closeMenus}>Contact</Link>
    </div>
    <div className="nav-actions"><Link href="/grow" className="pill primary nav-cta" onClick={closeMenus}>Start a Project <b>↗</b></Link><button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => { setMenuOpen(open => !open); setOpenGroup(null); }}><span className="menu-icon" aria-hidden="true" /><span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span></button></div>
    {menuOpen && <div className="mobile-navlinks" id="mobile-navigation">
      {navGroups.map((group) => {
        const menuId = `${navId(group.label)}-mobile`;
        const isOpen = mobileGroup === group.label;
        return <div className="mobile-nav-group" key={group.label}>
          <div className="mobile-nav-group-row"><button className="mobile-nav-group-trigger" type="button" aria-haspopup="menu" aria-controls={menuId} aria-expanded={isOpen} onClick={() => setMobileGroup(current => current === group.label ? null : group.label)}>{group.label}<span aria-hidden="true">{isOpen ? '−' : '+'}</span></button></div>
          {isOpen && <div className="mobile-subnav" id={menuId} role="menu" aria-label={`${group.label} menu`}>{group.items.map(([label, href]) => <Link href={href} role="menuitem" key={label} onClick={closeMenus}>{label}<span aria-hidden="true">↗</span></Link>)}</div>}
        </div>;
      })}
      <Link href="/contact" onClick={closeMenus}>Contact</Link><Link href="/grow" className="pill primary" onClick={closeMenus}>Start a Project <b>↗</b></Link>
    </div>}
  </nav>;
}

export function Footer() {
  return <footer className="footer"><div><Link href="/" className="brand"><img src={logo} alt="" width="22" height="28" /><span>PowerClip</span></Link><p>Brand growth, distribution, and operations. Engineered.</p></div><div className="footer-links"><Link href="/grow">Brand Growth</Link><Link href="/brands">Distribution</Link><Link href="/operations">Operations</Link><Link href="/clippers">Clippers</Link><Link href="/contact">Contact</Link></div><small>© 2026 PowerClip</small></footer>;
}

export function Reveal({ children, as: Tag = 'div', className = '', id }: { children: React.ReactNode; as?: 'section' | 'div'; className?: string; id?: string }) {
  useEffect(() => { const elements = document.querySelectorAll('.reveal'); const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 }); elements.forEach(element => observer.observe(element)); return () => observer.disconnect(); }, []);
  return <Tag id={id} className={`${className} reveal`}>{children}</Tag>;
}

type StickyService = {
  number: string;
  need: string;
  label: string;
  title: string;
  promise: string;
  includes: string[];
  href: string;
  visual: string;
  visualDetail: string;
};

export function StickyServices({ services }: { services: ReadonlyArray<StickyService> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-service-index]'));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveIndex(Number((visible.target as HTMLElement).dataset.serviceIndex));
    }, { rootMargin: '-32% 0px -48% 0px', threshold: [0.2, 0.5, 0.8] });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const activeService = services[activeIndex] ?? services[0];

  // Structural workflow diagram (brief -> build -> report) representing how the
  // work moves for the active lane — not a data chart, so no axes or plotted values.
  // Only the center "build" node's icon changes per service; the path/nodes stay fixed.
  const serviceIcons = [
    // Brand Growth: a simple globe/site mark
    <g key="growth"><circle r="9" /><ellipse rx="3.5" ry="9" /><line x1="-9" y1="0" x2="9" y2="0" /></g>,
    // Distribution: connected nodes fanning out to platforms
    <g key="distribution"><circle cx="0" cy="-8" r="3" /><circle cx="-7" cy="7" r="3" /><circle cx="7" cy="7" r="3" /><line x1="0" y1="-5" x2="-6" y2="4" /><line x1="0" y1="-5" x2="6" y2="4" /><line x1="-4" y1="7" x2="4" y2="7" /></g>,
    // Operations: a gear mark
    <g key="operations"><circle r="6" /><line x1="0" y1="-10" x2="0" y2="-6" /><line x1="0" y1="10" x2="0" y2="6" /><line x1="-10" y1="0" x2="-6" y2="0" /><line x1="10" y1="0" x2="6" y2="0" /><line x1="-7" y1="-7" x2="-4.2" y2="-4.2" /><line x1="7" y1="-7" x2="4.2" y2="-4.2" /><line x1="-7" y1="7" x2="-4.2" y2="4.2" /><line x1="7" y1="7" x2="4.2" y2="4.2" /></g>,
  ];

  return <div className="pc-services-shell" ref={sectionRef}>
    <div className="pc-service-list" role="group" aria-label="PowerClip services">
      {services.map((service, index) => <Link
        className={`pc-service-item${index === activeIndex ? ' is-active' : ''}`}
        data-service-index={index}
        href={service.href}
        key={service.number}
        onFocus={() => setActiveIndex(index)}
        onMouseEnter={() => setActiveIndex(index)}
        aria-current={index === activeIndex ? 'true' : undefined}
      >
        <div className="pc-service-item-top"><span>{service.number}</span><small>{service.need}</small></div>
        <p className="pc-card-label">{service.label} <span>·</span> {service.title}</p>
        <h3>{service.promise}</h3>
        <div className="pc-service-item-foot"><span>Includes</span><span>{service.includes.join(' · ')}</span></div>
        <span className="pc-service-item-link">Explore {service.title} <span aria-hidden="true">↗</span></span>
      </Link>)}
    </div>

    <div className="pc-services-visual-wrap">
      <div className={`pc-services-visual state-${activeIndex}`} role="status" aria-live="polite" aria-label={`${activeService.title}: ${activeService.visual}`}>
        <div className="pc-services-visual-head"><span>POWERCLIP / CONNECTED WORK</span><b>{activeService.number} / {activeService.title.toUpperCase()}</b></div>
        <div className="pc-services-plot">
          <div className="pc-services-plot-grid" aria-hidden="true" />
          <div className="pc-services-plot-copy"><span>THE WORK</span><strong>{activeService.visual}</strong><small>{activeService.visualDetail}</small></div>
          <img className="pc-services-canva-animation" src="/four-circles-trailing.gif" alt="" aria-hidden="true" />
          <svg viewBox="0 0 322 126" role="img" aria-label={`${activeService.title}: brief, build, and report, connected`} className="pc-services-chart pc-services-diagram">
            <path d="M40 63H282" className="pc-services-diagram-path" />
            <circle className="pc-services-diagram-dot" r="3" />
            <g className="pc-services-node" transform="translate(40 63)">
              <circle r="24" />
              <g className="pc-services-node-icon" strokeLinecap="round" strokeLinejoin="round">
                <rect x="-8" y="-11" width="16" height="22" rx="2" /><line x1="-4" y1="-4" x2="4" y2="-4" /><line x1="-4" y1="1" x2="4" y2="1" /><line x1="-4" y1="6" x2="1" y2="6" />
              </g>
            </g>
            <g className="pc-services-node is-build" transform="translate(161 63)">
              <circle r="26" />
              <g className="pc-services-node-icon" strokeLinecap="round" strokeLinejoin="round" key={activeIndex}>
                {serviceIcons[activeIndex]}
              </g>
            </g>
            <g className="pc-services-node" transform="translate(282 63)">
              <circle r="24" />
              <g className="pc-services-node-icon" strokeLinecap="round" strokeLinejoin="round">
                <rect x="-8" y="-11" width="16" height="22" rx="2" /><path d="M-4 -1 L-1 2 L5 -5" />
              </g>
            </g>
          </svg>
          <div className="pc-services-plot-foot"><span>BRIEF</span><span>BUILD</span><span>REPORT</span></div>
        </div>
        <div className="pc-services-visual-bottom"><span>ONE TEAM / CONNECTED HANDOFFS</span><b>{activeService.label.toUpperCase()}</b></div>
      </div>
      <p className="pc-services-visual-caption">Scroll, hover, or focus a lane to inspect how the work moves.</p>
    </div>
  </div>;
}

export function HeroSignal() {
  return <div className="hero-signal" role="img" aria-label="A connected PowerClip workflow from brief to build to reporting">
    <div className="hero-signal-head"><span>POWERCLIP / CONNECTED WORK</span><b>01—03</b></div>
    <div className="hero-signal-grid" aria-hidden="true" />
    <div className="hero-signal-copy"><span>ONE BRIEF</span><strong>From brief<br />to momentum.</strong><small>BUILD A CLEAR PRESENCE · PUT CONTENT IN MOTION · KEEP THE WORK CONNECTED</small></div>
    <svg viewBox="0 0 470 132" aria-hidden="true" className="hero-signal-chart"><defs><linearGradient id="hero-line" x1="0" x2="1"><stop offset="0" stopColor="#F3C56B" /><stop offset="1" stopColor="#8C7CFF" /></linearGradient></defs><path d="M18 112H448M18 20V112" className="chart-axis" /><path d="M18 100 C 68 100, 82 74, 132 80 S 192 95, 236 62 S 300 80, 344 44 S 400 45, 448 23" className="chart-line" /><path d="M 344 44 S 400 45, 448 23" className="chart-line-projected" /><circle cx="18" cy="100" r="3" className="chart-point" /><circle cx="132" cy="80" r="3" className="chart-point" /><circle cx="236" cy="62" r="3" className="chart-point" /><circle cx="344" cy="44" r="3" className="chart-point" /><circle cx="448" cy="23" r="4" className="chart-point chart-point-active" /></svg>
    <div className="hero-signal-foot"><span>BRIEF</span><span>BUILD</span><span>REPORT</span></div>
  </div>;
}

type HeroBeam = {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
};

function createHeroBeam(width: number, height: number, index: number): HeroBeam {
  return {
    x: width * (0.18 + (index / 5) * 0.9),
    y: height * (0.35 + (index % 3) * 0.32),
    width: 24 + (index % 3) * 12,
    length: height * 1.75,
    angle: -27 + (index % 4) * 3,
    speed: 0.12 + (index % 3) * 0.045,
    opacity: 0.028 + (index % 4) * 0.009,
  };
}

export function HeroBeams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let beams: HeroBeam[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      beams = Array.from({ length: 5 }, (_, index) => createHeroBeam(width, height, index));
    };

    const draw = (animate: boolean) => {
      context.clearRect(0, 0, width, height);
      context.filter = 'blur(16px)';
      beams.forEach((beam) => {
        if (animate) {
          beam.y -= beam.speed;
          if (beam.y + beam.length < -height * 0.35) beam.y = height * 1.15;
        }
        context.save();
        context.translate(beam.x, beam.y);
        context.rotate((beam.angle * Math.PI) / 180);
        const gradient = context.createLinearGradient(0, 0, 0, beam.length);
        gradient.addColorStop(0, 'rgba(231, 229, 235, 0)');
        gradient.addColorStop(0.28, `rgba(231, 229, 235, ${beam.opacity})`);
        gradient.addColorStop(0.58, `rgba(198, 195, 205, ${beam.opacity * 0.7})`);
        gradient.addColorStop(1, 'rgba(231, 229, 235, 0)');
        context.fillStyle = gradient;
        context.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        context.restore();
      });
      context.filter = 'none';
      if (animate) animationFrame = requestAnimationFrame(() => draw(true));
    };

    resize();
    draw(!reducedMotion.matches);
    window.addEventListener('resize', resize);
    const onMotionChange = () => {
      cancelAnimationFrame(animationFrame);
      resize();
      draw(!reducedMotion.matches);
    };
    reducedMotion.addEventListener?.('change', onMotionChange);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      reducedMotion.removeEventListener?.('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-beams" aria-hidden="true" />;
}

export function BorderBeam() {
  return <span className="pc-border-beam" aria-hidden="true" />;
}

export function AnimatedBeam({ reverse = false }: { reverse?: boolean }) {
  return <svg className={`pc-animated-beam${reverse ? ' is-reverse' : ''}`} viewBox="0 0 560 170" aria-hidden="true" preserveAspectRatio="none">
    <path className="pc-animated-beam-path" d="M18 128 C 132 128, 134 42, 280 42 S 428 128, 542 42" />
    <circle className="pc-animated-beam-dot" r="4" cx="0" cy="0" />
  </svg>;
}

const signalItems = [
  ['01', 'Brief', 'A clear problem to move next.'],
  ['02', 'Build', 'The right service lane, scoped.'],
  ['03', 'Report', 'The next useful handoff, visible.'],
] as const;

export function GrowthEngineBoard() {
  const [activeLane, setActiveLane] = useState(0);
  const activeItem = signalItems[activeLane];
  return <div className="pc-bento-grid" aria-label="PowerClip growth engine components">
    <article className="pc-bento-card pc-bento-wide pc-beam-card">
      <BorderBeam />
      <div className="pc-bento-copy"><span className="pc-bento-kicker">CONNECTED SIGNAL</span><h3>One system, three handoffs.</h3><p>Move from a clear brief to the next useful action without turning the page into a generic dashboard.</p></div>
      <div className="pc-beam-canvas">
        <div className="pc-beam-node pc-beam-node-a"><small>01</small><strong>BRIEF</strong></div>
        <div className="pc-beam-node pc-beam-node-b"><small>02</small><strong>BUILD</strong></div>
        <div className="pc-beam-node pc-beam-node-c"><small>03</small><strong>REPORT</strong></div>
        <AnimatedBeam />
      </div>
    </article>
    <article className="pc-bento-card pc-bento-tall pc-list-card">
      <span className="pc-bento-kicker">ANIMATED LIST / ILLUSTRATIVE</span><h3>Work in motion.</h3><p>Sequence the handoff, then let the detail stay readable.</p>
      <div className="pc-animated-list" aria-label="Illustrative PowerClip work sequence">
        {signalItems.map(([number, title, copy], index) => <div className={`pc-animated-list-item${index === activeLane ? ' is-active' : ''}`} key={number} style={{ animationDelay: `${index * 180}ms` }}><span>{number}</span><div><strong>{title}</strong><small>{copy}</small></div><i aria-hidden="true">↗</i></div>)}
      </div>
    </article>
    <article className="pc-bento-card pc-bento-chart-card">
      <span className="pc-bento-kicker">MODULAR PROOF</span><h3>Show the shape of the work.</h3><p>Use branded charts when they clarify a decision, never to imply live traction.</p>
      <div className="pc-mini-signal"><span>{activeItem[0]} / {activeItem[1].toUpperCase()}</span><strong>{activeItem[2]}</strong><div className="pc-mini-bars" aria-hidden="true">{[34, 62, 46, 78, 56].map((height, index) => <i key={index} style={{ height: `${Math.max(24, height + activeLane * 5)}%` }} />)}</div><small>ILLUSTRATIVE SYSTEM VIEW · NOT LIVE PERFORMANCE</small></div>
    </article>
    <article className="pc-bento-card pc-bento-controls">
      <span className="pc-bento-kicker">INTERACTION</span><h3>Choose a lane.</h3><p>Fast UI response under a slower editorial surface.</p>
      <div className="pc-lane-buttons" role="tablist" aria-label="PowerClip service lanes">{signalItems.map(([number, title], index) => <button key={number} type="button" role="tab" aria-selected={index === activeLane} className={index === activeLane ? 'is-active' : ''} onClick={() => setActiveLane(index)}>{number} {title}</button>)}</div>
    </article>
  </div>;
}

const comparisonCopy = [
  { label: 'Disconnected', copy: 'Website, reach, and operations hand off with missing context.' },
  { label: 'Connected', copy: 'A shared brief keeps the next action visible across the system.' },
] as const;

export function CompareSlider() {
  return <div className="pc-compare-wrap">
    <div className="pc-compare" aria-label="Illustrative impact of a connected system versus disconnected tools">
      <div className="pc-compare-copy">
        <div className="pc-compare-state is-before"><span className="pc-bento-kicker">BEFORE / SPLIT</span><strong>{comparisonCopy[0].label}</strong><p>{comparisonCopy[0].copy}</p></div>
        <div className="pc-compare-state is-after"><span className="pc-bento-kicker">AFTER / CONNECTED</span><strong>{comparisonCopy[1].label}</strong><p>{comparisonCopy[1].copy}</p></div>
      </div>
      <div className="pc-compare-chart">
        <div className="pc-compare-chart-head"><span>ILLUSTRATIVE SYSTEM VIEW</span><b>BRIEF → BUILD → REPORT</b></div>
        <svg viewBox="0 0 480 210" role="img" aria-label="Line chart: a connected system compounds across brief, build, and report, while disconnected work resets at each handoff" className="pc-compare-graph">
          <defs><linearGradient id="pc-compare-line" x1="0" x2="1"><stop offset="0" stopColor="#F3C56B" /><stop offset="1" stopColor="#8C7CFF" /></linearGradient></defs>
          <path d="M28 180H460M28 20V180" className="chart-axis" />
          <path d="M28 150 C 120 158, 170 168, 244 160 S 360 172, 460 162" className="pc-compare-line-before" />
          <path d="M28 138 C 120 108, 170 88, 244 66 S 360 40, 460 20" className="chart-line" />
          <path d="M360 40 S 420 28, 460 20" className="chart-line-projected" />
          <circle cx="28" cy="138" r="3" className="chart-point" /><circle cx="244" cy="66" r="3" className="chart-point" /><circle cx="460" cy="20" r="4" className="chart-point chart-point-active" />
          <circle cx="28" cy="150" r="3" className="pc-compare-point-before" /><circle cx="244" cy="160" r="3" className="pc-compare-point-before" /><circle cx="460" cy="162" r="3" className="pc-compare-point-before" />
        </svg>
        <div className="pc-compare-chart-foot"><span>BRIEF</span><span>BUILD</span><span>REPORT</span></div>
        <div className="pc-compare-legend"><span className="is-before"><i />Disconnected</span><span className="is-after"><i />Connected</span></div>
      </div>
    </div>
  </div>;
}

const timelineItems = [
  ['01', 'Discover', 'Name the problem, current setup, and useful next move.'],
  ['02', 'Scope', 'Choose the right service lane and define the handoff.'],
  ['03', 'Build or launch', 'Make the next piece work in the real workflow.'],
  ['04', 'Report', 'Document what changed and what is ready next.'],
] as const;

export function ScrollTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActiveStep(Number((entry.target as HTMLElement).dataset.timelineStep)); }), { rootMargin: '-38% 0px -48% 0px', threshold: 0.2 });
    stepRefs.current.forEach(step => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);
  return <ol className="pc-scroll-timeline" aria-label="PowerClip engagement timeline"><span className="pc-timeline-progress" style={{ height: `${((activeStep + 1) / timelineItems.length) * 100}%` }} aria-hidden="true" />{timelineItems.map(([number, title, copy], index) => <li key={number} ref={element => { stepRefs.current[index] = element; }} data-timeline-step={index} className={index === activeStep ? 'is-active' : ''}><span className="pc-timeline-node">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>;
}

export function RouteArt({ kind }: { kind: 'growth' | 'distribution' | 'operations' }) {
  if (kind === 'growth') return <div className="route-art route-art-growth" aria-hidden="true"><div className="route-art-grid" /><span className="route-art-stamp">01 / FINDABLE</span><div className="route-art-query"><i>⌕</i><b>clearer web presence</b><small>SEARCH / TRUST</small></div><div className="route-art-results"><span>01</span><strong>Business clarity</strong><em>mapped</em><span>02</span><strong>Search foundation</strong><em>laid</em><span>03</span><strong>Next useful step</strong><em>open</em></div></div>;
  if (kind === 'distribution') return <div className="route-art route-art-distribution" aria-hidden="true"><div className="route-art-grid" /><span className="route-art-stamp">02 / IN MOTION</span><div className="route-art-source"><b>SOURCE</b><strong>one clear message</strong><small>EDIT / ADAPT / POST</small></div><div className="route-art-platforms"><span>TIKTOK</span><span>REELS</span><span>SHORTS</span><span>X</span></div><div className="route-art-flow"><i /><i /><i /><i /></div></div>;
  return <div className="route-art route-art-operations" aria-hidden="true"><div className="route-art-grid" /><span className="route-art-stamp">03 / REPEATABLE</span><div className="route-node node-intake"><small>01</small><b>INTAKE</b></div><div className="route-node node-crm"><small>02</small><b>CRM</b></div><div className="route-node node-report"><small>03</small><b>REPORT</b></div><div className="route-node-core">NEXT<br />ACTION</div><div className="route-connector connector-a" /><div className="route-connector connector-b" /><div className="route-connector connector-c" /></div>;
}

export function PlatformBand() {
  const icons = [['TikTok', 'https://cdn.prod.website-files.com/6a9bec8d49c233648aca8b92/6a9bfd9f21f7ad23e747420e_tiktok.png'], ['Instagram', 'https://cdn.prod.website-files.com/6a9bec8d49c233648aca8b92/6a9bfd9ffe3191396c1eb296_instagram.png'], ['YouTube Shorts', 'https://cdn.prod.website-files.com/6a9bec8d49c233648aca8b92/6a9bfd9fdb606a8dcb4468dd_youtube.png'], ['X', 'https://cdn.prod.website-files.com/6a9bec8d49c233648aca8b92/6a9bfd9f509e5dd3be0d4ff5_x.png']];
  return <section className="platform-band"><p>Campaigns distributed across TikTok, Instagram, YouTube Shorts &amp; X</p><div>{icons.map(([name, source]) => <span key={name}><img src={source} alt="" />{name}</span>)}</div></section>;
}

export function Calculator() {
  const [budget, setBudget] = useState(2500); const [cpm, setCpm] = useState(1.5); const views = Math.round((budget / cpm) * 1000);
  return <div className="calculator"><div className="calc-head"><h3>Campaign Reach Estimator</h3><span className="demo">ESTIMATE</span></div><p className="muted">Drag the sliders to estimate verified views.</p><div className="calc-row"><label>Campaign Budget <strong>${budget.toLocaleString()}</strong></label><input className="range" aria-label="Campaign budget" type="range" min="500" max="10000" step="100" value={budget} onChange={event => setBudget(+event.target.value)} /></div><div className="calc-row"><label>CPM Rate <strong>${cpm.toFixed(2)}</strong></label><input className="range" aria-label="CPM rate" type="range" min="0.5" max="10" step="0.25" value={cpm} onChange={event => setCpm(+event.target.value)} /></div><div className="calc-result"><span className="demo">ESTIMATED VERIFIED VIEWS</span><strong>{views.toLocaleString()}</strong><div className="chart"><i style={{ height: `${Math.min(94, Math.max(18, views / 25000))}%` }} /><i style={{ height: `${Math.min(82, Math.max(14, views / 33000))}%` }} /><i style={{ height: `${Math.min(72, Math.max(12, views / 42000))}%` }} /><i style={{ height: `${Math.min(88, Math.max(16, views / 29000))}%` }} /><i style={{ height: `${Math.min(98, Math.max(20, views / 22000))}%` }} /></div><div className="compare"><span>Formula</span><b>(${budget.toLocaleString()} ÷ ${cpm.toFixed(2)}) × 1,000</b></div></div></div>;
}

export function DashboardMock() {
  return <div className="reporting-sheet"><RouteArt kind="distribution" /><p className="reporting-note">Illustrative reporting structure — campaign data appears after the work runs.</p></div>;
}

const defaultFaq: FAQItem[] = [
    ['What is PowerClip and how does it work?', 'PowerClip is a brand growth and distribution company with three connected pillars: Brand Growth, Distribution, and Operations. We help businesses build a stronger foundation, put the right content in motion, and run the systems behind growth.'],
    ['What does Brand Growth include?', 'Brand Growth includes website strategy and development, SEO, local and search ranking work, reputation and review management, and related growth services scoped around the business.'],
    ['What does Distribution include?', 'Distribution has two distinct offers: creator-led Clipping Campaigns and paid Ads. The right mix depends on the objective, source content, audience, timing, and budget.'],
    ['How do Clipping Campaigns work?', 'Brands provide source content, guidelines, and a campaign budget. Independent clippers create native short-form posts across TikTok, Instagram Reels, YouTube Shorts, and X. Whop Content Rewards logic connects verified views to campaign payouts where applicable.'],
    ['How are views verified?', 'Views are tracked through the campaign’s verification rules and the relevant Whop Content Rewards infrastructure. Views are not treated as verified simply because they are self-reported.'],
    ['How do Ads fit in?', 'Ads are a separate paid-distribution lever for deliberate targeting, controlled pacing, or extending a message beyond organic discovery. They are scoped separately from creator-led clipping.'],
    ['What does Operations cover?', 'Operations covers CRM setup or migration, lead and client pipelines, workflow automation, dashboards, reporting, systems implementation, integrations, documentation, and handoff. The aim is to make growth work repeatably operational.'],
    ['How do the three pillars work together?', 'Brand Growth gives the message a clear home. Distribution puts it in motion. Operations keeps the people, tools, and reporting connected so the work can repeat and improve.'],
    ['What does an engagement look like?', 'We start with a short discovery conversation, define the problem and useful next step, then scope the work around the required service or combination of services.'],
    ['How are projects priced?', 'There is no single fixed package for every engagement. Brand Growth and Operations are scoped around the work; Distribution budgets, paid media spend, and any campaign rate are defined in the brief.'],
    ['Who is PowerClip for?', 'PowerClip is for local businesses, creators, startups, independent brands, and content-led teams that need a clearer foundation, more deliberate reach, or better systems behind the work.'],
];

export function FAQ({ items = defaultFaq }: { items?: ReadonlyArray<FAQItem> }) {
  return <div className="faq">{items.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>;
}

function SubmitForm({ children, subject, formName }: { children: React.ReactNode; subject: string; formName: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setState('sending'); const data = new FormData(event.currentTarget); data.set('access_key', formAccessKey); data.set('subject', subject); data.set('from_name', 'PowerClip website'); try { const response = await fetch(formEndpoint, { method: 'POST', body: data }); const result = await response.json(); if (result.success) { event.currentTarget.reset(); setState('success'); } else setState('error'); } catch { setState('error'); } }
  return <form className="form" name={formName} onSubmit={submit}>{children}<button className="pill primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : formName === 'campaign' ? 'Submit campaign →' : 'Send message →'}</button><p className={`form-status ${state}`} role="status" aria-live="polite">{state === 'success' ? 'Received — we’ll reply with next steps within one business day.' : state === 'error' ? 'Something went wrong. Please email hello@powerclip.app directly.' : ''}</p></form>;
}

export function ContactForm() { return <SubmitForm formName="contact" subject="PowerClip contact message"><label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@company.com" /></label><label>Title<input required name="title" placeholder="Campaign question, partnership, or general note" /></label><label>Message<textarea required name="message" rows={6} placeholder="Tell us what you’re building." /></label></SubmitForm>; }

export function CampaignForm() {
  const [budget, setBudget] = useState(1000);
  return <SubmitForm formName="campaign" subject="New PowerClip campaign brief"><div className="form-grid"><label>First name<input required name="first_name" autoComplete="given-name" /></label><label>Last name<input required name="last_name" autoComplete="family-name" /></label></div><label>Email<input required type="email" name="email" autoComplete="email" /></label><label>Brand / project<input required name="brand" /></label><label>Campaign budget <strong className="field-value">${budget.toLocaleString()}</strong><input className="range" aria-label="Campaign budget" type="range" min="1000" max="100000" step="1000" value={budget} onChange={event => setBudget(+event.target.value)} /><span className="range-hint"><span>$1,000</span><span>$100,000</span></span></label><label>Goal<select required name="goal" defaultValue=""><option value="" disabled>Select a goal</option><option>Brand Awareness</option><option>Music Promo</option><option>Artist Clip-Up</option><option>Faceless Content</option><option>Other</option></select></label><label>Description<textarea required name="description" rows={6} placeholder="What are you promoting, and what should the campaign achieve?" /></label><label>Files / resources<input name="resources" placeholder="Share brand assets, source content, or reference material via link." /></label></SubmitForm>;
}

export function ServiceCards() {
  const services = [['Brand Growth', 'Build a web presence people can find, trust, and choose.', '/grow'], ['Distribution', 'Put content in motion through creator-led and paid reach.', '/brands'], ['Operations', 'Make the systems behind growth repeatable and visible.', '/operations']];
  return <div className="service-cards">{services.map(([name, copy, href]) => <Link className="card service-card" href={href} key={name}><span className="path-label">POWERCLIP</span><h3>{name}</h3><p>{copy}</p><b className="service-arrow">↗</b></Link>)}</div>;
}

type FocusSection = { id: string; label: string; title: string; copy: string; items: ReadonlyArray<readonly [string, string]> };
type RelatedLink = readonly [string, string, string];

export function ServicePage({ eyebrow, title, lead, description, heroId, steps, includes, includeIds = {}, focusSections = [], relatedLinks = [], cta = 'Start a growth conversation', ctaHref = '/grow' }: { eyebrow: string; title: React.ReactNode; lead: string; description: string; heroId?: string; steps: string[][]; includes: string[]; includeIds?: Readonly<Record<string, string>>; focusSections?: ReadonlyArray<FocusSection>; relatedLinks?: ReadonlyArray<RelatedLink>; cta?: string; ctaHref?: string }) {
  const pageKey = eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const kind = pageKey === 'get-found' || pageKey.startsWith('brand-growth') ? 'growth' : pageKey.startsWith('distribution') ? 'distribution' : 'operations';
  return <main className={`site service-page service-${pageKey}`}><Nav /><section id={heroId} className="subpage-hero service-hero"><div className="service-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="hero-kicker">{lead}</p><p className="muted">{description}</p><Link className="pill primary" href={ctaHref}>{cta} <b>↗</b></Link></div><RouteArt kind={kind} /></section><Reveal as="section" className="section sub-section"><div className="section-label">HOW IT WORKS</div><h2>A clear path from problem to progress.</h2><div className="process-grid">{steps.map(([number, stepDescription]) => <article className="process-item" key={number}><span>{number}</span><div><h3>{stepDescription.split('|')[0]}</h3><p>{stepDescription.split('|')[1]}</p></div></article>)}</div></Reveal>{focusSections.map(section => <Reveal as="section" id={section.id} className="section sub-section focus-section" key={section.id}><div className="section-label">{section.label}</div><h2>{section.title}</h2><p className="section-lead">{section.copy}</p><div className="info-grid">{section.items.map(([itemTitle, itemCopy]) => <article className="card" key={itemTitle}><h3>{itemTitle}</h3><p>{itemCopy}</p></article>)}</div></Reveal>)}<Reveal as="section" className="section sub-section"><div className="section-label">WHAT’S INCLUDED</div><h2>Know what the work covers.</h2><div className="included-grid">{includes.map(item => <div className="included-item" id={includeIds[item]} key={item}><span>✓</span><p>{item}</p></div>)}</div></Reveal>{relatedLinks.length > 0 && <Reveal as="section" className="section sub-section related-section"><div className="section-label">CONTINUE THE PATH</div><h2>Connect the next useful piece.</h2><div className="info-grid">{relatedLinks.map(([label, copy, href]) => <Link className="card related-card" href={href} key={label}><span className="path-label">POWERCLIP</span><h3>{label}</h3><p>{copy}</p><b className="service-arrow">↗</b></Link>)}</div></Reveal>}<Reveal as="section" className="final-cta center"><h2>Ready to make the next move?</h2><p>Tell us what needs to work better. We’ll start with the right scope.</p><Link className="pill primary" href={ctaHref}>{cta} <b>↗</b></Link></Reveal><Footer /></main>;
}

export function GrowthForm() {
  const [budget, setBudget] = useState<number | ''>(0);
  function updateBudget(value: string) { if (value === '') { setBudget(''); return; } const parsed = Number(value); if (Number.isFinite(parsed)) setBudget(Math.min(500000, Math.max(0, parsed))); }
  return <SubmitForm formName="growth" subject="New PowerClip growth inquiry"><div className="form-grid"><label>First name<input required name="first_name" autoComplete="given-name" /></label><label>Last name<input required name="last_name" autoComplete="family-name" /></label></div><label>Email<input required type="email" name="email" autoComplete="email" /></label><label>Brand / project<input required name="brand" /></label><fieldset className="checkbox-field"><legend>Which service(s) do you need?</legend><div className="checkbox-grid"><label><input type="checkbox" name="services" value="Website" />Website</label><label><input type="checkbox" name="services" value="SEO" />SEO</label><label><input type="checkbox" name="services" value="Local search" />Local search</label><label><input type="checkbox" name="services" value="Reputation" />Reputation</label><label><input type="checkbox" name="services" value="Clipping campaigns" />Clipping campaigns</label><label><input type="checkbox" name="services" value="Paid distribution" />Paid distribution / Ads</label><label><input type="checkbox" name="services" value="Operations" />Operations</label></div></fieldset><label>Budget <strong className="field-value">${typeof budget === 'number' ? budget.toLocaleString() : '—'}</strong><div className="budget-entry"><input className="range" aria-label="Budget slider" type="range" min="0" max="500000" step="500" value={typeof budget === 'number' ? budget : 0} onChange={event => updateBudget(event.target.value)} /><input className="budget-number" aria-label="Budget amount" type="number" name="budget" min="0" max="500000" step="500" value={budget} onChange={event => updateBudget(event.target.value)} onBlur={() => { if (budget === '') setBudget(0); }} /></div><span className="range-hint"><span>$0</span><span>$500,000</span></span></label><label>Describe what you need<textarea required name="description" rows={6} placeholder="Tell us what you want to improve, build, or distribute." /></label></SubmitForm>;
}
