import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Camera, MapPin, Menu, Phone, Send, Utensils, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';

const hotelPhotos = [
  ['/client/room-main.webp','A guest room at Saakhuvan Eco Retreat'],
  ['/client/retreat-day.webp','Saakhuvan cottages set among open fields'],
  ['/client/bathroom.webp','The ensuite bathroom'],
  ['/client/room-sunrise.webp','Golden hour from the guest room'],
  ['/client/room-evening.webp','A second view of the guest room']
];
const diningPhotos = [
  ['/client/retreat-dusk.webp','Cottages beneath the evening sky'],
  ['/client/grounds-dawn.webp','Early morning across the retreat grounds'],
  ['/client/grounds-morning.webp','The grounds at first light']
];
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Saakhuvan+Eco+Retreat,+Bankati+Road,+Mahof+Gate+1,+Pilibhit+Tiger+Reserve';
const instagramUrl = 'https://www.instagram.com/saakhuvan_retreatpilibhit/';

function Photo({item,className=''}) { return <figure className={'photo '+className}><img src={item[0]} alt={item[1]} loading="lazy"/><figcaption>{item[1]}</figcaption></figure> }
function App(){
  const [menu,setMenu]=useState(false),[status,setStatus]=useState('idle'),[message,setMessage]=useState('');
  async function submit(e){e.preventDefault();const formElement=e.currentTarget;setStatus('sending');setMessage('');const form=new FormData(formElement);const payload=Object.fromEntries(form.entries());try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const d=await r.json();if(!r.ok)throw new Error(d.error||'Message could not be sent. Please try again.');setStatus('sent');setMessage('Thank you. Your message has been sent.');formElement.reset()}catch(err){setStatus('error');setMessage(err.message||'Unable to send right now. Please message Saakhuvan on Instagram.')}}
  return <div className="portfolio" id="top">
    <header className="port-nav"><a className="port-brand" href="#top"><img className="brand-mark" src="/client/saakhuvan-emblem.webp" alt=""/><span><b>SAAKHUVAN</b><small>ECO RETREAT</small></span></a><button className="nav-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button><nav className={menu?'port-links open':'port-links'}>{[['The stay','#hotel'],['The restaurant','#restaurant'],['Location','#location'],['Our story','#story'],['Contact','#contact']].map(([x,y])=><a key={x} href={y} onClick={()=>setMenu(false)}>{x}</a>)}<a className="nav-visit" href="#contact">Plan your visit <ArrowUpRight size={14}/></a></nav></header>
    <main>
      <section className="port-hero"><img src="/client/room-main.webp" alt="Guest room at Saakhuvan Eco Retreat with a view of the surrounding fields"/><div className="hero-shade"/><div className="hero-content"><p>PILIBHIT TIGER RESERVE · UTTAR PRADESH</p><h1>Find your way<br/><em>back to nature.</em></h1><span>A forest-side homestay near Mahof Gate, surrounded by the landscapes of the Terai.</span><a href="#hotel">Explore Saakhuvan <ArrowDown size={15}/></a></div><div className="hero-coordinate">SAAKHUVAN<br/>ECO RETREAT · PILIBHIT</div></section>
      <section className="intro-row" id="story"><p className="eyebrow">A STAY CLOSE TO THE FOREST</p><h2>Open skies,<br/>warm welcomes, <i>slow days.</i></h2><p className="intro-copy">Saakhuvan Eco Retreat sits on Bankati Road near Mahof Gate 1, close to Pilibhit Tiger Reserve. Explore the rooms and grounds, find the on-site restaurant, and contact the team through Instagram or the enquiry form.</p></section>
      <section className="hotel-section" id="hotel"><div className="section-title"><div><span className="eyebrow">01 — THE RETREAT</span><h2>Rest, <i>reimagined.</i></h2></div><p>A standard double room, a jungle view, and a calm base for exploring Pilibhit Tiger Reserve.</p></div><div className="hotel-gallery">{hotelPhotos.map((photo,i)=><Photo key={photo[0]} item={photo} className={i===0?'hotel-main':''}/>)}</div><div className="hotel-details"><article><span>01 / THE ROOM</span><h3>Standard double room</h3><p>One double bed with a jungle view, as listed for the property.</p></article><article><span>02 / IN-ROOM COMFORTS</span><h3>Settle in with the essentials</h3><p>Air conditioning, Wi-Fi, TV, refrigerator, heater, and geyser water heater.</p></article><article><span>03 / ON-SITE</span><h3>Practical comforts</h3><p>Free parking, power backup, housekeeping, laundry service, and 24-hour room service.</p></article></div><p className="listing-note">Room and facility details are summarized from the public property listing. Confirm availability and current inclusions directly with Saakhuvan.</p><a className="inline-link" href="#contact">Ask about your stay <ArrowRight size={15}/></a></section>
      <section className="restaurant-section" id="restaurant"><div className="section-title"><div><span className="eyebrow">02 — THE RESTAURANT</span><h2>Good food,<br/><i>close to nature.</i></h2></div><p>An on-site restaurant makes it easy to settle in after a day around the reserve.</p></div><div className="dining-gallery">{diningPhotos.map((p,i)=><Photo key={p[0]} item={p} className={`dining-${i+1}`}/>)}</div><div className="restaurant-bottom"><div><Utensils size={18}/><span>ON-SITE DINING</span></div><div className="restaurant-copy"><h3>Stay for the forest.<br/>Gather for a meal.</h3><p>The public listing describes an on-site restaurant and an all-meals room plan. Ask the team which meal options and timings are available for your dates.</p><a className="inline-link" href={instagramUrl} target="_blank" rel="noreferrer">Ask Saakhuvan on Instagram <ArrowRight size={15}/></a></div></div><div className="hours-band"><span>MEAL PLAN</span><b>All meals included*</b><span>*As shown on the public listing</span><a href={instagramUrl} target="_blank" rel="noreferrer">Confirm current details <ArrowUpRight size={14}/></a></div></section>
      <section className="location-section" id="location"><div className="section-title"><div><span className="eyebrow">03 — FIND SAAKHUVAN</span><h2>At the edge of<br/><i>the Terai.</i></h2></div><p>Near Mahof Gate 1, a convenient base for exploring Pilibhit Tiger Reserve.</p></div><div className="location-grid"><div className="location-map"><iframe title="Map to Saakhuvan Eco Retreat" src="https://www.google.com/maps?q=Saakhuvan+Eco+Retreat,+Bankati+Road,+Mahof+Gate+1,+Pilibhit+Tiger+Reserve&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><div className="location-details"><MapPin size={20}/><span className="eyebrow">THE ADDRESS</span><h3>Saakhuvan Eco Retreat</h3><p>Bankati Road, Mahof Gate 1<br/>Pilibhit Tiger Reserve, Uttar Pradesh, India</p><p className="distance-note">Approximately 2 km from Mahof Safari Gate, according to the property listing.</p><a className="inline-link" href={mapsUrl} target="_blank" rel="noreferrer">Open directions in Google Maps <ArrowUpRight size={14}/></a><a className="inline-link" href={instagramUrl} target="_blank" rel="noreferrer">Message the retreat on Instagram <ArrowUpRight size={14}/></a></div></div></section>
      <section className="story-band"><div className="story-image"><img src="/client/room-wide.webp" alt="A wide view into one of Saakhuvan Eco Retreat’s guest rooms" loading="lazy"/></div><div className="story-text"><span className="eyebrow">04 — OUR APPROACH</span><h2>Good hospitality<br/>is in the <i>details.</i></h2><p>We believe the best stays feel personal. A warm welcome, a slower morning, and the kind of care you notice without needing to ask for it.</p><p>Saakhuvan brings together a nature-led stay and a welcoming restaurant. It is a place designed to help guests feel at home while discovering somewhere new.</p><a href="#contact" className="inline-link">A note to our team <ArrowRight size={15}/></a></div></section>
      <section className="contact-section" id="contact">
        <div className="contact-left">
          <span className="eyebrow">05 — CONTACT &amp; DIRECTIONS</span>
          <h2>Come closer<br/>to <i>the forest.</i></h2>
          <p>For room availability, meal options, or local directions, contact the retreat team directly.</p>
          <div className="contact-list">
            <a href={instagramUrl} target="_blank" rel="noreferrer"><Camera size={16}/><span><small>INSTAGRAM</small>@saakhuvan_retreatpilibhit</span></a>
            <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17}/><span><small>LOCATION</small>Bankati Road, Mahof Gate 1, Pilibhit Tiger Reserve</span></a>
          </div>
          <p className="replace-note">A phone number and email address were not included in the client details. Use Instagram or the enquiry form to get in touch.</p>
        </div>
        <div className="contact-form-wrap">
          <h3>Send an enquiry</h3>
          <p>Ask about your stay, restaurant, meal plan, or directions.</p>
          <form onSubmit={submit}>
            <div className="form-row"><label>Your name<input required name="name" autoComplete="name" placeholder="Name"/></label><label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com"/></label></div>
            <div className="form-row"><label>Phone <small>optional</small><input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number"/></label><label>I'm enquiring about<select name="subject" defaultValue="A stay at the retreat"><option>A stay at the retreat</option><option>Dining and meal plans</option><option>Directions</option><option>Something else</option></select></label></div>
            <label>Your message<textarea required name="message" rows="5" placeholder="How can we help?"/></label>
            <label className="honeypot" aria-hidden="true">Leave this blank<input tabIndex="-1" name="website" autoComplete="off"/></label>
            <button className="send-button" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send enquiry'} <ArrowUpRight size={16}/></button>
            <AnimatePresence>{message&&<motion.p className={`form-message ${status}`} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}}>{message}</motion.p>}</AnimatePresence>
          </form>
          <small className="privacy">If email delivery is unavailable, message Saakhuvan directly on Instagram.</small>
        </div>
      </section>
    </main><footer className="port-footer"><a className="port-brand" href="#top"><img className="brand-mark" src="/client/saakhuvan-emblem.webp" alt=""/><span><b>SAAKHUVAN</b><small>ECO RETREAT</small></span></a><span>Nature-led stays · location details to be confirmed</span><span>© 2026 Saakhuvan Eco Retreat</span><a href="#top" className="back-top">BACK TO TOP ↑</a></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
