import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {people} from './team';
export {Clients, CaseStudies, ConsultationForm, PracticeOverview};

const services = [
 ['road-accident-fund','RAF claims','Road accident injuries and the impact on your life.'],
 ['medical-negligence','Medical negligence','Advice on patient harm and concerns about medical care.'],
 ['wills-and-estates','Wills & estates','Planning ahead and administering a loved one’s estate.'],
 ['unlawful-arrest-and-civil-rights','Civil rights','Representation where freedom and dignity are at issue.'],
 ['commercial-law','Commercial law','Practical advice for business decisions and agreements.'],
 ['commercial-disputes','Commercial disputes','Negotiation and representation in business disagreements.'],
 ['contract-drafting-and-legal-review','Contracts & legal review','Preparing, reviewing and understanding your agreements.'],
 ['labour-and-administrative-law','Labour & administrative law','Workplace matters and decisions by public authorities.']
];
const faqs=[
 ['How do I arrange a consultation?','Contact TNR Attorneys on 012 546 6948 or email info@tnrattorneys.co.za. Tell the team the general nature of your matter and ask about consultation arrangements.'],
 ['What types of matters does TNR handle?','The firm handles RAF claims, medical negligence, wills and estates, unlawful arrest and civil rights, commercial law and disputes, contracts, and labour and administrative law.'],
 ['Can you assist both individuals and businesses?','Yes. The practice serves individuals, families, businesses and community organisations. Labour and administrative matters may affect both individuals and organisations.'],
 ['What should I include in my first enquiry?','Your name, a phone number or email where you can be reached, and a brief description of the matter are a useful starting point. You do not need to send case files or sensitive documents with your first enquiry.'],
 ['How do I find out about fees?','Ask the firm about consultation fees and the arrangements that apply to your matter before proceeding. Fees and the scope of assistance should be discussed directly with the team.']
];
const Star=()=> <span className="lf-star" aria-hidden="true">✷</span>;
const Action=({to='/contact/',children='Discuss your matter',className=''})=><Link className={`lf-button ${className}`} to={to}><Star/>{children}</Link>;
const SectionLabel=({children})=><p className="lf-label"><span aria-hidden="true">✧</span>{children}</p>;

export function LawHeader(){
 const [open,setOpen]=useState(false);const button=useRef();const nav=useRef();const {pathname}=useLocation();
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(open)nav.current.querySelector('a').focus();},[open]);
 function keyboard(e){if(e.key==='Escape'){setOpen(false);button.current.focus();}if(e.key==='Tab'&&open){const links=[button.current,...nav.current.querySelectorAll('a')];if(e.shiftKey&&document.activeElement===links[0]){e.preventDefault();links.at(-1).focus();}if(!e.shiftKey&&document.activeElement===links.at(-1)){e.preventDefault();links[0].focus();}}}
return <header className={`lf-header ${pathname === "/" ? "lf-header--home" : ""}`} onKeyDown={keyboard}><Link className="lf-brand" to="/" aria-label="TNR Attorneys home"><img src="/assets/brand-logo.png" width="1774" height="887" alt="TNR Attorneys"/></Link><button className="lf-menu" ref={button} aria-expanded={open} aria-controls="lf-navigation" aria-label={open?'Close menu':'Menu'} onClick={()=>setOpen(!open)}><span aria-hidden="true">{open?'×':'☰'}</span></button><nav ref={nav} id="lf-navigation" aria-label="Main navigation" className={open?'is-open':''}><NavLink to="/" end>Home</NavLink><NavLink to="/our-areas-of-expertise/">Services</NavLink><NavLink to="/about-us/">About us</NavLink><NavLink to="/meettheteam/">Our people</NavLink><NavLink to="/casestudies/">Case Studies</NavLink><NavLink to="/2025/10/17/blog/">Insights</NavLink><NavLink to="/ourclients/">Clients</NavLink><Action>Book consultation</Action></nav></header>;
}

const heroSlides = [
 {title:'TNR Attorneys',eyebrow:'Welcome to',description:'Trusted Legal Partners for Individuals, Families, and Businesses',image:'/assets/tnr-welcome.png',alt:'Three members of the TNR Attorneys team',cta:'About Us',to:'/about-us/'},
 {title:'Access to Justice',eyebrow:'What we stand for',description:'For every client, regardless of status or background',image:'/assets/tnr-team-hero.png',alt:'The TNR Attorneys team together at their office',cta:'Areas of Expertise',to:'/our-areas-of-expertise/'},
 {title:'Case Studies',eyebrow:'Explore more on our',description:'Click below to see how we deliver real impact for our clients.',image:'/assets/tnr-case-studies.png',alt:'TNR Attorneys reviewing case documents',cta:'Our Cases',to:'/casestudies/'}
];
function HeroCarousel(){
 const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[interacting,setInteracting]=useState(false),[reduced,setReduced]=useState(false);
 const touch=useRef(null),elapsed=useRef(0),progressBars=useRef([]);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{if(paused||interacting||reduced)return;let last=performance.now(),frame;const tick=now=>{const delta=now-last;last=now;if(!document.hidden){elapsed.current+=Math.min(delta,100);if(elapsed.current>=5000){elapsed.current=0;setActive(index=>(index+1)%heroSlides.length);return;}if(progressBars.current[active])progressBars.current[active].style.transform=`scaleX(${elapsed.current/5000})`;}frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);},[active,paused,interacting,reduced]);
 const change=index=>{elapsed.current=0;if(progressBars.current[active])progressBars.current[active].style.transform='scaleX(0)';setActive((index+heroSlides.length)%heroSlides.length);setPaused(false);};
 const slide=heroSlides[active];
 return <section className="lf-hero lf-carousel" aria-label="TNR Attorneys introduction" aria-roledescription="carousel" onFocusCapture={()=>setInteracting(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setInteracting(false);}} onTouchStart={e=>touch.current=e.touches[0].clientX} onTouchEnd={e=>{if(touch.current!==null){const distance=e.changedTouches[0].clientX-touch.current;if(Math.abs(distance)>50)change(active+(distance<0?1:-1));touch.current=null;}}}>
  <div className="lf-hero-frame">
   <div className="lf-hero-photo">{heroSlides.map((item,index)=><img key={item.image} src={item.image} alt={index===active?item.alt:''} aria-hidden={index!==active} className={index===active?'is-active':''} fetchPriority={index===0?'high':'auto'}/>)}</div>
   <div className="lf-hero-copy" aria-live={paused||reduced?'polite':'off'} aria-atomic="true">
    {slide.eyebrow&&<p key={`eyebrow-${active}`} className="lf-hero-eyebrow">{slide.eyebrow}</p>}
    <h1 key={`title-${active}`}>{slide.title}</h1><p key={`description-${active}`} className="lf-hero-description">{slide.description}</p>
    <div className="lf-hero-actions">{slide.to.startsWith('https:')?<a className="lf-button" href={slide.to}>{slide.cta}</a>:<Action to={slide.to}>{slide.cta}</Action>}</div>
   </div>
   <div className="lf-carousel-controls" aria-label="Slideshow progress">{heroSlides.map((item,index)=><button key={item.title} aria-label={`Show slide ${index+1}: ${item.title}`} aria-pressed={active===index} onClick={()=>change(index)}><span className="lf-progress-track"><span ref={element=>{progressBars.current[index]=element;if(element)element.style.transform=`scaleX(${index<active?1:index===active?(reduced?1:elapsed.current/5000):0})`;}} className="lf-progress-fill"/></span></button>)}</div>
   <button className="lf-carousel-pause" aria-label={paused||reduced?'Play slideshow':'Pause slideshow'} onClick={()=>{setPaused(!(paused||reduced));setReduced(false);}}>{paused||reduced?'Play slideshow':'Pause slideshow'}</button>
  </div>
 </section>;
}
function FocusDirectory(){return <section className="lf-focus lf-shell" aria-label="Areas of focus"><div className="lf-focus-links">{services.map(([slug,name])=><Link key={slug} to={`/${slug}/`}>{name}<span aria-hidden="true">↗</span></Link>)}</div><div className="lf-focus-centre"><span aria-hidden="true" className="lf-focus-symbol">§</span><h2>Areas of <em>focus</em></h2><Action>Discuss your case</Action></div></section>}

const overviewAreas = [
 ['contract-drafting-and-legal-review','Contracts & Review',['Clear agreements that','protect your interests','and help manage risk.']],
 ['commercial-law','Commercial Law',['Practical legal guidance','for business decisions','and confident growth.']],
 ['wills-and-estates','Wills & Estates',['Plan for tomorrow and','protect your loved ones','with considered advice.']],
 ['labour-and-administrative-law','Labour & Admin Law',['Advice on workplace','disputes and decisions','by public authorities.']],
 ['road-accident-fund','RAF Claims',['Support after a road','accident, from injuries','to the impact on your life.']],
 ['medical-negligence','Medical Negligence',['Understand your options','when medical treatment','causes avoidable harm.']],
 ['unlawful-arrest-and-civil-rights','Arrest & Civil Rights',['Protecting your freedom,','dignity and rights when','fair treatment is at stake.']],
 ['commercial-disputes','Business Disputes',['Strategic support for','business conflicts and','commercial relationships.']]
];
function PracticeOverview(){return <section className="lf-overview" aria-labelledby="practice-overview"><div className="lf-shell"><header><p className="lf-overview-eyebrow">What we are expert at</p><h2 id="practice-overview">Practice Areas Overview</h2></header><div className="lf-overview-grid">{overviewAreas.map(([slug,title,description],index)=><article key={slug}><img src={`/assets/practice/${['contracts','commercial','estates','labour','raf','medical','rights','disputes'][index]}.jpg`} alt="" loading="lazy"/><div className="lf-overview-card-copy"><h3>{title}</h3><p>{description.map((text,i)=><React.Fragment key={text}>{i>0&&<br/>}{text}</React.Fragment>)}</p><Link to={`/${slug}/`} aria-label={`Learn More about ${title}`}>Learn More<span className="lf-overview-chevron" aria-hidden="true"/></Link></div></article>)}</div></div></section>}
function Consultation(){return <section className="lf-consult-wrap" id="consultation"><div className="lf-shell lf-consult"><div className="lf-consult-photo"><img src="/assets/lawfirma/contact.jpg" width="1200" height="1200" alt="Legal consultation and documents" loading="lazy"/><div className="lf-contact-details"><div><span>Call us</span><a href="tel:+27125466948">012 546 6948</a></div><div><span>Email us</span><a href="mailto:info@tnrattorneys.co.za">info@tnrattorneys.co.za</a></div></div></div><div className="lf-enquiry"><SectionLabel>Let’s talk about your matter</SectionLabel><h2>Arrange a <em>consultation</em></h2><p>Personal matters and business decisions deserve considered advice. Tell us what you’re facing and speak to the firm about the next steps.</p><div className="lf-enquiry-options"><a href="tel:+27125466948"><span>Speak to the team<small>012 546 6948</small></span><span aria-hidden="true">↗</span></a><a href="mailto:info@tnrattorneys.co.za?subject=Legal%20enquiry"><span>Send an email<small>info@tnrattorneys.co.za</small></span><span aria-hidden="true">↗</span></a></div><p className="lf-enquiry-note">Please include your name, preferred reply channel and a short description of your matter. Online submission is not yet available.</p><Link className="lf-inline-link" to="/contact/">Office locations and contact details <span aria-hidden="true">↗</span></Link></div></div></section>}

function TeamSection(){
 const track=useRef();const [position,setPosition]=useState({start:true,end:false});
 const update=()=>{const el=track.current;setPosition({start:el.scrollLeft<2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2});};
 useEffect(()=>{const observer=new ResizeObserver(update);observer.observe(track.current);update();return()=>observer.disconnect();},[]);
 const move=direction=>{const el=track.current;const card=el.querySelector('figure');el.scrollBy({left:direction*(card.getBoundingClientRect().width+24),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
return <section className="lf-team-scroll" aria-labelledby="team-heading"><div className="lf-shell"><div className="lf-team-scroll-heading"><div><p className="lf-overview-eyebrow">Our People</p><h2 id="team-heading">Meet Our Team</h2><p className="lf-team-scroll-description">The attorneys, consultants and support team behind your matter.</p></div><div className="lf-team-scroll-actions"><div className="lf-team-scroll-buttons"><button aria-label="Previous team member" aria-controls="team-scroll-track" disabled={position.start} onClick={()=>move(-1)}><span aria-hidden="true"/></button><button aria-label="Next team member" aria-controls="team-scroll-track" disabled={position.end} onClick={()=>move(1)}><span aria-hidden="true"/></button></div></div></div><div className="lf-team-scroll-track" id="team-scroll-track" ref={track} onScroll={update} tabIndex="0" role="region" aria-label="All seven team members. Scroll horizontally to view more." onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}>{people.map(([name,role],index)=><figure key={name}><Link to={`/attorneys/${name.toLowerCase().replaceAll(' ','-')}/`} className="lf-team-scroll-portrait"><img src={`/assets/${name.replaceAll(' ','-')}.png`} width="599" height="551" alt={name} loading="lazy"/><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span></Link><figcaption><h3><Link to={`/attorneys/${name.toLowerCase().replaceAll(' ','-')}/`}>{name}</Link></h3><p>{role}</p></figcaption></figure>)}</div></div></section>;
}
function WhoWeAre(){return <section className="lf-who" aria-labelledby="who-heading"><div className="lf-shell"><p className="lf-overview-eyebrow">This Is</p><h2 id="who-heading">Who We Are</h2><div className="lf-who-copy"><p>We are a team of litigation and advisory attorneys with over 15 years of combined experience in Road Accident Fund (RAF) claims, civil rights cases, and commercial law solutions. We are based in South Africa and proudly serve clients across the country.</p><p>Our clients range from individuals needing justice to companies seeking reliable legal partners. Every matter we take on is treated with the same level of strategy, care and urgency. You are never just a case file here.</p></div><div className="lf-who-stats">{[['15+','Years of Combined Experience'],['100%','Black Owned'],['99%','Successful Cases'],['15 mins','Free RAF Consultation']].map(([value,label])=><div key={label}><span>{value}</span><p>{label}</p></div>)}</div></div></section>}
function PracticeSelect({value,onChange,error}){
 const options=[...overviewAreas.map(([,title])=>title),'Other / Not Sure'];
 const [open,setOpen]=useState(false),[highlight,setHighlight]=useState(0);const root=useRef(),trigger=useRef(),search=useRef({text:'',time:0});
 useEffect(()=>{const close=e=>{if(!root.current.contains(e.target))setOpen(false);};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close);},[]);
 useEffect(()=>{if(open)root.current.querySelector(`#practice-option-${highlight}`)?.scrollIntoView({block:'nearest'});},[open,highlight]);
 useEffect(()=>{if(error)trigger.current.focus();},[error]);
 const choose=index=>{onChange(options[index]);setHighlight(index);setOpen(false);trigger.current.focus();};
 function keyboard(e){if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();setOpen(true);setHighlight(index=>e.key==='Home'?0:e.key==='End'?options.length-1:Math.max(0,Math.min(options.length-1,index+(e.key==='ArrowDown'?1:-1))));}else if(e.key==='Escape'){e.preventDefault();setOpen(false);}else if((e.key==='Enter'||e.key===' ')&&open){e.preventDefault();choose(highlight);}else if(e.key==='Tab'){setOpen(false);}else if(e.key.length===1&&!e.ctrlKey&&!e.metaKey){const now=Date.now();search.current={text:(now-search.current.time<700?search.current.text:'')+e.key.toLowerCase(),time:now};const index=options.findIndex(item=>item.toLowerCase().startsWith(search.current.text));if(index>=0){setHighlight(index);setOpen(true);}}}
 return <div className="lf-practice-select" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}><span id="practice-label">Practice Area</span><input type="hidden" name="practice" value={value}/><button ref={trigger} id="practice-trigger" type="button" role="combobox" aria-labelledby="practice-label" aria-haspopup="listbox" aria-expanded={open} aria-controls="practice-options" aria-activedescendant={open?`practice-option-${highlight}`:undefined} aria-required="true" aria-invalid={!!error} aria-describedby={error?'practice-error':undefined} onKeyDown={keyboard} onClick={()=>{setHighlight(Math.max(0,options.indexOf(value)));setOpen(!open);}}><span>{value||'Select a Practice Area'}</span><span className="lf-select-chevron" aria-hidden="true"/></button>{open&&<ul id="practice-options" role="listbox" aria-labelledby="practice-label">{options.map((option,index)=><li id={`practice-option-${index}`} key={option} role="option" aria-selected={value===option} className={index===highlight?'is-highlighted':''} onPointerMove={()=>setHighlight(index)} onMouseDown={e=>e.preventDefault()} onClick={()=>choose(index)}>{option}{value===option&&<span aria-hidden="true">✓</span>}</li>)}</ul>}{error&&<p id="practice-error" className="lf-practice-error">Select a practice area to continue.</p>}</div>;
}
function ConsultationForm(){
 const [draft,setDraft]=useState(''),[practice,setPractice]=useState(''),[practiceError,setPracticeError]=useState(false);
 function prepare(e){e.preventDefault();if(!practice){setPracticeError(true);return;}const fields=new FormData(e.currentTarget);const body=`Name: ${fields.get('name')}\nPhone: ${fields.get('phone')}\nEmail: ${fields.get('email')}\nPractice area: ${fields.get('practice')}\n\n${fields.get('message')}`;setDraft(`mailto:info@tnrattorneys.co.za?subject=${encodeURIComponent('Consultation enquiry — '+fields.get('practice'))}&body=${encodeURIComponent(body)}`);}
 return <section className="lf-booking-wrap" id="consultation" aria-labelledby="booking-heading"><div className="lf-booking lf-shell"><div className="lf-booking-intro"><p className="lf-booking-eyebrow">Let’s Talk</p><h2 id="booking-heading">Book Your Consultation</h2><p>Your case matters. Book your consultation today and take the first step to justice.</p><div className="lf-booking-contact"><a href="tel:+27125466948">012 546 6948</a><a href="mailto:info@tnrattorneys.co.za">info@tnrattorneys.co.za</a></div></div><form onSubmit={prepare} onChange={()=>setDraft('')}><div className="lf-booking-fields"><label>Name<input name="name" autoComplete="name" required maxLength="100"/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required maxLength="40"/></label><PracticeSelect value={practice} error={practiceError} onChange={value=>{setPractice(value);setPracticeError(false);setDraft('');}}/><label>Email<input name="email" type="email" autoComplete="email" required maxLength="200"/></label><label className="lf-booking-message">Message<textarea name="message" required rows="4" maxLength="2000" placeholder="A brief description of your matter"/></label></div><p className="lf-booking-note">Please don’t include confidential documents or sensitive case details. This form prepares an email draft for you to review and send; it does not submit online.</p><button className="lf-booking-submit" type="submit">Prepare Enquiry<span className="lf-overview-chevron" aria-hidden="true"/></button>{draft&&<div className="lf-booking-status" role="status"><p>Your draft is ready. Open your email app to review and send it.</p><a href={draft}>Open Email Draft</a></div>}</form></div></section>;
}
const testimonialStories = [
 {name:'Ms Masombuka', detail:'Pretoria · LM 4', quote:'They provide exceptional service and take care of everything.', paragraphs:['About my claim, I am very excited and proud. I highly recommend anyone who has been involved in an accident to go straight to TNR Attorneys. They provide exceptional service and take care of everything.','Thank you, TNR Attorneys.']},
 {name:'Client Testimonial', detail:'Road Accident Fund Claim', quote:'You kept fighting. And today, we are celebrating.', paragraphs:['Mam Toohey, it has truly been a long journey. Do you still remember when we first met at Matsila? I was even shy to speak to you until you mentioned that you owned a law firm. That’s when I opened up about the problem my mum was facing. Another law firm had told her that her case had expired, but you didn’t give up.','You pushed through every challenge—missing documents, setbacks, and all those ups and downs. Even when people around us doubted and said we wouldn’t win, you kept fighting. And today, we are celebrating because God used TNR Attorneys to perform a miracle through you.','You fought for us, and finally the RAF blessed us after all this time. Thank you, Mam Toohey. Cheers to TNR Attorneys for changing our home situation—from grass to grace.']}
];
function Testimonials(){
 return <section className="lf-testimonials" aria-label="Client Testimonials"><div className="lf-shell lf-testimonial-layout">
  {testimonialStories.map((story,index)=><figure key={story.name} className="lf-testimonial-card"><div className="lf-testimonial-card-top"><span>Client Stories</span><span>0{index+1}</span></div><div className="lf-testimonial-story"><span className="lf-testimonial-mark" aria-hidden="true">“</span><blockquote className="lf-testimonial-complete">{story.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</blockquote><figcaption><span className="lf-testimonial-monogram" aria-hidden="true">{index===0?'MM':'TNR'}</span><div><strong>{story.name}</strong><span>{story.detail}</span></div></figcaption></div></figure>)}
 </div></section>
}
const caseStudies = [
 ['Commercial Law','Protecting Community Interests in a Landmark Land Deal','casestudy6'],
 ['Wills & Estates','Ensuring Justice After a Tragic Loss','casestudy5'],
 ['Medical Negligence','Restoring Dignity After a Botched Procedure','casestudy4'],
 ['Workmen’s Compensation','Justice After Two Decades','casestudy3'],
 ['Labour Law','Restoring Justice in an Unfair Dismissal Case','casestudy2'],
 ['RAF Claim','From Hopelessness to Justice Restored','case-study-1']
];
function CaseStudies(){return <section className="lf-case-studies" aria-labelledby="case-studies-heading"><div className="lf-shell"><p className="lf-overview-eyebrow">Our Work in Practice</p><h2 id="case-studies-heading">Case Studies</h2><div className="lf-case-grid">{caseStudies.map(([category,title,slug],index)=><Link className="lf-case-card" key={slug} to={`/portfolio/${slug}/`}><div className="lf-case-image"><img src={`/assets/case-study-${index+1}.png`} alt="" loading="lazy" width="700" height="600"/><span aria-hidden="true">0{index+1}</span></div><div className="lf-case-copy"><p>{category}</p><h3>{title}</h3><span className="lf-case-link">View Case Study <span aria-hidden="true">›</span></span></div></Link>)}</div><p className="lf-case-note">Past outcomes relate to the circumstances of each case and do not guarantee similar results.</p></div></section>}
const clientNames=['Makhado Local Municipality','Ditsong Museums of South Africa','Department of Sports, Arts and Culture','Department of Agriculture, Land Reform and Rural Development','Mulamwane','Municipal Client','Public Protector South Africa','SITA','Pan South African Language Board','JB Marks Local Municipality','Industrial Development Corporation'];
function Clients(){return <section className="lf-clients" aria-label="Our Clients"><div className="lf-shell"><p className="lf-overview-eyebrow">Our Clients</p><div className="lf-clients-marquee"><div className="lf-clients-track">{[0,1].map(copy=><div className="lf-clients-group" key={copy} aria-hidden={copy===1?true:undefined}>{clientNames.map((name,index)=><div className="lf-client-logo" key={index}><img src={`/assets/client-${index+1}.png`} alt={copy===0?name:''} width="300" height="300"/></div>)}</div>)}</div></div></div></section>}
export function LawHome(){return <div className="lawfirma-home">
 <HeroCarousel/>
 <Clients/>
 <section className="lf-introduction" aria-labelledby="firm-introduction">
  <div className="lf-introduction-card">
   <div className="lf-introduction-copy">
    <h2 id="firm-introduction">About TNR Attorneys</h2>
    <div className="lf-introduction-rule" aria-hidden="true"/>
    <p>At TNR Attorneys, we don’t just represent. We <em>fight, <strong>advise, protect,</strong> and <strong>empower.</strong></em> Whether you have suffered a life-changing injury, faced an unlawful arrest, or need strategic legal support for your business, we are here to help you move forward with clarity and confidence.</p>
    <img className="lf-introduction-signature" src="/assets/tnr-signature.png" alt="TNR Attorneys signature" loading="lazy"/>
    <blockquote>At <strong>TNR Attorneys</strong>, we measure success by the real impact we make in our clients’ lives.<cite>— Toohey Rambau, Founding Partner</cite></blockquote>
   </div>
   <div className="lf-introduction-portrait"><img src="/assets/Toohey-Rambau.png" width="599" height="551" alt="Toohey Rambau, founding partner of TNR Attorneys" loading="lazy"/></div>
  </div>
 </section>
 <PracticeOverview/>
 <WhoWeAre/>
 <TeamSection/>
 <Testimonials/>
 <ConsultationForm/>
 <CaseStudies/>
 </div>}

export function LawFooter(){return <footer className="lf-footer lf-footer-clean"><div className="lf-shell"><div className="lf-footer-clean-grid"><div className="lf-footer-brand"><img src="/assets/brand-logo.png" width="1774" height="887" alt="TNR Attorneys"/></div><nav aria-label="Footer navigation"><h3>Explore</h3><div className="lf-footer-links"><Link to="/">Home</Link><Link to="/about-us/">About Us</Link><Link to="/meettheteam/">Our Team</Link><Link to="/our-areas-of-expertise/">Practice Areas</Link><Link to="/casestudies/">Case Studies</Link><Link to="/2025/10/17/blog/">Legal Insights</Link><Link to="/ourclients/">Our Clients</Link><Link to="/contact/">Contact Us</Link></div></nav><div className="lf-footer-contact"><h3>Get in Touch</h3><a href="tel:+27125466948">012 546 6948</a><a href="mailto:info@tnrattorneys.co.za">info@tnrattorneys.co.za</a></div><div><h3>Our Offices</h3><p><span>Pretoria</span>225 Lange Street<br/>Nieuw Muckleneuk</p><p><span>Nelspruit</span>D797 Tonga Main Road<br/>Opposite Tonga Mall<br/>Nkomazi, Mpumalanga</p><p><span>Sasolburg</span>18 Fichard Street, 1947</p></div></div><div className="lf-footer-bottom"><span>© {new Date().getFullYear()} TNR Attorneys. All Rights Reserved.</span><span>South Africa</span></div></div></footer>}
