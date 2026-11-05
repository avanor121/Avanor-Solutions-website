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
    meta:'A considered approach to inquiry handling and job booking for plumbing companies.',
    tagline:'A connected experience for your customers.',
  },
  {
    dir:'dist/window-siding-replacement',
    title:'For Window and Siding Replacement Companies — Avanor Solutions',
    hero:'For Window and Siding Replacement Companies — Avanor Solutions',
    meta:'A considered approach to inquiry handling and estimate follow-up for window and siding replacement companies.',
    tagline:'A connected experience for your customers.',
  },
];
for(const p of pages){
  const html=base
    .replace('<head>','<head>\n    <meta name="robots" content="noindex, nofollow" />')
    .replace(/<title>.*?<\/title>/,`<title>${p.title}</title>`)
    .replace('Avanor Solutions — Be the answer.',p.hero)
    .replace('The Avanor Engine: done-for-you AI search visibility, an AI receptionist and a custom AI CRM for service businesses.',p.meta)
    .replace('One system. Found. Answered. Closed.',p.tagline);
  await mkdir(p.dir,{recursive:true});
  await writeFile(`${p.dir}/index.html`,html);
}
