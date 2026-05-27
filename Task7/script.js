/* ================================================
   DATAMIND — Interactive Functionality & Custom Logic
   ================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar Scroll Effect ── */
  const navbar = document.querySelector('.dm-navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially in case of refreshed page scrolled down
  }

  /* ── 2. Stat Counter Animation ── */
  const statNums = document.querySelectorAll('.dm-stat-num');
  
  const animateStats = () => {
    statNums.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      const isPercent = stat.textContent.includes('%');
      let count = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // ~60fps
      
      const updateCount = () => {
        count += increment;
        if (count < target) {
          stat.textContent = Math.floor(count).toLocaleString() + (isPercent ? '%' : '');
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target.toLocaleString() + (isPercent ? '%' : '');
        }
      };
      
      updateCount();
    });
  };

  /* ── 3. Progress Bar Animation ── */
  const progressBars = document.querySelectorAll('.dm-bar');
  
  const animateProgress = () => {
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth + '%';
    });
  };

  /* ── 4. Scroll Spy / Intersection Observer for Animations ── */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  let statsAnimated = false;
  let progressAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('dm-hero') && !statsAnimated) {
          animateStats();
          statsAnimated = true;
        }
        if (entry.target.classList.contains('dm-progress-section') && !progressAnimated) {
          animateProgress();
          progressAnimated = true;
        }
      }
    });
  }, observerOptions);

  // Observe target sections
  const heroSection = document.querySelector('.dm-hero');
  if (heroSection) observer.observe(heroSection);
  
  const progressSec = document.querySelector('.dm-progress-section');
  if (progressSec) observer.observe(progressSec);

  // Fallback in case IntersectionObserver is not fully triggering as expected
  setTimeout(() => {
    if (!statsAnimated) { animateStats(); statsAnimated = true; }
  }, 1000);

  /* ── 5. Form Validation & Submission ── */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Bootstrap validation classes
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        
        // Find first invalid input and focus it
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      } else {
        // Form is valid! Show custom luxury submission animation
        form.classList.remove('was-validated');
        if (submitBtn) {
          submitBtn.disabled = true;
          const label = submitBtn.querySelector('.btn-label');
          if (label) label.textContent = 'Processing request...';
        }

        // Simulate secure database submission
        setTimeout(() => {
          if (formSuccess) {
            formSuccess.removeAttribute('hidden');
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          form.reset();
          
          if (submitBtn) {
            submitBtn.disabled = false;
            const label = submitBtn.querySelector('.btn-label');
            if (label) label.textContent = 'Start My Free Trial';
          }
        }, 1500);
      }
    });
  }

  /* ── 6. Alert Banner Close Handling ── */
  const alertBanner = document.querySelector('.dm-alert-banner');
  if (alertBanner) {
    const closeBtn = alertBanner.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        alertBanner.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        alertBanner.style.opacity = '0';
        alertBanner.style.transform = 'translateY(100%)';
        setTimeout(() => {
          alertBanner.remove();
        }, 400);
      });
    }
  }

});
