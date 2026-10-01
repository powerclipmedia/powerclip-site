import { ServicePage } from '../components';
import { routeMetadata } from '../seo';

export const metadata = routeMetadata('/ranking-reviews');

const steps = [
  ['01', 'Find the gaps|Review the search journey, business details, important pages, and reputation touchpoints.'],
  ['02', 'Improve the signals|Tighten the on-page, local, and review workflows that help people understand the offer.'],
  ['03', 'Track what changes|Create a practical reporting loop for visibility, engagement, and the next improvement.'],
];

const includes = ['Local search visibility review', 'Google Business Profile support', 'On-page ranking improvements', 'Review request and response workflow', 'Reputation touchpoint mapping', 'Ongoing visibility reporting'];

export default function RankingReviews() {
  return <ServicePage
    eyebrow="Brand Growth / Ranking + Reviews"
    title={<>Be findable. <em>Be believed.</em></>}
    lead="Search ranking and reputation support for businesses that want a clearer path from query to trust."
    description="Search visibility is not only a ranking question. It is also the information, proof, and next step a person sees when they find you. We improve the connected path without promising a result before the work is scoped."
    steps={steps}
    includes={includes}
    relatedLinks={[
      ['Website + SEO', 'Build the site structure and technical foundation that gives search work somewhere useful to land.', '/website-seo'],
      ['Operations', 'Connect intake, follow-up, and reporting so reputation work stays visible and repeatable.', '/operations'],
    ]}
  />;
}
