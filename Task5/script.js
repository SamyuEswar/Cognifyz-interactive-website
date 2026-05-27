/* ==========================================================================
   TASK 5 – WORLD EXPLORER LOGIC
   Topic: REST Countries API Integration
   API Base: https://restcountries.com/v3.1
   ========================================================================== */

'use strict';

// ── CONSTANTS & STATE ──
const API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca3,population,region,languages,currencies,flags,capital,subregion,maps';

let allCountries = [];
let filteredCountries = [];
let displayedCount = 24;
const INCREMENT = 24;

// ── DOM ELEMENTS ──
const $ = id => document.getElementById(id);
const dom = {
  badgeDot: $('badge-dot'),
  badgeLabel: $('badge-label'),

  // Stats
  statCountries: $('stat-countries'),
  statPopulation: $('stat-population'),
  statRegions: $('stat-regions'),
  statLanguages: $('stat-languages'),

  // Controls
  searchInput: $('search-input'),
  clearBtn: $('clear-btn'),
  filterWrap: $('filter-wrap'),

  // Cards Grid
  cardsGrid: $('cards-grid'),
  resultsMeta: $('results-meta'),
  loadMoreWrap: $('load-more-wrap'),
  loadMoreBtn: $('load-more-btn'),

  // Modal
  modalOverlay: $('modal-overlay'),
  modal: $('modal'),
  modalClose: $('modal-close'),
  modalBody: $('modal-body'),
};

/* ──────────────────────────────────────────────────────────────────────────
   API CONSOLE LOGGING (Piped to Browser Console)
   ────────────────────────────────────────────────────────────────────────── */
function logEntry(message, type = 'info') {
  const now = new Date();
  const timeStr = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(num => String(num).padStart(2, '0'))
    .join(':');

  const label = type.toUpperCase();
  console.log(`[${timeStr}] [${label}] ${message}`);
}

/* ──────────────────────────────────────────────────────────────────────────
   STATUS BADGE CONTROL
   ────────────────────────────────────────────────────────────────────────── */
function setStatus(state, label) {
  dom.badgeDot.className = 'badge-dot';
  if (state) dom.badgeDot.classList.add(state);
  dom.badgeLabel.textContent = label;
}

/* ──────────────────────────────────────────────────────────────────────────
   API DATA FETCH (fetch() & parse JSON)
   ────────────────────────────────────────────────────────────────────────── */
async function fetchCountries() {
  logEntry('Initializing API Request...', 'info');
  setStatus('connecting', 'Connecting...');
  
  try {
    logEntry(`fetch("${API_URL}")`, 'info');
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    logEntry('Parsing response payload as JSON...', 'info');
    const data = await response.json();
    
    // Sort alphabetically by common name
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));

    allCountries = data;
    filteredCountries = data;

    logEntry(`Successfully parsed ${data.length} countries.`, 'success');
    setStatus('connected', 'Live Data');
    
    calculateAndRenderStats(data);
    filterAndRender();

  } catch (error) {
    console.error('REST Countries API Fetch Failed:', error);
    logEntry(`Error: ${error.message}`, 'error');
    setStatus('error', 'API Error');
    renderErrorState(error.message);
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   CALCULATE & ANIMATE STATS
   ────────────────────────────────────────────────────────────────────────── */
function calculateAndRenderStats(countries) {
  const totalCountries = countries.length;
  
  // Total Population
  const totalPopulation = countries.reduce((sum, c) => sum + (c.population || 0), 0);
  
  // Distinct Regions
  const regionsSet = new Set(countries.map(c => c.region).filter(Boolean));
  const totalRegions = regionsSet.size;

  // Distinct Languages
  const languagesSet = new Set();
  countries.forEach(c => {
    if (c.languages) {
      Object.values(c.languages).forEach(lang => languagesSet.add(lang));
    }
  });
  const totalLanguages = languagesSet.size;

  // Animate Count Ups
  animateCount(dom.statCountries, totalCountries);
  animateCount(dom.statPopulation, totalPopulation, true);
  animateCount(dom.statRegions, totalRegions);
  animateCount(dom.statLanguages, totalLanguages);
}

function animateCount(el, target, formatCompact = false) {
  const duration = 1200;
  const startTime = performance.now();
  const startVal = 0;

  function updateNumber(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Out-Quart easing
    const ease = 1 - Math.pow(1 - progress, 4);
    const currentVal = Math.round(startVal + (target - startVal) * ease);

    if (formatCompact) {
      el.textContent = formatCompactNumber(currentVal);
    } else {
      el.textContent = currentVal.toLocaleString('en-IN');
    }

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

function formatCompactNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + ' B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + ' M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(0) + ' K';
  }
  return num.toString();
}

/* ──────────────────────────────────────────────────────────────────────────
   FILTER & SEARCH ENGINE
   ────────────────────────────────────────────────────────────────────────── */
function filterAndRender(resetPagination = true) {
  if (resetPagination) {
    displayedCount = INCREMENT;
  }

  const query = dom.searchInput.value.toLowerCase().trim();
  const activeFilterBtn = dom.filterWrap.querySelector('.filter-btn.active');
  const region = activeFilterBtn ? activeFilterBtn.dataset.region : 'all';

  // Toggle clear search button visibility
  dom.clearBtn.style.display = query ? 'block' : 'none';

  // Apply filters
  filteredCountries = allCountries.filter(c => {
    // Region Filter
    if (region !== 'all' && c.region !== region) return false;

    // Search Query
    if (query) {
      const nameCommon = (c.name?.common || '').toLowerCase();
      const nameOfficial = (c.name?.official || '').toLowerCase();
      const capital = (c.capital?.[0] || '').toLowerCase();
      const code = (c.cca3 || '').toLowerCase();

      return nameCommon.includes(query) || 
             nameOfficial.includes(query) || 
             capital.includes(query) ||
             code.includes(query);
    }

    return true;
  });

  // Render cards
  renderCards();
}

/* ──────────────────────────────────────────────────────────────────────────
   DOM CARD RENDERING
   ────────────────────────────────────────────────────────────────────────── */
function renderCards() {
  const count = filteredCountries.length;
  dom.resultsMeta.innerHTML = `Showing <strong>${Math.min(displayedCount, count)}</strong> of <strong>${count}</strong> countries found`;

  if (count === 0) {
    dom.cardsGrid.innerHTML = `
      <div class="error-state">
        <span class="error-icon">🔍</span>
        <div class="error-title">No countries match your search</div>
        <div class="error-desc">Try checking your spelling or selection filters.</div>
      </div>
    `;
    dom.loadMoreWrap.style.display = 'none';
    return;
  }

  const sliceToRender = filteredCountries.slice(0, displayedCount);
  
  dom.cardsGrid.innerHTML = sliceToRender.map((country, index) => {
    const formattedPop = country.population ? country.population.toLocaleString('en-IN') : 'Unknown';
    const capital = country.capital?.[0] || 'N/A';
    const subregion = country.subregion || 'N/A';
    
    // Languages tags
    const langs = country.languages ? Object.values(country.languages).slice(0, 2) : [];

    return `
      <div class="country-card" onclick="openCountryDetail('${country.cca3}')" style="animation-delay: ${index % 8 * 0.05}s">
        <div class="flag-wrap">
          <img class="flag-img" src="${country.flags?.svg || country.flags?.png || ''}" alt="Flag of ${country.name.common}" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="card-title" title="${country.name.common}">${country.name.common}</div>
          <div class="card-info">
            <div class="card-row">
              <span class="lbl">Capital</span>
              <span class="val">${capital}</span>
            </div>
            <div class="card-row">
              <span class="lbl">Population</span>
              <span class="val">${formattedPop}</span>
            </div>
            <div class="card-row">
              <span class="lbl">Region</span>
              <span class="val">${country.region || 'N/A'}</span>
            </div>
          </div>
          <div class="card-tags">
            <span class="card-tag accent">${country.cca3}</span>
            ${langs.map(l => `<span class="card-tag">${l}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Manage load more button
  if (displayedCount < count) {
    dom.loadMoreWrap.style.display = 'flex';
  } else {
    dom.loadMoreWrap.style.display = 'none';
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   COUNTRY DETAIL MODAL WORKFLOW
   ────────────────────────────────────────────────────────────────────────── */
window.openCountryDetail = function(cca3) {
  const country = allCountries.find(c => c.cca3 === cca3);
  if (!country) return;

  logEntry(`Displaying specifications for: ${country.name.common}`, 'info');

  const currencies = country.currencies 
    ? Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol || ''})`).join(', ')
    : 'N/A';
    
  const languages = country.languages 
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  dom.modalBody.innerHTML = `
    <div class="modal-hero">
      <img class="modal-flag" src="${country.flags?.svg || country.flags?.png || ''}" alt="Flag of ${country.name.common}" />
      <div class="modal-flag-overlay"></div>
      <div class="modal-header-text">
        <div class="modal-name-row">
          <h2 class="modal-name" id="modal-name">${country.name.common}</h2>
        </div>
        <p class="modal-official">${country.name.official || ''}</p>
      </div>
    </div>
    
    <div class="modal-content">
      <div class="modal-grid-stats">
        <div class="modal-stat-group">
          <span class="modal-stat-label">Capital City</span>
          <span class="modal-stat-val">${country.capital?.[0] || 'N/A'}</span>
        </div>
        <div class="modal-stat-group">
          <span class="modal-stat-label">Total Population</span>
          <span class="modal-stat-val">${country.population ? country.population.toLocaleString('en-IN') : 'N/A'}</span>
        </div>
        <div class="modal-stat-group">
          <span class="modal-stat-label">Region / Continent</span>
          <span class="modal-stat-val">${country.region || 'N/A'}</span>
        </div>
        <div class="modal-stat-group">
          <span class="modal-stat-label">Subregion</span>
          <span class="modal-stat-val">${country.subregion || 'N/A'}</span>
        </div>
        <div class="modal-stat-group">
          <span class="modal-stat-label">ISO Code (CCA3)</span>
          <span class="modal-stat-val">${country.cca3 || 'N/A'}</span>
        </div>
        <div class="modal-stat-group">
          <span class="modal-stat-label">Currencies Used</span>
          <span class="modal-stat-val">${currencies}</span>
        </div>
      </div>
      
      <div class="modal-stat-group">
        <span class="modal-stat-label">Official Languages Spoken</span>
        <span class="modal-stat-val">${languages}</span>
      </div>

      ${country.maps?.googleMaps ? `
        <a class="modal-map-link" href="${country.maps.googleMaps}" target="_blank" rel="noopener">
          📍 View Interactive Google Map ↗
        </a>
      ` : ''}
    </div>
  `;

  dom.modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // Disable page scrolling
};

function closeModal() {
  dom.modalOverlay.classList.remove('open');
  document.body.style.overflow = ''; // Re-enable page scrolling
}

/* ──────────────────────────────────────────────────────────────────────────
   ERROR STATE HANDLER
   ────────────────────────────────────────────────────────────────────────── */
function renderErrorState(message) {
  dom.cardsGrid.innerHTML = `
    <div class="error-state">
      <span class="error-icon">⚠️</span>
      <div class="error-title">API Connection Failed</div>
      <div class="error-desc">We encountered an issue fetching live country data: <strong>${message}</strong></div>
      <button class="retry-btn" onclick="retryConnection()">Retry Connection</button>
    </div>
  `;
  dom.loadMoreWrap.style.display = 'none';
}

window.retryConnection = function() {
  fetchCountries();
};

/* ──────────────────────────────────────────────────────────────────────────
   EVENT LISTENERS SETUP
   ────────────────────────────────────────────────────────────────────────── */
function setupEventListeners() {
  // Search Input Interaction
  dom.searchInput.addEventListener('input', () => filterAndRender(true));
  
  // Clear Search Action
  dom.clearBtn.addEventListener('click', () => {
    dom.searchInput.value = '';
    filterAndRender(true);
    dom.searchInput.focus();
  });

  // Region Filter Selector
  dom.filterWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    dom.filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    logEntry(`Filter changed: Region = ${btn.textContent}`, 'info');
    filterAndRender(true);
  });

  // Load More Button Interaction
  dom.loadMoreBtn.addEventListener('click', () => {
    displayedCount += INCREMENT;
    logEntry(`Loading next ${INCREMENT} countries...`, 'info');
    renderCards();
  });

  // Close Modal Events
  dom.modalClose.addEventListener('click', closeModal);
  dom.modalOverlay.addEventListener('click', (e) => {
    if (e.target === dom.modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dom.modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ──────────────────────────────────────────────────────────────────────────
   INITIALIZING APP
   ────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  logEntry('DOM parsed. Configuring application engine...', 'success');
  setupEventListeners();
  fetchCountries();
});
