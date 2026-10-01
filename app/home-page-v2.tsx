'use client';

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { DashboardSurface } from './client-dashboard-view';
import { Dock, GlassLink } from './new-components';
import { PowerClipIcon, type PowerClipIconName } from './powerclip-icons';

const services = [
  ['Brand Growth', 'Build a presence people can find, trust, and choose.', ['Websites', 'Search', 'Reputation', 'Performance'], '/brand-growth', 'growth'],
  ['Distribution', 'Turn content into reach through creator-led and paid distribution.', ['Clipping campaigns', 'Creator network', 'Paid ads', 'Reporting'], '/distribution', 'distribution'],
  ['Operations', 'Build the systems behind growth so the work stays connected.', ['CRM systems', 'Workflow design', 'Automations', 'Dashboards'], '/operations', 'operations'],
] as const;

const scenarios = [
  ['Build from zero', ['Map the foundation', 'Build the presence', 'Create the first signal', 'Keep it moving']],
  ['Local business', ['Clarify the offer', 'Own local search', 'Turn trust into action', 'Measure what moves']],
  ['E-commerce', ['Find the audience', 'Put content in motion', 'Improve conversion', 'Connect the reporting']],
  ['Brands & creators', ['Shape the source', 'Deploy the clips', 'Grow distribution', 'Run the system']],
] as const;

function IntroAnimation({ heroRef }: { heroRef: RefObject<HTMLImageElement | null> }) {
  const introRef = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState(0);
  const [targetTransform, setTargetTransform] = useState('translate(0,0) scale(1) rotate(0deg)');
  useEffect(() => {
    const timers: number[] = [];
    let frame = 0;
    let cancelled = false;
    let landed = false;
    // Measure the hero mark only once layout is final (webfonts settle with display:swap),
    // so the landing transform ends on the hero logo's real box rather than a stale one.
    const land = () => {
      if (cancelled) return;
      const mark = introRef.current;
      const from = mark?.getBoundingClientRect(); const to = heroRef.current?.getBoundingClientRect();
      if (from && to) {
        const x = (to.left + to.width / 2) - (from.left + from.width / 2);
        const y = (to.top + to.height / 2) - (from.top + from.height / 2);
        const scale = to.width / (mark ? parseFloat(getComputedStyle(mark).width) || from.width : from.width);
        setTargetTransform(`translate(${x}px, ${y}px) scale(${scale}) rotate(0deg)`);
        frame = window.requestAnimationFrame(() => {
          if (cancelled) return;
          setPhase(3);
          // Exit phases are chained off the landing so the hold always outlasts the 1.05s travel.
          timers.push(window.setTimeout(() => setPhase(4), 1070));
          timers.push(window.setTimeout(() => setPhase(5), 1640));
        });
      }
    };
    const startLanding = () => { if (landed) return; landed = true; land(); };
    timers.push(window.setTimeout(() => setPhase(1), 120));
    timers.push(window.setTimeout(() => setPhase(2), 620));
    timers.push(window.setTimeout(() => {
      const fonts = typeof document !== 'undefined' ? document.fonts : undefined;
      if (fonts && fonts.status !== 'loaded') {
        fonts.ready.then(startLanding).catch(startLanding);
        timers.push(window.setTimeout(startLanding, 600));
      } else { startLanding(); }
    }, 1280));
    return () => { cancelled = true; timers.forEach(window.clearTimeout); window.cancelAnimationFrame(frame); };
  }, [heroRef]);
  if (phase >= 5) return null;
  return <div className={`intro-overlay intro-phase-${phase}`} aria-hidden="true"><div className="intro-row"><h1>{'PowerClip'.split('').map((letter, index) => <span key={`${letter}-${index}`} style={{ transitionDelay: `${index * 0.022}s` }}>{letter}</span>)}</h1><img ref={introRef} src="/powerclip-mark-white.png" alt="" style={{ '--intro-target': targetTransform } as CSSProperties} /></div></div>;
}

function HomeDashboardPreview() {
  return <div className="browser-window dashboard-browser"><div className="browser-bar"><span className="traffic"><i /><i /><i /></span><span className="browser-url">app.powerclip.com/dashboard</span></div><DashboardSurface preview /></div>;
}

export function HomePageV2() {
  const heroRef = useRef<HTMLImageElement>(null);
  const [scenario, setScenario] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { question: 'What does PowerClip actually do?', answer: 'PowerClip helps businesses grow through three connected areas: Brand Growth, Distribution, and Operations. We improve how a business gets found, how it reaches people, and how the systems behind it run.' },
    { question: 'Do I need to use all three services?', answer: 'No. We build around what your business actually needs. You might need one service, a combination of two, or the full system.' },
    { question: 'Can you build everything from scratch?', answer: 'Yes. If you’re starting from zero, we can help build the brand, website, distribution setup, and operational systems from the ground up.' },
    { question: 'What’s included in Brand Growth?', answer: 'Brand Growth can include website design and development, SEO, local search, brand positioning, reputation and review systems, conversion improvements, and analytics.' },
    { question: 'What does Distribution include?', answer: 'Distribution can include clipping campaigns, paid media, short-form content distribution, platform growth, campaign strategy, and performance reporting.' },
    { question: 'What does Operations mean?', answer: 'Operations is the systems side of the business. That can include CRM setups, automations, booking systems, dashboards, client portals, lead flows, and tool integrations.' },
    { question: 'Do I get access to a client dashboard?', answer: 'Yes. PowerClip clients can have a private workspace to track active work, performance, campaigns, website updates, approvals, files, and ongoing systems.' },
    { question: 'How is pricing structured?', answer: 'Pricing depends on the scope, services, and level of ongoing support. Some projects are one-off builds, while others are better suited to ongoing monthly work.' },
  ] as const;
  return <main className="new-site homepage-v2"><IntroAnimation heroRef={heroRef} /><section className="new-hero" id="home"><div className="hero-grid" /><div className="hero-copy"><span className="new-eyebrow">POWERCLIP</span><h1>Reach.<br /><em>Engineered.</em></h1><p className="hero-subheading">Brand Growth × Distribution × Operations</p><p className="hero-lead">Helping brands and businesses become easier to find, harder to ignore, and easier to run.</p><div className="new-button-row"><GlassLink href="/start-a-project" primary>Start a Project</GlassLink><GlassLink href="/client-login">Client Login</GlassLink></div></div><div className="hero-mark-wrap"><img ref={heroRef} src="/powerclip-mark-white.png" alt="" className="hero-mark" /></div></section><Dock />
    <section className="new-section" id="services"><div className="new-section-intro"><span className="new-eyebrow">The PowerClip model</span><h2>Three systems. <em>One engine.</em></h2><p>Brand Growth builds the foundation. Distribution puts the message in motion. Operations keeps the work connected.</p></div><div className="system-grid">{services.map(([title, copy, list, href, icon], index) => <a className={`system-card system-${index}`} href={href} key={title}><div className="system-card-head"><PowerClipIcon name={icon as PowerClipIconName} size={25} /></div><h3>{title}</h3><p>{copy}</p><div className="system-card-list">{list.map(item => <span key={item}><i>+</i>{item}</span>)}</div></a>)}</div></section>
    <section className="new-section process-section"><div className="new-section-intro"><span className="new-eyebrow">From first map to next move</span><h2>The <em>process.</em></h2><p>A clear sequence, with the right level of work at each step.</p></div><div className="process-grid">{[['01', 'Map'], ['02', 'Build'], ['03', 'Launch'], ['04', 'Optimize']].map(([number, title]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>Understand the gap, make the work function, launch it, then improve what the signal shows.</p></article>)}</div></section>
    <section className="new-section scenario-section"><div className="new-section-intro"><span className="new-eyebrow">Built around your stage</span><h2>Whatever stage you&apos;re at, <em>we build from there.</em></h2><p>There is no required starting point. Choose the situation that feels closest and see the path we would build around it.</p></div><div className="scenario-tabs">{scenarios.map(([label], index) => <button className={index === scenario ? 'is-selected' : ''} onClick={() => setScenario(index)} key={label}>{label}</button>)}</div><div className="scenario-flow"><span className="scenario-label">{scenarios[scenario][0]}</span>{scenarios[scenario][1].map((step, index) => <div className="scenario-step" key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span></div>)}</div></section>
    <section className="new-section browser-section"><div className="new-section-intro"><span className="new-eyebrow">Interactive demo · Example data</span><h2>Your business. Your system. <em>One view.</em></h2><p>The same client workspace language carries from the login screen into the dashboard.</p></div><HomeDashboardPreview /></section>
    <section className="new-section why-section"><div className="new-section-intro"><span className="new-eyebrow">Why PowerClip</span><h2>Everything works better <em>connected.</em></h2><p>Brand Growth, Distribution, and Operations stay aligned around the same business goals.</p></div><div className="why-grid">{[
      ['01', 'Connected by design.', 'Your website, campaigns, content, and internal systems support the same growth goals.'],
      ['02', 'Built around the business.', 'We combine the services that matter based on what needs to improve now.'],
      ['03', 'Clearer as you scale.', 'One partner, one workflow, and one place to see what’s moving.'],
    ].map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="new-final"><span className="new-eyebrow">The beginning of a project</span><h2>Tell us what you want to build.</h2><p>Whether you need more visibility, better distribution, smarter systems, or the full setup from zero — we&apos;ll map the right way forward.</p><GlassLink href="/start-a-project" primary>Start a Project</GlassLink></section>
    <section className="new-section faq-section"><div className="new-section-intro"><span className="new-eyebrow">Questions, answered</span><h2>Start with <em>clarity.</em></h2><p>A few useful answers before you start.</p></div><div className="new-faq">{faqs.map(({ question, answer }, index) => <div className={`faq-row${openFaq === index ? ' is-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<span>{openFaq === index ? '×' : '+'}</span></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>
  </main>;
}
