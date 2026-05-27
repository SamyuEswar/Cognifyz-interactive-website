/* ========================================================
   LUMIERE PASTRY CO. — script.js
   Interactive Dessert Customizer & Validation Lab
   ======================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Floating Pastel Particles Background
  const candyContainer = document.getElementById('candyContainer');
  const SWEET_EMOJIS = ['🍬', '🍭', '🌸', '✨', '🧁', '🍩', '🍪', '⭐'];

  const initFloatingSweets = () => {
    if (!candyContainer) return;
    const COUNT = 16;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'candy-particle';
      p.textContent = SWEET_EMOJIS[Math.floor(Math.random() * SWEET_EMOJIS.length)];
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${100 + Math.random() * 10}%;
        --dur: ${8 + Math.random() * 12}s;
        --delay: ${Math.random() * -10}s;
        font-size: ${1 + Math.random() * 1}rem;
        animation-delay: ${Math.random() * -10}s;
        animation-duration: ${6 + Math.random() * 10}s;
      `;
      candyContainer.appendChild(p);
    }
  };
  initFloatingSweets();

  // 2. DOM Elements for Customizer Preview
  const form            = document.getElementById('dessertForm');
  const vTopShell       = document.getElementById('vTopShell');
  const vFilling        = document.getElementById('vFilling');
  const vBottomShell    = document.getElementById('vBottomShell');
  const vToppings       = document.getElementById('vToppings');
  
  const formulaBase     = document.getElementById('formulaBase');
  const formulaFill     = document.getElementById('formulaFill');
  const formulaToppings = document.getElementById('formulaToppings');

  // Filling Pastel Color Maps
  const FILL_COLORS = {
    lavender: '#e6d6ff',
    rose:     '#ffd3e1',
    mint:     '#d3ffeb',
    peach:    '#ffe3d1'
  };

  const TOPPING_EMOJIS = {
    goldDust:   '✨',
    flowers:    '🌸',
    pearls:     '⚪',
    fairyFloss: '🦄'
  };

  // 3. Dessert Configuration Live Updater
  const updateDessertPreview = () => {
    // A. Base Pastry Shell Update
    const activeBase = form.querySelector('input[name="dessertBase"]:checked').value;
    
    // Reset classes
    vTopShell.className = 'pastry-element pastry-top-shell';
    vBottomShell.className = 'pastry-element pastry-bottom-shell';

    if (activeBase === 'macaron') {
      formulaBase.textContent = 'Double Macaron';
      vTopShell.style.backgroundColor = '#ffd3e1'; // Pink shell
      vBottomShell.style.backgroundColor = '#ffd3e1';
    } else if (activeBase === 'tart') {
      formulaBase.textContent = 'Buttery Tart Shell';
      vTopShell.classList.add('tart');
      vBottomShell.classList.add('tart');
      vBottomShell.style.backgroundColor = '#ffe3d1'; // Butter crust
    } else if (activeBase === 'choux') {
      formulaBase.textContent = 'Classic Choux Puff';
      vTopShell.classList.add('choux');
      vBottomShell.classList.add('choux');
      vTopShell.style.backgroundColor = '#ffe3d1';
      vBottomShell.style.backgroundColor = '#ffe3d1';
    }

    // B. Cream Filling Update
    const activeFillInput = form.querySelector('input[name="dessertFill"]:checked');
    const activeFill = activeFillInput.value;
    vFilling.style.backgroundColor = FILL_COLORS[activeFill] || '#fffaf0';
    formulaFill.textContent = activeFillInput.closest('.option-card').querySelector('.option-name').textContent + ' Cream';

    // C. Toppings Update
    vToppings.innerHTML = '';
    const selectedToppings = [];
    const checkedToppingInputs = form.querySelectorAll('input[name="toppings"]:checked');
    
    checkedToppingInputs.forEach((input, index) => {
      const val = input.value;
      selectedToppings.push(input.closest('.cb-option').querySelector('.cb-label').textContent);
      
      // Render floating preview emoji
      const emoji = document.createElement('div');
      emoji.className = 'v-topping';
      emoji.textContent = TOPPING_EMOJIS[val] || '✨';
      
      // Distribute topping emojis aesthetically on pastry top shell
      let topOffset = '30px';
      let leftOffset = '30px';
      if (index === 0) { leftOffset = '45px'; topOffset = '30px'; }
      if (index === 1) { leftOffset = '85px'; topOffset = '18px'; }
      if (index === 2) { leftOffset = '125px'; topOffset = '22px'; }
      if (index === 3) { leftOffset = '155px'; topOffset = '38px'; }

      emoji.style.left = leftOffset;
      emoji.style.top = topOffset;
      emoji.style.animationDelay = `${index * 0.4}s`;
      vToppings.appendChild(emoji);
    });

    formulaToppings.textContent = selectedToppings.length > 0 ? selectedToppings.join(', ') : 'Pure & Untouched';
  };

  // Attach Change Event Listeners to Form Inputs
  form.addEventListener('change', updateDessertPreview);
  updateDessertPreview(); // initial run

  // 4. Form Client-Side Validation
  const custNameInput = document.getElementById('custName');
  const dateInput     = document.getElementById('pickupDate');
  const timeSelect    = document.getElementById('pickupTime');

  const nameError     = document.getElementById('nameError');
  const dateError     = document.getElementById('dateError');
  const timeError     = document.getElementById('timeError');

  // Set minimum date constraint = tomorrow
  const setMinDateConstraint = () => {
    if (!dateInput) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  };
  setMinDateConstraint();

  const validateForm = () => {
    let isValid = true;

    // A. Validate Name
    if (custNameInput.value.trim().length < 3) {
      nameError.textContent = 'Enthusiast name must be at least 3 characters.';
      custNameInput.style.borderColor = '#ff8da1';
      isValid = false;
    } else {
      nameError.textContent = '';
      custNameInput.style.borderColor = 'transparent';
    }

    // B. Validate Date
    if (!dateInput.value) {
      dateError.textContent = 'Please choose a collection date.';
      dateInput.style.borderColor = '#ff8da1';
      isValid = false;
    } else {
      const chosen = new Date(dateInput.value);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (chosen <= today) {
        dateError.textContent = 'Collection date must be tomorrow or later.';
        dateInput.style.borderColor = '#ff8da1';
        isValid = false;
      } else {
        dateError.textContent = '';
        dateInput.style.borderColor = 'transparent';
      }
    }

    // C. Validate Time Select
    if (!timeSelect.value) {
      timeError.textContent = 'Please select a magical time window.';
      timeSelect.style.borderColor = '#ff8da1';
      isValid = false;
    } else {
      timeError.textContent = '';
      timeSelect.style.borderColor = 'transparent';
    }

    return isValid;
  };

  // Dynamic Validation on Input / Blur
  custNameInput.addEventListener('input', () => {
    if (custNameInput.value.trim().length >= 3) {
      nameError.textContent = '';
      custNameInput.style.borderColor = 'transparent';
    }
  });

  dateInput.addEventListener('change', () => {
    if (dateInput.value) {
      dateError.textContent = '';
      dateInput.style.borderColor = 'transparent';
    }
  });

  timeSelect.addEventListener('change', () => {
    if (timeSelect.value) {
      timeError.textContent = '';
      timeSelect.style.borderColor = 'transparent';
    }
  });

  // 5. Submit Event Handler
  const successModal = document.getElementById('successModal');
  const assembleBtn  = document.getElementById('assembleBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Show button action feedback
    assembleBtn.disabled = true;
    assembleBtn.querySelector('.btn-text').textContent = 'Baking your recipe...';

    // Simulate pastry registry database write
    setTimeout(() => {
      successModal.removeAttribute('hidden');
      assembleBtn.disabled = false;
      assembleBtn.querySelector('.btn-text').textContent = 'Order My Custom Confection';
    }, 1800);
  });

  // 6. Reset Lab Experience Button
  const resetLabBtn = document.getElementById('resetLabBtn');
  resetLabBtn.addEventListener('click', () => {
    successModal.setAttribute('hidden', '');
    form.reset();
    updateDessertPreview();
  });

});
