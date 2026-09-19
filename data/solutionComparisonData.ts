export type SolutionComparisonRow = {
  challenge: string;
  dglide: string;
  rigid: string;
};

export type SolutionComparisonContent = {
  title: string;
  subtitle: string;
  challengeHeading: string;
  dglideHeading: string;
  rigidHeading: string;
  rows: SolutionComparisonRow[];
};

const footnote = 'Comparison reflects typical enterprise-suite licensing and rollout as of September 2026.';

export const solutionComparisonFootnote = footnote;

export const itsmComparison: SolutionComparisonContent = {
  title: 'DGlide vs. Rigid ITSM: What Actually Changes',
  subtitle:
    'For teams already weighing a switch: a straight comparison against a rigid ITSM suite, including where it still wins. "Add-on" means the capability exists, but only as a separate paid extra.',
  challengeHeading: 'What your service team runs into',
  dglideHeading: 'DGlide ITSM',
  rigidHeading: 'Rigid ITSM suite',
  rows: [
    {
      challenge: 'Getting the system live',
      dglide: 'Ready-to-run — live in weeks, no consultant-led program',
      rigid: 'Partner-led rollout that runs for months',
    },
    {
      challenge: 'Changing a workflow after go-live',
      dglide: 'No-code. Your service lead makes the change, not IT or the vendor',
      rigid: 'Admin scripting or a vendor request',
    },
    {
      challenge: 'Requests that span more than one department',
      dglide: 'Tickets, approvals and SLAs in one connected flow, past the IT edge',
      rigid: 'Workflows stop at the IT edge; other teams get bolt-ons',
    },
    {
      challenge: 'AI for routing, triage and approvals',
      dglide: 'Already in your quoted plan',
      rigid: 'Paid tier, add-on or licence uplift',
    },
    {
      challenge: 'What you pay after go-live',
      dglide: 'Fixed to the scope you agreed. No surprise add-ons',
      rigid: 'Climbs as modules, orchestration and AI get switched on',
    },
    {
      challenge: 'Your workflows will change',
      dglide: 'Software that evolves with your workflows',
      rigid: 'You raise a change request and wait',
    },
  ],
};

export const fsmComparison: SolutionComparisonContent = {
  title: 'DGlide vs. Rigid FSM: What Actually Changes',
  subtitle:
    'For teams already weighing a switch: a straight comparison against a rigid FSM suite, including where it still wins. "Add-on" means the capability exists, but only as a separate paid extra.',
  challengeHeading: 'What your service operation runs into',
  dglideHeading: 'DGlide FSM',
  rigidHeading: 'Rigid FSM suite',
  rows: [
    {
      challenge: 'Getting the system live',
      dglide: 'Ready-to-run — live in weeks, no consultant-led program',
      rigid: 'Partner-led rollout that runs for months',
    },
    {
      challenge: 'Changing a workflow after go-live',
      dglide: 'No-code. Your ops lead makes the change, not IT or the vendor',
      rigid: 'Admin scripting or a vendor request',
    },
    {
      challenge: 'Intake, dispatch, technician app and closure',
      dglide: 'One platform, one scoped plan — call, email and WhatsApp requests land in one place',
      rigid: 'Separate scheduling, mobile and closure modules, licensed one by one',
    },
    {
      challenge: 'AI for technician assignment and route planning',
      dglide: 'Already in your quoted plan',
      rigid: 'Paid tier, add-on or licence uplift',
    },
    {
      challenge: 'What you pay after go-live',
      dglide: 'Fixed to the scope you agreed. No surprise add-ons',
      rigid: 'Climbs as modules, automation and AI get switched on',
    },
    {
      challenge: 'Your service workflow will change',
      dglide: 'Your FSM reconfigures to match',
      rigid: 'You raise a change request and wait',
    },
  ],
};

export const crmComparison: SolutionComparisonContent = {
  title: 'DGlide vs. Rigid CRM: What Actually Changes',
  subtitle:
    'For teams already weighing a switch: a straight comparison against a rigid CRM, including where it still wins. "Add-on" means the capability exists, but only as a separate paid extra.',
  challengeHeading: 'What your sales and service teams run into',
  dglideHeading: 'DGlide CRM',
  rigidHeading: 'Traditional CRM',
  rows: [
    {
      challenge: 'Getting the system live',
      dglide: 'Go live in weeks, not months — no consultant-led program',
      rigid: 'Partner-led rollout that runs for months',
    },
    {
      challenge: 'Changing a workflow after go-live',
      dglide: 'No-code. Your team makes the change, not IT or the vendor',
      rigid: 'Admin scripting or a vendor request',
    },
    {
      challenge: 'Customer record tied to tickets, installs, field visits and AMC history',
      dglide: 'One customer record across every team, one scoped plan',
      rigid: 'Sales notes only; service and field data sit in separate tools',
    },
    {
      challenge: 'AI for follow-ups, lifecycle updates and duplicate cleanup',
      dglide: 'Already in your quoted plan',
      rigid: 'Paid tier, add-on or licence uplift',
    },
    {
      challenge: 'What you pay after go-live',
      dglide: 'Fixed to the scope you agreed. No surprise add-ons',
      rigid: 'Climbs as seats, modules and AI get added',
    },
    {
      challenge: 'Your business will change',
      dglide: 'A CRM that adapts as your business changes',
      rigid: 'You raise a change request and wait',
    },
  ],
};

export const processComparison: SolutionComparisonContent = {
  title: 'DGlide vs. Rigid ERP: What Actually Changes',
  subtitle:
    'For teams already weighing a switch: a straight comparison against a rigid ERP module, including where it still wins. "Add-on" means the capability exists, but only as a separate paid extra.',
  challengeHeading: 'What your production floor runs into',
  dglideHeading: 'DGlide Process Management',
  rigidHeading: 'Rigid ERP / MES module',
  rows: [
    {
      challenge: 'Getting the system live',
      dglide: 'Go live faster, without a heavy build — no consultant-led program',
      rigid: 'Partner-led rollout that runs for months',
    },
    {
      challenge: 'Changing a workflow after go-live',
      dglide: 'No-code. Add a product line without adding a software project',
      rigid: 'Admin scripting or a vendor request',
    },
    {
      challenge: 'BOM, component work orders, QC and packaging',
      dglide: 'One platform for the whole production lifecycle, one scoped plan',
      rigid: 'BOM, work orders and inventory in separate systems',
    },
    {
      challenge: 'AI for dependency flags and material-shortage alerts',
      dglide: 'Already in your quoted plan',
      rigid: 'Paid tier, add-on or licence uplift',
    },
    {
      challenge: 'What you pay after go-live',
      dglide: 'Fixed to the scope you agreed. No surprise add-ons',
      rigid: 'Climbs as modules and users get added',
    },
    {
      challenge: 'You’ll add product lines',
      dglide: 'Add a product line without adding a software project',
      rigid: 'You scope a new implementation',
    },
  ],
};
