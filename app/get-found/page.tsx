import { ServicePage } from '../components';
import { routeMetadata } from '../seo';

export const metadata = routeMetadata('/get-found');

const steps = [['01', 'Site built|A clear, mobile-first web presence shaped around what your audience needs to do next.'], ['02', 'SEO foundations laid|Technical and on-page foundations that make the site easier for search engines to understand.'], ['03', 'Rankings and traffic tracked|A practical reporting loop for visibility, traffic, and the next improvements.']];
const includes = ['Mobile-first website build', 'Technical and on-page SEO foundations', 'Local SEO setup', 'Google Business Profile setup', 'Page-speed improvements', 'Ongoing visibility and traffic tracking'];
const focusSections = [{
  id: 'ranking-reviews',
  label: 'RANKING + REVIEWS',
  title: 'Ranking + Reviews',
  copy: 'Search visibility and reputation work that helps the right people find a clearer, more trustworthy version of your business.',
  items: [
    ['Local search visibility', 'Align the important business details, pages, and local signals so the offer is easier to understand in search.'],
    ['Review management', 'Create a practical way to request, monitor, and respond to reviews without making claims about outcomes.'],
    ['Search improvements', 'Use technical, on-page, and content improvements to build a clearer path from a search query to the next step.'],
  ],
}] as const;

export default function GetFound(){return <ServicePage eyebrow="Get Found" title={<>Be findable. <em>Not invisible.</em></>} lead="Website design + SEO for brands that need a stronger web presence" description="A good offer is harder to grow when the right people cannot find it. We build the web presence and search foundations that help your business show up clearly and convert attention into the next step." heroId="website-seo" steps={steps} includes={includes} includeIds={{'Local SEO setup':'local-search-reputation'}} focusSections={focusSections} relatedLinks={[['Website + SEO','Build the web presence and technical foundation behind the search journey.','/website-seo'],['Ranking + Reviews','Improve the connected path from search visibility to trust.','/ranking-reviews']]} />}
