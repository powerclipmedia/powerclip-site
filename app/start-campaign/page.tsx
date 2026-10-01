import { CampaignForm, Footer, Nav } from '../components';
import { routeMetadata } from '../seo';

export const metadata = routeMetadata('/start-campaign');

export default function StartCampaign(){return <main className="site"><Nav/><section className="campaign-layout"><div className="campaign-copy"><span className="eyebrow">Launch in 24 hours</span><h1>Tell us what your campaign <em>wants to be about.</em></h1><p className="hero-kicker">Promoting.</p><p>Fill this in and the team will review fit, then build the guidelines and reward structure around your goal.</p><div className="brief-copy"><div className="section-label">CAMPAIGN BRIEF</div><p>Once you submit the form, the team reviews your project for fit and builds a custom clipping strategy around your goal and budget. We create clear content guidelines, match your campaign with clippers who fit your niche and target regions, and get clips live after approval.</p><p>Every clip is reviewed against your guidelines before it counts toward spend. As clips go live, you’ll receive reporting on verified views and CPM spend.</p></div></div><CampaignForm/></section><Footer/></main>}
