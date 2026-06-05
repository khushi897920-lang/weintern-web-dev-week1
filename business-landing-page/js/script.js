document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navLinksContainer) {
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
      
      // Prevent body scrolling when mobile menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('active')) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside of navbar/menu
    document.addEventListener('click', (e) => {
      if (
        navLinksContainer.classList.contains('active') &&
        !navLinksContainer.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleMenu();
      }
    });
  }

  /* ==========================================================================
     Navbar Padding Scroll Shrink
     ========================================================================== */
  const header = document.querySelector('.header');
  
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  };

  // Run on load and on scroll
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ==========================================================================
     Smooth Anchor Link Scrolling
     ========================================================================== */
  const allLinks = document.querySelectorAll('a[href^="#"]');
  
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // If it's a dummy anchor, ignore
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset (navbar height height is ~88px or ~63px when shrunk)
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     Intersection Observer: Fade-in Scroll Animations
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px', // triggers slightly before entering the screen
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // stop observing once visible
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  /* ==========================================================================
     Interactive Service Cards Icon Shift
     ========================================================================== */
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const icon = card.querySelector('.service-icon');
    if (icon) {
      card.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-4px)';
      });
      card.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0)';
      });
    }
  });

  /* ==========================================================================
     Form Submit Validation
     ========================================================================== */
  const form = document.getElementById('project-form');
  
  if (form) {
    const nameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const serviceInput = document.getElementById('service');
    const briefInput = document.getElementById('brief');
    
    const errName = document.getElementById('error-name');
    const errEmail = document.getElementById('error-email');
    const errService = document.getElementById('error-service');
    const errBrief = document.getElementById('error-brief');

    // Email validation helper regex
    const isValidEmail = (email) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    };

    // Real-time validation clear
    const clearError = (input, errorSpan) => {
      errorSpan.textContent = '';
      input.classList.remove('invalid');
    };

    nameInput.addEventListener('input', () => clearError(nameInput, errName));
    emailInput.addEventListener('input', () => clearError(emailInput, errEmail));
    serviceInput.addEventListener('change', () => clearError(serviceInput, errService));
    briefInput.addEventListener('input', () => clearError(briefInput, errBrief));

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload

      let isFormValid = true;

      // 1. Validate Name
      if (nameInput.value.trim() === '') {
        errName.textContent = 'Full name is required.';
        nameInput.classList.add('invalid');
        isFormValid = false;
      } else {
        clearError(nameInput, errName);
      }

      // 2. Validate Email
      const emailValue = emailInput.value.trim();
      if (emailValue === '') {
        errEmail.textContent = 'Email address is required.';
        emailInput.classList.add('invalid');
        isFormValid = false;
      } else if (!isValidEmail(emailValue)) {
        errEmail.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('invalid');
        isFormValid = false;
      } else {
        clearError(emailInput, errEmail);
      }

      // 3. Validate Service Interest Selection
      if (serviceInput.value === '') {
        errService.textContent = 'Please select a service interest.';
        serviceInput.classList.add('invalid');
        isFormValid = false;
      } else {
        clearError(serviceInput, errService);
      }

      // 4. Validate Project Brief
      const briefValue = briefInput.value.trim();
      if (briefValue === '') {
        errBrief.textContent = 'Project brief is required.';
        briefInput.classList.add('invalid');
        isFormValid = false;
      } else if (briefValue.length < 10) {
        errBrief.textContent = 'Brief is too short. Please provide at least 10 characters.';
        briefInput.classList.add('invalid');
        isFormValid = false;
      } else {
        clearError(briefInput, errBrief);
      }

      // If form is valid, handle successful submission
      if (isFormValid) {
        // 1. Hide form (display none)
        form.style.display = 'none';

        // 2. Create and inject success card
        const successCard = document.createElement('div');
        successCard.className = 'success-card';
        successCard.innerHTML = `
          <div class="success-label">// transmission received</div>
          <h3 class="success-heading">Your Message Has Been Sent</h3>
          <p class="success-subtext">Our team at NexaStudio will review your project brief and respond within 24 business hours.</p>
          <div class="success-divider"></div>
          <div class="success-note">CONFIRMATION SENT TO YOUR EMAIL</div>
          <button class="success-btn" type="button">SEND ANOTHER INQUIRY</button>
        `;

        form.parentNode.insertBefore(successCard, form.nextSibling);

        // 3. Trigger fade-in after 10ms
        setTimeout(() => {
          successCard.classList.add('visible');
        }, 10);

        // Reset button event listener
        const resetBtn = successCard.querySelector('.success-btn');
        resetBtn.addEventListener('click', () => {
          // 1. Remove success card
          successCard.remove();
          
          // 2. Show form again
          form.style.display = '';

          // 3. Reset all fields
          form.reset();

          // 4. Clear all error messages
          errName.textContent = '';
          errEmail.textContent = '';
          errService.textContent = '';
          errBrief.textContent = '';
          nameInput.classList.remove('invalid');
          emailInput.classList.remove('invalid');
          serviceInput.classList.remove('invalid');
          briefInput.classList.remove('invalid');
        });
      }
    });
  }
});
