    const header = document.getElementById("site-header");
    const menuButton = document.getElementById("menu-button");
    const navLinks = document.getElementById("nav-links");
    const navItems = [...navLinks.querySelectorAll("a")];
    const sections = [...document.querySelectorAll("main section[id]")];
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

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
      });

    // (Optional) Close menu when clicking a nav link
    navItems.forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
