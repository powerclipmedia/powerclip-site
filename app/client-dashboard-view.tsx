'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSession, signOut } from './auth-client';
import { PowerClipIcon, PowerClipMark, type PowerClipIconName } from './powerclip-icons';

const sections: Array<{ label: string; copy: string; icon: PowerClipIconName }> = [
  { label: 'Overview', copy: 'What is happening, how are we performing, and what needs your attention.', icon: 'overview' },
  { label: 'Brand Growth', copy: 'Website, SEO and local visibility performance.', icon: 'growth' },
  { label: 'Distribution', copy: 'Campaign performance across every platform.', icon: 'distribution' },
  { label: 'Operations', copy: 'The systems PowerClip runs behind the scenes.', icon: 'operations' },
  { label: 'Projects', copy: 'What PowerClip is actively building for you.', icon: 'projects' },
  { label: 'Approvals', copy: 'Review and sign off on work waiting for you.', icon: 'approvals' },
  { label: 'Files', copy: 'Every file PowerClip has delivered, organized.', icon: 'files' },
];

const campaigns = [
  { name: 'September Reach Campaign', status: 'Live', budget: '$2,000', spend: '$1,340', views: '84,200', reach: '61,500', cpm: '$13.10', results: '47', dates: 'Sep 1–Sep 30', chart: [30, 45, 40, 58, 62, 70, 66, 80] },
  { name: 'Retargeting Ads', status: 'Live', budget: '$900', spend: '$610', views: '32,100', reach: '22,400', cpm: '$19.00', results: '21', dates: 'Sep 1–Ongoing', chart: [20, 24, 22, 30, 28, 35, 38, 40] },
];

const files = [
  ['Logo Assets.svg', 'SVG', 'Brand', '2w ago', 'Updated'],
  ['Homepage V3.fig', 'FIG', 'Website', '1d ago', 'Pending Approval'],
  ['Creative 04.mp4', 'MP4', 'Distribution', '3d ago', 'Updated'],
  ['September Performance.pdf', 'PDF', 'Reports', '5d ago', 'Updated'],
];

function MetricCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return <article className="workspace-card metric-card"><span>{label}</span><strong>{value}</strong>{detail ? <small>{detail}</small> : null}</article>;
}

function SparkBars({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return <div className="workspace-spark" aria-hidden="true">{values.map((value, index) => <i key={`${value}-${index}`} style={{ height: `${Math.max(16, (value / max) * 100)}%` }} />)}</div>;
}

function OverviewTab({ approved, onApprove }: { approved: boolean; onApprove: () => void }) {
  return <>
    <div className="outcome-card"><span>Business outcome: Bookings</span><div className="funnel-row"><div><b>4,200</b><small>Search visibility</small></div><em>→</em><div><b>1,180</b><small>Website visits</small></div><em>→</em><div><b>47</b><small>Leads</small></div><em>→</em><div><b>24</b><small>Bookings</small></div></div></div>
    <div className="workspace-grid"><div className="workspace-card services-card"><span>Active services</span><div className="service-pills"><b><PowerClipIcon name="growth" size={14} />Brand Growth</b><b><PowerClipIcon name="distribution" size={14} />Distribution</b><b><PowerClipIcon name="operations" size={14} />Operations</b></div></div><MetricCard label="Campaign spend" value="$1,340" detail="of $2,000" /><MetricCard label="Pending approvals" value={approved ? '1' : '2'} /><div className="workspace-card activity-card"><span>Recent activity</span>{[['Website V3 preview ready', '2h ago'], ['Spring campaign launched', 'Yesterday'], ['New lead: Sarah M.', '2d ago'], ['CRM automation updated', '3d ago']].map(([title, time]) => <p key={title}><b>{title}</b><small>{time}</small></p>)}</div><div className="workspace-card next-card"><span>Upcoming milestone</span><strong>Campaign launch — Friday</strong><hr /><span>Next action</span><p>Approve Homepage V3 so PowerClip can publish it.</p><button onClick={onApprove}>{approved ? 'Approved' : 'Approve Homepage V3'}</button></div></div>
  </>;
}

function BrandGrowthTab() {
  return <div className="tab-stack">
    <div className="metric-strip"><MetricCard label="Website visitors" value="9,120" detail="This month" /><MetricCard label="Conversion rate" value="3.1%" detail="Across tracked pages" /><MetricCard label="Sessions" value="12,480" detail="Organic + direct" /><MetricCard label="Forms" value="61" detail="Completed" /></div>
    <div className="workspace-card chart-card"><div className="card-heading"><div><span>Website visibility</span><h2>Traffic is moving up.</h2></div><strong>+32%</strong></div><SparkBars values={[20, 34, 30, 42, 38, 50, 55, 64]} /></div>
    <div className="dashboard-two-column"><div className="workspace-card"><span>Top pages</span><div className="dashboard-list">{[['Homepage', '4,200'], ['Services', '2,100'], ['Contact', '980']].map(([name, value]) => <p key={name}><b>{name}</b><small>{value} visits</small></p>)}</div></div><div className="workspace-card"><span>Search rankings</span><div className="dashboard-list">{[['tattoo studio rotterdam', '14 → 6'], ['best tattoo artist near me', '22 → 15'], ['custom tattoo design', '9 → 9']].map(([name, value]) => <p key={name}><b>{name}</b><small>{value}</small></p>)}</div></div></div>
    <div className="workspace-card"><span>Local visibility path</span><div className="mini-flow"><div><b>4,200</b><small>Google search</small></div><em>→</em><div><b>1,180</b><small>Profile / website</small></div><em>→</em><div><b>47</b><small>Leads</small></div><em>→</em><div><b>24</b><small>Bookings</small></div></div><div className="local-metrics"><span><b>86</b> reviews</span><span><b>4.9</b> rating</span><span><b>212</b> directions</span><span><b>58</b> calls</span></div></div>
  </div>;
}

function DistributionTab() {
  return <div className="tab-stack">
    {campaigns.map(campaign => <article className="workspace-card campaign-card" key={campaign.name}><div className="card-heading"><div><span>{campaign.dates}</span><h2>{campaign.name}</h2></div><b className="status-pill">{campaign.status}</b></div><div className="campaign-layout"><SparkBars values={campaign.chart} /><div className="campaign-metrics">{[['Budget', campaign.budget], ['Spend', campaign.spend], ['Views', campaign.views], ['Reach', campaign.reach], ['CPM', campaign.cpm], ['Results', campaign.results]].map(([label, value]) => <div key={label}><small>{label}</small><b>{value}</b></div>)}</div></div></article>)}
    <div className="workspace-card"><span>Content performance</span><div className="content-table">{[
      ['Clip 014', 'Top performer', '30,400', 'TikTok 18.4K · Instagram 7.8K · YouTube 4.2K'],
      ['Clip 018', 'Needs testing', '9,200', 'TikTok 6.1K · Instagram 3.1K'],
      ['Clip 021', 'Scaling', '14,800', 'TikTok 10.2K · Instagram 4.6K'],
    ].map(([name, status, reach, channels]) => <div key={name}><b>{name}</b><span>{status}</span><strong>{reach}<small> reach</small></strong><p>{channels}</p></div>)}</div></div>
  </div>;
}

function OperationsTab() {
  return <div className="tab-stack">
    <div className="metric-strip"><MetricCard label="Automations" value="6" detail="Active" /><MetricCard label="Runs" value="312" detail="This month" /><MetricCard label="Success rate" value="97%" detail="Completed correctly" /><MetricCard label="Time saved" value="18 hrs" detail="Estimated" /></div>
    <div className="workspace-card"><span>Lead pipeline</span><div className="pipeline-row">{[['New', '18'], ['Contacted', '11'], ['Qualified', '7'], ['Booked', '4'], ['Won', '3']].map(([label, value]) => <div key={label}><b>{value}</b><small>{label}</small></div>)}</div></div>
    <div className="workspace-card"><span>Connected workflow</span><div className="mini-flow operations-flow">{['Website Lead', 'CRM', 'Follow-up Email', 'Consultation Booked'].map((step, index) => <div key={step}><PowerClipIcon name={index === 0 ? 'growth' : index === 1 ? 'operations' : index === 2 ? 'distribution' : 'approvals'} size={18} /><b>{step}</b>{index < 3 ? <em>→</em> : null}</div>)}</div></div>
    <div className="dashboard-two-column"><div className="workspace-card"><span>Live activity</span><div className="dashboard-list">{[['14:32', 'New lead captured'], ['14:32', 'Added to CRM'], ['14:33', 'Follow-up sent'], ['14:41', 'Consultation booked']].map(([time, event]) => <p key={`${time}-${event}`}><b>{event}</b><small>{time}</small></p>)}</div></div><div className="workspace-card"><span>Connected systems</span><div className="system-tags">{['Website', 'CRM', 'Email', 'Analytics', 'Google Business'].map(system => <b key={system}>{system}</b>)}</div></div></div>
  </div>;
}

function ProjectsTab() {
  const projects = [['Website Design & Development', 'Brand Growth'], ['Google Reviews Campaign', 'Brand Growth'], ['Clipping Campaign', 'Distribution'], ['Paid Ads Campaign', 'Distribution'], ['Custom CRM Dashboard', 'Operations'], ['Lead Management System', 'Operations']];
  return <div className="workspace-card"><span>Active projects</span><div className="project-list">{projects.map(([name, pillar]) => <article key={name}><div><b>{name}</b><small>{pillar}</small></div><span>Live</span><div className="project-progress"><i /></div><strong>100%</strong></article>)}</div></div>;
}

function ApprovalsTab({ approved, onApprove }: { approved: boolean; onApprove: () => void }) {
  return <div className="approval-grid"><article className="workspace-card approval-card"><span>Website · Pending</span><h2>Homepage V3</h2><p>Final layout, mobile behavior, and production-ready copy.</p><div><button onClick={onApprove}>{approved ? 'Approved' : 'Approve'}</button><button>View preview</button></div></article><article className="workspace-card approval-card"><span>Distribution · Pending</span><h2>Campaign Creative 04</h2><p>Short-form campaign creative prepared for the next distribution cycle.</p><div><button>Approve</button><button>Leave feedback</button></div></article></div>;
}

function FilesTab() {
  const [filter, setFilter] = useState('All');
  const visibleFiles = filter === 'All' ? files : files.filter(file => file[2] === filter);
  return <div className="workspace-card"><div className="file-heading"><span>Delivered files</span><div>{['All', 'Brand', 'Website', 'Distribution', 'Reports'].map(label => <button className={filter === label ? 'is-active' : ''} onClick={() => setFilter(label)} key={label}>{label}</button>)}</div></div><div className="file-list">{visibleFiles.map(([name, type, folder, age, status]) => <article key={name}><i>{type}</i><div><b>{name}</b><small>{folder} · {age}</small></div><span>{status}</span><button>Open</button></article>)}</div></div>;
}

function DashboardTab({ active, approved, onApprove }: { active: number; approved: boolean; onApprove: () => void }) {
  if (active === 0) return <OverviewTab approved={approved} onApprove={onApprove} />;
  if (active === 1) return <BrandGrowthTab />;
  if (active === 2) return <DistributionTab />;
  if (active === 3) return <OperationsTab />;
  if (active === 4) return <ProjectsTab />;
  if (active === 5) return <ApprovalsTab approved={approved} onApprove={onApprove} />;
  return <FilesTab />;
}

export function DashboardSurface({ preview = false }: { preview?: boolean }) {
  const [active, setActive] = useState(0);
  const [approved, setApproved] = useState(false);
  const section = sections[active];
  return <div className={`workspace-surface${preview ? ' workspace-preview' : ''}`}>
    <aside className="workspace-sidebar">
      <Link href="/" className="workspace-brand"><PowerClipMark /><b>PowerClip</b></Link>
      <span className="workspace-label">Workspace</span>
      <nav>{sections.map((item, index) => <button type="button" className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} key={item.label}><i><PowerClipIcon name={item.icon} size={16} /></i>{item.label}</button>)}</nav>
      {!preview ? <div className="workspace-profile"><span>YN</span><div><b>Your Name</b><small>Full-service client</small></div><button onClick={signOut} aria-label="Exit">Exit</button></div> : null}
    </aside>
    <section className="workspace-main">
      <header className="workspace-heading"><div><h1>{section.label}</h1><p>{section.copy}</p></div><span className="example-pill">Interactive demo · Example data</span></header>
      <DashboardTab active={active} approved={approved} onApprove={() => setApproved(true)} />
    </section>
  </div>;
}

export function ClientDashboardView() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);
  useEffect(() => { setSession(getSession()); setReady(true); }, []);
  if (!ready) return <main className="dashboard-page"><div className="dashboard-loading">Loading your workspace…</div></main>;
  if (!session) return <main className="dashboard-page"><div className="dashboard-locked"><PowerClipMark alt="PowerClip" /><span className="new-eyebrow">Client workspace</span><h1>Sign in to continue.</h1><p>This dashboard is private to your client access.</p><Link className="new-button new-button-primary" href="/client-login">Go to Client Login</Link></div></main>;
  return <main className="dashboard-page"><DashboardSurface /></main>;
}
