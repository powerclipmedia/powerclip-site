import { ServicePage } from '../components';
import { routeMetadata } from '../seo';

export const metadata = routeMetadata('/automations');

const steps = [
  ['01', 'Map the repeatable work|Find the handoffs, reminders, and status changes that happen again and again.'],
  ['02', 'Connect the tools|Configure the right triggers and destinations around the team’s existing process.'],
  ['03', 'Document the handoff|Make ownership, exceptions, and maintenance clear so the workflow keeps working.'],
];

const includes = ['Workflow and handoff audit', 'Lead and client follow-up automation', 'Status and ownership routing', 'Connected tool configuration', 'Exception and approval paths', 'Documentation and team handoff'];

export default function Automations() {
  return <ServicePage
    eyebrow="Operations / Automations"
    title={<>Make the next action <em>automatic.</em></>}
    lead="Workflow automation for the repeatable steps between intake, delivery, and reporting."
    description="Automation is useful when the underlying process is clear. We map what should happen, connect the tools that need to share status, and leave the team with a system it can understand and maintain."
    steps={steps}
    includes={includes}
    relatedLinks={[
      ['CRMs + Reporting', 'Give the workflows a clear operating home for records, ownership, and reporting.', '/operations#crms-reporting'],
      ['Brand Growth', 'Connect the systems layer to website, search, reputation, and distribution work when needed.', '/grow'],
    ]}
  />;
}
