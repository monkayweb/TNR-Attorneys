import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({viewport:{width:1440,height:1000}});
await page.goto('https://lawfirma-wbs.framer.website/',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:'/tmp/lawfirma-top.png'});
console.log(JSON.stringify(await page.evaluate(()=>({headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({text:e.textContent,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize,weight:getComputedStyle(e).fontWeight,color:getComputedStyle(e).color,top:e.getBoundingClientRect().top})),images:[...document.images].map(e=>({alt:e.alt,src:e.currentSrc,width:e.width,height:e.height})).filter(e=>e.width>150),backgrounds:[...document.querySelectorAll('section,header,footer')].map(e=>({tag:e.tagName,color:getComputedStyle(e).backgroundColor,top:e.getBoundingClientRect().top,height:e.getBoundingClientRect().height}))})),null,2));
for(const [name,y] of [['services',1000],['about',2100],['middle',3500],['team',4800],['contact',6200],['footer',7800]]){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(500);await page.screenshot({path:`/tmp/lawfirma-${name}.png`});}
await browser.close();
