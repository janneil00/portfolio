    · JS
const header = document.getElementById("site-header");
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const navItems = [...navLinks.querySelectorAll("a")];
const sections = [...document.querySelectorAll("main section[id]")];
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearEl = document.getElementById("current-year");
 
// Add a background to the header after scrolling.
function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 20);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
 
// Mobile navigation.
menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-controls", navLinks.id);
  document.body.classList.toggle("menu-open", isOpen);
});
 
// Close menu when clicking a nav link.
navItems.forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});
 
// Highlight the current section's nav link while scrolling.
if (sections.length && navItems.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navItems.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => navObserver.observe(section));
}
 
// Scroll-reveal for .reveal and .reveal-up elements.
const revealTargets = [
  ...document.querySelectorAll(".reveal"),
  ...document.querySelectorAll(".reveal-up"),
];
 
if (revealTargets.length) {
  // Apply each card's data-delay as a CSS custom property for staggering.
  revealTargets.forEach((el) => {
    const delay = el.getAttribute("data-delay");
    if (delay) {
      el.style.setProperty("--reveal-delay", delay);
    }
  });
 
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
 
  revealTargets.forEach((el) => revealObserver.observe(el));
}
 
// Contact form: opens the visitor's email client with a pre-filled message.
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
 
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const subject = contactForm.subject.value.trim();
  const message = contactForm.message.value.trim();
 
  if (!name || !email || !subject || !message) {
    if (formStatus) formStatus.textContent = "Please fill in every field before sending.";
    return;
  }
 
  const body = `From: ${name} (${email})\n\n${message}`;
  const mailto = `mailto:janneilveranga28@example.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
 
  window.location.href = mailto;
 
  if (formStatus) {
    formStatus.textContent = "Opening your email app…";
  }
});
 
// Footer year.
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
