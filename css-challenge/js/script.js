/**
 * WeIntern CSS Challenge — Script Controller v10
 * Author  : Khushi
 * Pattern : Module Object Pattern (no frameworks, no deps)
 * Targets : Modern browsers (ES2020+)
 */

'use strict';

/* ════════════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ════════════════════════════════════════════════════════════════════ */

/**
 * Shorthand query selectors.
 * @param {string} sel
 * @param {ParentNode} [ctx=document]
 */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Trap focus within an element. Returns a cleanup function. */
function trapFocus(el) {
  const focusable = $$('a[href], button:not([disabled]), [tabindex="0"]', el);
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }

  el.addEventListener('keydown', handler);
  return () => el.removeEventListener('keydown', handler);
}

/* ════════════════════════════════════════════════════════════════════
   AUDIO SYNTHESIZER
   Generates a soft tactile click using the Web Audio API.
   No external assets required.
   ════════════════════════════════════════════════════════════════════ */
const AudioSynth = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function playClick() {
    try {
      const ac   = getCtx();
      const osc  = ac.createOscillator();
      const gain = ac.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ac.currentTime + 0.09);

      gain.gain.setValueAtTime(0.045, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start();
      osc.stop(ac.currentTime + 0.09);
    } catch (_) {
      // AudioContext not available — silent fallback
    }
  }

  return { playClick };
})();

/* ════════════════════════════════════════════════════════════════════
   SCROLL REVEAL
   Uses IntersectionObserver to animate cards in when they enter viewport.
   ════════════════════════════════════════════════════════════════════ */
const RevealObserver = (() => {
  function init() {
    // Bail early if browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      // Immediately show all hidden reveal-cards
      $$('.reveal-card').forEach(el => el.style.opacity = '1');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Animate once only
          }
        });
      },
      { threshold: 0.12 }
    );

    $$('.reveal-container').forEach(el => observer.observe(el));
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════════════════
   TACTILE CARD EFFECTS
   Adds ripple animation + scale press + audio feedback on cards.
   ════════════════════════════════════════════════════════════════════ */
const TactileEffects = (() => {
  /**
   * Spawn a ripple element at the click coordinates.
   * @param {MouseEvent} e
   * @param {HTMLElement} card
   */
  function spawnRipple(e, card) {
    const ripple  = document.createElement('span');
    const rect    = card.getBoundingClientRect();
    const size    = Math.max(rect.width, rect.height);
    const x       = (e.clientX - rect.left)  - size / 2;
    const y       = (e.clientY - rect.top)   - size / 2;

    ripple.className       = 'ripple';
    ripple.style.cssText   = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;

    card.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }

  function press(card)   { card.classList.add('card-pressed'); }
  function release(card) { card.classList.remove('card-pressed'); }

  function init() {
    $$('.interactive-card').forEach(card => {
      // Mouse
      card.addEventListener('mousedown', (e) => {
        AudioSynth.playClick();
        press(card);
        spawnRipple(e, card);
      });

      card.addEventListener('mouseup',    () => release(card));
      card.addEventListener('mouseleave', () => release(card));

      // Touch
      card.addEventListener('touchstart', () => {
        AudioSynth.playClick();
        press(card);
      }, { passive: true });

      card.addEventListener('touchend',   () => release(card), { passive: true });
      card.addEventListener('touchcancel',() => release(card), { passive: true });

      // Keyboard (Enter / Space) for accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          AudioSynth.playClick();
          press(card);
          setTimeout(() => release(card), 120);
        }
      });
    });
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════════════════
   MOBILE NAVIGATION
   Toggles the nav drawer and manages ARIA attributes.
   ════════════════════════════════════════════════════════════════════ */
const MobileNavigation = (() => {
  let isOpen = false;

  function open(hamburger, navLinks) {
    isOpen = true;
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    // Focus first link in drawer
    const firstLink = $('a', navLinks);
    if (firstLink) firstLink.focus();
  }

  function close(hamburger, navLinks) {
    isOpen = false;
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  }

  function init() {
    const hamburger = $('#hamburger');
    const navLinks  = $('#nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen ? close(hamburger, navLinks) : open(hamburger, navLinks);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (isOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        close(hamburger, navLinks);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        close(hamburger, navLinks);
        hamburger.focus();
      }
    });

    // Close when a nav link is tapped
    $$('a', navLinks).forEach(link => {
      link.addEventListener('click', () => close(hamburger, navLinks));
    });
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════════════════
   SCROLL MANAGER
   Smooth-scrolls anchor links with navbar offset compensation.
   ════════════════════════════════════════════════════════════════════ */
const ScrollManager = (() => {
  const NAV_HEIGHT = 80; // px — keep in sync with CSS --nav-h

  function scrollToTarget(targetEl) {
    const top = targetEl.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function init() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (!id || id === '#') return;
        const target = $(id);
        if (target) {
          e.preventDefault();
          scrollToTarget(target);
        }
      });
    });
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════════════════
   SUBMISSION MODAL
   Builds and manages the assignment-submitted confirmation modal.
   ════════════════════════════════════════════════════════════════════ */
const SubmissionModal = (() => {
  /** Build modal HTML and return the root element. */
  function createModal() {
    const overlay = document.createElement('div');
    overlay.id               = 'submission-modal';
    overlay.className        = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'modal-heading');
    overlay.setAttribute('aria-describedby', 'modal-subtext');

    overlay.innerHTML = `
      <div class="modal-card">
        <button class="modal-close" id="modal-close-btn" aria-label="Close dialog">✕</button>
        <div class="modal-content">

          <div class="modal-badge-wrapper">
            <span class="modal-badge">Week 1 · Task 3 · Submitted</span>
          </div>

          <h2 class="modal-heading" id="modal-heading">Assignment Submitted</h2>

          <p class="modal-subtext" id="modal-subtext">
            Your CSS Challenge has been successfully submitted to WeIntern.
            Our team will review your implementation shortly.
          </p>

          <div class="modal-divider" role="separator"></div>

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

          <div class="modal-divider" role="separator"></div>

          <div class="modal-buttons">
            <button class="btn-modal-secondary" id="modal-view-btn">View Submission</button>
            <button class="btn-modal-primary"   id="modal-done-btn">Done</button>
          </div>

          <p class="modal-legal">Submitted assignments are reviewed within 2–3 business days.</p>

        </div>
      </div>
    `;

    return overlay;
  }

  function show() {
    // Prevent duplicate modals
    if ($('#submission-modal')) return;

    const overlay     = createModal();
    const previousFocus = document.activeElement;

    document.body.appendChild(overlay);
    document.body.classList.add('modal-open');

    // Trigger enter animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('show'));
    });

    // Focus first focusable element
    const closeBtn = $('#modal-close-btn', overlay);
    if (closeBtn) closeBtn.focus();

    // Trap focus
    const releaseTrap = trapFocus(overlay);

    function dismiss() {
      releaseTrap();
      overlay.classList.remove('show');
      document.body.classList.remove('modal-open');

      // Remove after transition completes
      function onTransitionEnd(e) {
        if (e.target === overlay) {
          overlay.removeEventListener('transitionend', onTransitionEnd);
          overlay.remove();
          // Restore focus to the element that opened the modal
          if (previousFocus) previousFocus.focus();
        }
      }

      overlay.addEventListener('transitionend', onTransitionEnd);

      // Fallback removal
      setTimeout(() => { if (overlay.isConnected) overlay.remove(); }, 450);
    }

    // Bind close triggers
    $('#modal-close-btn', overlay)?.addEventListener('click', () => { AudioSynth.playClick(); dismiss(); });
    $('#modal-done-btn',  overlay)?.addEventListener('click', () => { AudioSynth.playClick(); dismiss(); });
    $('#modal-view-btn',  overlay)?.addEventListener('click', () => { AudioSynth.playClick(); /* future nav */ });

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) { AudioSynth.playClick(); dismiss(); }
    });

    // Close on Escape
    function onKeydown(e) {
      if (e.key === 'Escape') { document.removeEventListener('keydown', onKeydown); dismiss(); }
    }
    document.addEventListener('keydown', onKeydown);
  }

  function init() {
    // Bind all submit triggers: desktop CTA + mobile CTA in drawer
    $$('#submit-btn, #submit-btn-mobile').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        AudioSynth.playClick();
        show();
      });
    });
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════════════════
   ACTIVE NAV LINK HIGHLIGHTER
   Highlights the current section link using IntersectionObserver.
   ════════════════════════════════════════════════════════════════════ */
const NavHighlighter = (() => {
  function init() {
    if (!('IntersectionObserver' in window)) return;

    const navLinks = $$('.nav-link[href^="#"]');
    const sections = navLinks
      .map(a => $(a.getAttribute('href')))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach(a => {
            const isActive = a.getAttribute('href') === `#${id}`;
            a.style.color = isActive ? 'var(--color-primary)' : '';
          });
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach(s => observer.observe(s));
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════════════════
   INITIALIZATION
   ════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  RevealObserver.init();
  TactileEffects.init();
  MobileNavigation.init();
  ScrollManager.init();
  SubmissionModal.init();
  NavHighlighter.init();
});
