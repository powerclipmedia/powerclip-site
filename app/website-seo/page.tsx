import { ServicePage } from '../components';
import { routeMetadata } from '../seo';

export const metadata = routeMetadata('/website-seo');

const steps = [
  ['01', 'Map the journey|Clarify what visitors need to understand, trust, and do next.'],
  ['02', 'Build the foundation|Create a mobile-first site with a clear structure, useful content, and technical SEO in place.'],
  ['03', 'Launch and improve|Hand over a site that is ready to maintain, measure, and improve as the business learns.'],
];

const includes = ['Mobile-first website strategy and build', 'Information architecture and page structure', 'Technical and on-page SEO foundations', 'Metadata, schema, sitemap, and robots setup', 'Local search setup where relevant', 'Launch handoff and next-step recommendations'];

export default function WebsiteSeo() {
  return <ServicePage
    eyebrow="Brand Growth / Website + SEO"
    title={<>Give the business a clearer <em>home.</em></>}
    lead="Website development and SEO foundations for businesses that need to be easier to find and choose."
    description="A useful site starts with the business, the audience, and the next action. We shape the structure, content, and search foundations around that journey, then hand over a site the team can keep moving."
    steps={steps}
    includes={includes}
    relatedLinks={[
      ['Ranking + Reviews', 'Make the search result and the reputation behind it work together.', '/ranking-reviews'],
      ['Brand Growth', 'Bring website, search, reputation, and distribution into the right scoped plan.', '/grow'],
    ]}
  />;
}
