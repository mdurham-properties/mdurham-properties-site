
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const NOWPAY_RENT = "https://nowpayments.link/your-25-usdt";
const NOWPAY_BUY  = "https://nowpayments.link/your-50-usdt";

(function(){
  if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

let selectedTourType = null;
function openTourModal(propertyId, propertyTitle){
  const m = document.getElementById('tourModal');
  m.style.display = 'flex';
  document.getElementById('tour_property').value = propertyTitle || propertyId || '';
  selectedTourType = null;
  document.querySelectorAll('.option-card').forEach(c=>c.classList.remove('selected'));
  document.getElementById('tour_type').value = '';
}
function closeTourModal(){ document.getElementById('tourModal').style.display='none'; }
function selectCard(type){
  selectedTourType = type;
  document.getElementById('tour_type').value = type === 'rent' ? 'Rent - $25' : 'Buy - $50';
  document.querySelectorAll('.option-card').forEach(c=>c.classList.remove('selected'));
  document.getElementById(type+'Card').classList.add('selected');
}
async function submitTour(e){
  e.preventDefault();
  const form = document.getElementById('tourForm');
  if(!selectedTourType){ alert('Please select Rent ($25) or Buy ($50) to continue.'); return; }
  const data = Object.fromEntries(new FormData(form).entries());
  try{
    if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: data.name, email: data.email, phone: data.phone,
        property: data.property, request_type: data.request_type, message: data.message || '',
        time: new Date().toLocaleString()
      });
    }
  }catch(err){ console.warn('EmailJS error', err); }
  window.location.href = selectedTourType === 'rent' ? NOWPAY_RENT : NOWPAY_BUY;
}
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if(!btn) return;
  btn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
function backToTop(){ window.scrollTo({top:0, behavior:'smooth'}); }
function setMain(src){ const main = document.getElementById('galleryMain'); if(main) main.src = src; }
