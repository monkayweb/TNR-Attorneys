import { test, expect } from '@playwright/test';
const paths=['/','/our-areas-of-expertise/','/meettheteam/','/about-us/','/contact/','/road-accident-fund/','/medical-negligence/','/wills-and-estates/','/unlawful-arrest-and-civil-rights/','/commercial-law/','/commercial-disputes/','/contract-drafting-and-legal-review/','/labour-and-administrative-law/'];
for (const width of [1440,1024,768,390]) {
 test(`All pages at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:1000});
  for(const path of paths){
   await page.goto('http://localhost:3002'+path);
   await expect(page.locator('h1')).toHaveCount(1);
   await page.evaluate(()=>document.fonts.ready);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.locator('img').evaluateAll(images=>images.forEach(i=>i.loading='eager'));
   await expect.poll(()=>page.locator('img').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
  }
  await page.goto('http://localhost:3002/');
  await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true});
 });
}
test('Navigation, mobile keyboard menu and contact routes',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://localhost:3002/');
 await page.getByRole('button',{name:'Menu'}).click();
 await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Home',exact:true})).toBeFocused();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('button',{name:'Menu'})).toBeFocused();
 await expect(page.getByRole('navigation',{name:'Main navigation'})).not.toBeVisible();
 await page.locator('footer').getByRole('link',{name:'Contact Us',exact:true}).click();
 await expect(page).toHaveURL(/contact/);
 await expect(page.getByRole('heading',{level:1})).toHaveText('Discuss your matter.');
 await expect(page.locator('main a[href="tel:+27125466948"]')).toBeVisible();
 await expect(page.locator('main a[href="mailto:info@tnrattorneys.co.za"]')).toBeVisible();
 await page.goto('http://localhost:3002/');
 for(const link of await page.locator('.lf-practice-grid a').all())expect(paths).toContain(await link.getAttribute('href'));
});
test('200% text enlargement',async({page})=>{
 await page.setViewportSize({width:390,height:1000});
 await page.goto('http://localhost:3002/');
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>{const elements=[...document.querySelectorAll('h1,h2,h3,p,a,button,small,figcaption')];const sizes=elements.map(el=>parseFloat(getComputedStyle(el).fontSize));elements.forEach((el,i)=>el.style.fontSize=`${sizes[i]*2}px`);});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'test-results/text-200.png',fullPage:true});
});
test('Hero content and CTA fit below navigation in the first screen',async({page})=>{
 for(const [width,height] of [[1440,900],[1440,600],[768,650],[390,844],[375,667],[320,568],[844,390]]){
  await page.setViewportSize({width,height});
  await page.goto('http://localhost:3002/');
  await page.evaluate(()=>document.fonts.ready);
  const bounds=await page.evaluate(()=>({
   headerBottom:document.querySelector('header').getBoundingClientRect().bottom,
   heroTop:document.querySelector('.lf-hero').getBoundingClientRect().top,
   heroBottom:document.querySelector('.lf-hero').getBoundingClientRect().bottom,
   ctaBottom:document.querySelector('.lf-hero-actions a').getBoundingClientRect().bottom
  }));
  expect(bounds.heroTop).toBeCloseTo(bounds.headerBottom,0);
  expect(bounds.heroBottom).toBeLessThanOrEqual(height+1);
  expect(bounds.ctaBottom).toBeLessThan(height);
 }
});
test('Carousel starts with welcome and each slide fits on desktop and mobile',async({page})=>{
 for(const [width,height] of [[1440,900],[390,844],[320,568],[844,390]]){
  await page.setViewportSize({width,height});
  await page.goto('http://localhost:3002/');
  await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('.lf-hero-eyebrow')).toHaveText('Welcome to');
  for(const [index,title] of ['TNR Attorneys','Access to Justice','Case Studies'].entries()){
   await page.getByRole('button',{name:`Show slide ${index+1}: ${title}`,exact:true}).click();
   await expect(page.getByRole('heading',{level:1})).toHaveText(title);
   const bounds=await page.evaluate(()=>({hero:document.querySelector('.lf-hero').getBoundingClientRect().bottom,cta:document.querySelector('.lf-hero-actions a').getBoundingClientRect().bottom,controls:document.querySelector('.lf-carousel-controls').getBoundingClientRect().top}));
   expect(bounds.hero).toBeLessThanOrEqual(height+1);
   expect(bounds.cta).toBeLessThan(bounds.controls);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await expect(page.locator('.lf-hero-actions a')).toHaveAttribute('href','https://www.tnrattorneys.co.za/casestudies/');
 }
});
test('Consultation form validates and prepares an email draft without claiming submission',async({page})=>{
 await page.goto('http://localhost:3002/');
 const form=page.locator('.lf-booking form');
 await form.getByLabel('Name',{exact:true}).fill('Test Client');
 await form.getByLabel('Phone',{exact:true}).fill('012 345 6789');
 await form.getByLabel('Email',{exact:true}).fill('test@example.com');
 await form.getByRole('combobox',{name:'Practice Area',exact:true}).click();
 await form.getByRole('option',{name:'RAF Claims',exact:true}).click();
 await form.getByLabel('Message',{exact:true}).fill('I would like to arrange a consultation.');
 await form.getByRole('button',{name:'Prepare Enquiry'}).click();
 const draft=form.getByRole('link',{name:'Open Email Draft'});
 await expect(draft).toHaveAttribute('href',/^mailto:info@tnrattorneys.co.za\?/);
 expect(decodeURIComponent(await draft.getAttribute('href'))).toContain('Test Client');
 expect(decodeURIComponent(await draft.getAttribute('href'))).toContain('RAF Claims');
 await form.getByLabel('Name',{exact:true}).fill('Updated Name');
 await expect(draft).not.toBeVisible();
});
