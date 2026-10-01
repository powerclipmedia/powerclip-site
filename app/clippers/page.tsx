import Link from 'next/link';
import { FAQ, Footer, Nav, Reveal } from '../components';
import { routeMetadata } from '../seo';

export const metadata = routeMetadata('/clippers');

const steps = [
  ['01', 'Join our Whop clipping community', 'Click through to enter the PowerClip community.'],
  ['02', 'Create your account', 'Sign up or sign in — takes a minute.'],
  ['03', 'Complete onboarding', 'Learn how PowerClip works, the rules, and what’s expected.'],
  ['04', 'Head to Courses', 'New to clipping? Start with editing, hooks, and posting resources.'],
  ['05', 'Master Content Rewards', 'Browse live campaigns and choose one that fits your style.'],
  ['06', 'Get paid', 'Payouts are based on verified performance — your views, your earnings.'],
];

export default function Clippers(){return <main className="site"><Nav/><section className="subpage-hero"><span className="eyebrow">Clippers</span><h1>Clip. Post. <em>Get paid.</em></h1><p className="hero-kicker">Earn Per Verified View on TikTok, Reels, Shorts &amp; X</p><p className="muted">Take a brand’s content. Cut it into short clips. Post from your own accounts. Earn for every 1,000 verified views — paid automatically through Whop. No invoices. No chasing.</p><Link className="pill primary" href="https://whop.com/powerclip/products/powerclip-basic-access/">Join Our Clipping Community <b>↗</b></Link></section><Reveal as="section" className="section sub-section"><div className="section-label">HOW TO GET STARTED</div><h2>From first clip to payout.</h2><div className="clipper-process">{steps.map(([number,title,copy])=><article className="process-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></Reveal><Reveal as="section" className="section callout-section"><div className="callout"><div><div className="section-label">NEW TO CLIPPING?</div><h2>Start with the free courses in PowerClip Academy.</h2><p className="muted">Editing, hooks, posting strategy, and payouts. Build the fundamentals before you pick your first campaign.</p></div><Link className="pill" href="/contact">Ask about Academy <b>↗</b></Link></div></Reveal><Reveal as="section" className="section faq-section center"><div className="section-label">FREQUENTLY ASKED QUESTIONS</div><h2>Know the lane.</h2><FAQ/></Reveal><Reveal as="section" className="final-cta center"><h2>Your next clip could pop.</h2><p>Join the community, grab a campaign, and start posting.</p><Link className="pill primary" href="https://whop.com/powerclip/products/powerclip-basic-access/">Join Our Clipping Community <b>↗</b></Link></Reveal><Footer/></main>}
