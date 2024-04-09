document.addEventListener("DOMContentLoaded", function() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"), // Changed selector to #wrapper
        smooth: true
    });
});
const container = document.querySelector('.moving-text-container');

// Disable user scrolling (optional)
container.addEventListener('touchmove', (event) => event.preventDefault(), { passive: false });
