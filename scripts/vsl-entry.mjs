import {readFile,mkdir,writeFile} from 'node:fs/promises';
const base=await readFile('dist/index.html','utf8');
const pages=[
  {
    dir:'dist/plastic-surgeons',
    title:'For Plastic Surgery Practices — Avanor Solutions',
    hero:'For Plastic Surgery Practices — Avanor Solutions',
    meta:'A considered approach to inquiry handling and consultation follow-up for plastic surgery practices.',
    tagline:'A connected experience for your practice.',
  },
  {
    dir:'dist/plumbers',
    title:'For Plumbing Companies — Avanor Solutions',
    hero:'For Plumbing Companies — Avanor Solutions',
    meta:'A clearer path from local search and urgent calls to booked plumbing work.',
    tagline:'A connected customer path for plumbing companies.',
  },
  {
    dir:'dist/window-siding-replacement',
    title:'For Window & Siding Replacement Companies — Avanor Solutions',
    hero:'For Window & Siding Replacement Companies — Avanor Solutions',
    meta:'A considered approach to project inquiries, consultations and follow-up for window and siding replacement companies.',
    tagline:'A connected customer path for exterior replacement companies.',
  },
];
for(const p of pages){
  const html=base
    .replace('<head>','<head>\n    <meta name="robots" content="noindex, nofollow" />')
    .replace(/<title>.*?<\/title>/,`<title>${p.title}</title>`)
    .replace("Avanor Solutions — If AI doesn't save you exponential time or make you serious money, it's a toy.",p.hero)
    .replace('Avanor is an AI consultancy. We audit your business, find where AI saves serious time or makes serious money, then build the workflows and automations. Book a free audit.',p.meta)
    .replace('Book a free audit and we\'ll show you where it does both. In one call we examine your business and show you the hours saved and the revenue gained, in your numbers, not ours.',p.tagline);
  await mkdir(p.dir,{recursive:true});
  await writeFile(`${p.dir}/index.html`,html);
}

// Service pages: indexed (no robots noindex), same base HTML with
// service-specific titles, descriptions and social copy.
const services=[
  {
    dir:'dist/services',
    title:'Services — Avanor Solutions',
    hero:'Services — Avanor Solutions',
    meta:'Five services from Avanor Solutions: a free business audit, custom AI workflows, AI agents, operate and report, and the AI Business Brain. Every one starts with a free audit.',
    tagline:'Five ways we put AI to work. Every one starts with a free audit.',
  },
  {
    dir:'dist/services/free-business-audit',
    title:'Free Business Audit — Avanor Solutions',
    hero:'Free Business Audit — Avanor Solutions',
    meta:'A free 15 to 30 minute audit of your business. We examine how work flows and show you the hours saved and the revenue gained, in your numbers.',
    tagline:'If AI does not save you serious time or make you serious money, it is a toy.',
  },
  {
    dir:'dist/services/custom-ai-workflows',
    title:'Custom AI Workflows — Avanor Solutions',
    hero:'Custom AI Workflows — Avanor Solutions',
    meta:'Custom AI workflows built for your business after a free audit. The repetitive work your team does by hand, done by a workflow instead.',
    tagline:'The work your team does by hand, every day, done by a workflow instead.',
  },
  {
    dir:'dist/services/ai-agents',
    title:'AI Agents — Avanor Solutions',
    hero:'AI Agents — Avanor Solutions',
    meta:'AI agents that answer first, book the job and follow up, so no customer waits and no enquiry goes cold. Built custom after a free audit.',
    tagline:'Every call answered. Every lead replied to. Every job booked.',
  },
  {
    dir:'dist/services/operate-and-report',
    title:'Operate and Report — Avanor Solutions',
    hero:'Operate and Report — Avanor Solutions',
    meta:'We operate the AI systems we build for you and report every month in business numbers: booked jobs, hours saved, revenue.',
    tagline:'We run the systems. You see the numbers.',
  },
  {
    dir:'dist/services/ai-business-brain',
    title:'AI Business Brain — Avanor Solutions',
    hero:'AI Business Brain — Avanor Solutions',
    meta:'One system with every tool in your business connected. Ask it anything and it gives you the exact answer, from across the business.',
    tagline:'Every tool in your business, connected. Ask it anything.',
  },
];
for(const p of services){
  const html=base
    .replace(/<title>.*?<\/title>/,`<title>${p.title}</title>`)
    .replace("Avanor Solutions — If AI doesn't save you exponential time or make you serious money, it's a toy.",p.hero)
    .replace('Avanor is an AI consultancy. We audit your business, find where AI saves serious time or makes serious money, then build the workflows and automations. Book a free audit.',p.meta)
    .replace('Book a free audit and we\'ll show you where it does both. In one call we examine your business and show you the hours saved and the revenue gained, in your numbers, not ours.',p.tagline);
  await mkdir(p.dir,{recursive:true});
  await writeFile(`${p.dir}/index.html`,html);
}
