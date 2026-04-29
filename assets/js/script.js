
/**
 * Checks if the navigation tabs are overflowing and shows/hides scroll buttons.
 */
function checkTabOverflow() {
  const tabNav = document.getElementById("tabNav");
  const scrollLeftBtn = document.getElementById("scrollLeftBtn");
  const scrollRightBtn = document.getElementById("scrollRightBtn");
  const tabWrapper = document.querySelector(".tab-wrapper");

  if (!tabNav || !scrollLeftBtn || !scrollRightBtn || !tabWrapper) return;

  const isOverflowing = tabNav.scrollWidth > tabNav.clientWidth;

  if (isOverflowing) {
    tabWrapper.classList.add("has-buttons");
    scrollRightBtn.classList.add("show");
  } else {
    tabWrapper.classList.remove("has-buttons");
    scrollLeftBtn.classList.remove("show");
    scrollRightBtn.classList.remove("show");
  }

  // Update button visibility based on scroll position
  if (isOverflowing) {
    // Hide left button if at the start
    if (tabNav.scrollLeft === 0) {
      scrollLeftBtn.classList.remove("show");
    } else {
      scrollLeftBtn.classList.add("show");
    }

    // Hide right button if at the end
    if (tabNav.scrollLeft + tabNav.clientWidth >= tabNav.scrollWidth - 1) { // -1 for a small buffer
      scrollRightBtn.classList.remove("show");
    } else {
      scrollRightBtn.classList.add("show");
    }
  }
}

/**
 * Scrolls the tab navigation left or right.
 * @param {string} direction - "left" or "right"
 */
function scrollTabs(direction) {
  const tabNav = document.getElementById("tabNav");
  const scrollAmount = tabNav.clientWidth / 2; // Scroll half a viewport
  if (direction === "left") {
    tabNav.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else if (direction === "right") {
    tabNav.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

// Add event listeners
window.addEventListener("resize", checkTabOverflow);
window.addEventListener("DOMContentLoaded", () => {
  // Existing DOMContentLoaded logic
  // ... (your existing code) ...
  
  // Add new logic for buttons
  checkTabOverflow();
  const tabNav = document.getElementById("tabNav");
  const scrollLeftBtn = document.getElementById("scrollLeftBtn");
  const scrollRightBtn = document.getElementById("scrollRightBtn");

  if (tabNav) {
    tabNav.addEventListener("scroll", checkTabOverflow);
  }
  
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener("click", () => scrollTabs("left"));
  }
  
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener("click", () => scrollTabs("right"));
  }
});

// ── Back to top ──
const backToTopBtn = document.getElementById('backToTopBtn');
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Navbar ──
const navMenu       = document.getElementById('navMenu');
const navOverlay    = document.getElementById('navOverlay');
const menuToggleBtn = document.getElementById('menuToggle');
const dropdowns     = navMenu.querySelectorAll('.dropdown > .dropdown-toggle');

// Open / close mobile drawer
menuToggleBtn.addEventListener('click', function () {
  const isOpen = navMenu.classList.contains('open');
  if (!isOpen) {
    navMenu.classList.add('open');
    navOverlay.classList.add('active');
    menuToggleBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    closeMobileMenu();
  }
});

navOverlay.addEventListener('click', closeMobileMenu);

document.addEventListener('mousedown', function (e) {
  if (window.innerWidth < 900 && navMenu.classList.contains('open')) {
    if (!navMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

function closeMobileMenu() {
  navMenu.classList.remove('open');
  navOverlay.classList.remove('active');
  menuToggleBtn.classList.remove('open');
  document.body.style.overflow = '';
  navMenu.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('open'));
}

// Mobile accordion — desktop uses CSS :hover
dropdowns.forEach(drop => {
  drop.addEventListener('click', function (e) {
    if (window.innerWidth >= 900) return;
    e.preventDefault();
    const parent = this.parentElement;
    const isOpen = parent.classList.contains('open');
    navMenu.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('open'));
    if (!isOpen) parent.classList.add('open');
  });
});

// Close desktop dropdowns on outside click
document.addEventListener('mousedown', function (e) {
  if (window.innerWidth >= 900) {
    navMenu.querySelectorAll('.dropdown').forEach(dd => {
      if (!dd.contains(e.target)) dd.classList.remove('open');
    });
  }
});

// ── stickyInputWrap adjustment (if the element exists on this page) ──
const stickyInputWrap = document.getElementById('stickyInputWrap');
function adjustStickyInput() {
  if (!stickyInputWrap) return;
  let offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 60;
  if (window.innerWidth < 900) {
    const openDropdown = navMenu.querySelector('.dropdown.open .dropdown-content');
    if (openDropdown) offset += openDropdown.offsetHeight;
  }
  stickyInputWrap.style.top = offset + 'px';
}
if (stickyInputWrap) {
  navMenu.addEventListener('transitionend', adjustStickyInput);
  window.addEventListener('resize', adjustStickyInput);
  navMenu.addEventListener('click', adjustStickyInput);
  adjustStickyInput();
}

// ── Tab scroll buttons (for pages that have them) ──
function checkTabOverflow() {
  const tabNav = document.getElementById('tabNav');
  const scrollLeftBtn = document.getElementById('scrollLeftBtn');
  const scrollRightBtn = document.getElementById('scrollRightBtn');
  const tabWrapper = document.querySelector('.tab-wrapper');
  if (!tabNav || !scrollLeftBtn || !scrollRightBtn || !tabWrapper) return;
  const isOverflowing = tabNav.scrollWidth > tabNav.clientWidth;
  if (isOverflowing) {
    tabWrapper.classList.add('has-buttons');
    scrollRightBtn.classList.add('show');
  } else {
    tabWrapper.classList.remove('has-buttons');
    scrollLeftBtn.classList.remove('show');
    scrollRightBtn.classList.remove('show');
  }
  if (isOverflowing) {
    if (tabNav.scrollLeft === 0) scrollLeftBtn.classList.remove('show');
    else scrollLeftBtn.classList.add('show');
    if (tabNav.scrollLeft + tabNav.clientWidth >= tabNav.scrollWidth - 1) scrollRightBtn.classList.remove('show');
    else scrollRightBtn.classList.add('show');
  }
}
function scrollTabs(direction) {
  const tabNav = document.getElementById('tabNav');
  if (!tabNav) return;
  const scrollAmount = tabNav.clientWidth / 2;
  tabNav.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
}
window.addEventListener('resize', checkTabOverflow);

// ── Search box shrink on scroll ──
window.addEventListener('scroll', () => {
  const searchBox = document.getElementById('searchSection');
  if (!searchBox) return;
  if (window.scrollY > 30) searchBox.classList.add('shrink');
  else searchBox.classList.remove('shrink');
});

// ── Cookie helpers ──
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let c of cookies) {
    const [key, value] = c.split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return '';
}
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// ── Copy to clipboard ──
function copyToClipboard(id) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => {
    const note = document.getElementById('copyNotification');
    if (note) {
      note.textContent = el.textContent + ' Copied!';
      note.style.display = 'block';
      setTimeout(() => { note.style.display = 'none'; }, 1500);
    }
  });
}

function addCopyIcons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    if (!btn.innerHTML.trim()) {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
        </svg>
        <span class="copy-text">Copy</span>`;
    }
  });
}

// ── DOMContentLoaded ──
window.addEventListener('DOMContentLoaded', () => {
  const saved = getCookie('fontInput');
  const input = document.getElementById('userInput');
  const clearBtn = document.querySelector('.clear-btn');

  if (input) {
    if (saved) {
      input.value = saved;
      if (typeof updateOutputs === 'function') updateOutputs(saved);
      if (clearBtn) clearBtn.style.display = 'inline';
    } else {
      const placeholderText = input.getAttribute('placeholder');
      if (placeholderText && placeholderText !== 'Type something...') {
        if (typeof updateOutputs === 'function') updateOutputs(placeholderText);
      } else {
        if (typeof updateOutputs === 'function') updateOutputs('');
      }
      if (clearBtn) clearBtn.style.display = 'none';
    }
  } else {
    if (saved && typeof updateOutputs === 'function') updateOutputs(saved);
  }

  addCopyIcons();
  checkTabOverflow();

  const tabNav = document.getElementById('tabNav');
  const scrollLeftBtn = document.getElementById('scrollLeftBtn');
  const scrollRightBtn = document.getElementById('scrollRightBtn');
  if (tabNav) tabNav.addEventListener('scroll', checkTabOverflow);
  if (scrollLeftBtn) scrollLeftBtn.addEventListener('click', () => scrollTabs('left'));
  if (scrollRightBtn) scrollRightBtn.addEventListener('click', () => scrollTabs('right'));
});
