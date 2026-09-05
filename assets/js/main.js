/* ============================================================
   Canvas Media Walls — Interactive Animations & Transitions
   ============================================================ */

// 1. Mobile Menu Toggle with Animated Hamburger Icon & Semi-transparent Dropdown
function toggleMobileMenu() {
  var menu = document.getElementById('mobileMenu');
  var btn = document.querySelector('.mobile-menu-toggle');
  if (menu) { menu.classList.toggle('active'); }
  if (btn) { btn.classList.toggle('active'); }
}

// Close mobile menu when clicking outside or clicking a link
document.addEventListener('click', function(e) {
  var menu = document.getElementById('mobileMenu');
  var btn = document.querySelector('.mobile-menu-toggle');
  if (menu && menu.classList.contains('active')) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('active');
      if (btn) btn.classList.remove('active');
    }
  }
});

// 2. Smooth Page Entrance & Page Transition Exit Handler
document.addEventListener('DOMContentLoaded', function() {
  // Trigger smooth page entrance fade-in
  requestAnimationFrame(function() {
    document.body.classList.add('page-loaded');
  });

  // Intercept internal HTML links for smooth exit transition
  var links = document.querySelectorAll('a[href]');
  links.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !link.getAttribute('target')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.remove('page-loaded');
        document.body.classList.add('page-exiting');
        setTimeout(function() {
          window.location.href = href;
        }, 220);
      });
    }
  });

  // 3. Scroll Reveal Animations for Sections & Cards
  var revealElements = document.querySelectorAll('.value-item, .framed, .process-step-card, .pricing-card, .faq-item, .contact-form-card, .detail-card, .cta-band, .values, .dense-gallery-grid');
  revealElements.forEach(function(el) {
    el.classList.add('reveal-on-scroll');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(function(el) {
      el.classList.add('reveal-in');
    });
  }
});
