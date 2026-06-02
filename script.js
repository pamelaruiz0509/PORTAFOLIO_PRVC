/**
 * Portafolio Pamela Ruíz — Interactividad
 */

(function () {
  "use strict";

  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll("#navMenu .nav-link");
  const sections = document.querySelectorAll("section[id], header[id]");
  const yearEl = document.getElementById("year");

  /* Año dinámico en footer */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Navbar: sombra al hacer scroll */
  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  /* Resaltar enlace activo según sección visible */
  function setActiveNavLink() {
    const scrollPos = window.scrollY + nav.offsetHeight + 80;
    let currentId = "inicio";

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === "#" + currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink, { passive: true });
  setActiveNavLink();

  /* Cerrar menú móvil al hacer clic en un enlace */
  const navCollapse = document.getElementById("navMenu");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse && navCollapse.classList.contains("show")) {
        const toggler = document.querySelector(".navbar-toggler");
        if (toggler && typeof bootstrap !== "undefined") {
          const instance = bootstrap.Collapse.getInstance(navCollapse);
          if (instance) instance.hide();
        }
      }
    });
  });

  /* Animación reveal al entrar en viewport */
  const revealTargets = document.querySelectorAll(
    ".skill-card, .project-card, .resumen-card, .edu-card, .cert-list li, .contact-card"
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      }
    );

    revealTargets.forEach(function (el, index) {
      el.style.transitionDelay = (index % 4) * 0.08 + "s";
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* Smooth scroll con offset para navbar fija */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      if (anchor.classList.contains("is-disabled")) return;

      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    });
  });
})();
