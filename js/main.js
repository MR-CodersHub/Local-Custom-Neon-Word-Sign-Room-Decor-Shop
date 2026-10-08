/* =======================================
   NEON GLOW SHOP — JavaScript Core
   ======================================= */

'use strict';

// ======= DOM READY =======
document.addEventListener('DOMContentLoaded', function () {

  // Page Loader
  initPageLoader();

  // Navbar
  initNavbar();

  // Theme Toggle
  initThemeToggle();

  // RTL Layout Toggle
  initRTL();

  // Scroll Animations
  initScrollAnimations();

  // Back to Top
  initBackToTop();

  // FAQ Accordion
  initFAQ();

  // Filter Tabs
  initFilterTabs();

  // Counters
  initCounters();

  // Lightbox
  initLightbox();

  // Video Modal (blog tutorials)
  initVideoModal();

  // Blog Details dynamic post
  initBlogDetails();

  // Form Validation
  initFormValidation();

  // Countdown Timer
  initCountdown();

  // Neon Cursor
  initNeonCursor();

  // Neon Preview
  initNeonPreview();

  // Mobile Menu Close on Link Click
  initMobileMenu();

  // Smooth Scrolling
  initSmoothScroll();

  // Toast Notifications
  initToastDemo();

});

// ======= PAGE LOADER =======
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 500);
  }, 1800);
}

// ======= NAVBAR =======
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active nav link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ======= THEME TOGGLE =======
function initThemeToggle() {
  const toggles = document.querySelectorAll('.theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('neonTheme') || 'dark';

  root.setAttribute('data-theme', saved);
  updateThemeIcons(saved);

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('neonTheme', next);
      updateThemeIcons(next);
    });
  });
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-toggle').forEach(toggle => {
    toggle.innerHTML = theme === 'dark'
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-stars-fill"></i>';
  });
}

// ======= SCROLL ANIMATIONS =======
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

// ======= BACK TO TOP =======
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ======= FAQ ACCORDION =======
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Open clicked (if wasn't open)
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ======= FILTER TABS =======
function initFilterTabs() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-filter]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter-btn');

      filterItems.forEach(item => {
        const cat = item.getAttribute('data-filter');
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.transition = 'all 0.3s ease';
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

// ======= COUNTERS =======
function initCounters() {
  const counters = document.querySelectorAll('.counter-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.floor(current).toLocaleString() + suffix;
            requestAnimationFrame(update);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        };

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ======= LIGHTBOX =======
function initLightbox() {
  const overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) return;

  const img = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-lightbox') || el.querySelector('img')?.src;
      if (src && img) img.src = src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ======= VIDEO MODAL =======
// Cards opt in with [data-video-card]. Playback source comes from the
// card's data-youtube attribute (plain YouTube video ID, e.g. "dQw4w9WgXcQ").
// Paste IDs in blog.html where marked; cards without an ID show a toast.
function initVideoModal() {
  const cards = document.querySelectorAll('[data-video-card]');
  if (!cards.length) return;

  let modal = document.querySelector('.video-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Video player');
    modal.innerHTML = `
      <div class="video-modal-box">
        <div class="video-modal-head">
          <span class="video-modal-title">Video</span>
          <button class="video-modal-close" aria-label="Close video"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="video-modal-frame"></div>
      </div>`;
    document.body.appendChild(modal);
  }

  const frame = modal.querySelector('.video-modal-frame');
  const titleEl = modal.querySelector('.video-modal-title');

  const closeVideo = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    frame.innerHTML = '';
  };

  modal.querySelector('.video-modal-close').addEventListener('click', closeVideo);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeVideo();
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = (card.getAttribute('data-youtube') || '').trim();
      const title = card.getAttribute('data-video-title') || 'Video';
      if (!id) {
        showToast('Video link coming soon — check back shortly.');
        return;
      }
      titleEl.textContent = title;
      frame.innerHTML =
        `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" ` +
        `title="${title.replace(/"/g, '')}" allow="accelerometer; autoplay; clipboard-write; ` +
        `encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

// ======= BLOG POSTS DATA + DETAILS SWAP =======
// blog.html cards link to blog-details.html?post=<id>; this map drives the
// hero image / tag / title / meta swap on the details page.
window.NEON_POSTS = {
  'bedroom-guide': {
    img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&auto=format&fit=crop',
    alt: 'Bedroom neon sign article hero',
    tagIcon: 'bi-lamp', tag: 'Bedroom Decor', tagColor: '',
    title: 'The Ultimate Guide to Neon Signs<br>in Your Bedroom — <span class="neon-text">2026 Edition</span>',
    date: 'October 5, 2026', read: '8 min read', views: '12,400 views'
  },
  'gaming-setups': {
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&auto=format&fit=crop',
    alt: 'Gaming room neon setup',
    tagIcon: 'bi-controller', tag: 'Gaming', tagColor: 'var(--blue)',
    title: '10 Gaming Room Neon Setups<br>That Will Make You <span class="neon-text">Jealous</span>',
    date: 'Sep 28, 2026', read: '5 min read', views: '8,200 views'
  },
  'neon-care': {
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop',
    alt: 'Neon sign care tips',
    tagIcon: 'bi-lightbulb', tag: 'Tips & Tricks', tagColor: 'var(--green)',
    title: 'How to Clean & Care for Your Neon Sign<br><span class="neon-text">The Complete 2026 Guide</span>',
    date: 'Sep 20, 2026', read: '4 min read', views: '6,100 views'
  },
  'cafe-footfall': {
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop',
    alt: 'Cafe neon decor',
    tagIcon: 'bi-cup-hot', tag: 'Cafe & Business', tagColor: 'var(--neon-orange)',
    title: 'How One Neon Sign Doubled a Cafe\u2019s Footfall<br><span class="neon-text">in 30 Days</span>',
    date: 'Sep 15, 2026', read: '6 min read', views: '9,700 views'
  },
  'neon-branding': {
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&auto=format&fit=crop',
    alt: 'Business neon branding',
    tagIcon: 'bi-building', tag: 'Business', tagColor: 'var(--purple)',
    title: 'Why Neon Branding is the Secret Weapon<br>of <span class="neon-text">Viral Businesses</span>',
    date: 'Sep 10, 2026', read: '7 min read', views: '5,400 views'
  },
  'wedding-ideas': {
    img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&auto=format&fit=crop',
    alt: 'Wedding neon signs',
    tagIcon: 'bi-gem', tag: 'Weddings', tagColor: '#ffb6c1',
    title: '15 Wedding Neon Sign Ideas<br>That Stole the <span class="neon-text">Show</span>',
    date: 'Sep 3, 2026', read: '5 min read', views: '11,300 views'
  },
  'font-guide': {
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop',
    alt: 'Neon sign fonts guide',
    tagIcon: 'bi-type', tag: 'Design Tips', tagColor: '',
    title: 'The Ultimate Neon Font Guide<br><span class="neon-text">Which Script Wins?</span>',
    date: 'Aug 28, 2026', read: '4 min read', views: '4,800 views'
  },
  'studio-day': {
    img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&auto=format&fit=crop',
    alt: 'Behind the scenes at NeonLux studio',
    tagIcon: 'bi-tools', tag: 'Behind the Scenes', tagColor: '',
    title: 'A Day in Our NeonLux Studio<br><span class="neon-text">How We Make the Magic</span>',
    date: 'Oct 1, 2026', read: '6 min read', views: '7,900 views'
  },
  'kids-rooms': {
    img: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=1600&auto=format&fit=crop',
    alt: 'Kids neon room',
    tagIcon: 'bi-emoji-smile', tag: 'Kids Rooms', tagColor: 'var(--green)',
    title: 'Magical Kids Room Transformations<br><span class="neon-text">Before & After Neon</span>',
    date: 'Sep 25, 2026', read: '5 min read', views: '6,600 views'
  }
};

function initBlogDetails() {
  const heroImg = document.getElementById('articleHeroImg');
  if (!heroImg) return;

  let id = '';
  try { id = new URLSearchParams(window.location.search).get('post') || ''; } catch (e) { id = ''; }
  const post = window.NEON_POSTS[id];
  if (!post) return;

  heroImg.src = post.img;
  heroImg.alt = post.alt;

  const tag = document.getElementById('articleTag');
  if (tag) {
    tag.innerHTML = `<i class="bi ${post.tagIcon}" aria-hidden="true"></i> ${post.tag}`;
    tag.style.color = post.tagColor || '';
  }

  const title = document.getElementById('articleTitle');
  if (title) title.innerHTML = post.title;

  const set = (elId, icon, text) => {
    const el = document.getElementById(elId);
    if (el) el.innerHTML = `<i class="bi ${icon}"></i> ${text}`;
  };
  set('articleDate', 'bi-calendar3', post.date);
  set('articleRead', 'bi-clock', post.read);
  set('articleViews', 'bi-eye', post.views);

  const plain = post.title.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  document.title = `${plain} | NeonLux Blog`;
}
function initFormValidation() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Clear errors
      form.querySelectorAll('.form-error').forEach(el => el.remove());
      form.querySelectorAll('.form-control').forEach(input => {
        input.style.borderColor = '';
      });

      form.querySelectorAll('[required]').forEach(input => {
        const val = input.value.trim();
        if (!val) {
          valid = false;
          showFieldError(input, 'This field is required');
        } else if (input.type === 'email' && !isValidEmail(val)) {
          valid = false;
          showFieldError(input, 'Please enter a valid email address');
        }
      });

      if (valid) {
        showToast('Message sent successfully! We\'ll get back to you soon.');
        form.reset();
      }
    });
  });
}

function showFieldError(input, msg) {
  input.style.borderColor = '#ff2d78';
  const err = document.createElement('span');
  err.className = 'form-error';
  err.style.cssText = 'display:block;color:#ff2d78;font-size:0.8rem;margin-top:4px;';
  err.textContent = msg;
  input.parentNode.appendChild(err);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ======= TOAST NOTIFICATION =======
function showToast(message) {
  let toast = document.querySelector('.toast-neon');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-neon';
    toast.innerHTML = `
      <div class="toast-icon"><i class="bi bi-check-lg"></i></div>
      <div class="toast-msg" style="color:var(--text-primary);font-size:0.95rem;font-weight:500;"></div>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 4000);
}

function initToastDemo() {
  // Just initialize, actual toasts triggered by forms
}

// ======= COUNTDOWN TIMER =======
function initCountdown() {
  const target = document.querySelector('[data-countdown]');
  if (!target) return;

  const endDate = new Date(target.getAttribute('data-countdown'));

  const update = () => {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      target.innerHTML = '<p style="color:var(--neon-green)"><i class="bi bi-check-circle-fill me-2"></i>We\'re Live!</p>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const els = target.querySelectorAll('.countdown-num');
    if (els[0]) els[0].textContent = String(days).padStart(2, '0');
    if (els[1]) els[1].textContent = String(hours).padStart(2, '0');
    if (els[2]) els[2].textContent = String(mins).padStart(2, '0');
    if (els[3]) els[3].textContent = String(secs).padStart(2, '0');
  };

  update();
  setInterval(update, 1000);
}

// ======= NEON CURSOR =======
function initNeonCursor() {
  const cursor = document.querySelector('.cursor-glow');
  if (!cursor || window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animate = () => {
    curX += (mouseX - curX) * 0.1;
    curY += (mouseY - curY) * 0.1;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animate);
  };

  animate();

  // Expand on hover of interactive elements
  document.querySelectorAll('a, button, .neon-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.background = 'rgba(0,212,255,0.4)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'rgba(255,45,120,0.5)';
    });
  });
}

// ======= NEON SIGN PREVIEW =======
function initNeonPreview() {
  const input = document.querySelector('#neonText');
  const preview = document.querySelector('.neon-preview-text');
  const colorBtns = document.querySelectorAll('.neon-color-btn');

  if (!input || !preview) return;

  input.addEventListener('input', () => {
    preview.textContent = input.value || 'YOUR TEXT';
  });

  if (colorBtns.length) {
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const color = btn.getAttribute('data-color');
        const glowColors = {
          pink: '#ff2d78',
          blue: '#00d4ff',
          green: '#39ff14',
          purple: '#bf00ff',
          yellow: '#fffc00',
          orange: '#ff6b00'
        };
        const c = glowColors[color] || '#ff2d78';
        preview.style.textShadow = `0 0 10px #fff, 0 0 20px #fff, 0 0 40px ${c}, 0 0 80px ${c}, 0 0 90px ${c}`;
        preview.style.color = '#fff';
      });
    });
  }
}

// ======= MOBILE MENU =======
function initMobileMenu() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && collapse && collapse.classList.contains('show')) {
        if (toggler) toggler.click();
      }
    });
  });
}

// ======= SMOOTH SCROLL =======
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ======= HERO CAROUSEL AUTO PLAY =======
document.addEventListener('DOMContentLoaded', () => {
  const heroCarousel = document.querySelector('#heroCarousel');
  if (heroCarousel && typeof bootstrap !== 'undefined') {
    new bootstrap.Carousel(heroCarousel, {
      interval: 5000,
      pause: 'hover',
      ride: 'carousel'
    });
  }
});

// ======= COLOR SWATCH SELECTION =======
document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', function () {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    this.classList.add('active');
  });
});

// ======= IMAGE LAZY LOADING =======
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ======= PARALLAX HERO BG =======
const heroBg = document.querySelector('.hero-bg-parallax');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }, { passive: true });
}

// ======= NEON PARTICLES BACKGROUND =======
function createParticles() {
  const container = document.querySelector('.particles-bg');
  if (!container) return;

  const colors = ['#ff2d78', '#00d4ff', '#39ff14', '#bf00ff', '#fffc00'];
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'neon-particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      animation-delay: ${Math.random() * 6}s;
      animation-duration: ${Math.random() * 4 + 4}s;
    `;
    container.appendChild(particle);
  }
}
createParticles();

// ======= TAB SWITCHING =======
function initTabs() {
  document.querySelectorAll('[data-tab-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab-target');
      const container = btn.closest('[data-tabs-container]');
      if (!container) return;

      container.querySelectorAll('[data-tab-target]').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('[data-tab-panel]').forEach(p => {
        p.style.display = 'none';
        p.style.opacity = '0';
      });

      btn.classList.add('active');
      const panel = container.querySelector(`[data-tab-panel="${target}"]`);
      if (panel) {
        panel.style.display = 'block';
        setTimeout(() => { panel.style.opacity = '1'; panel.style.transition = 'opacity 0.3s ease'; }, 10);
      }
    });
  });
}

initTabs();

// ======= NEWSLETTER FORM =======
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]')?.value;
    if (email && isValidEmail(email)) {
      showToast('You\'re subscribed! Get ready for exclusive neon deals.');
      form.reset();
    } else {
      showToast('Please enter a valid email address.');
    }
  });
});

// ======= RTL LAYOUT TOGGLE =======
// Adds an RTL/LTR pill next to every theme toggle, persists choice in
// localStorage ('neonDir') and applies it via <html dir="...">.
// Flexbox/grid mirror automatically; physical left/right cases are
// handled in style.css under [dir="rtl"].
function initRTL() {
  const root = document.documentElement;

  const paint = (d) => {
    document.querySelectorAll('.rtl-toggle').forEach((b) => {
      b.textContent = d === 'rtl' ? 'LTR' : 'RTL';
      const label = d === 'rtl' ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout';
      b.setAttribute('aria-label', label);
      b.title = label;
    });
  };

  const applyDir = (d) => {
    root.setAttribute('dir', d === 'rtl' ? 'rtl' : 'ltr');
    try { localStorage.setItem('neonDir', d === 'rtl' ? 'rtl' : 'ltr'); } catch (e) {}
    paint(d === 'rtl' ? 'rtl' : 'ltr');
  };

  let saved = 'ltr';
  try { saved = localStorage.getItem('neonDir') || 'ltr'; } catch (e) {}
  if (saved !== 'rtl') saved = 'ltr';

  document.querySelectorAll('.theme-toggle').forEach((t) => {
    if (t.nextElementSibling && t.nextElementSibling.classList.contains('rtl-toggle')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle rtl-toggle';
    btn.style.width = 'auto';
    btn.style.padding = '0 12px';
    btn.style.borderRadius = '99px';
    btn.style.fontSize = '0.72rem';
    btn.style.fontWeight = '800';
    btn.style.letterSpacing = '0.08em';
    if (getComputedStyle(t).position === 'fixed') {
      btn.style.position = 'fixed';
      btn.style.top = '16px';
      btn.style.right = '64px';
      btn.style.zIndex = '1000';
    }
    t.after(btn);
    btn.addEventListener('click', () => {
      applyDir((root.getAttribute('dir') || 'ltr') === 'rtl' ? 'ltr' : 'rtl');
    });
  });

  applyDir(saved);
}

// ======= IMAGE FALLBACK (broken images never show as broken) =======
(function initImageFallback() {
  const FALLBACK = 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#1a0b2e"/><stop offset="1" stop-color="#0d0d22"/>` +
    `</linearGradient></defs>` +
    `<rect width="800" height="600" fill="url(#g)"/>` +
    `<g fill="none" stroke="#FF2D78" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M440 120 300 320h90l-20 160 140-200h-90z"/></g>` +
    `<text x="400" y="470" text-anchor="middle" fill="#ffffff" opacity="0.65" ` +
    `font-family="Arial,sans-serif" font-size="34" font-weight="bold">NeonLux</text></svg>`
  );
  const fix = (img) => {
    if (!img || img.dataset.fbk) return;
    img.dataset.fbk = '1';
    img.src = FALLBACK;
  };
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.src) fix(img);
    img.addEventListener('error', () => fix(img));
  });
})();
