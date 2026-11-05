import {readFile,writeFile,mkdir} from 'node:fs/promises';
const out='../shareable-html';await mkdir(out,{recursive:true});
for (const [name,entry,page] of [['Avanor-Main-Website.html','dist/index.html','main'],['Plastic-Surgeon-VSL.html','dist/plastic-surgeons/index.html','plastic-surgeons']]) {
 let html=await readFile(entry,'utf8');
 const jsPath=html.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/)[1];
 const cssPath=html.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/)[1];
 const js=await readFile('dist'+jsPath,'utf8');const css=await readFile('dist'+cssPath,'utf8');
 html=html.replace('<html lang="en">',`<html lang="en" data-page="${page}">`)
 .replace(/<script[^>]+src="[^"]+"[^>]*><\/script>/,'')
 .replace(/<link[^>]+href="[^"]+\.css"[^>]*>/,()=>`<style>${css.replace(/<\/style/gi,'<\\/style')}</style>`)
 .replace('</body>',()=>`<script type="module">${js.replace(/<\/script/gi,'<\\/script')}</script></body>`);
 await writeFile(`${out}/${name}`,html);
 console.log(`${name}: ${Buffer.byteLength(html)} bytes`);
}
await writeFile(`${out}/READ-ME.txt`,'AVANOR WEBSITE PREVIEWS\n\nOpen either HTML file in Chrome, Edge, Firefox or Safari. No installation or server is needed. Each file includes its own styles and animation code.\n\nAvanor-Main-Website.html — main interactive website\nPlastic-Surgeon-VSL.html — standalone plastic surgery VSL page\n\nVideos are labeled placeholders; finished video files have not been supplied. Applications are preview-only and do not send or save data.\n\nIf received as a ZIP, extract it first. Email attachment previews may not run the animations; download the HTML and open it in a browser.\n');
