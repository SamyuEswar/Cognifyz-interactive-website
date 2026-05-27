# 🌐 Interactive Website Development — Cognifyz Internship Tasks

**Organization:** Cognifyz Technologies  
**Project:** Interactive Website Development  
**Objective:** To build a responsive and interactive website that incorporates various front-end development techniques — from basic HTML structure to advanced API integration and CSS preprocessing.

---

## 📁 Project Structure

```
interactive-website/
├── Task1/      — Basic HTML Page             [Level 1: Beginner]
├── Task2/      — Styling with Inline CSS     [Level 1: Beginner]
├── Task3/      — Responsive Design           [Level 2: Intermediate]
├── Task4/      — Interactive Button          [Level 2: Intermediate]
├── Task5/      — API Integration             [Level 3: Advanced]
├── Task6/      — Form Styling & Validation   [Level 3: Advanced]
├── Task7/      — Component-Based Styling     [Level 4: Expert]
└── Task8/      — CSS Preprocessing (SCSS)    [Level 4: Expert]
```

---

## 🟢 Level 1: Beginner

---

### 📄 Task 1 — Basic HTML Page

**Assigned Objective:**  
Create an HTML file with the basic structure, add a title, insert headings, paragraphs, and an image, then open it in a browser to verify rendering.

**Theme I Built:** *Abyssal Wonders — Deep Sea Exploration*  
**Files:** `index.html`, `deep_sea.png`, `anglerfish.png`, `octopus.png`, `deep_vent.png`

**What I Did:**
- Created `index.html` with proper `<html>`, `<head>`, and `<body>` tags
- Added a descriptive `<title>` — *"Abyssal Wonders: Deep Sea Exploration"*
- Used `<h1>`, `<h2>` headings for page and section titles
- Added `<p>` paragraphs with educational content about the Mariana Trench
- Inserted multiple images inside a 2×2 CSS Grid gallery (`deep_sea.png`, `anglerfish.png`, etc.)
- Added a `<ul>` list covering ocean depth zones (Twilight, Midnight, Abyssal, Hadal)
- Included a `<button>` that reveals a hidden fun fact using inline JavaScript
- Styled entirely with **embedded CSS** inside a `<style>` block in `<head>`
- Applied a deep-ocean `linear-gradient` background, glowing `text-shadow`, and image hover effects
- Verified rendering in the browser — all content displayed correctly

**Technologies Used:** HTML5 · Embedded CSS · CSS Grid · CSS Hover Transitions · Inline JavaScript

---

### 🎨 Task 2 — Styling with Inline CSS

**Assigned Objective:**  
Apply inline CSS styles directly within HTML elements to change font color, size, and background color, then experiment with different styles and view changes in the browser.

**Theme I Built:** *Cosmic Wonders — Space Exploration Light Theme*  
**Files:** `index.html` (100% inline CSS, no external stylesheet)

**What I Did:**
- Applied all CSS using the `style=""` attribute directly on every HTML element — no `<style>` tag, no external file
- Changed **font color** using `color: #0f172a`, `color: #64748b`, etc. on headings and paragraphs
- Changed **font sizes** across elements — `font-size: 4.5rem` for hero heading, `1.1rem` for card text
- Changed **background color** — soft gradient `background: linear-gradient(135deg, #f6f8fd, #f1f5f9)` on `<body>`
- Experimented with multiple style variations:
  - Glassmorphism header with `backdrop-filter: blur(20px)` and `rgba()` backgrounds
  - Three content cards — each with a **unique accent color** (Purple, Rose Red, Emerald Green)
  - Gradient text on the main `<h1>` using `-webkit-background-clip: text`
  - Hover animations via `onmouseover` / `onmouseout` inline event handlers (scale, lift, shadow)
- Saved the file and verified all style changes rendered correctly in the browser

**Technologies Used:** HTML5 · Inline CSS only · CSS Gradients · Flexbox (inline) · Hover Animations

---

## 🔵 Level 2: Intermediate

---

### 📱 Task 3 — Responsive Design

**Assigned Objective:**  
Use media queries in a separate CSS file (`styles.css`) to make the webpage responsive, adjusting layout and element sizes for different screen sizes, and test by resizing the browser.

**Theme I Built:** *Vitalé — Healthy Living & Wellness Hub*  
**Files:** `index.html`, `styles.css`

**What I Did:**
- Created a **separate `styles.css` file** and linked it with `<link rel="stylesheet" href="styles.css">`
- Wrote **CSS media queries** (`@media (max-width: 768px)`, `@media (max-width: 480px)`) to handle:
  - Collapsing multi-column card grids to single column on mobile
  - Stacking the 7-day workout schedule grid on small screens
  - Hiding/showing the hamburger nav menu for mobile devices
  - Adjusting font sizes and padding for readability on small screens
- Built a fully responsive **sticky navbar** that collapses into a hamburger menu on mobile
- Created a responsive **hero section** with two-column layout that stacks on mobile
- Built a **data table** (meal plan) with horizontal scroll on small screens
- Added a **scrolling fact ticker bar** (horizontal marquee-style animation)
- Used `IntersectionObserver` JS API for scroll-triggered reveal animations
- Tested responsiveness by resizing the browser window at multiple breakpoints (320px, 768px, 1024px, 1440px)

**Technologies Used:** HTML5 · External CSS · CSS Media Queries · CSS Grid · Flexbox · Google Fonts (`Plus Jakarta Sans`) · JavaScript (IntersectionObserver)

---

### 🔘 Task 4 — Interactive Button

**Assigned Objective:**  
Add a button element to `index.html`, write JavaScript (in `<script>` or `script.js`) to change the background color when the button is clicked, and test the color change functionality.

**Theme I Built:** *Mission Control — Space Exploration Mission Sequence*  
**Files:** `index.html`, `styles.css`, `script.js`

**What I Did:**
- Added a prominent `<button id="launch-btn">` to `index.html`
- Wrote JavaScript in a **separate `script.js` file** to handle the button click
- On each click, the button **cycles through 5 mission phases**, and the page **background color changes** dynamically with each phase:
  - Phase 0 — Standby: dark navy (`#0a0e1a`)
  - Phase 1 — Launch: deep red-orange (`#1a0a00`)
  - Phase 2 — Orbit: teal-black (`#001a1a`)
  - Phase 3 — Deep Space: dark purple (`#0d001a`)
  - Phase 4 — Planet: dark green (`#001a08`)
- Used `document.body.style.background` to apply the color change
- Also updated heading text, description, and stat numbers per phase via DOM manipulation
- Added a **mission log** that appends a new timestamped entry each time the button is clicked
- Added an animated `<canvas>` starfield using the Canvas API
- Tested functionality — background changes correctly on every button click through all phases

**Technologies Used:** HTML5 · External CSS · JavaScript (`script.js`) · DOM Manipulation · HTML Canvas API · CSS `@keyframes` · Google Fonts (`Orbitron`)

---

## 🟠 Level 3: Advanced

---

### 🌐 Task 5 — API Integration

**Assigned Objective:**  
Choose a public API, use `fetch()` in `script.js` to retrieve data, parse the JSON, and dynamically update the DOM to display the fetched information.

**Theme I Built:** *World Explorer — Browse Every Country on Earth*  
**Files:** `index.html`, `styles.css`, `script.js`

**API Used:** [REST Countries API v3.1](https://restcountries.com) — `https://restcountries.com/v3.1/all`

**What I Did:**
- Chose the **REST Countries public API** (similar to JSONPlaceholder but richer in real-world data)
- Used **`fetch()`** in `script.js` to make an async HTTP GET request to the API endpoint
- Used **`async/await`** pattern for clean asynchronous code
- Called **`.json()`** to parse the raw API response into a JavaScript object
- Dynamically **updated the DOM** to display:
  - 250+ country cards with flag image, name, capital, region, and population
  - Live stats bar (total countries, world population, regions count, language count)
  - An API connection status badge ("Connected ✅" / "Error ❌")
- Added **real-time search** — `input` event listener filters cards instantly as user types
- Added **region filter buttons** — clicking Africa / Asia / Europe etc. filters the grid
- Implemented **skeleton loading placeholders** shown while `fetch()` is in progress
- Added a **"Load More" button** for pagination (renders 24 cards at a time)
- Added a **country detail modal** that opens on card click with more info
- Handled errors with `try/catch` and displayed a friendly error message if API fails

**Technologies Used:** HTML5 · External CSS · JavaScript (`fetch`, `async/await`, `JSON`) · DOM Manipulation · REST Countries API · IntersectionObserver · Google Fonts (`Outfit`, `JetBrains Mono`)

---

### 📋 Task 6 — Form Styling and Validation

**Assigned Objective:**  
Design a form in `index.html` with input fields and labels, style the form in `styles.css`, implement client-side form validation in `script.js` to validate user input before submission, and provide feedback about validation errors.

**Theme I Built:** *The Hollow Table — Secret Supper Club Reservation Form*  
**Files:** `index.html`, `styles.css`, `script.js`

**What I Did:**
- Designed a rich **multi-section form** in `index.html` with:
  - `<input type="text">` — First Name, Last Name
  - `<input type="email">` — Email Address (regex validated)
  - `<input type="tel">` — Phone Number (10–15 digit validated)
  - `<input type="date">` — Preferred Date (must be future date)
  - `<input type="number">` — Number of Guests (1–8 range)
  - `<select>` — Cuisine Experience and How Did You Hear of Us
  - `<input type="checkbox">` — Dietary requirements (Vegan, Gluten-Free, etc.)
  - `<input type="radio">` — Special occasion type
  - `<input type="password">` — Secret passphrase
  - `<textarea>` — Message to chef
- **Styled the form** in `styles.css` with:
  - Dark elegant theme using `Playfair Display` and `Cormorant Garamond` fonts
  - Custom-styled checkboxes and radio buttons (CSS `appearance: none` + pseudo-elements)
  - Icon prefixes inside each input wrapper
  - Animated focus states with glowing border
- **Implemented client-side validation** in `script.js`:
  - Each field validated on `blur` (when user leaves) and re-validated on `input` (as user types)
  - Specific error messages displayed below each invalid field via `<span class="field-error">`
  - Form will not submit if any required field fails validation
- **Provided user feedback**:
  - Red border + error message text appears for invalid fields
  - Green border + hidden error for valid fields
  - **Password strength meter** — live scoring bar (Weak / Fair / Strong / Very Strong)
  - **Character counter** on textarea showing `0 / 300` live
  - Toggle password visibility button (👁)
  - On successful submit — form hides and a styled **success confirmation card** is shown

**Technologies Used:** HTML5 Forms · External CSS · JavaScript (`script.js`) · Regex Validation · DOM Manipulation · Custom CSS Checkboxes/Radios · Google Fonts (`Playfair Display`, `Inter`)

---

## 🔴 Level 4: Expert

---

### 🧩 Task 7 — Component-Based Styling (Bootstrap 5)

**Assigned Objective:**  
Refactor the webpage to use Bootstrap or another CSS framework, utilize framework components for layout, navigation, and other elements, and customize/style components to match design requirements.

**Theme I Built:** *DataMind Analytics — AI-Powered SaaS Platform Landing Page*  
**Files:** `index.html`, `styles.css`, `script.js`

**What I Did:**
- **Integrated Bootstrap 5.3** via CDN (`bootstrap.min.css` + `bootstrap.bundle.min.js`)
- **Also added Bootstrap Icons** library CDN for icon usage throughout
- Utilized the following **Bootstrap framework components**:
  - `Navbar` — responsive fixed-top navigation with `navbar-expand-lg` and mobile hamburger collapse
  - `Container / Row / Col` — Bootstrap grid system for all section layouts
  - `Cards` — for the 6 feature cards and 3 pricing tier cards
  - `Nav Pills (Tabs)` — "How It Works" section with 3 switchable tab panes (Connect / Analyse / Act)
  - `Accordion` — Tech Stack section with collapsible panels (Data Layer / AI Layer / Infrastructure)
  - `Progress Bars` — animated performance metric bars (Processing Speed, Accuracy, Uptime, Security)
  - `Alert / dismiss` — promotional banner with Bootstrap's `btn-close` dismiss functionality
  - `Badge` — "New" and "Beta" labels on feature cards
  - `Form controls` — `form-control`, `form-select`, `invalid-feedback` for the contact form
- **Customized and extended Bootstrap** with a `styles.css` file using `dm-*` prefixed classes:
  - Custom dark gradient hero section overriding Bootstrap defaults
  - Glowing gradient text on headings
  - Custom styled `.dm-feature-card`, `.dm-price-card`, `.dm-btn-primary` etc.
- Implemented **animated stat counters** using `IntersectionObserver` + `setInterval` JS
- Implemented **animated progress bars** triggered when scrolled into view
- Added Bootstrap **form validation** pattern (`needs-validation`, `novalidate`, `invalid-feedback`)

**Technologies Used:** Bootstrap 5.3 · Bootstrap Icons · HTML5 · Custom CSS · JavaScript · Google Fonts (`Inter`, `Space Grotesk`)

---

### ⚙️ Task 8 — Introduction to CSS Preprocessing (SCSS/Sass)

**Assigned Objective:**  
Install a CSS preprocessor (Sass), define variables for colors and font sizes in a separate `styles.scss` file, use nested styles and other preprocessing features, compile the Sass file into CSS, and link it to `index.html`.

**Theme I Built:** *Lumiere Pastry Co. — Interactive Sweet Lab & Dessert Builder*  
**Files:** `index.html`, `styles.scss`, `styles.css` (compiled), `script.js`

**What I Did:**
- **Set up Sass** as the CSS preprocessor for the project
- Created **`styles.scss`** with all preprocessing features:
  - **Variables** — defined color tokens like `$macaron-pink: #f9c6d0`, `$lavender: #c8b4e8`, `$mint: #b8e8d0`, `$peach: #ffd6a5`, `$cream: #fff8f0` and spacing/font variables
  - **Nested styles** — used Sass nesting for component styles e.g.:
    ```scss
    .builder-card {
      .card-header { ... }
      &:hover { ... }
      .lab-section {
        .option-card { ... }
      }
    }
    ```
  - **Mixins** — created reusable style blocks like `@mixin card-shadow` and `@mixin flex-center`
  - **`&` parent selector** — for hover states and modifier classes
  - **SCSS `@each`** — for generating filling color variations (lavender, rose, mint, peach)
- **Compiled `styles.scss` → `styles.css`** using the Sass compiler and linked the output CSS to `index.html`
- **Built the interactive page** using the compiled CSS:
  - Live dessert builder with base (Macaron / Tart / Choux), cream filling, and whimsical toppings selections
  - **Live DOM preview** — JS reads form changes and updates a visual pastry composition in real time
  - Custom-styled radio option cards and checkboxes using SCSS-defined variables
  - Floating candy particle animation system (🍬 🍭 🧁 🍰) generated by JavaScript
  - Form validation — name required, date must be future, time slot required
  - Success modal overlay revealed on valid form submission

**Technologies Used:** Sass / SCSS · Compiled CSS · HTML5 · JavaScript · DOM Manipulation · CSS `@keyframes` · Google Fonts (`Fredoka`, `Quicksand`)

---

## 🛠️ Full Technology Summary

| Task | Level | Key Technology Demonstrated |
|------|-------|-----------------------------|
| Task 1 | Beginner | HTML5 Structure · Embedded CSS · Basic JS |
| Task 2 | Beginner | Inline CSS · Font/Color/Background Styling |
| Task 3 | Intermediate | External CSS · Media Queries · Responsive Design |
| Task 4 | Intermediate | JavaScript · Button Events · Background Color Change |
| Task 5 | Advanced | `fetch()` · REST API · JSON · Dynamic DOM |
| Task 6 | Advanced | HTML Forms · CSS Styling · JS Validation · Error Feedback |
| Task 7 | Expert | Bootstrap 5 · Grid · Components · Framework Customization |
| Task 8 | Expert | Sass/SCSS · Variables · Nesting · Mixins · Compilation |

---

## 🚀 How to Run

All tasks are pure front-end — no server or build step needed for Tasks 1–7.

1. Open any task folder (e.g. `Task3/`)
2. Open `index.html` directly in a browser, **or** use **VS Code Live Server** extension
3. For **Task 5** — internet connection required (live API call to restcountries.com)
4. For **Task 8** — to re-compile SCSS after edits:
   ```bash
   sass Task8/styles.scss Task8/styles.css --watch
   ```

---

## 👨‍💻 Author

**Sam**  
Cognifyz Technologies — Front-End Development Internship, 2026
