// năm hiện tại
document.getElementById('yr').textContent = new Date().getFullYear();

// menu hamburger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.onclick = () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
};
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}));

// dark/light toggle, nhớ lựa chọn cũ trong localStorage
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
function applyTheme(t){
  root.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '🌙' : '☀️';
}
try{
  const saved = localStorage.getItem('theme');
  if(saved) applyTheme(saved);
  else applyTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}catch(e){ applyTheme('dark'); }

themeBtn.onclick = () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try{ localStorage.setItem('theme', next); }catch(e){}
};

// đếm ký tự textarea
const msgBox = document.getElementById('msg');
const charCount = document.getElementById('charCount');
msgBox.addEventListener('input', () => charCount.textContent = msgBox.value.length);

// lọc + tìm kiếm dự án
const filterBar = document.getElementById('filterBar');
const searchBox = document.getElementById('searchProj');
const cards = [...document.querySelectorAll('.proj-card')];
let curTag = 'all';

function applyFilter(){
  const q = searchBox.value.trim().toLowerCase();
  cards.forEach(c => {
    const tags = c.dataset.tags;
    const title = c.querySelector('h3').textContent.toLowerCase();
    const tagOk = curTag === 'all' || tags.includes(curTag);
    const qOk = !q || title.includes(q) || tags.includes(q);
    c.classList.toggle('hide', !(tagOk && qOk));
  });
}
filterBar.addEventListener('click', e => {
  if(e.target.tagName !== 'BUTTON') return;
  filterBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  curTag = e.target.dataset.tag;
  applyFilter();
});
searchBox.addEventListener('input', applyFilter);

// validate form liên hệ
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

function validEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = msgBox.value.trim();

  const errName = document.getElementById('errName');
  const errEmail = document.getElementById('errEmail');
  const errMsg = document.getElementById('errMsg');
  errName.textContent = errEmail.textContent = errMsg.textContent = '';

  if(name.length < 2){ errName.textContent = 'Tên hơi ngắn, nhập đầy đủ giúp mình nhé'; ok = false; }
  if(!validEmail(email)){ errEmail.textContent = 'Email không đúng định dạng'; ok = false; }
  if(msg.length < 10){ errMsg.textContent = 'Viết thêm chút nữa (ít nhất 10 ký tự)'; ok = false; }

  if(!ok){ formMsg.textContent = ''; return; }

  formMsg.style.color = 'var(--accent)';
  formMsg.textContent = 'Cảm ơn bạn, mình sẽ phản hồi sớm!';
  form.reset();
  charCount.textContent = '0';
});
