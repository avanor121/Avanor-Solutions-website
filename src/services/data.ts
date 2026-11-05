export type ServiceExample = {
  title: string;
  body: string;
};

export type ServiceStep = {
  title: string;
  body: string;
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  eyebrow: string;
  headline: string;
  highlight: string;
  lead: string;
  price?: {
    other: string;
    otherNote: string;
    ours: string;
    oursNote: string;
  };
  examplesTitle?: string;
  examples?: ServiceExample[];
  steps: ServiceStep[];
  disclaimer: string;
  ctaTitle: string;
  ctaSub: string;
  meta: string;
};

export const SERVICES: Service[] = [
  {
    slug: "free-business-audit",
    title: "Free Business Audit",
    short:
      "A 15 to 30 minute call. We examine your business and show you the hours you would save and the revenue you would gain, in your numbers.",
    eyebrow: "Services — Free Business Audit",
    headline:
      "If AI doesn't save you exponential time or make you serious money, it's a toy.",
    highlight: "it's a toy.",
    lead: "Book a free audit and we'll show you where it does both. In one call we examine your business and show you the hours saved and the revenue gained, in your numbers, not ours.",
    price: {
      other: "$2,000 – $4,000",
      otherNote: "for a business audit like this one.",
      ours: "FREE",
      oursNote: "15 to 30 minutes. No charge, no obligation.",
    },
    steps: [
      {
        title: "Book the call",
        body: "Pick a time that suits you. The call is 15 to 30 minutes, on video or phone.",
      },
      {
        title: "We examine your business",
        body: "We look at how work actually flows through your business and where time and money leak out.",
      },
      {
        title: "You get a report",
        body: "A report and workflow map showing the hours you would save every week and the revenue you would gain every month.",
      },
    ],
    disclaimer:
      "The report shows what we found in your business, in your numbers, and you decide what happens next.",
    ctaTitle: "Find out where AI pays in your business.",
    ctaSub: "Free. 15 to 30 minutes. Your numbers, not ours.",
    meta: "A free 15 to 30 minute audit of your business. We examine how work flows and show you the hours saved and the revenue gained, in your numbers.",
  },
  {
    slug: "custom-ai-workflows",
    title: "Custom AI Workflows",
    short:
      "Automations built for your business, after the audit. The repetitive work your team does by hand, done by a workflow instead.",
    eyebrow: "Services — Custom AI Workflows",
    headline:
      "The work your team does by hand, every day, done by a workflow instead.",
    highlight: "done by a workflow instead.",
    lead: "After the audit, we build automations for the exact work that eats your team's time. Invoicing, order handling, follow-ups and reminders. Built for your business, not bought off a shelf.",
    examplesTitle: "Template examples",
    examples: [
      {
        title: "Invoices that chase themselves",
        body: "When a job is done, the invoice goes out, the reminder follows and the payment is tracked, without anyone remembering to do it.",
      },
      {
        title: "Orders handled start to finish",
        body: "A new order becomes a booked job, a confirmation to the customer and a note in the system, in one motion.",
      },
      {
        title: "Follow-ups that never slip",
        body: "Every quote and every customer gets the next step on time, so good leads stop going cold.",
      },
    ],
    steps: [
      {
        title: "Free audit",
        body: "We find the work that eats your team's time and what it costs you every week.",
      },
      {
        title: "Custom build",
        body: "We build the workflows for your business, priced for your size and scope.",
      },
      {
        title: "Operate and report",
        body: "We run them, keep them working, and report what they saved you every month.",
      },
    ],
    disclaimer:
      "These are template examples. Every business repeats different work. We build your workflows custom, after auditing your company.",
    ctaTitle: "Stop doing by hand what a workflow can do.",
    ctaSub: "Start with a free audit. We will show you the work worth automating.",
    meta: "Custom AI workflows built for your business after a free audit. The repetitive work your team does by hand, done by a workflow instead.",
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    short:
      "Agents that answer first, book the job and follow up, so no customer waits and no enquiry goes cold.",
    eyebrow: "Services — AI Agents",
    headline: "Every call answered. Every lead replied to. Every job booked.",
    highlight: "Every job booked.",
    lead: "Agents that answer first, book the job and follow up, so no customer waits and no enquiry goes cold. The customer gets a real response in seconds, and your team gets a booked job, not a missed call.",
    examplesTitle: "Template examples",
    examples: [
      {
        title: "First response in seconds",
        body: "When a customer calls or messages, the agent answers at once, takes the details and starts the booking.",
      },
      {
        title: "Booking without the back and forth",
        body: "The agent offers real times from your calendar and books the job, then confirms it with the customer.",
      },
      {
        title: "Follow-up that keeps moving",
        body: "Reminders go out before the job and a review request after it, so the next customer is already on the way.",
      },
    ],
    steps: [
      {
        title: "Free audit",
        body: "We find where customers wait, where enquiries go cold and what it costs you.",
      },
      {
        title: "Custom build",
        body: "We build the agents for your business, priced for your size and scope.",
      },
      {
        title: "Operate and report",
        body: "We run them, keep them answering, and report what they booked every month.",
      },
    ],
    disclaimer:
      "These are template examples. Every business answers its customers differently. We build your agents custom, after auditing your company.",
    ctaTitle: "No more missed calls. No more cold leads.",
    ctaSub: "Start with a free audit. We will show you what your agents would answer.",
    meta: "AI agents that answer first, book the job and follow up, so no customer waits and no enquiry goes cold. Built custom after a free audit.",
  },
  {
    slug: "operate-and-report",
    title: "Operate and Report",
    short:
      "We run the systems for you and report every month in business numbers: booked jobs, hours saved, revenue.",
    eyebrow: "Services — Operate and Report",
    headline: "We run the systems. You see the numbers.",
    highlight: "You see the numbers.",
    lead: "We operate everything we build for you and report every month in business numbers: booked jobs, hours saved, revenue. Not system numbers. Business numbers.",
    examplesTitle: "What your monthly report shows",
    examples: [
      {
        title: "Booked jobs",
        body: "How many jobs the system booked, and where they came from.",
      },
      {
        title: "Hours saved",
        body: "The hours your team got back, counted from the work the system did.",
      },
      {
        title: "Revenue gained",
        body: "The revenue the system brought in, in your numbers.",
      },
    ],
    steps: [
      {
        title: "Free audit",
        body: "We find what is worth building and what to measure.",
      },
      {
        title: "Custom build",
        body: "We build the systems for your business, priced for your size and scope.",
      },
      {
        title: "Operate and report",
        body: "We run them and report every month, so you can see what they did.",
      },
    ],
    disclaimer:
      "These are template examples of a monthly report. What we report is agreed with you, after the audit, based on what matters in your business.",
    ctaTitle: "Know exactly what your AI did this month.",
    ctaSub: "Start with a free audit. We will show you what we would report.",
    meta: "We operate the AI systems we build for you and report every month in business numbers: booked jobs, hours saved, revenue.",
  },
  {
    slug: "ai-business-brain",
    title: "AI Business Brain",
    short:
      "Every tool in your business connected to one system. Ask it anything and it gives you the exact answer, from across the business.",
    eyebrow: "Services — AI Business Brain",
    headline: "Every tool in your business, connected. Ask it anything.",
    highlight: "Ask it anything.",
    lead: "Your business runs on five or six different tools, and the answer you need is always in a different one. The Business Brain connects them all, so you just ask and it gives you the exact answer, from across the business.",
    examplesTitle: "Template examples",
    examples: [
      {
        title: "How many jobs did we book this month?",
        body: "The Brain checks your calendar, your CRM and your invoices, and answers with the number, not a guess.",
      },
      {
        title: "Which customers have not paid yet?",
        body: "It pulls the exact list from your accounting tool, with amounts and dates, in one answer.",
      },
      {
        title: "What did we quote them last time?",
        body: "It finds the last quote from your emails and documents, so nobody has to dig through inboxes.",
      },
    ],
    steps: [
      {
        title: "Free audit",
        body: "We find which tools hold your answers and which questions your team asks every day.",
      },
      {
        title: "Custom build",
        body: "We connect your tools and build the Brain around your business, priced for your size and scope.",
      },
      {
        title: "Operate and report",
        body: "We run it, keep it accurate, and report what it saved you every month.",
      },
    ],
    disclaimer:
      "These are template examples. Every business runs on different tools and asks different questions. We build your Business Brain custom, after auditing your company, connected to the tools you actually use.",
    ctaTitle: "Stop digging through five tools for one answer.",
    ctaSub: "Start with a free audit. We will show you what your Brain would answer.",
    meta: "One system with every tool in your business connected. Ask it anything and it gives you the exact answer, from across the business.",
  },
];

export const SERVICES_OVERVIEW = {
  eyebrow: "Services",
  headline: "Five ways we put AI to work. Every one starts with a free audit.",
  highlight: "Every one starts with a free audit.",
  lead: "We audit your business first, find where AI saves exponential time or makes serious money, then build exactly that. Nothing generic, nothing off the shelf.",
  meta: "Five services from Avanor Solutions: a free business audit, custom AI workflows, AI agents, operate and report, and the AI Business Brain. Every one starts with a free audit.",
};
