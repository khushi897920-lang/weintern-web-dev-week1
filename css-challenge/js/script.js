// Web Audio API Sound Generation
let audioCtx;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playClickSound() {
    initAudio();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    // Neutral clean tone for Airbnb feel
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.08);
}

// Intersection Observer for Animation reveals
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-container').forEach(container => {
    observer.observe(container);
});

// Interactive Card Effects (Ripple + Tactile Press + Audio Feedback)
const cards = document.querySelectorAll('.interactive-card');

cards.forEach(card => {
    card.addEventListener('mousedown', function(e) {
        playClickSound();
        this.classList.add('card-pressed');

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });

    const endPress = function() {
        card.classList.remove('card-pressed');
    };

    card.addEventListener('mouseup', endPress);
    card.addEventListener('mouseleave', endPress);
    card.addEventListener('touchend', endPress);
    card.addEventListener('touchstart', function(e) {
        playClickSound();
        this.classList.add('card-pressed');
    }, { passive: true });
});

// Hamburger Navigation Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('open');
        if (navLinks.classList.contains('open')) {
            hamburger.textContent = '✕';
        } else {
            hamburger.textContent = '☰';
        }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.textContent = '☰';
            }
        }
    });

    // Close on nav link click
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            hamburger.textContent = '☰';
        });
    });
}

// Smooth Scroll with 80px Navbar Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Do not intercept plain placeholder links
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Submission Modal Functionality
const submitBtn = document.getElementById('submit-btn') || document.querySelector('header nav .btn-primary');

if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Play card click sound on submit click
        playClickSound();
        
        // Prevent duplicate modals if already open
        if (document.getElementById('submission-modal')) return;

        // Create the modal overlay and structure dynamically from string
        const modalHTML = `
    <div id="submission-modal" class="modal-overlay" aria-hidden="true">
      <div class="modal-card">
        <button class="modal-close" id="modal-close-btn" aria-label="Close modal">✕</button>
        <div class="modal-content">
          <!-- 1. Status badge -->
          <div class="modal-badge-wrapper">
            <span class="modal-badge">Week 1 · Task 3 · Submitted</span>
          </div>
          
          <!-- 2. Main heading -->
          <h2 class="modal-heading">Assignment Submitted</h2>
          
          <!-- 3. Subtext -->
          <p class="modal-subtext">Your CSS Challenge has been successfully submitted to WeIntern. Our team will review your implementation shortly.</p>
          
          <!-- 4. Divider -->
          <div class="modal-divider"></div>
          
          <!-- 5. Submission details -->
          <div class="modal-details">
            <div class="details-row">
              <span class="details-label">Task</span>
              <span class="details-value">CSS Challenge — Week 1</span>
            </div>
            <div class="details-row">
              <span class="details-label">Submitted by</span>
              <span class="details-value">Khushi</span>
            </div>
            <div class="details-row">
              <span class="details-label">Status</span>
              <span class="details-status-pill">Under Review</span>
            </div>
          </div>
          
          <!-- 6. Bottom divider -->
          <div class="modal-divider"></div>
          
          <!-- 7. Two buttons -->
          <div class="modal-buttons">
            <button class="btn-modal-secondary" id="modal-view-btn">View Submission</button>
            <button class="btn-modal-primary" id="modal-done-btn">Done</button>
          </div>
          
          <!-- 8. Legal note -->
          <p class="modal-legal">Submitted assignments are reviewed within 2-3 business days.</p>
        </div>
      </div>
    </div>
        `;

        // Parse HTML string and append modal to document body
        const parser = new DOMParser();
        const doc = parser.parseFromString(modalHTML, 'text/html');
        const modalElement = doc.getElementById('submission-modal');
        document.body.appendChild(modalElement);

        const closeBtn = document.getElementById('modal-close-btn');
        const doneBtn = document.getElementById('modal-done-btn');
        const viewBtn = document.getElementById('modal-view-btn');

        // Lock background scroll
        document.body.classList.add('modal-open');

        // Trigger animation on next frame
        requestAnimationFrame(() => {
            modalElement.classList.add('show');
        });

        // Close function
        const closeModal = () => {
            modalElement.classList.remove('show');
            document.body.classList.remove('modal-open');
            
            // Wait for transition to complete before removing from DOM
            modalElement.addEventListener('transitionend', function handler(e) {
                // Ensure we only trigger on the overlay opacity transition
                if (e.target === modalElement) {
                    modalElement.removeEventListener('transitionend', handler);
                    modalElement.remove();
                }
            });
            
            // Fallback timeout in case transitionend does not fire
            setTimeout(() => {
                if (document.body.contains(modalElement)) {
                    modalElement.remove();
                }
            }, 350);
        };

        // Close listeners with click sound triggers
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                playClickSound();
                closeModal();
            });
        }
        
        if (doneBtn) {
            doneBtn.addEventListener('click', function() {
                playClickSound();
                closeModal();
            });
        }
        
        // Close on overlay click (outside modal card) with sound
        modalElement.addEventListener('click', function(e) {
            if (e.target === modalElement) {
                playClickSound();
                closeModal();
            }
        });

        // View button click sound
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                playClickSound();
                e.preventDefault();
            });
        }
    });
}
