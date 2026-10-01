import { ServicePage } from '../components';
import { routeMetadata } from '../seo';

export const metadata = routeMetadata('/brand-campaigns');

const steps = [
  ['01', 'Shape the brief|Define the source content, objective, audience, platforms, guidelines, and working budget.'],
  ['02', 'Put content in motion|Native short-form versions are created and posted across the platforms in scope.'],
  ['03', 'Verify and report|Campaign activity and eligible views are reviewed against the agreed rules and reported clearly.'],
];

const includes = ['Campaign objective and brief', 'Source-content and guideline review', 'TikTok, Reels, Shorts, and X distribution', 'Platform-native clipping direction', 'Campaign review and moderation workflow', 'Verified-view and spend reporting'];

export default function BrandCampaigns() {
  return <ServicePage
    eyebrow="Distribution / Brand Campaigns"
    title={<>Turn source content into <em>distributed reach.</em></>}
    lead="Creator-led clipping campaigns for brands and creators with content ready to move."
    description="Bring the source material, the message, and the working brief. PowerClip shapes a campaign around the goal, then keeps creator-led distribution, verification, and reporting legible from launch onward."
    steps={steps}
    includes={includes}
    cta="Start a campaign"
    ctaHref="/start-campaign"
    relatedLinks={[
      ['Clippers', 'Join the independent editor community through Whop and learn how verified-view clipping works.', '/clippers'],
      ['Paid Ads', 'Add deliberate targeting and controlled pacing when paid distribution is the useful next lever.', '/paid-ads'],
      ['Distribution', 'See how the distribution offers fit together before you write the brief.', '/brands'],
    ]}
  />;
}
