import React, { useEffect, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import './style.css';
import {OriginalPage,pageByPath} from './OriginalPages';
import { LawHome, LawHeader, LawFooter } from './Lawfirma';
import './lawfirma.css';
import './dark.css';
import './inner-pages.css';

function App(){
 const {pathname}=useLocation();
 const normalized=pathname.endsWith('/')?pathname:pathname+'/';
 const original=pageByPath[normalized];
 const home=pathname==='/';
 const title=home?'Legal Advice and Representation':original?original.title.replace(/\s*[–—]\s*TNR Attorneys$/i,''):'Page Not Found';
 useEffect(()=>{
  document.title=title+' | TNR Attorneys';
  const description=original?.blocks.find(block=>block.type==='paragraph')?.text;
  document.querySelector('meta[name="description"]').content=description?description.slice(0,160):'TNR Attorneys. Trusted legal partners for individuals, families and businesses in South Africa.';
  window.scrollTo(0,0);
  document.getElementById('main')?.focus({preventScroll:true});
 },[pathname,title,original]);
 return <><a className="skip-link" href="#main">Skip to Content</a><LawHeader/><main id="main" tabIndex="-1">{home?<LawHome/>:original?<OriginalPage page={original}/>:<section className="lf-shell tnr-page-section"><h1>Page Not Found.</h1><Link className="lf-button" to="/">Back to Home</Link></section>}</main><LawFooter/><a className="tnr-whatsapp-button" href="https://wa.me/27729828445" target="_blank" rel="noopener noreferrer" aria-label="Chat with TNR Attorneys on WhatsApp (opens in a new tab)"><img src="/assets/whatsapp.svg" width="30" height="30" alt="" aria-hidden="true"/></a></>;
}
function ScrollMotion(){
 const {pathname}=useLocation();
 useLayoutEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches)return;
const nodes=[...document.querySelectorAll('.lf-introduction-card,.lf-overview article,.lf-booking,.lf-testimonial-card,.lf-case-card,.lf-team-scroll-track figure,.shared-practice,.team-grid figure,.lf-overview h2,.lf-case-studies h2,.lf-team-scroll h2,.tnr-person-card,.tnr-article-card,.tnr-contact-cards>div')];
  const animations=new Set();
  const reveal=(element,immediate=false)=>{
   if(!element.classList.contains('tnr-motion-pending'))return;
   observer.unobserve(element);
   element.classList.remove('tnr-motion-pending');
   if(immediate)return;
   const siblings=[...element.parentElement.children].filter(child=>nodes.includes(child));
   const animation=element.animate([{opacity:0,translate:'0 28px'},{opacity:1,translate:'0 0'}],{duration:700,delay:Math.max(0,siblings.indexOf(element)%4)*75,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
   animations.add(animation);
   animation.onfinish=()=>{animations.delete(animation);animation.cancel();};
  };
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)reveal(entry.target);}),{threshold:0,rootMargin:'0px 0px -24px 0px'});
  nodes.forEach(element=>{if(element.getBoundingClientRect().top>=window.innerHeight){element.classList.add('tnr-motion-pending');observer.observe(element);}});
  const showAll=()=>{if(media.matches){nodes.forEach(element=>reveal(element,true));animations.forEach(animation=>animation.cancel());animations.clear();}};
  const showFocused=event=>nodes.forEach(element=>{if(element.contains(event.target)){reveal(element,true);element.getAnimations().forEach(animation=>animation.finish());}});
  media.addEventListener('change',showAll);
  document.addEventListener('focusin',showFocused);
  return ()=>{observer.disconnect();animations.forEach(animation=>animation.cancel());nodes.forEach(element=>element.classList.remove('tnr-motion-pending'));media.removeEventListener('change',showAll);document.removeEventListener('focusin',showFocused);};
 },[pathname]);
 return null;
}
createRoot(document.getElementById('root')).render(<BrowserRouter><App/><ScrollMotion/></BrowserRouter>);
