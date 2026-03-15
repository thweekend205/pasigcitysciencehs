const header = document.querySelector(".site-header");
const materialCards = document.querySelectorAll(".material-card");

function syncHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

/* Smooth toggle for material cards */
function toggleMaterialCard(targetCard) {
  materialCards.forEach(card => {
    const panel = card.querySelector(".material-panel");
    const button = card.querySelector(".material-toggle");
    const isTarget = card === targetCard;

    card.classList.toggle("is-open", isTarget);
    if (button) button.setAttribute("aria-expanded", String(isTarget));

    if (panel) {
      if (isTarget) {
        // Slide down to panel height
        panel.style.height = panel.scrollHeight + "px";
      } else {
        // Slide up
        panel.style.height = "0px";
      }
    }
  });
}

/* Event listeners */
materialCards.forEach(card => {
  const button = card.querySelector(".material-toggle");
  if (!button) return;

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    toggleMaterialCard(isExpanded ? null : card);
  });
});

/* Header scroll effect */
window.addEventListener("scroll", syncHeaderState, { passive: true });
window.addEventListener("load", syncHeaderState);

        const footer = document.querySelector('.site-footer');
        const trigger = document.querySelector('#footer-trigger'); // New target

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px 200px 0px', // Footer triggers 200px before reaching the bottom
            threshold: 0.6
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('is-active');
                } else {
                    footer.classList.remove('is-active');
                }
            });
        }, observerOptions);

        if (trigger) {
            observer.observe(trigger);
        }