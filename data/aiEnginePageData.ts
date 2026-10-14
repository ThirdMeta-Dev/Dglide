// AI Engine page (/ai-engine) and the homepage AI additions.
// Copy source: Samir's "DGLIDE Website Update Brief: Homepage and AI Engine" (13 Oct 2026).
// Brief copy is used as written; only "DGLIDE" is set to "DGlide" and headings to Title Case.
// Screens come from a real build of the Manufacturing Job Work app on DGlide.

// Set `src` (and `poster`) once the 60-90 second demo recording is supplied.
// While `src` is empty, the page shows the real build as a step-by-step storyboard instead.
export const AI_DEMO_VIDEO: { src: string; poster: string; captions?: string } = {
  src: "",
  poster: "/ai-engine/schema-canvas.webp",
};

export const AI_HERO = {
  eyebrow: "DGlide AI Engine",
  title: "Draw Your Process. Get a Working App.",
  pageSubtitle:
    "Describe it or draw it, and DGlide's AI engine builds a working no-code application on the DGlide platform.",
  primaryCta: "See It Build Live",
};

// Homepage: the AI engine is an addition to the existing positioning, not the hero message.
export const AI_ANNOUNCEMENT = {
  full: "DGlide AI Engine: draw your process, get a working app",
  short: "Meet the DGlide AI Engine",
};

export const AI_TEASER = {
  intro:
    "The same DGlide platform for field service, ITSM and CRM, now with an AI engine that turns a flow diagram or a written requirement into a working app.",
  title: "From Requirement to Running App, Built by AI and Governed by DGlide.",
  cards: [
    { title: "Describe or Draw It.", body: "Upload a flow diagram or write what you need." },
    { title: "Edit It by Asking.", body: "Add forms, fields, workflows and dashboards without touching code." },
    { title: "Ship It Safely.", body: "A second AI validates every build before it goes to production." },
  ],
  link: "Explore the AI Engine",
};

export const AI_PROBLEM = {
  title: "AI-Generated Code Is Someone Else's Problem to Maintain.",
  body:
    "Code generators hand you files to host, secure and maintain. DGlide gives you a working application on a governed platform, so there is no raw code to manage.",
};

export const AI_STEPS = [
  { title: "Describe or Draw", body: "Upload a flow diagram or write the requirement." },
  { title: "AI Builds", body: "Forms, fields, workflows and dashboards appear." },
  { title: "Validate and Fix", body: "A second AI platform tests the build and issues are fixed." },
  { title: "Go Live", body: "Iterate in a sandbox, push to production, then smoke test." },
];

export const AI_CHANGE = {
  title: "Need a New Field? Just Say So.",
  body: "Add forms, fields, workflows and dashboards by asking.",
  example: "Add an approval step and a service-history dashboard.",
};

export const AI_SAFE = {
  title: "Built by One AI. Tested by Another.",
  body:
    "Every build is validated by a separate AI-driven platform. Once approved it moves from sandbox to production, followed by smoke testing.",
  loop: ["Build", "Validate", "Fix", "Ship"],
};

export const AI_COMPARISON = {
  title: "Why Not Just Generate Code?",
  columns: ["Code generators", "DGlide AI engine"],
  rows: [
    { label: "What you get", code: "Raw code files", dglide: "A working no-code application" },
    { label: "Making changes", code: "Edit or regenerate code", dglide: "Ask for changes, or edit forms, fields, workflows and dashboards directly" },
    { label: "Maintenance", code: "You manage, secure and host the code", dglide: "Runs on the governed DGlide platform" },
    { label: "Validation", code: "Up to you", dglide: "Separate AI-driven validation before production" },
    { label: "Release", code: "Manual deployment", dglide: "Sandbox to production, followed by smoke testing" },
  ],
};

// Storyboard of the real Manufacturing Job Work build, shown until the demo video is supplied.
export const AI_BUILD_FRAMES = [
  {
    src: "/ai-engine/job-work-diagram.webp",
    width: 1379,
    height: 690,
    title: "The Diagram Goes In",
    body: "A manufacturing job work process, drawn as a flow diagram.",
    alt: "Manufacturing job work flow diagram used as the input for the DGlide AI engine",
  },
  {
    src: "/ai-engine/chat-diagram-prompt.webp",
    width: 729,
    height: 295,
    title: "One Line of Instruction",
    body: "The diagram is attached with a single request: build an app using the attached diagram.",
    alt: "Chat message attaching the job work diagram with the request to build an app from it",
  },
  {
    src: "/ai-engine/chat-app-plan.webp",
    width: 681,
    height: 575,
    title: "The AI Proposes the App",
    body: "Tables, key fields and relations are laid out for approval before anything is built.",
    alt: "DGlide AI engine listing the proposed tables, key fields and relations for the job work app",
  },
  {
    src: "/ai-engine/chat-tables-built.webp",
    width: 722,
    height: 628,
    title: "Tables Built, One Approval at a Time",
    body: "Each table and its fields are created only after you approve them.",
    alt: "DGlide AI engine creating the Vendor Master and Job Work Order tables after approval",
  },
  {
    src: "/ai-engine/chat-dashboard-ask.webp",
    width: 696,
    height: 420,
    title: "Dashboards on Request",
    body: "Ask for dashboards and the AI suggests the charts that suit the app.",
    alt: "DGlide AI engine suggesting dashboards for the Manufacturing Job Work app",
  },
  {
    src: "/ai-engine/schema-canvas.webp",
    width: 1760,
    height: 470,
    title: "A Working App, Not Code",
    body: "The finished Manufacturing Job Work app on the schema canvas, with every table and link.",
    alt: "Schema canvas of the finished Manufacturing Job Work app showing seven linked tables",
  },
];

export const AI_FAQS = [
  {
    q: "Is this a code generator?",
    a: "No. The AI engine builds a working application on the DGlide no-code platform. There is no raw code to manage.",
  },
  { q: "What can I give it?", a: "A flow diagram or a written description of what you need." },
  {
    q: "Can I change the app afterwards?",
    a: "Yes. Ask for new forms, fields, workflows or dashboards, or edit them directly.",
  },
  {
    q: "How is the app checked before it goes live?",
    a: "A separate AI-driven platform validates it. Issues are fixed and re-tested in a sandbox, and once approved it is pushed to production with smoke testing.",
  },
  {
    q: "Who is it for?",
    a: "Operations and no-code teams who want working applications without managing code, including service operations in manufacturing.",
  },
];
