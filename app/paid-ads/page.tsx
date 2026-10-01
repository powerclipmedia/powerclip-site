import { ServicePage } from '../components';
import { routeMetadata } from '../seo';

export const metadata = routeMetadata('/paid-ads');

const steps = [
  ['01', 'Define the job|Set the audience, objective, placement, message, and measurement before spend begins.'],
  ['02', 'Set the pace|Agree the working budget, timing, creative inputs, and review points around the brief.'],
  ['03', 'Read the signal|Keep paid distribution distinct in reporting so the next decision is based on the right inputs.'],
];

const includes = ['Paid-distribution objective and brief', 'Audience and placement planning', 'Creative and landing-page review', 'Budget and pacing structure', 'Campaign monitoring checkpoints', 'Clear paid-performance reporting'];

export default function PaidAds() {
  return <ServicePage
    eyebrow="Distribution / Paid Ads"
    title={<>Put spend behind the <em>message.</em></>}
    lead="Paid distribution for deliberate targeting, controlled pacing, and a clearer read on the work."
    description="Paid ads are a separate distribution lever. We scope the audience, creative, budget, timing, and measurement together so paid reach is understandable on its own and easy to compare with the rest of the plan."
    steps={steps}
    includes={includes}
    cta="Scope paid distribution"
    ctaHref="/grow"
    relatedLinks={[
      ['Brand Campaigns', 'Use creator-led distribution when source content and native reach are the stronger fit.', '/brand-campaigns'],
      ['Creators', 'Build a distribution plan around a creator, show, series, or content-led business.', '/creators'],
      ['Brand Growth', 'Give the message a clearer home with website, SEO, and reputation work.', '/grow'],
    ]}
  />;
}
