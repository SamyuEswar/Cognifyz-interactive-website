/* ================================================
   THE HOLLOW TABLE — script.js
   Form Validation & Interactivity
   ================================================ */

'use strict';

/* ── Particle Background ───────────────────────── */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const COUNT = 28;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${6 + Math.random() * 10}s;
      --delay: ${Math.random() * 12}s;
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
})();


/* ── DOM References ─────────────────────────────── */
const form           = document.getElementById('supperForm');
const successCard    = document.getElementById('successCard');
const newResBtn      = document.getElementById('newReservationBtn');
const togglePassBtn  = document.getElementById('togglePass');
const secretPassInput= document.getElementById('secretPass');
const strengthFill   = document.getElementById('strengthFill');
const strengthLabel  = document.getElementById('strengthLabel');
const messageInput   = document.getElementById('message');
const charCount      = document.getElementById('charCount');

/* ── Minimum booking date = tomorrow ───────────── */
(function setMinDate() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];
})();


/* ══════════════════════════════════════════════════
   VALIDATION RULES
   Each rule: { test(value, form) → bool, msg }
   ══════════════════════════════════════════════════ */
const RULES = {
  firstName: [
    { test: v => v.trim().length > 0,  msg: 'First name is required.' },
    { test: v => v.trim().length >= 2, msg: 'Must be at least 2 characters.' },
    { test: v => /^[a-zA-Z\s'-]+$/.test(v.trim()), msg: 'Only letters, spaces, hyphens and apostrophes allowed.' }
  ],
  lastName: [
    { test: v => v.trim().length > 0,  msg: 'Last name is required.' },
    { test: v => v.trim().length >= 2, msg: 'Must be at least 2 characters.' },
    { test: v => /^[a-zA-Z\s'-]+$/.test(v.trim()), msg: 'Only letters, spaces, hyphens and apostrophes allowed.' }
  ],
  email: [
    { test: v => v.trim().length > 0, msg: 'Email address is required.' },
    { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: 'Please enter a valid email address.' }
  ],
  phone: [
    { test: v => v.trim().length > 0, msg: 'Phone number is required.' },
    { test: v => /^[\+\d][\d\s\-\(\)]{6,14}$/.test(v.trim()), msg: 'Enter a valid phone number (7–15 digits).' }
  ],
  date: [
    { test: v => v.trim().length > 0, msg: 'Please choose a preferred date.' },
    {
      test: v => {
        const chosen = new Date(v);
        const today  = new Date();
        today.setHours(0, 0, 0, 0);
        return chosen > today;
      },
      msg: 'Date must be in the future.'
    }
  ],
  guests: [
    { test: v => v.trim().length > 0, msg: 'Please specify the number of guests.' },
    { test: v => Number(v) >= 1,       msg: 'At least 1 guest is required.' },
    { test: v => Number(v) <= 8,       msg: 'Maximum 8 guests per reservation.' },
    { test: v => Number.isInteger(Number(v)), msg: 'Please enter a whole number.' }
  ],
  cuisine: [
    { test: v => v.trim().length > 0, msg: 'Please choose a cuisine experience.' }
  ],
  secretPass: [
    { test: v => v.length > 0,   msg: 'A secret passphrase is required.' },
    { test: v => v.length >= 8,  msg: 'Must be at least 8 characters long.' },
    { test: v => /[0-9]/.test(v),      msg: 'Must contain at least one number.' },
    { test: v => /[^a-zA-Z0-9]/.test(v), msg: 'Must contain at least one symbol (e.g. !, @, #).' }
  ],
  howHeard: [
    { test: v => v.trim().length > 0, msg: 'Please tell us how you found us.' }
  ],
  message: [
    { test: v => v.length <= 300, msg: 'Note must be 300 characters or fewer.' }
  ],
  terms: [
    { test: (_, f) => f.querySelector('#terms').checked, msg: 'You must take the oath to proceed.' }
  ]
};


/* ── Utility: show / clear error ─────────────────── */
function showError(fieldId, message) {
  const fg  = document.getElementById(`fg-${fieldId}`);
  const err = document.getElementById(`err-${fieldId}`);
  const inp = document.getElementById(fieldId) ||
              document.querySelector(`[name="${fieldId}"]`);

  if (err) {
    err.textContent = message;
    err.classList.add('show');
  }
  if (fg)  fg.classList.add('has-error');
  if (inp && inp.classList) {
    inp.classList.remove('input-valid');
    inp.classList.add('input-error');
  }
}

function clearError(fieldId) {
  const fg  = document.getElementById(`fg-${fieldId}`);
  const err = document.getElementById(`err-${fieldId}`);
  const inp = document.getElementById(fieldId) ||
              document.querySelector(`[name="${fieldId}"]`);

  if (err) {
    err.textContent = '';
    err.classList.remove('show');
  }
  if (fg) fg.classList.remove('has-error');
  if (inp && inp.classList) inp.classList.remove('input-error');
}

function markValid(fieldId) {
  const inp = document.getElementById(fieldId);
  if (inp && inp.type !== 'checkbox' && inp.type !== 'radio') {
    inp.classList.remove('input-error');
    inp.classList.add('input-valid');
  }
}


/* ── Validate a single field ─────────────────────── */
function validateField(fieldId) {
  const rules = RULES[fieldId];
  if (!rules) return true;

  const inp = document.getElementById(fieldId) ||
              (fieldId === 'terms' ? document.getElementById('terms') : null);
  const value = inp ? inp.value : '';

  for (const rule of rules) {
    if (!rule.test(value, form)) {
      showError(fieldId, rule.msg);
      return false;
    }
  }
  clearError(fieldId);
  if (fieldId !== 'terms') markValid(fieldId);
  return true;
}


/* ── Validate entire form ────────────────────────── */
function validateAll() {
  const fields = [
    'firstName', 'lastName', 'email', 'phone',
    'date', 'guests', 'cuisine',
    'secretPass', 'howHeard', 'message', 'terms'
  ];
  let allValid = true;
  let firstErrorField = null;

  fields.forEach(id => {
    const valid = validateField(id);
    if (!valid) {
      allValid = false;
      if (!firstErrorField) firstErrorField = id;
    }
  });

  // Scroll to and shake first error
  if (firstErrorField) {
    const el = document.getElementById(firstErrorField) ||
               document.getElementById(`fg-${firstErrorField}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.remove('shake');
      void el.offsetWidth; // reflow
      el.classList.add('shake');
      el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
    }
  }

  return allValid;
}


/* ── Real-time validation on blur ────────────────── */
const textFields = ['firstName', 'lastName', 'email', 'phone', 'date', 'guests', 'secretPass', 'howHeard', 'message'];
textFields.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;

  // Validate on blur
  el.addEventListener('blur', () => {
    if (el.value.trim() !== '' || id === 'date') {
      validateField(id);
    }
  });

  // Clear error on input (revalidate when field has been touched)
  el.addEventListener('input', () => {
    if (document.getElementById(`err-${id}`)?.classList.contains('show')) {
      validateField(id);
    }
  });
});

// Select fields
['cuisine', 'howHeard'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('change', () => validateField(id));
});

// Terms checkbox
document.getElementById('terms')?.addEventListener('change', () => validateField('terms'));


/* ── Checkbox / Radio visual update ─────────────── */
document.querySelectorAll('.checkbox-label').forEach(label => {
  const cb = label.querySelector('.cb-input');
  if (!cb) return;
  cb.addEventListener('change', () => {
    label.classList.toggle('selected', cb.checked);
  });
});

document.querySelectorAll('.radio-label').forEach(label => {
  const rb = label.querySelector('.rb-input');
  if (!rb) return;

  // Set initial state
  if (rb.checked) label.classList.add('selected');

  rb.addEventListener('change', () => {
    // Deselect all siblings in the same name group
    document.querySelectorAll(`input[name="${rb.name}"]`).forEach(r => {
      r.closest('.radio-label')?.classList.remove('selected');
    });
    label.classList.add('selected');
  });
});

// Init "Just a dinner" as selected
document.getElementById('occ-none')?.closest('.radio-label')?.classList.add('selected');


/* ── Password Toggle ─────────────────────────────── */
if (togglePassBtn && secretPassInput) {
  togglePassBtn.addEventListener('click', () => {
    const isPassword = secretPassInput.type === 'password';
    secretPassInput.type = isPassword ? 'text' : 'password';
    togglePassBtn.textContent = isPassword ? '🙈' : '👁';
    togglePassBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
}


/* ── Password Strength Meter ─────────────────────── */
function assessStrength(password) {
  if (!password) return { score: 0, label: 'Enter a passphrase', cls: '' };

  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak',   cls: 'weak' };
  if (score === 2) return { score, label: 'Fair',   cls: 'fair' };
  if (score === 3) return { score, label: 'Good',   cls: 'good' };
  return              { score, label: 'Strong', cls: 'strong' };
}

secretPassInput?.addEventListener('input', () => {
  const result = assessStrength(secretPassInput.value);
  strengthFill.className = `strength-fill ${result.cls}`;
  strengthLabel.textContent = result.label;
  strengthLabel.style.color =
    result.cls === 'strong' ? '#5aad6f' :
    result.cls === 'good'   ? '#c9a252' :
    result.cls === 'fair'   ? '#d4873a' :
    result.cls === 'weak'   ? '#e05a44' :
    'var(--text-muted)';
});


/* ── Character Counter ───────────────────────────── */
messageInput?.addEventListener('input', () => {
  const len = messageInput.value.length;
  const max = 300;
  charCount.textContent = `${len} / ${max}`;
  charCount.className = 'char-count';
  if (len >= max)       charCount.classList.add('at-limit');
  else if (len >= 250)  charCount.classList.add('near-limit');
});


/* ── Form Submit ─────────────────────────────────── */
form?.addEventListener('submit', function (e) {
  e.preventDefault();

  const isValid = validateAll();
  if (!isValid) return;

  // Animate the button
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Sending…';
  btn.querySelector('.btn-icon').textContent = '⏳';

  // Simulate async request (1.8s)
  setTimeout(() => {
    form.hidden = true;
    successCard.hidden = false;
    successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1800);
});


/* ── Reset Form ──────────────────────────────────── */
form?.addEventListener('reset', () => {
  // Clear all visual states after reset
  setTimeout(() => {
    // Clear errors
    document.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
      el.classList.remove('show');
    });
    document.querySelectorAll('.field-group').forEach(el => el.classList.remove('has-error'));
    document.querySelectorAll('.field-input').forEach(el => {
      el.classList.remove('input-valid', 'input-error');
    });

    // Reset checkbox/radio selected states
    document.querySelectorAll('.checkbox-label, .radio-label').forEach(label => {
      label.classList.remove('selected');
    });
    document.getElementById('occ-none')?.closest('.radio-label')?.classList.add('selected');

    // Reset strength meter
    if (strengthFill) {
      strengthFill.className = 'strength-fill';
      strengthLabel.textContent = 'Enter a passphrase';
      strengthLabel.style.color = '';
    }

    // Reset char count
    if (charCount) charCount.textContent = '0 / 300';

    // Reset toggle
    if (secretPassInput) secretPassInput.type = 'password';
    if (togglePassBtn) {
      togglePassBtn.textContent = '👁';
      togglePassBtn.setAttribute('aria-label', 'Show password');
    }
  }, 0);
});


/* ── New Reservation ─────────────────────────────── */
newResBtn?.addEventListener('click', () => {
  successCard.hidden = true;
  form.hidden = false;
  form.reset();

  // Re-enable submit button
  const btn = document.getElementById('submitBtn');
  btn.disabled = false;
  btn.querySelector('.btn-text').textContent = 'Request My Seat';
  btn.querySelector('.btn-icon').textContent = '→';

  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── Subtle input focus glow animation ───────────── */
document.querySelectorAll('.field-input').forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.input-wrapper')?.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.closest('.input-wrapper')?.classList.remove('focused');
  });
});
