import { chromium } from '@playwright/test';
const origin='https://www.tnrattorneys.co.za';
const maps=await Promise.all(['page','personnel','portfolio','post'].map(async type=>({type,xml:await(await fetch(`${origin}/wp-sitemap-posts-${type}-1.xml`)).text()})));
const browser=await chromium.launch();
const pages=[];
for(const map of maps){
 const entries=[...map.xml.matchAll(/<url><loc>(.*?)<\/loc><lastmod>(.*?)<\/lastmod><\/url>/g)];
 const targets=entries.filter(([,url,date])=>map.type!=='page'||(date>='2025'&&!/sample-page|coming-soon/.test(new URL(url).pathname)));
 for(const [,url] of targets){
  if(new URL(url).pathname==='/')continue;
  const html=await(await fetch(url)).text();
  const page=await browser.newPage();
  await page.route('**/*',route=>route.abort());
  await page.setContent(html,{waitUntil:'domcontentloaded'});
  const data=await page.evaluate(()=>{
   const root=document.querySelector('.attorna-page-wrapper')||document.body;
   root.querySelectorAll('script,style,form,.gdlr-core-sidebar-item,.attorna-single-nav-area,.attorna-comments-area,.gdlr-core-social-share-item').forEach(e=>e.remove());
   const title=document.querySelector('h1')?.textContent.trim()||document.title;
   root.querySelectorAll('br').forEach(e=>e.replaceWith(document.createTextNode(' ')));
   const blocks=[];
   root.querySelectorAll('h2,h3,h4,h5,h6,p,ul,ol,blockquote,img').forEach(e=>{
    if(e.closest('header,footer,nav')||e.parentElement.closest('p,ul,ol,blockquote'))return;
    const text=e.textContent.replace(/\s+/g,' ').trim();
    if(e.tagName==='IMG'){const src=e.getAttribute('src');if(src&&!/logo|avatar|icon|signature/i.test(src))blocks.push({type:'image',src,alt:e.getAttribute('alt')||''});return;}
    if(!text)return;
    if(e.matches('ul,ol'))blocks.push({type:'list',ordered:e.tagName==='OL',items:[...e.querySelectorAll(':scope>li')].map(li=>li.textContent.replace(/\s+/g,' ').trim())});
    else blocks.push({type:e.tagName.startsWith('H')||((e.querySelector('strong,b')?.textContent.trim()===text)&&text.length<140)?'heading':e.tagName==='BLOCKQUOTE'?'quote':'paragraph',text});
   });
   const links=[...root.querySelectorAll('a[href]')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')})).filter(a=>a.text&&a.href&&!a.href.startsWith('#'));
   const related=blocks.findIndex(b=>b.type==='heading'&&b.text==='Related Posts');
   if(related>=0)blocks.splice(related);
   return {title,blocks,links};
  });
  pages.push({path:new URL(url).pathname,kind:map.type,source:url,...data});
  await page.close();
 }
}
await browser.close();
process.stdout.write(JSON.stringify(pages,null,2));
