// Back to top
const btt = document.querySelector('.back-to-top');
if (btt){
  window.addEventListener('scroll',()=>{
    btt.style.display = window.scrollY>240 ? 'inline-block':'none';
  });
  btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// Simple slideshow (autoplay + manual)
function initSlides(scope=document){
  const container = scope.querySelector('.slideshow');
  if(!container) return;
  const slides = Array.from(container.querySelectorAll('.slide'));
  const prev = container.querySelector('[data-prev]');
  const next = container.querySelector('[data-next]');
  const dots = Array.from(container.querySelectorAll('.dot'));
  let i = 0;
  const show = (idx)=>{
    i = (idx+slides.length)%slides.length;
    slides.forEach((s,k)=>s.classList.toggle('active', k===i));
    dots.forEach((d,k)=>d.classList.toggle('active', k===i));
  };
  const advance = ()=>show(i+1);
  let timer = setInterval(advance, 4500);
  prev?.addEventListener('click',()=>{ show(i-1); reset() });
  next?.addEventListener('click',()=>{ show(i+1); reset() });
  dots.forEach((d,k)=>d.addEventListener('click',()=>{ show(k); reset() }));
  const reset = ()=>{ clearInterval(timer); timer=setInterval(advance, 4500) };
  show(0);
}
document.addEventListener('DOMContentLoaded', ()=>initSlides());

// Modal logic
function modal(id){ return document.getElementById(id); }
function openModal(id){ modal(id).classList.add('open'); }
function closeModal(id){ modal(id).classList.remove('open'); }

// Demo submit handling
function submitTourForm(e){
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true; btn.textContent = 'Saving...';
  setTimeout(()=>{
    btn.textContent = 'Saved ✓';
    const done = document.getElementById('tour-success');
    done.style.display='block';
  }, 700);
}

// Payment click (replace URL below with real checkout when ready)
function goToCryptoPayment(){
  // TODO: replace with your real hosted checkout URL from Coinbase Commerce / NOWPayments / BitPay
  const url = 'https://commerce.coinbase.com/checkout/YOUR_CHECKOUT_ID';
  window.open(url, '_blank');
}