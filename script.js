document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Header Scroll Effect ---
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 2. Slider Component logic for Services ---
  const sliderContainer = document.getElementById('services-slider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (sliderContainer) {
    const scrollAmount = 382; // 350px width + 32px gap
    let isWheeling = false;
    let wheelTimer;

    // Horizontal scroll override with snapping throttle
    sliderContainer.addEventListener('wheel', (evt) => {
      if (evt.deltaY !== 0) {
        evt.preventDefault();
        if (!isWheeling) {
          isWheeling = true;
          const direction = evt.deltaY > 0 ? 1 : -1;
          sliderContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => { isWheeling = false; }, 250);
      }
    }, { passive: false });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  }

  // --- 3. Intersection Observer (Fade-In Animations) ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => {
    if (prefersReducedMotion) {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none';
    } else {
      observer.observe(el);
    }
  });

  // --- 4. Lightbox (Gallery Portfolio) ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.grid-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --- 5. Testimonial Slider ---
  const testimonialSlider = document.getElementById('testimonial-slider');
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');

  if (testimonialSlider) {
    const tScrollAmount = 344; // 320px card + 24px gap

    // Arrow buttons
    if (testimonialPrev) {
      testimonialPrev.addEventListener('click', () => {
        testimonialSlider.scrollBy({ left: -tScrollAmount, behavior: 'smooth' });
      });
    }
    if (testimonialNext) {
      testimonialNext.addEventListener('click', () => {
        testimonialSlider.scrollBy({ left: tScrollAmount, behavior: 'smooth' });
      });
    }

    // Horizontal wheel scroll
    let tIsWheeling = false;
    let tWheelTimer;
    testimonialSlider.addEventListener('wheel', (evt) => {
      if (evt.deltaY !== 0) {
        evt.preventDefault();
        if (!tIsWheeling) {
          tIsWheeling = true;
          const dir = evt.deltaY > 0 ? 1 : -1;
          testimonialSlider.scrollBy({ left: dir * tScrollAmount, behavior: 'smooth' });
        }
        clearTimeout(tWheelTimer);
        tWheelTimer = setTimeout(() => { tIsWheeling = false; }, 250);
      }
    }, { passive: false });

    // Auto-scroll (pause on hover)
    let autoScrollInterval;
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
        if (testimonialSlider.scrollLeft >= maxScroll - 10) {
          testimonialSlider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          testimonialSlider.scrollBy({ left: tScrollAmount, behavior: 'smooth' });
        }
      }, 4000);
    };

    if (!prefersReducedMotion) {
      startAutoScroll();
      testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
      testimonialSlider.addEventListener('mouseleave', startAutoScroll);
    }
  }

  // --- 6. Booking Form Submit ---
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your booking request has been submitted. Our team will contact you shortly.');
      bookingForm.reset();
    });
  }

});
