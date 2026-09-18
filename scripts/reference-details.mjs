import {chromium} from '@playwright/test';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto('https://lawfirma-wbs.framer.website/');await p.evaluate(()=>document.fonts.ready);
console.log(await p.evaluate(()=>({body:[...document.querySelectorAll('p')].slice(0,12).map(e=>({text:e.textContent,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize})),fonts:performance.getEntriesByType('resource').filter(r=>/woff/.test(r.name)).map(r=>r.name)})));
await p.setViewportSize({width:390,height:844});await p.goto('https://lawfirma-wbs.framer.website/');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1800);await p.screenshot({path:'/tmp/lawfirma-mobile.png'});await b.close();
