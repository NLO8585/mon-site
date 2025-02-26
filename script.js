document.addEventListener("DOMContentLoaded", () => {
  /* === ANIMATION DES BLOCS SERVICES (SCROLL) === */
  const serviceBlocks = document.querySelectorAll(".service-block");
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("scrolled", entry.isIntersecting);
    });
  }, { threshold: 0.8 });

  serviceBlocks.forEach(block => serviceObserver.observe(block));

  /* === ANIMATION DES COMPTEURS === */
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    
    function updateCount() {
      current += target / 100;
      counter.innerText = Math.ceil(current);

      if (current < target) {
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    }

    updateCount();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target); // Désactiver après exécution
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* === MODE PLEIN ÉCRAN POUR IMAGES === */
  function openFullscreen(img) {
    const fullscreenImage = document.createElement("img");
    fullscreenImage.src = img.src;
    Object.assign(fullscreenImage.style, {
      position: "fixed", top: "0", left: "0",
      width: "100%", height: "100%",
      objectFit: "contain", zIndex: "1000",
      cursor: "zoom-out"
    });
    fullscreenImage.onclick = () => document.body.removeChild(fullscreenImage);
    document.body.appendChild(fullscreenImage);
  }
  window.openFullscreen = openFullscreen; // Rendre accessible globalement

  /* === SIMULATEUR (NAVIGATION ENTRE ÉTAPES) === */
  const choices = document.querySelectorAll(".choice, .sector_choice, .particulier_choice");
  const backLinks = document.querySelectorAll(".retour");

  choices.forEach(choice => {
    choice.addEventListener("click", () => {
      const currentStep = document.querySelector(".step.active");
      const nextStep = document.querySelector(`.step[data-step="${choice.getAttribute("data-next")}"]`);

      if (currentStep && nextStep) {
        currentStep.classList.add("exit-left");
        nextStep.classList.add("enter-right");
        setTimeout(() => {
          currentStep.classList.remove("active", "exit-left");
          nextStep.classList.remove("enter-right");
          nextStep.classList.add("active");
        }, 300);
      }
    });
  });

  backLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const currentStep = document.querySelector(".step.active");
      const previousStep = document.querySelector(`.step[data-step="${currentStep.dataset.previousStep}"]`);

      if (currentStep && previousStep) {
        currentStep.classList.add("exit-right");
        previousStep.classList.add("enter-left");
        setTimeout(() => {
          currentStep.classList.remove("active", "exit-right");
          previousStep.classList.remove("enter-left");
          previousStep.classList.add("active");
        }, 300);
      }
    });
  });

  /* === ANIMATION LOGOS "ILS NOUS ONT FAIT CONFIANCE" === */
  const track = document.querySelector(".logo-track");
  if (track) {
    const logos = Array.from(track.children);
    const clonedLogos = logos.map(logo => logo.cloneNode(true));
    clonedLogos.forEach(logo => track.appendChild(logo));
  }

  /* === ANIMATION "QUI SUIS-JE" === */
  const texte = document.getElementById("texte");
  if (texte) {
    const texteObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          texte.style.opacity = "1";
          texte.style.transform = "translateX(0)";
        }
      });
    }, { threshold: 0.6 });

    texteObserver.observe(texte);
  }

  /* === SCROLL VERS SECTION SUIVANTE === */
  window.scrollToNextSection = () => {
    const nextSection = document.querySelector(".section1");
    if (nextSection) {
      window.scrollTo({ top: nextSection.offsetTop, behavior: "smooth" });
    }
  };
});
/* Hamburger menu*/
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".sommaire");

  function toggleMenu(event) {
      event.stopPropagation();
      menu.classList.toggle("active");
      hamburger.classList.toggle("active");
  }

  function closeMenu(event) {
      if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
          menu.classList.remove("active");
          hamburger.classList.remove("active");
      }
  }

  // Gérer les événements pour les écrans tactiles et desktop
  hamburger.addEventListener("click", toggleMenu);
  hamburger.addEventListener("touchstart", toggleMenu); // Support tactile
  document.addEventListener("click", closeMenu);
  document.addEventListener("touchstart", closeMenu); // Support tactile
});
