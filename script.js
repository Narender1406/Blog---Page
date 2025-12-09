/* ========= GLOBAL UI SCRIPT =========
   Handles:
   - theme toggle + persistence
   - responsive hamburger nav
   - navbar hide on scroll
   - dynamic blog loading (used on index + blogs)
   - modal post view
   - simple contact form mock
   ===================================== */

(() => {
  // ---------- Elements ----------
  const themeToggle = document.getElementById('themeToggle');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.querySelector('.navbar');

  // ---------- THEME ----------
  const THEME_KEY = 'lp_theme';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') document.documentElement.classList.add('dark-theme');
  function setTheme(t){
    if(t === 'dark') document.documentElement.classList.add('dark-theme');
    else document.documentElement.classList.remove('dark-theme');
    localStorage.setItem(THEME_KEY, t);
    // update button emoji if present
    if(themeToggle) themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
  }
  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-theme');
      setTheme(isDark ? 'dark' : 'light');
    });
    // ensure correct label
    themeToggle.textContent = document.documentElement.classList.contains('dark-theme') ? '☀️' : '🌙';
  }

  // ---------- HAMBURGER NAV ----------
  if(hamburger && navMenu){
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('show');
    });
    // close on link click
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('show');
    }));
  }

  // ---------- NAV HIDE ON SCROLL ----------
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if(current > lastScroll && current > 80){
      navbar.style.transform = 'translateY(-110%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  });

  // ---------- BLOG DATA (single source) ----------
  // add / edit posts here; used on index (preview) + blogs page
  const blogPosts = [
    {
      id: 'post-1',
      title: "Lupyd Supports",
      img: "https://www.mobulous.com/blog/wp-content/uploads/Social-Media-App-Development-Cost-Features.png",
      content: "Lupyd is a next-generation digital social platform built for speed, privacy, and creativityDesigned with modern users in mind, Lupyd delivers a smooth, powerful experience for sharing, chatting, and exploring content.With advanced encryption and smart performance optimization, Lupyd keeps conversations secure and the app lightning-fast.Lupyd empowers creators and communities with innovative features and a bold, modern design.More than a platform—Lupyd represents a new digital era of connection, expression, and global community.",
      time: "Just now",
      tags: ["design","frontend"]
    },
    {
      id: 'post-2',
      title: "social updates",
      img: "https://www.techindiasoftware.com/blog/wp-content/uploads/2025/12/seo-v2-1-768x375.jpg",
      content: "Lupyd is a modern social media platform built for fast, secure, and meaningful connections.It brings together creators, communities, and conversations in one beautifully designed space.With next-gen privacy features and smooth performance, Lupyd offers a safer, smarter way to share and interact.From chatting to posting to exploring trends, Lupyd makes social media feel fresh, powerful, and user-focused.Lupyd isn’t just another app—it’s the future of social networking, where creativity and connection meet. .",
      time: "10 min ago",
      tags: ["tips","design"]
    },
    {
      id: 'post-3',
      title: "updated chats",
      img: "https://www.connect2geek.com/wp-content/uploads/sites/514/2023/08/The-Pros-and-Cons-of-End-To-End-Encryption-to-Protect-Business-Data.jpg",
      content: "Lupyd uses advanced end-to-end encryption to keep every chat private and secure from third-party access.Messages are locked with modern cryptographic protocols, ensuring only the sender and receiver can read them.Even Lupyd’s servers cannot view or decode conversations, protecting users against data leaks and unauthorized access.With security inspired by industry-leading protocols like Signal and MLS, Lupyd gives users a safer, more trustworthy communication experience..",
      time: "1 hour ago",
      tags: ["tutorial","css"]
    },
    {
      id: 'post-4',
      title: "Accessibility for Modern UI",
      img: "https://img.freepik.com/premium-vector/website-development-social-media-post_990172-53.jpg?w=2000",
      content:  "Lupyd is rapidly growing as more users discover its speed, security, and modern social experience.Its seamless design and powerful features have helped it gain strong traction among creators, communities, and everyday users.With rising engagement and expanding global reach, Lupyd is becoming one of the most promising new social platforms.Continuous innovation and user-focused development are driving Lupyd’s steady and sustainable growth.",
      time: "Yesterday",
      tags: ["accessibility","ux"]
    },
    {
      id: 'post-5',
      title: "Lupyd performance at present social media",
    img: "images/dashboard.png",
  content:" Lupyd’s Rapid Growth Across the Social Media Ecosystem . Lupyd is experiencing strong, consistent momentum across every major performance indicator. The latest analytics dashboard highlights impressive gains in user activity, engagement, and platform reliability—showing that Lupyd is not just growing, but scaling with stability and strength.", 
time:"2 days ago",
tags:["performance improvements","js"]},
  ];

  // ---------- DOM: render posts in a container ----------
  function createCard(post){
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.innerHTML = `
      <img loading="lazy" src="${post.img}" alt="${escapeHtml(post.title)}" />
      <h3>${escapeHtml(post.title)}</h3>
      <p class="muted small">${escapeHtml(post.content).slice(0,140)}…</p>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">
        <span class="small muted">${post.time}</span>
        <button class="btn outline small view-post" data-id="${post.id}">Read</button>
      </div>
    `;
    return card;
  }

  function renderPosts(containerId, items){
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';
    items.forEach(post => {
      container.appendChild(createCard(post));
    });
    // attach listeners for "Read" buttons
    container.querySelectorAll('.view-post').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const p = blogPosts.find(x => x.id === id);
        if(p) openModal(p);
      });
    });
  }

  // on index: show first 3 posts as preview if #homePreview exists
  if(document.getElementById('homePreview')){
    renderPosts('homePreview', blogPosts.slice(0,3));
  }
  // on blogs page: render all
  if(document.getElementById('blogContainer')){
    renderPosts('blogContainer', blogPosts);
  }

  // ---------- SIMPLE ESCAPE to avoid naive injection (minimal) ----------
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // ---------- MODAL (post view) ----------
  const modal = document.getElementById('postModal');
  const modalClose = document.getElementById('modalClose');
  if(modal){
    modal.addEventListener('click', (e) => {
      if(e.target === modal || e.target.classList.contains('close')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
    if(modalClose) modalClose.addEventListener('click', closeModal);
  }

  function openModal(post){
    if(!modal) return;
    modal.classList.remove('hidden');
    modal.setAttribute('aria','false');
    document.getElementById('modalImg').src = post.img;
    document.getElementById('modalImg').alt = post.title;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalTime').textContent = post.time;
    document.getElementById('modalContent').textContent = post.content;
    // lock scroll
    document.documentElement.style.overflow = 'hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow = '';
  }

  // ---------- CONTACT FORM: mock submit ----------
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('contactStatus');
      status.textContent = 'Sending…';
      // fake delay + feedback
      setTimeout(() => {
        status.textContent = 'Thanks! Your message was sent (mock).';
        contactForm.reset();
      }, 800);
    });
  }

  // ---------- small helper: highlight current nav link ----------
  (function highlightNav(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach(a => {
      try{
        const href = a.getAttribute('href');
        if(!href) return;
        const current = location.pathname.split('/').pop() || 'index.html';
        if(href === current || (href === 'index.html' && current === '')) {
          a.classList.add('active');
        } else {
          // extra: when pages are linked as 'index.html' and current is ''
          if(current === '' && href === 'index.html') a.classList.add('active');
        }
      } catch(e){}
    });
  })();

})();
