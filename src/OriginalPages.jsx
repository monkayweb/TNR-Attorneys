import React from 'react';
import {Link} from 'react-router-dom';
import originalPages from './original-pages.json';
import {people} from './team';
import {CaseStudies,Clients,ConsultationForm,PracticeOverview} from './Lawfirma';

const cleanTitle=title=>title.replace(/\s*[–—]\s*TNR Attorneys$/i,'').replace(/\b[A-Z][A-Z’]+\b/g,word=>['RAF','TNR','CCMA','BEE','SITA','IDC'].includes(word)?word:word[0]+word.slice(1).toLowerCase());
export const pageByPath=Object.fromEntries(originalPages.map(page=>[page.path,page]));
export const articlePages=originalPages.filter(page=>page.kind==='post'&&!/\/(legalinsights|blog)\/$/.test(page.path));
export const casePages=originalPages.filter(page=>page.kind==='portfolio');
const services=originalPages.filter(page=>page.kind==='page'&&['commercial-disputes','unlawful-arrest-and-civil-rights','medical-negligence','road-accident-fund','wills-and-estates','commercial-law','contract-drafting-and-legal-review','labour-and-administrative-law'].includes(page.path.split('/')[1]));
const practiceImages={
 'commercial-disputes':'disputes','unlawful-arrest-and-civil-rights':'rights','medical-negligence':'medical','road-accident-fund':'raf','wills-and-estates':'estates','commercial-law':'commercial','contract-drafting-and-legal-review':'contracts','contract-drafting-legal-review':'contracts','labour-and-administrative-law':'labour'
};
function ContactText({text}){return text.split(/([\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:0\d{2})\s\d{3}\s\d{4})/gi).map((part,index)=>part.includes('@')?<a key={index} href={`mailto:${part}`}>{part}</a>:/^0\d{2}\s\d{3}\s\d{4}$/.test(part)?<a key={index} href={`tel:+27${part.replaceAll(' ','').slice(1)}`}>{part}</a>:part);}
function Blocks({blocks}){return blocks.map((block,index)=>{
 if(block.type==='image')return null;
 if(block.type==='heading')return <h2 key={index}>{cleanTitle(block.text)}</h2>;
 if(block.type==='list'){
  const team=block.items.map(item=>people.find(([name])=>item.startsWith(name)));
if(team.length&&team.every(Boolean))return <div className="tnr-inline-team" key={index}>{team.map(([name,role])=><Link key={name} to={`/attorneys/${name.toLowerCase().replaceAll(' ','-')}/`}><img src={`/assets/${name.replaceAll(' ','-')}.png`} alt="" loading="lazy" width="599" height="551"/><span><strong>{name}</strong><small>{role}</small></span></Link>)}</div>;
  const Tag=block.ordered?'ol':'ul';return <Tag key={index}>{block.items.map((item,i)=><li key={i}>{item}</li>)}</Tag>;
 }
 if(block.type==='quote')return <blockquote key={index}>{block.text}</blockquote>;
 return <p key={index}><ContactText text={block.text}/></p>;
});}
function InnerHero({title,label='TNR Attorneys',description,image}){return <header className={`tnr-page-hero ${image?'tnr-page-hero-image':''}`}>{image&&<img src={image} alt=""/>}<div className="lf-shell"><Link className="tnr-breadcrumb" to="/">Home</Link><span className="tnr-breadcrumb-separator" aria-hidden="true">/</span><span className="tnr-breadcrumb">{label}</span><p className="lf-overview-eyebrow">{label}</p><h1>{title}</h1>{description&&<p className="tnr-page-lead">{description}</p>}</div></header>;}
function PageEnd(){return <div className="tnr-page-end lf-shell"><div><p className="lf-overview-eyebrow">Let’s Talk</p><h2>Your Matter Deserves Our Attention.</h2></div><Link className="lf-button" to="/contact/">Book a Consultation</Link></div>;}
function Articles({paths}={}){return <div className="tnr-article-grid">{articlePages.filter(page=>!paths||paths.includes(page.path)).sort((a,b)=>b.path.localeCompare(a.path)).map(page=><Link className="tnr-article-card" to={page.path} key={page.path}>{page.blocks.find(b=>b.type==='image')&&<img src={page.blocks.find(b=>b.type==='image').src} alt="" loading="lazy"/>}<div><p className="lf-overview-eyebrow">Legal Insights</p><h2>{cleanTitle(page.title)}</h2><span>Read Article <span aria-hidden="true">›</span></span></div></Link>)}</div>;}
function TeamDirectory({limit}={}){return <div className="tnr-people-grid">{people.slice(0,limit??people.length).map(([name,role])=><Link key={name} to={`/attorneys/${name.toLowerCase().replaceAll(' ','-')}/`} className="tnr-person-card"><div><img src={`/assets/${name.replaceAll(' ','-')}.png`} width="599" height="551" alt={name} loading="lazy"/></div><h2>{name}</h2><p>{role}</p><span>View Profile <span aria-hidden="true">›</span></span></Link>)}</div>;}

function ServicePage({page}){
 const image=practiceImages[page.path.split('/')[1]];
 const content=page.blocks.slice(1);
 const sections=[];
 for(const block of content){
  if(block.type==='heading'&&/^(Are you looking|Let us help)/i.test(block.text))continue;
  if(block.type==='paragraph'&&block.text.startsWith('Real Results:')){sections.push({title:'Real Results',blocks:[block]});continue;}
  if(block.type==='heading')sections.push({title:cleanTitle(block.text),blocks:[]});
  else {if(!sections.length)sections.push({title:'Legal Support, Built Around You',blocks:[]});sections.at(-1).blocks.push(block);}
 }
 return <><InnerHero title={cleanTitle(page.title)} label="Practice Area" image={`/assets/practice/${image}.jpg`}/><div className="lf-shell tnr-service-layout"><article className="tnr-prose tnr-service-content">{sections.map((section,index)=>{
  const process=/How We Help/i.test(section.title);
  const results=/Real Results/i.test(section.title)||section.blocks.some(b=>b.text?.startsWith('Real Results:'));
  return <section className={`tnr-service-section ${process?'tnr-service-process':''} ${results?'tnr-service-results':''}`} id={`service-section-${index}`} key={index}><div className="tnr-service-section-label" aria-hidden="true"><span>{String(index+1).padStart(2,'0')}</span><i/></div><div><h2>{section.title}</h2><Blocks blocks={section.blocks}/>{results&&<small className="tnr-service-disclaimer">Past outcomes do not guarantee a similar result in another matter.</small>}</div></section>;
 })}</article><aside className="tnr-service-aside"><div className="tnr-service-consultation"><p className="lf-overview-eyebrow">Your Next Step</p><h2>Let’s Discuss Your Matter.</h2><p>Speak to our team about your circumstances and the legal support you need.</p><Link className="lf-button" to="/contact/">Book a Consultation <span aria-hidden="true">›</span></Link><a className="tnr-service-phone" href="tel:+27125466948">012 546 6948</a><span className="tnr-service-location">South Africa · Serving Clients Nationwide</span></div><nav className="tnr-service-navigation" aria-label="Other practice areas"><h2>Our Practice Areas</h2>{services.map(service=><Link aria-current={service.path===page.path?'page':undefined} to={service.path} key={service.path}>{cleanTitle(service.title)}<span aria-hidden="true">›</span></Link>)}</nav></aside></div><PageEnd/></>;
}

function AboutPage({page}){
 const blocks=page.blocks;
 const faqStart=blocks.findIndex(block=>block.text==='Frequently Asked Questions');
 const faqEnd=blocks.findIndex(block=>block.text==='Still have questions?');
 const categories=[];
 for(const block of blocks.slice(faqStart+1,faqEnd)){
  if(block.type==='heading')categories.push({title:block.text,questions:[]});
  else if(block.type==='paragraph')categories.at(-1)?.questions.push(block.text);
 }
 return <><InnerHero title="About Us" label="About the Firm"/><article className="tnr-prose tnr-about">
  <section className="lf-shell tnr-about-story"><div><p className="lf-overview-eyebrow">A Practice Built Around People</p><h2>{blocks[0].text}</h2><Blocks blocks={blocks.slice(1,3)}/><Link className="lf-button" to="/contact/">Talk to Our Team</Link></div><figure className="tnr-about-founder"><img src="/assets/Toohey-Rambau.png" width="599" height="551" alt="Toohey Rambau, Founding Partner"/><figcaption><strong>Toohey Rambau</strong><span>Founding Partner</span><Link to="/attorneys/toohey-rambau/">Meet Our Founder <span aria-hidden="true">›</span></Link></figcaption></figure></section>
  <section className="lf-shell tnr-about-quote"><span aria-hidden="true">“</span><blockquote>{blocks[3].text}</blockquote></section>
  <section className="tnr-about-values"><div className="lf-shell"><p className="lf-overview-eyebrow">Our Approach</p><h2>{blocks[4].text}</h2><div className="tnr-about-value-grid">{['Access to Justice','Precision & Preparation','Clear Communication'].map((title,index)=><div key={title}><span className="tnr-about-number">0{index+1}</span><h3>{title}</h3><p className="tnr-about-principle">{blocks[index+5].text}</p><p>{blocks[index+8].text}</p></div>)}</div></div></section>
  <section className="lf-shell tnr-about-team"><div className="tnr-about-section-heading"><div><p className="lf-overview-eyebrow">The People Behind the Practice</p><h2>Our Team</h2></div><Link className="lf-button" to="/meettheteam/">Meet the Team</Link></div><TeamDirectory limit={3}/></section>
  <section className="lf-shell tnr-about-questions"><div className="tnr-about-section-heading"><div><p className="lf-overview-eyebrow">Clear Answers</p><h2>Frequently Asked Questions</h2></div></div><div className="tnr-about-faq-grid">{categories.map(category=><div className="tnr-about-faq-category" key={category.title}><h3>{category.title}</h3>{category.questions.map(text=>{const split=text.indexOf('?')+1;return <details key={text}><summary>{text.slice(0,split)}<span aria-hidden="true">+</span></summary><p>{text.slice(split).trim()}</p></details>;})}</div>)}</div><div className="tnr-about-help"><div><h3>{blocks[faqEnd].text}</h3><p>{blocks[faqEnd+1].text}</p></div><div><Link className="lf-button" to="/contact/">Book a Consultation</Link><a className="tnr-about-whatsapp" href="https://wa.me/27729828445">Start a WhatsApp Chat <span aria-hidden="true">›</span></a></div></div></section>
  <div className="lf-shell tnr-about-call"><h2>{blocks.at(-1).text}</h2><a className="lf-button" href="tel:+27125466948">Call Us</a></div>
 </article></>;
}

export function OriginalPage({page}){
 const path=page.path;
 const title=cleanTitle(page.title);
 if(path==='/about-us/')return <AboutPage page={page}/>;
 if(practiceImages[path.split('/')[1]])return <ServicePage page={page}/>;
if(page.kind==='archive')return <><InnerHero title={title} label={page.listing==='cases'?'Our Work':page.listing==='team'?'Our People':'Legal Insights'}/>{page.listing==='cases'?<div className="tnr-case-directory"><CaseStudies/></div>:<section className="lf-shell tnr-page-section">{page.listing==='team'?<TeamDirectory/>:<Articles paths={page.paths}/>}</section>}<PageEnd/></>;
 if(path==='/casestudies/')return <><InnerHero title="Case Studies" label="Our Work"/><div className="tnr-case-directory"><CaseStudies/></div><PageEnd/></>;
 if(path==='/ourclients/')return <><InnerHero title="Our Clients" label="Trusted Partnerships"/><div className="lf-shell tnr-client-intro tnr-prose"><Blocks blocks={page.blocks.filter(b=>b.text!=='OUR CLIENTS')}/></div><div className="tnr-client-directory"><Clients/></div><PageEnd/></>;
 if(path==='/meettheteam/')return <><InnerHero title="Meet Our Team" label="Our People"/><section className="lf-shell tnr-page-section"><TeamDirectory/></section><PageEnd/></>;
 if(path==='/our-areas-of-expertise/')return <><InnerHero title="Our Areas of Expertise" label="How We Help"/><PracticeOverview/><PageEnd/></>;
 if(path==='/newsletter-2/'||/\/(legalinsights|blog)\/$/.test(path))return <><InnerHero title={path==='/newsletter-2/'?'Newsletter':'Legal Insights'} label="Knowledge & Perspective"/><section className="lf-shell tnr-page-section"><Articles/></section><PageEnd/></>;
 if(path==='/contact/')return <><InnerHero title="Contact Us" label="Let’s Talk"/><section className="lf-shell tnr-page-section tnr-contact-cards"><div><h2>Get in Touch</h2><a href="tel:+27125466948">012 546 6948</a><a href="mailto:info@tnrattorneys.co.za">info@tnrattorneys.co.za</a><div className="tnr-social-links">{page.links.map(link=><a href={link.href} key={link.href}>{link.text}</a>)}</div></div>{[['Pretoria','225 Lange Street','Nieuw Muckleneuk, Pretoria'],['Nelspruit','D797 Tonga Main Road','Opposite Tonga Mall','Nkomazi, Mpumalanga'],['Sasolburg','18 Fichard Street','Sasolburg, 1947']].map(([name,...lines])=><div key={name}><h2>{name}</h2><p>{lines.map(line=><React.Fragment key={line}>{line}<br/></React.Fragment>)}</p></div>)}</section><ConsultationForm/></>;
 const isProfile=page.kind==='personnel';
 const person=isProfile?people.find(([name])=>path.includes(name.toLowerCase().replaceAll(' ','-'))):null;
 const practiceImage=practiceImages[path.split('/')[1]];
 const firstImage=page.blocks.find(block=>block.type==='image')?.src;
 const image=practiceImage?`/assets/practice/${practiceImage}.jpg`:page.kind==='portfolio'||page.kind==='post'?firstImage:null;
 const label=isProfile?'Our People':page.kind==='portfolio'?'Case Study':page.kind==='post'?'Legal Insights':path==='/about-us/'?'About the Firm':'Practice Area';
 return <><InnerHero title={person?person[0]:title} label={label} image={image} description={person?.[1]}/><section className="lf-shell tnr-page-section tnr-content-layout"><article className="tnr-prose">{isProfile&&firstImage&&<img className="tnr-profile-photo" src={firstImage} alt={person?.[0]||title} width="599" height="551"/>}{path==='/about-us/'&&<img className="tnr-profile-photo" src="/assets/Toohey-Rambau.png" alt="Toohey Rambau, Founding Partner" width="599" height="551"/>}<Blocks blocks={page.blocks}/></article><aside className="tnr-page-sidebar">{isProfile?<><h2>Our People</h2>{people.map(([name,role])=><Link className="tnr-side-link" key={name} to={`/attorneys/${name.toLowerCase().replaceAll(' ','-')}/`}><strong>{name}</strong><span>{role}</span></Link>)}</>:page.kind==='post'?<><h2>More Insights</h2>{articlePages.filter(article=>article.path!==path).map(article=><Link className="tnr-side-link" key={article.path} to={article.path}>{cleanTitle(article.title)}</Link>)}</>:<><h2>Practice Areas</h2>{services.map(service=><Link className="tnr-side-link" key={service.path} to={service.path}>{cleanTitle(service.title)}</Link>)}</>}<div className="tnr-sidebar-contact"><h2>Discuss Your Matter</h2><p>Speak to the team about the next step.</p><a href="tel:+27125466948">012 546 6948</a><Link className="lf-button" to="/contact/">Contact Us</Link></div></aside></section><PageEnd/></>;
}
