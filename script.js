// ---------------------------------------------------------
// Nitika Portfolio — script.js
// Handles: mobile nav toggle, project filtering, typed terminal
// ---------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initProjectFilter();
  initTypedTerminal();
});

// --- Mobile nav toggle ---------------------------------------------------
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after clicking a link (useful on mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Project filter bar ---------------------------------------------------
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const noResults = document.querySelector('.no-results');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      let visibleCount = 0;
      cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.hidden = !matches;
        if (matches) visibleCount++;
      });

      if (noResults) noResults.hidden = visibleCount !== 0;
    });
  });
}

// --- Typed terminal effect ---------------------------------------------------
function initTypedTerminal() {
  const el = document.getElementById('typed');
  if (!el) return;

  const commands = [
    'nmap -sV target.local',
    'python3 recon_scan.py --target 10.0.0.0/24',
    './exploit.py --check',
    'sudo tcpdump -i eth0 -n'
  ];

  let cmdIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = commands[cmdIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400); // pause at full text
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
      }
    }

    const speed = deleting ? 30 : 60;
    setTimeout(tick, speed);
  }

  tick();
}// =====================================================
// 1. Mobile nav toggle
// =====================================================
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav after clicking a link
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// =====================================================
// 2. Smooth scroll for in-page anchor links
//    (CSS scroll-behavior:smooth already covers most cases;
//    this adds an offset so the sticky header doesn't
//    cover the section heading, and works even if a
//    browser ignores the CSS property)
// =====================================================
const headerHeight = () => document.querySelector('.site-header')?.offsetHeight || 0;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length <= 1) return; // just "#"
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// =====================================================
// 3. Project filter (dynamic filtering by category)
// =====================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const noResults = document.querySelector('.no-results');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  });
});

// =====================================================
// 4. Terminal typing effect (decorative interactive element)
// =====================================================
const typedEl = document.getElementById('typed');
const linesToType = [
  'nmap -sV target.local',
  'scanning ports...',
  'starting recon...'
];

if (typedEl) {
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentLine = linesToType[lineIndex];

    if (!deleting) {
      typedEl.textContent = currentLine.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentLine.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      typedEl.textContent = currentLine.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % linesToType.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }

  tick();
}

// =====================================================
// 5. Reveal skill bars only once they're in view
// =====================================================
const bars = document.querySelectorAll('.bar-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = getComputedStyle(entry.target).getPropertyValue('--pct');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

bars.forEach(bar => {
  bar.style.width = '0';
  observer.observe(bar);
});
