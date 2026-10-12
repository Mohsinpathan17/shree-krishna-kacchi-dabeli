import React, {useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {AnimatePresence, motion} from 'framer-motion';
import {ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Menu as MenuIcon, MessageCircle, Minus, Phone, Plus, ShoppingBag, Star, Truck, X} from 'lucide-react';
import './styles.css';
import butterDabeliImage from './butter-dabeli.webp';
import signatureDabeliImage from './signature-dabeli-real.jpg';
import siteReferenceImage from './site-reference.jpg';


const MAPS_URL = 'https://maps.app.goo.gl/FB1o8G1ofJJSXWEs9?g_st=ic';
const INSTAGRAM_URL = 'https://www.instagram.com/shree_krishna_kacchi_dabeli/';
const PHONE = '+919975348154';
const WHATSAPP = '919975348154';

const menu = [
  {id:'butter', name:'Amul Butter Dabeli', price:18, tag:'Rich & buttery', note:'Amul butter, signature masala, masala peanuts, sev & pomegranate', image:butterDabeliImage, source:'QuikShef food image — demo reference'},
  {id:'cheese', name:'Cheese Dabeli', price:30, tag:'Loaded cheese', note:'Classic dabeli filling with a generous cheese finish and crunchy garnish', image:signatureDabeliImage, source:'Owner-provided Instagram photo'},
  {id:'special', name:'Special Dabeli', price:40, tag:'House favourite', note:'Extra masala, farsan, peanuts, sev, chutneys and fresh garnish', image:'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600,h_600,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/9/1/16b10227-77a4-4c3b-a5ab-6c66c81e698d_2f5b29f4-5e96-4adc-a09f-ce87e422aad5.jpg', source:'Swiggy food image — demo reference'},
  {id:'dryfruit', name:'Dryfruit Dabeli', price:35, tag:'Premium crunch', note:'Dabeli filling finished with almonds, cashews, raisins and pomegranate', image:'https://b.zmtcdn.com/data/dish_photos/50b/26e8d3b672ac7bd502c55b930601350b.png', source:'Zomato food image — demo reference'}
];

const fallbackImage=signatureDabeliImage;

function App(){
  const [mobileOpen,setMobileOpen]=useState(false);
  const [exploded,setExploded]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [cart,setCart]=useState([]);
  const [toast,setToast]=useState('');
  const [customer,setCustomer]=useState({name:'',phone:'',notes:''});
  const cartCount=cart.reduce((a,b)=>a+b.qty,0);
  const total=cart.reduce((a,b)=>a+b.price*b.qty,0);

  const showToast=(message)=>{setToast(message);window.clearTimeout(window.__toast);window.__toast=window.setTimeout(()=>setToast(''),2200)};
  const add=(item)=>{setCart(c=>{const found=c.find(x=>x.id===item.id);return found?c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...c,{...item,qty:1}]});showToast(`${item.name} added`)};
  const changeQty=(id,delta)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(0,x.qty+delta)}:x).filter(x=>x.qty>0));

  const checkout=()=>{
    if(!cart.length){showToast('Add a dabeli first');return}
    if(!customer.name.trim()||!customer.phone.trim()){showToast('Please enter your name and phone');return}
    const items=cart.map(x=>`${x.name} x${x.qty} — ₹${x.price*x.qty}`).join('\n');
    const message=`Hello Shree Krishna Kacchi Dabeli Centre!\nName: ${customer.name.trim()}\nPhone: ${customer.phone.trim()}\nOrder:\n${items}\nTotal: ₹${total}${customer.notes?`\nNote: ${customer.notes}`:''}`;
    const link=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    // The shop receives the order only after the customer sends it in WhatsApp.
    window.location.href=link;
  };

  return <div className="site">
    <div className="noise"/>
    <header className="nav">
      <a className="brand" href="#top"><div className="brand-food"><img src={signatureDabeliImage} alt="Dabeli"/></div><span><b>श्रीकृष्ण</b><small>कच्छी दाबेली सेंटर</small></span></a>
      <nav className="navlinks">{['Home','Menu','Our Story','Gallery','Reviews','Contact'].map((x,i)=><a key={x} href={['#top','#menu','#story','#gallery','#reviews','#contact'][i]}>{x}</a>)}</nav>
      <div className="nav-actions"><a className="call" href={`tel:${PHONE}`}><Phone size={15}/><span>+91 99753 48154</span></a><button className="order-btn" onClick={()=>setMenuOpen(true)}><ShoppingBag size={16}/> Order Now <span className="count">{cartCount}</span></button><button className="hamb" onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?<X/>:<MenuIcon/>}</button></div>
    </header>
    <AnimatePresence>{mobileOpen&&<motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} className="mobile-nav">{['Home','Menu','Our Story','Gallery','Reviews','Contact'].map((x,i)=><a onClick={()=>setMobileOpen(false)} key={x} href={['#top','#menu','#story','#gallery','#reviews','#contact'][i]}>{x}</a>)}</motion.div>}</AnimatePresence>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span/> THE AUTHENTIC TASTE OF MANCHAR <span/></div>
          <h1>Shree Krishna<br/><em>Kacchi Dabeli</em><br/>Centre</h1>
          <p>Manchar's beloved Kacchi Dabeli — real ingredients, bold Kutchi flavour, and a plate made fresh for every order.</p>
          <div className="hero-cta"><button className="gold-btn" onClick={()=>document.getElementById('menu').scrollIntoView({behavior:'smooth'})}>Explore Menu <ArrowRight size={17}/></button><a className="ghost-btn" href={`tel:${PHONE}`}><Phone size={16}/> +91 99753 48154</a></div>
          <div className="proof"><div><b>4.4<span>★</span></b><small>Google Rating</small></div><div><b>7+</b><small>Reviews</small></div><div><b>100%</b><small>Fresh & Quality</small></div></div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-frame"><img src={siteReferenceImage} alt="Shree Krishna Kacchi Dabeli Centre reference"/></div>
          <RealDabeli exploded={exploded} setExploded={setExploded}/>
          <div className="real-photo-badge"><span>REAL PHOTO</span><b>Signature Cheese Dabeli</b><small>Tap the dabeli to reveal the layers</small></div>
        </div>
      </section>

      <section className="ticker"><span>Freshly assembled</span><i/><span>Amul butter</span><i/><span>Signature masala</span><i/><span>Pomegranate + sev</span><i/><span>Manchar • Maharashtra</span></section>

      <section id="menu" className="section menu-section">
        <div className="section-head"><div><div className="eyebrow">OUR SPECIAL MENU</div><h2>Choose your <em>favourite.</em></h2><p className="section-sub">Real food photography, clear pricing, and one-tap ordering.</p></div><button className="text-btn" onClick={()=>setMenuOpen(true)}>Open Order <ArrowRight size={16}/></button></div>
        <div className="menu-grid">{menu.map((item,i)=><motion.article whileHover={{y:-8}} className="menu-card" key={item.id}>
          <div className="food-stage"><img src={item.image} alt={item.name} onError={e=>{e.currentTarget.src=fallbackImage}}/><span className="price">₹{item.price}</span><span className="photo-note">{i===1?'Owner photo':'Food photo'}</span></div>
          <div className="card-copy"><span className="tag">{item.tag}</span><h3>{item.name}</h3><p>{item.note}</p><button onClick={()=>add(item)}>Add to order <Plus size={15}/></button></div>
        </motion.article>)}</div>
      </section>

      <section id="story" className="experience section">
        <div className="experience-copy"><div className="eyebrow">THE SHREE KRISHNA STANDARD</div><h2>Street food.<br/><em>Elevated.</em></h2><p>Every dabeli is built around the things that matter: a soft pav, punchy masala, sweet-tangy chutneys, crunchy peanuts and sev, then a fresh garnish that makes the whole plate pop.</p><div className="stat-row"><div><b>01</b><span>Fresh pav</span></div><div><b>02</b><span>House masala</span></div><div><b>03</b><span>Hand finished</span></div></div></div>
        <div className="ingredient-orbit"><div className="orbit-ring r1"/><div className="orbit-ring r2"/><div className="orbit-center"><img src={signatureDabeliImage} alt="Real dabeli"/></div><span className="orbit-label l1">Pomegranate</span><span className="orbit-label l2">Masala peanuts</span><span className="orbit-label l3">Signature sev</span></div>
      </section>

      <section id="gallery" className="gallery section"><div className="section-head"><div><div className="eyebrow">FROM THE COUNTER</div><h2>Real taste. Real <em>moments.</em></h2></div></div><div className="gallery-grid"><div className="gallery-main"><img src={signatureDabeliImage} alt="Real Shree Krishna dabeli photo"/><div className="gallery-overlay"><span>Owner-provided food photo</span><b>Loaded, fresh and unmistakably dabeli.</b></div></div><div className="gallery-side"><div className="store-card"><img src={siteReferenceImage} alt="Shree Krishna storefront reference"/><span>Shree Krishna Centre</span></div><div className="map-card"><MapPin/><b>Find us in Manchar</b><p>Sant Rohidas Nagar, Peth<br/>Manchar, Maharashtra 410503</p><div className="map-actions"><a href={MAPS_URL} target="_blank" rel="noreferrer">Open Google Maps <ArrowRight size={15}/></a><a href={`tel:${PHONE}`}>Call the centre <Phone size={14}/></a></div></div></div></div></section>

      <section id="reviews" className="reviews section"><div className="eyebrow">WHAT PEOPLE SAY</div><div className="review-card"><div className="stars">★★★★★</div><p>“Authentic, loaded and full of flavour — the kind of dabeli you remember after the first bite.”</p><div className="review-foot"><span>Google rating snapshot</span><b>4.4 ★</b></div></div></section>

      <section id="contact" className="contact section"><div><div className="eyebrow">VISIT • ORDER • ENJOY</div><h2>Ready for a <em>proper</em> dabeli?</h2><p>Call, visit, or build your order online. We’ll keep the experience simple and fast.</p></div><div className="contact-actions"><button onClick={()=>setMenuOpen(true)} className="gold-btn"><ShoppingBag size={17}/> Order online</button><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="ghost-btn"><MessageCircle size={17}/> WhatsApp</a><a href={MAPS_URL} target="_blank" rel="noreferrer" className="ghost-btn"><MapPin size={17}/> Directions</a></div></section>
    </main>

    <footer><div className="footer-brand"><div className="brand-food"><img src={signatureDabeliImage} alt="Dabeli"/></div><div><b>श्रीकृष्ण कच्छी दाबेली सेंटर</b><small>Manchar • Maharashtra</small></div></div><div className="footer-links"><a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#gallery">Gallery</a><a href={MAPS_URL} target="_blank" rel="noreferrer">Maps</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={15}/> Instagram</a></div><div className="copyright">© 2026 Shree Krishna Kacchi Dabeli Centre</div></footer>

    <AnimatePresence>{toast&&<motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{y:30,opacity:0}} className="toast"><Check size={15}/>{toast}</motion.div>}</AnimatePresence>
    <AnimatePresence>{menuOpen&&<OrderModal cart={cart} total={total} customer={customer} setCustomer={setCustomer} add={add} changeQty={changeQty} checkout={checkout} close={()=>setMenuOpen(false)}/>}</AnimatePresence>
  </div>
}

function RealDabeli({exploded,setExploded}){
  return <div className={`real-dabeli ${exploded?'is-exploded':''}`}>
    <button className="real-dabeli-hit" aria-label="Reveal the real dabeli layers" onClick={()=>setExploded(v=>!v)}>
      <span className="photo-assembled"><img src={signatureDabeliImage} alt="Real cheese dabeli"/></span>
      <span className="photo-layer layer-top"><img src={signatureDabeliImage} alt="Top pav layer"/></span>
      <span className="photo-layer layer-fill"><img src={signatureDabeliImage} alt="Dabeli filling layer"/></span>
      <span className="photo-layer layer-bottom"><img src={signatureDabeliImage} alt="Bottom pav layer"/></span>
      <span className="layer-line line-one"/><span className="layer-line line-two"/>
      <span className="tap-chip">{exploded?'TAP TO CLOSE':'TOUCH TO OPEN'}</span>
    </button>
    <AnimatePresence>{exploded&&<motion.div className="layer-labels" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><span className="label-top">Toasted pav</span><span className="label-fill">Masala + cheese + sev + peanuts</span><span className="label-bottom">Fresh pav base</span></motion.div>}</AnimatePresence>
  </div>
}

function OrderModal({cart,total,customer,setCustomer,add,changeQty,checkout,close}){
  const empty=!cart.length;
  return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={close}><motion.div className="order-panel" initial={{y:50,opacity:0,scale:.98}} animate={{y:0,opacity:1,scale:1}} exit={{y:50,opacity:0,scale:.98}} onClick={e=>e.stopPropagation()}>
    <button className="close" onClick={close}><X/></button>
    <div className="eyebrow">QUICK ORDER</div><h2>Build your <em>plate.</em></h2>
    <div className="order-menu">{menu.map(item=><div className="order-line" key={item.id}><img src={item.image} alt="" onError={e=>e.currentTarget.src=fallbackImage}/><div className="order-info"><b>{item.name}</b><span>₹{item.price}</span></div><button className="mini-add" onClick={()=>add(item)}><Plus size={16}/></button></div>)}</div>
    <div className="cart-box"><div className="cart-title"><span>Your order</span><b>{cart.reduce((a,b)=>a+b.qty,0)} item(s)</b></div>{empty?<p className="empty">Choose something above and it will appear here.</p>:cart.map(item=><div className="cart-row" key={item.id}><div><b>{item.name}</b><span>₹{item.price*item.qty}</span></div><div className="qty"><button onClick={()=>changeQty(item.id,-1)}><Minus size={14}/></button><b>{item.qty}</b><button onClick={()=>changeQty(item.id,1)}><Plus size={14}/></button></div></div>)}<div className="order-total"><span>Total</span><b>₹{total}</b></div></div>
    <div className="customer-form"><label>Name<input value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder="Your name"/></label><label>Phone<input value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} placeholder="10-digit mobile number" inputMode="tel"/></label><label>Note <span>(optional)</span><textarea value={customer.notes} onChange={e=>setCustomer({...customer,notes:e.target.value})} placeholder="Less spicy, extra sev, pickup time…"/></label></div>
    <button className="gold-btn full" onClick={checkout}><Truck size={17}/> Send order request</button><div className="order-foot"><span><Clock3 size={14}/> Mon–Sun • 10 AM–10 PM</span><span><MessageCircle size={14}/> WhatsApp fallback</span></div>
  </motion.div></motion.div>
}

createRoot(document.getElementById('root')).render(<App/>);
