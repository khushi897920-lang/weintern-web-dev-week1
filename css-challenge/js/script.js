/**
 * WeIntern CSS Challenge - Script Controller
 * Developer: Khushi
 * Structure: Clean Modular Architecture
 */

// ── AUDIO SYNTHESIZER ──
const AudioSynth = {
    ctx: null,

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    playClick() {
        this.init();
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }
};

// ── SCROLL REVEAL OBSERVER ──
const RevealObserver = {
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-container').forEach(el => observer.observe(el));
    }
};

// ── TACTILE CARD EFFECTS ──
const TactileEffects = {
    init() {
        const cards = document.querySelectorAll('.interactive-card');
        
        cards.forEach(card => {
            card.addEventListener('mousedown', (e) => this.handlePress(e, card));
            card.addEventListener('mouseup', () => this.handleRelease(card));
            card.addEventListener('mouseleave', () => this.handleRelease(card));
            card.addEventListener('touchend', () => this.handleRelease(card));
            card.addEventListener('touchstart', () => {
                AudioSynth.playClick();
                card.classList.add('card-pressed');
            }, { passive: true });
        });
    },

    handlePress(e, card) {
        AudioSynth.playClick();
        card.classList.add('card-pressed');

        // Create click ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        card.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    },

    handleRelease(card) {
        card.classList.remove('card-pressed');
    }
};

// ── MOBILE NAVIGATION ──
const MobileNavigation = {
    init() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('open');
            hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    hamburger.textContent = '☰';
                }
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.textContent = '☰';
            });
        });
    }
};

// ── OFFSET SMOOTH SCROLL ──
const ScrollManager = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    const offset = 80;
                    const elementPosition = targetEl.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ── SUBMISSION MODAL MANAGER ──
const SubmissionModal = {
    init() {
        const submitBtn = document.getElementById('submit-btn') || document.querySelector('header nav .btn-primary');
        if (!submitBtn) return;

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AudioSynth.playClick();
            this.show();
        });
    },

    show() {
        if (document.getElementById('submission-modal')) return;

        const modalHTML = `
            <div id="submission-modal" class="modal-overlay" aria-hidden="true">
              <div class="modal-card">
                <button class="modal-close" id="modal-close-btn" aria-label="Close modal">✕</button>
                <div class="modal-content">
                  <div class="modal-badge-wrapper">
                    <span class="modal-badge">Week 1 · Task 3 · Submitted</span>
                  </div>
                  <h2 class="modal-heading">Assignment Submitted</h2>
                  <p class="modal-subtext">Your CSS Challenge has been successfully submitted to WeIntern. Our team will review your implementation shortly.</p>
                  <div class="modal-divider"></div>
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
                  <div class="modal-divider"></div>
                  <div class="modal-buttons">
                    <button class="btn-modal-secondary" id="modal-view-btn">View Submission</button>
                    <button class="btn-modal-primary" id="modal-done-btn">Done</button>
                  </div>
                  <p class="modal-legal">Submitted assignments are reviewed within 2-3 business days.</p>
                </div>
              </div>
            </div>
        `;

        const parser = new DOMParser();
        const doc = parser.parseFromString(modalHTML.trim(), 'text/html');
        const modalElement = doc.getElementById('submission-modal');
        document.body.appendChild(modalElement);

        document.body.classList.add('modal-open');

        requestAnimationFrame(() => {
            modalElement.classList.add('show');
        });

        // Setup close trigger bindings
        const closeBtn = document.getElementById('modal-close-btn');
        const doneBtn = document.getElementById('modal-done-btn');
        const viewBtn = document.getElementById('modal-view-btn');

        const close = () => {
            modalElement.classList.remove('show');
            document.body.classList.remove('modal-open');

            modalElement.addEventListener('transitionend', function handler(e) {
                if (e.target === modalElement) {
                    modalElement.removeEventListener('transitionend', handler);
                    modalElement.remove();
                }
            });

            setTimeout(() => {
                if (document.body.contains(modalElement)) {
                    modalElement.remove();
                }
            }, 350);
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                AudioSynth.playClick();
                close();
            });
        }

        if (doneBtn) {
            doneBtn.addEventListener('click', () => {
                AudioSynth.playClick();
                close();
            });
        }

        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                AudioSynth.playClick();
                close();
            }
        });

        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                AudioSynth.playClick();
            });
        }
    }
};

// ── INITIALIZATION ──
document.addEventListener('DOMContentLoaded', () => {
    RevealObserver.init();
    TactileEffects.init();
    MobileNavigation.init();
    ScrollManager.init();
    SubmissionModal.init();
});
