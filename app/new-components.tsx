'use client';

import Link from 'next/link';
import { FormEvent, type ReactNode, useEffect, useState } from 'react';
import { PowerClipIcon, PowerClipMark, type PowerClipIconName } from './powerclip-icons';

const formEndpoint = 'https://api.web3forms.com/submit';
const formAccessKey = '3a77a838-979c-491b-a99b-565192990999';

type IconName = PowerClipIconName;
type DockIconName = IconName | 'home';

const dockItems: Array<[string, string, DockIconName]> = [
  ['Home', '/', 'home'], ['Brand Growth', '/brand-growth', 'growth'], ['Distribution', '/distribution', 'distribution'], ['Operations', '/operations', 'operations'],
  ['Client Login', '/client-login', 'user'], ['Contact', '/contact', 'chat'], ['Start a Project', '/start-a-project', 'plus'],
];

export function Dock({ subtle = false }: { subtle?: boolean }) {
  return <nav className={`new-dock${subtle ? ' new-dock-subtle' : ''}`} aria-label="PowerClip navigation">
    {dockItems.map(([label, href, icon], index) => <span className="dock-slot" key={label}>
      {index === 4 && <i className="dock-divider" aria-hidden="true" />}
      <Link className={`dock-item${label === 'Start a Project' ? ' dock-primary' : ''}`} href={href} aria-label={label}><span className="dock-icon">{icon === 'home' ? <PowerClipMark className="dock-logo" /> : <PowerClipIcon name={icon} size={label === 'Start a Project' ? 18 : 20} />}</span><small>{label}</small></Link>
    </span>)}
  </nav>;
}

function Icon({ name, size = 20 }: { name: PowerClipIconName; size?: number }) { return <PowerClipIcon name={name} size={size} />; }
function Arrow() { return <PowerClipIcon name="arrow" size={15} />; }
export function GlassLink({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) { return <Link className={`new-button${primary ? ' new-button-primary' : ''}`} href={href}>{children}</Link>; }

function SiteFooter() { return <footer className="new-footer"><span>POWERCLIP</span><span>Brand Growth · Distribution · Operations</span><span>© 2026 PowerClip</span></footer>; }

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return <div className="new-section-intro"><span className="new-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{copy}</p></div>;
}

const services = [
  { key: 'growth', icon: 'growth' as IconName, title: 'Brand Growth', copy: 'Build a presence people can find, trust, and choose.', list: ['Websites', 'Search', 'Reputation', 'Performance'], href: '/brand-growth' },
  { key: 'distribution', icon: 'distribution' as IconName, title: 'Distribution', copy: 'Turn content into reach through creator-led and paid distribution.', list: ['Clipping campaigns', 'Creator network', 'Paid ads', 'Reporting'], href: '/distribution' },
  { key: 'operations', icon: 'operations' as IconName, title: 'Operations', copy: 'Build the systems behind growth so the work stays connected.', list: ['CRM systems', 'Workflow design', 'Automations', 'Dashboards'], href: '/operations' },
];

function HeroMark() { return <div className="hero-mark-wrap"><img src="/powerclip-mark-white.png" alt="" className="hero-mark" /></div>; }

const scenarios = [
  ['Build from zero', ['Map the foundation', 'Build the presence', 'Create the first signal', 'Keep it moving']],
  ['Local business', ['Clarify the offer', 'Own local search', 'Turn trust into action', 'Measure what moves']],
  ['E-commerce', ['Find the audience', 'Put content in motion', 'Improve conversion', 'Connect the reporting']],
  ['Brands & creators', ['Shape the source', 'Deploy the clips', 'Grow distribution', 'Run the system']],
] as const;

export function HomePage() {
  const [scenario, setScenario] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = ['What is PowerClip?', 'Can I start with one service?', 'How do the three systems connect?', 'Who is PowerClip for?', 'How does a project start?', 'Do you work with creators?', 'How is the work scoped?', 'What happens after I submit a brief?'];
  return <main className="new-site"><section className="new-hero" id="home"><div className="hero-grid" /><div className="hero-copy"><span className="new-eyebrow">Brand Growth × Distribution × Operations</span><h1>Reach.<br /><em>Engineered.</em></h1><p className="hero-lead">Helping brands and businesses become easier to find, harder to ignore, and easier to run.</p><div className="new-button-row"><GlassLink href="/start-a-project" primary>Start a Project</GlassLink><GlassLink href="/client-login">Client Login</GlassLink></div></div><HeroMark /></section><Dock />
    <section className="new-section" id="services"><SectionIntro eyebrow="The PowerClip model" title={<>Three systems. <em>One engine.</em></>} copy="Brand Growth builds the foundation. Distribution puts the message in motion. Operations keeps the work connected." /><div className="system-grid">{services.map(service => <Link className={`system-card system-${service.key}`} href={service.href} key={service.key}><div className="system-card-head"><Icon name={service.icon} /><span>{service.key === 'growth' ? '01' : service.key === 'distribution' ? '02' : '03'}</span></div><h3>{service.title}</h3><p>{service.copy}</p><div className="system-card-list">{service.list.map(item => <span key={item}><i>+</i>{item}</span>)}</div><b className="card-arrow"><Arrow /></b></Link>)}</div></section>
    <section className="new-section scenario-section"><SectionIntro eyebrow="Built around your stage" title={<>Whatever stage you&apos;re at, <em>we build from there.</em></>} copy="There is no required starting point. Choose the situation that feels closest and see the path we would build around it." /><div className="scenario-tabs">{scenarios.map(([label], index) => <button className={index === scenario ? 'is-selected' : ''} onClick={() => setScenario(index)} key={label}>{label}</button>)}</div><div className="scenario-flow"><span className="scenario-label">{scenarios[scenario][0]}</span>{scenarios[scenario][1].map((step, index) => <div className="scenario-step" key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span></div>)}</div></section>
    <section className="new-section process-section"><SectionIntro eyebrow="From first map to next move" title={<>The <em>process.</em></>} copy="A clear sequence, with the right level of work at each step." /><div className="process-grid">{[['01', 'Map', 'Understand the business, the gap, and the useful next step.'], ['02', 'Build', 'Make the foundation, content path, or system work.'], ['03', 'Launch', 'Put the work in front of the people it needs to reach.'], ['04', 'Optimize', 'Read the signal, improve the handoff, and keep moving.']].map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="new-section browser-section"><SectionIntro eyebrow="Interactive demo · Example data" title={<>Your business. Your system. <em>One view.</em></>} copy="A connected workspace gives the team one place to see the work, the movement, and the next action." /><div className="browser-window"><div className="browser-bar"><span className="traffic"><i /><i /><i /></span><span className="browser-url">app.powerclip.com/dashboard</span></div><div className="dashboard-preview"><div><small>OVERVIEW</small><strong>Connected growth</strong><span>Example workspace</span></div><div className="dashboard-bars">{[40, 58, 46, 72, 63, 87, 78].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}</div><div className="dashboard-stats"><span><b>24</b>Open tasks</span><span><b>08</b>Live projects</span><span><b>96%</b>On track</span></div></div></div></section>
    <section className="new-section why-section"><SectionIntro eyebrow="Why PowerClip" title={<>One system. <em>Not five disconnected vendors.</em></>} copy="The work stays legible from the first map to the next report." /><div className="why-grid">{[['01', 'One connected system.', 'The website, the reach, and the work behind them can move together.'], ['02', 'Scope follows the problem.', 'Start with the thing that needs to change, then define the useful combination.'], ['03', 'Built to run repeatably.', 'The goal is not a one-off handoff. It is a system the business can keep using.']].map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="new-section faq-section"><SectionIntro eyebrow="Questions, answered" title={<>Start with <em>clarity.</em></>} copy="A few useful answers before you start." /><div className="new-faq">{faqs.map((question, index) => <div className={`faq-row${openFaq === index ? ' is-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<span>{openFaq === index ? '×' : '+'}</span></button>{openFaq === index && <p>PowerClip connects Brand Growth, Distribution, and Operations around the next useful move for the business. The project brief gives us the context to scope that move clearly.</p>}</div>)}</div></section>
    <section className="new-final"><span className="new-eyebrow">The beginning of a project</span><h2>Start with the map.</h2><p>Tell us what you&apos;re trying to build, fix, or grow.</p><GlassLink href="/start-a-project" primary>Start a Project</GlassLink></section><SiteFooter /></main>;
}

const pillarData = {
  growth: { title: <>Build a presence people can <em>find, trust, and choose.</em></>, eyebrow: 'Brand Growth', copy: 'Websites, search, reputation, and performance built around the business.', center: 'Your Business', nodes: ['Website', 'Search', 'Reviews', 'Analytics'], services: [['Websites', 'A clear home for the offer, the proof, and the next action.'], ['Search', 'The technical and local foundations that help the right people find you.'], ['Reputation', 'Turn reviews and trust signals into a connected customer path.'], ['Performance', 'Read what is moving and improve what is not.']], flow: ['Search', 'Website', 'Trust', 'Conversion', 'Insight', 'Improvement'], final: 'Find the gaps. Build what’s missing.' },
  distribution: { title: <>Turn content into <em>reach.</em></>, eyebrow: 'Distribution', copy: 'Creator-led clipping campaigns and paid distribution built around the content.', center: 'Source Content', nodes: ['Clips', 'Ads', 'Platforms', 'Views'], services: [['Clipping campaigns', 'Content in. Clips out. Reach tracked across the platforms that matter.'], ['Paid ads', 'A separate lever for deliberate targeting and controlled pacing.'], ['Creator & editor network', 'Independent creators and editors put the source content into motion.']], flow: ['Source Content', 'Campaign', 'Clippers / Ads', 'Platforms', 'Views', 'Reporting'], final: 'Build the distribution around the content.' },
  operations: { title: <>Build the systems behind the <em>growth.</em></>, eyebrow: 'Operations', copy: 'CRM, workflows, automations, and reporting that keep the business moving.', center: 'Your Business', nodes: ['Lead', 'Workflow', 'Reporting', 'Client'], services: [['CRM Systems', 'Keep leads, clients, and opportunities visible in one practical pipeline.'], ['Workflow Design', 'Make the handoffs clear from first enquiry to delivery.'], ['Automations', 'Remove repeatable admin from the work that should keep moving.'], ['Dashboards & Reporting', 'See the signal without hunting across disconnected tools.']], flow: ['Lead Capture', 'CRM', 'Qualification', 'Client', 'Delivery', 'Reporting'], final: 'Make the business easier to run.' },
} as const;

function GrowthHub() {
  return <div className="growth-hub">
    <div className="growth-hub-center"><b>Your<br />Business</b></div>
    <div className="growth-hub-node growth-hub-node-0 is-active">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Website</span></span></div>
      <div className="growth-node-preview">
        <div className="growth-browser-bar"><span className="growth-traffic"><i /><i /><i /></span><span className="growth-url">yourbusiness.site</span></div>
        <div className="growth-browser-body"><strong>Good work.<br />A great first impression.</strong><span className="growth-mini-cta">Let&apos;s talk &#8594;</span></div>
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-1">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Search</span></span></div>
      <div className="growth-node-preview">
        <div className="growth-search-row">&#8981; What your customers need</div>
        <div className="growth-result-row"><span className="growth-result-icon">&#8599;</span><div><small>yourbusiness.site</small><strong>Your business, discovered.</strong><span className="growth-skeleton" /></div></div>
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-2">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Reviews</span></span></div>
      <div className="growth-node-preview growth-reviews-preview">
        <div className="growth-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <strong>Reputation travels.</strong>
        <p>Real experiences. A reason to choose you.</p>
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-3">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Analytics</span></span></div>
      <div className="growth-node-preview growth-analytics-preview">
        <div className="growth-chart-label"><span>Observe &#8594; Understand</span><span>&#8599;</span></div>
        <svg viewBox="0 0 190 44" width="100%" height="44" fill="none">
          <path d="M0 6 H190 M0 24 H190" stroke="rgba(255,255,255,.1)" />
          <path d="M0 38 L22 32 L44 35 L64 20 L84 24 L106 12 L126 18 L146 8 L168 13 L190 2" stroke="#fff" strokeWidth="1.6" fill="none" />
          <circle cx="190" cy="2" r="2.4" fill="#fff" />
        </svg>
      </div>
    </div>
  </div>;
}

function DistributionHub() {
  return <div className="growth-hub distribution-hub" aria-hidden="true">
    <div className="growth-hub-center"><b>Source<br />Content</b></div>
    <div className="growth-hub-node growth-hub-node-0 is-active">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Clips</span></span></div>
      <div className="growth-node-preview pc-clip-preview">
        <div className="pc-clip-strip"><i className="pc-clip"><b /></i><i className="pc-clip"><b /></i><i className="pc-clip"><b /></i></div>
        <span className="pc-progress"><em /></span>
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-1">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Ads</span></span></div>
      <div className="growth-node-preview pc-bars-preview">
        <div className="growth-chart-label"><span>Paid ads</span><span>&#8599;</span></div>
        <div className="pc-bars"><i style={{ height: '36%' }} /><i style={{ height: '58%' }} /><i style={{ height: '47%' }} /><i style={{ height: '78%' }} /><i style={{ height: '66%' }} /><i style={{ height: '92%' }} /></div>
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-2">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Platforms</span></span></div>
      <div className="growth-node-preview pc-platform-preview">
        <div className="pc-platform-row"><i className="pc-platform"><em style={{ height: '40%' }} /><em style={{ height: '70%' }} /><em style={{ height: '55%' }} /></i><i className="pc-platform"><em style={{ height: '62%' }} /><em style={{ height: '38%' }} /><em style={{ height: '80%' }} /></i><i className="pc-platform"><em style={{ height: '50%' }} /><em style={{ height: '85%' }} /><em style={{ height: '45%' }} /></i></div>
        <span className="growth-skeleton pc-wide" />
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-3">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Views</span></span></div>
      <div className="growth-node-preview growth-analytics-preview">
        <div className="growth-chart-label"><span>Platforms &#8594; Views</span><span>&#8599;</span></div>
        <svg viewBox="0 0 190 44" width="100%" height="44" fill="none">
          <path d="M0 6 H190 M0 24 H190" stroke="rgba(255,255,255,.1)" />
          <path d="M0 40 L24 37 L46 31 L68 33 L90 22 L112 25 L134 14 L156 15 L172 8 L190 3" stroke="#fff" strokeWidth="1.6" fill="none" />
          <circle cx="190" cy="3" r="2.4" fill="rgba(255,255,255,.72)" />
        </svg>
      </div>
    </div>
  </div>;
}

function OperationsHub() {
  return <div className="growth-hub operations-hub" aria-hidden="true">
    <div className="growth-hub-center"><b>Your<br />Business</b></div>
    <div className="growth-hub-node growth-hub-node-0 is-active">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Lead</span></span></div>
      <div className="growth-node-preview pc-form-preview">
        <div className="pc-form-head">Lead Capture</div>
        <div className="pc-form-body"><span className="pc-field" /><span className="pc-field pc-short" /><span className="growth-mini-cta">Send &#8594;</span></div>
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-1">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Workflow</span></span></div>
      <div className="growth-node-preview pc-flow-preview">
        <div className="pc-flow-chain"><i className="is-done" /><span /><i /><span /><i /></div>
        <div className="pc-flow-label"><span>Qualification</span><span>Delivery</span></div>
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-2">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Reporting</span></span></div>
      <div className="growth-node-preview pc-bars-preview">
        <div className="growth-chart-label"><span>Dashboards</span><span>&#8599;</span></div>
        <div className="pc-bars"><i style={{ height: '44%' }} /><i style={{ height: '70%' }} /><i style={{ height: '52%' }} /><i style={{ height: '86%' }} /><i style={{ height: '61%' }} /><i style={{ height: '75%' }} /></div>
      </div>
    </div>
    <div className="growth-hub-node growth-hub-node-3">
      <div className="growth-node-top"><span className="growth-node-left"><span className="growth-node-name">Client</span></span></div>
      <div className="growth-node-preview pc-client-preview">
        <div className="pc-client-row"><i className="pc-avatar" /><div><small>CRM</small><strong>Client</strong></div><span className="pc-status">Delivery</span></div>
        <span className="growth-skeleton pc-wide" />
      </div>
    </div>
  </div>;
}

export function PillarPage({ kind }: { kind: keyof typeof pillarData }) {
  const data = pillarData[kind];
  const [active, setActive] = useState(0);
  return <main className="new-site pillar-page"><Dock /><section className={`pillar-hero pillar-${kind}`}><div><span className="new-eyebrow">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.copy}</p><GlassLink href="/start-a-project" primary>Start a Project</GlassLink></div>{kind === 'growth' ? <GrowthHub /> : kind === 'distribution' ? <DistributionHub /> : <OperationsHub />}</section><section className="new-section pillar-services"><SectionIntro eyebrow={`${data.eyebrow} / Services`} title={<>The work that makes the <em>difference.</em></>} copy="A focused set of services, connected when the work calls for it." /><div className="pillar-service-grid">{data.services.map(([title, copy], index) => <article key={title} className={index === 0 ? 'service-feature' : ''}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><div className="service-line" /></article>)}</div></section><section className="new-section flow-section"><SectionIntro eyebrow={kind === 'growth' ? 'The loop' : kind === 'distribution' ? 'How distribution works' : 'From fragmented to connected'} title={<>Make the next stage <em>visible.</em></>} copy="Click through the flow to see what each stage is doing." /><div className="flow-tabs">{data.flow.map((item, index) => <button className={active === index ? 'is-selected' : ''} onClick={() => setActive(index)} key={item}><b>{String(index + 1).padStart(2, '0')}</b><span>{item}</span></button>)}</div><div className="flow-detail"><span>0{active + 1} / {data.flow[active]}</span><p>{kind === 'growth' ? 'A clear handoff between visibility, trust, and the action that follows.' : kind === 'distribution' ? 'The message moves through the right channel with the right signal attached.' : 'The next action stays visible, owned, and connected to the work around it.'}</p></div></section><section className="new-section examples-section"><SectionIntro eyebrow="Example systems" title={<>Built around the way the business <em>actually works.</em></>} copy="The exact shape changes by business. The connected logic stays clear." /><div className="example-grid">{['Local business', 'Growing brand', 'Service business', 'Creator / brand'].map((label, index) => <article key={label}><span>0{index + 1}</span><h3>{label}</h3><p>{kind === 'growth' ? 'Website · Search · Trust · Reporting' : kind === 'distribution' ? 'Source · Clips · Platforms · Views' : 'Lead · CRM · Workflow · Reporting'}</p></article>)}</div></section><section className="new-final"><span className="new-eyebrow">{data.eyebrow}</span><h2>{data.final}</h2><GlassLink href="/start-a-project" primary>Start a Project</GlassLink></section><SiteFooter /></main>;
}

function SubmitForm({ children, formName, subject, buttonLabel = 'Send', extraFields }: { children: ReactNode; formName: string; subject: string; buttonLabel?: string; extraFields?: Record<string, string> }) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setState('sending'); const form = event.currentTarget; const data = new FormData(form); const projectFields = (globalThis as typeof globalThis & { __powerclipProject?: Record<string, string> }).__powerclipProject; Object.entries(extraFields || (formName === 'start-a-project' ? projectFields : undefined) || {}).forEach(([key, value]) => data.set(key, value)); data.set('access_key', formAccessKey); data.set('subject', subject); data.set('from_name', 'PowerClip website'); data.set('replyto', String(data.get('email') || '')); try { const response = await fetch(formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } }); const result = await response.json(); if (result.success) { form.reset(); setState('success'); } else setState('error'); } catch { setState('error'); } }
  if (state === 'success') return <div className="form-success"><span><Icon name="check" /></span><h2>{formName === 'contact' ? 'Message sent.' : 'Project received.'}</h2><p>Thanks for reaching out — we&apos;ll review what you shared and take it from there.</p></div>;
  return <form className="new-form" name={formName} onSubmit={submit}>{children}<button className="new-button new-button-primary form-submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : buttonLabel}</button>{state === 'error' && <p className="form-error" role="alert">Something went wrong. Please email hello@powerclip.app directly.</p>}</form>;
}

export function ContactPage() { return <main className="new-site form-page"><Dock /><section className="contact-panel"><div className="contact-intro"><span className="new-eyebrow">Contact</span><h1>Get in touch.</h1><p>Have a question, or something that doesn&apos;t fit a project brief? Send us a message directly.</p></div><SubmitForm formName="contact" subject="PowerClip contact message"><input required type="email" name="email" placeholder="Email" /><input required name="title" placeholder="Title" /><textarea required name="message" placeholder="Message" rows={5} /></SubmitForm></section></main>; }

const outcomeOptions = ['Be easier to find', 'Build a stronger website', 'Improve search visibility', 'Build trust', 'Reach more people', 'Distribute existing content', 'Run a clipping campaign', 'Test paid distribution', 'Get a clearer CRM', 'Automate follow-up', 'Connect the team', 'See the numbers', 'Launch something new', 'Fix what is stuck', 'I’m not sure yet'];
const pillars = ['Brand Growth', 'Distribution', 'Operations', 'I’m not sure yet'];

export function ProjectPage() {
  const [step, setStep] = useState(1); const [selectedPillars, setSelectedPillars] = useState<string[]>([]); const [outcomes, setOutcomes] = useState<string[]>([]); const [businessType, setBusinessType] = useState(''); const [setup, setSetup] = useState<string[]>([]); const [timeline, setTimeline] = useState(''); const [budget, setBudget] = useState('');
  useEffect(() => { const fields: Record<string, string> = { selected_pillars: selectedPillars.join(', '), outcomes: outcomes.join(', '), business_type: businessType, current_setup: setup.join(', '), timeline, budget }; (globalThis as typeof globalThis & { __powerclipProject?: Record<string, string> }).__powerclipProject = fields; Object.entries(fields).forEach(([name, value]) => { const field = document.querySelector<HTMLInputElement>(`input[name="${name}"]`); if (field) field.value = value; }); }, [selectedPillars, outcomes, businessType, setup, timeline, budget]);
  const toggle = (value: string, setter: (fn: (old: string[]) => string[]) => void, exclusive = false) => setter(old => exclusive ? (old.includes(value) ? [] : [value]) : value === 'I’m not sure yet' ? (old.includes(value) ? [] : [value]) : old.filter(item => item !== 'I’m not sure yet').includes(value) ? old.filter(item => item !== value) : [...old.filter(item => item !== 'I’m not sure yet'), value]);
  const review = <><div className="review-card"><span>Project</span><b>{selectedPillars.join(' · ') || '—'}</b><button type="button" onClick={() => setStep(2)}>Edit</button></div><div className="review-card"><span>Business</span><b>{businessType || '—'}</b><button type="button" onClick={() => setStep(1)}>Edit</button></div><div className="review-card"><span>Objectives</span><b>{outcomes.join(' · ') || '—'}</b><button type="button" onClick={() => setStep(4)}>Edit</button></div><div className="review-card"><span>Timeline &amp; budget</span><b>{[timeline, budget].filter(Boolean).join(' · ') || '—'}</b><button type="button" onClick={() => setStep(5)}>Edit</button></div></>;
  return <main className="new-site project-page"><Dock subtle /><section className="project-intro"><span className="new-eyebrow">Start a Project</span><h1>Tell us what you&apos;re trying to build, fix, or grow.</h1><p>You don&apos;t need to know exactly which service you need. Tell us where the business is now, what needs to change, and what outcome you&apos;re aiming for — we&apos;ll work out the right scope from there.</p></section><section className="project-layout"><div className="project-form-wrap"><div className="progress-head"><span>Step {step} of 6</span><div>{[1, 2, 3, 4, 5, 6].map(item => <i className={item <= step ? 'is-active' : ''} key={item} />)}</div></div><SubmitForm formName="start-a-project" subject="New PowerClip project brief" buttonLabel="Start a Project"><input type="hidden" name="selected_pillars" value={selectedPillars.join(", ")} /><input type="hidden" name="outcomes" value={outcomes.join(", ")} /><input type="hidden" name="business_type" value={businessType} /><input type="hidden" name="current_setup" value={setup.join(", ")} /><input type="hidden" name="timeline" value={timeline} /><input type="hidden" name="budget" value={budget} /><fieldset className={step === 1 ? 'step-active' : 'step-hidden'}><legend>First, who are we working with?</legend><div className="input-grid"><input name="name" placeholder="Name" /><input name="business" placeholder="Business / brand name" /><input type="email" name="email" placeholder="Email" /><input name="website" placeholder="Website" /><input name="location" placeholder="Location" /><input name="industry" placeholder="Industry" /></div><label className="field-title">Business type</label><div className="chip-grid">{['Local Business', 'Brand', 'Creator', 'Agency', 'Service Business', 'E-commerce', 'Startup', 'Other'].map(item => <button type="button" className={businessType === item ? 'is-selected' : ''} onClick={() => setBusinessType(item)} key={item}>{item}</button>)}</div></fieldset><fieldset className={step === 2 ? 'step-active' : 'step-hidden'}><legend>What do you need?</legend><div className="pillar-select">{pillars.map(item => <button type="button" className={selectedPillars.includes(item) ? 'is-selected' : ''} onClick={() => toggle(item, setSelectedPillars)} key={item}><Icon name={item === 'Brand Growth' ? 'growth' : item === 'Distribution' ? 'distribution' : item === 'Operations' ? 'operations' : 'target'} /><b>{item}</b><span>{item === 'Brand Growth' ? 'Website, search, and trust.' : item === 'Distribution' ? 'Clips, ads, and reach.' : item === 'Operations' ? 'CRM, workflows, and reporting.' : 'We’ll help you find the lane.'}</span></button>)}</div></fieldset><fieldset className={step === 3 ? 'step-active' : 'step-hidden'}><legend>What is the current setup?</legend>{selectedPillars.includes('Brand Growth') && <div className="conditional-block"><label>Brand Growth</label><div className="chip-grid">{['No website yet', 'Website needs work', 'Search is unclear', 'Reviews need attention'].map(item => <button type="button" className={setup.includes(item) ? 'is-selected' : ''} onClick={() => toggle(item, setSetup)} key={item}>{item}</button>)}</div></div>}{selectedPillars.includes('Distribution') && <div className="conditional-block"><label>Distribution</label><div className="chip-grid">{['Podcast / long-form', 'Short-form', 'Product / offer', 'No source content yet'].map(item => <button type="button" className={setup.includes(item) ? 'is-selected' : ''} onClick={() => toggle(item, setSetup)} key={item}>{item}</button>)}</div></div>}{selectedPillars.includes('Operations') && <div className="conditional-block"><label>Operations</label><div className="chip-grid">{['Spreadsheets', 'CRM', 'Project tools', 'Too many tools'].map(item => <button type="button" className={setup.includes(item) ? 'is-selected' : ''} onClick={() => toggle(item, setSetup)} key={item}>{item}</button>)}</div></div>}{selectedPillars.length === 0 && <p className="reassurance">Not sure yet is a valid starting point. We&apos;ll help map the right direction.</p>}</fieldset><fieldset className={step === 4 ? 'step-active' : 'step-hidden'}><legend>What outcome are you aiming for?</legend><div className="chip-grid outcome-grid">{outcomeOptions.map(item => <button type="button" className={outcomes.includes(item) ? 'is-selected' : ''} onClick={() => toggle(item, setOutcomes)} key={item}>{item}</button>)}</div><textarea name="outcome_details" rows={5} placeholder="What are you trying to achieve?" /></fieldset><fieldset className={step === 5 ? 'step-active' : 'step-hidden'}><legend>Project details</legend><label className="field-title">Timeline</label><div className="chip-grid">{['As soon as possible', 'This month', 'Next 1–3 months', 'Just exploring'].map(item => <button type="button" className={timeline === item ? 'is-selected' : ''} onClick={() => setTimeline(item)} key={item}>{item}</button>)}</div><label className="field-title">Budget <small>not an automatic quote</small></label><div className="chip-grid">{['Under €1,000', '€1,000–€3,000', '€3,000–€10,000', '€10,000+'].map(item => <button type="button" className={budget === item ? 'is-selected' : ''} onClick={() => setBudget(item)} key={item}>{item}</button>)}</div><textarea name="notes" rows={4} placeholder="Anything else we should know?" /><label className="upload-box">Drop files here or click to browse<input type="file" name="files" /></label></fieldset><fieldset className={step === 6 ? 'step-active' : 'step-hidden'}><legend>Review your project</legend><div className="review-stack">{review}</div></fieldset><div className="form-navigation">{step > 1 && <button type="button" className="text-button" onClick={() => setStep(step - 1)}>Back</button>}{step < 6 && <button type="button" className="new-button new-button-primary" onClick={() => setStep(step + 1)}>Continue<Arrow /></button>}{step === 6 && <span className="submit-placeholder" />}</div></SubmitForm></div><aside className="project-summary"><span>YOUR PROJECT</span><dl><dt>Project</dt><dd>{selectedPillars.join(' · ') || '—'}</dd><dt>Business</dt><dd>{businessType || '—'}</dd><dt>Objectives</dt><dd>{outcomes.length ? outcomes.slice(0, 2).join(' · ') : '—'}</dd><dt>Timeline</dt><dd>{timeline || '—'}</dd><dt>Budget</dt><dd>{budget || '—'}</dd></dl></aside></section></main>;
}

export function ClientLoginPage() { return <main className="new-site login-page"><Dock /><div className="login-card"><img src="/powerclip-mark-white.png" alt="PowerClip" /><span className="new-eyebrow">Client workspace</span><h1>Welcome back.</h1><input type="email" placeholder="Email" /><input type="password" placeholder="Password" /><button className="new-button new-button-primary">Log in</button><Link href="/">Back to site</Link></div></main>; }

export function ClientDashboardPage() { return <main className="new-site dashboard-page"><div className="dashboard-app"><header><div><img src="/powerclip-mark-white.png" alt="" /><b>PowerClip</b></div><span>Example client workspace</span><button><Icon name="user" size={17} /></button></header><div className="dashboard-app-body"><aside><small>WORKSPACE</small><b>Overview</b><span>Projects</span><span>Tasks</span><span>Reports</span><span>Files</span></aside><section><span className="new-eyebrow">Overview · Example data</span><h1>Your growth, connected.</h1><div className="dashboard-card-grid">{[['Open projects', '08'], ['Tasks in motion', '24'], ['Search visibility', '+32%'], ['Leads this month', '—']].map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong></article>)}</div><div className="dashboard-large"><span>ACTIVITY</span><div className="dashboard-bars">{[45, 62, 54, 72, 61, 81, 74, 92].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}</div></div></section></div></div></main>; }
