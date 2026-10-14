document.addEventListener(“DOMContentLoaded”, function () {
const menuToggle = document.getElementById(“menuToggle”);
const navigation = document.getElementById(“navigation”);
const backToTop = document.getElementById(“backToTop”);
const year = document.getElementById(“year”);

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const navigationLinks = document.querySelectorAll(".navigation a");
// Automatically update the footer year.
if (year) {
    year.textContent = new Date().getFullYear();
}
// Mobile navigation menu.
if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.textContent = "☰";
        });
    });
    // Close the menu when tapping outside it.
    document.addEventListener("click", function (event) {
        const clickedInsideMenu = navigation.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);
        if (!clickedInsideMenu && !clickedToggle) {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.textContent = "☰";
        }
    });
}
// Project category filtering.
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });
        button.classList.add("active");
        projectCards.forEach(function (card) {
            const category = card.dataset.category;
            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;
            card.hidden = !shouldShow;
        });
    });
});
// Back-to-top button visibility.
function updateBackToTop() {
    if (backToTop) {
        backToTop.classList.toggle(
            "visible",
            window.scrollY > 400
        );
    }
}
window.addEventListener("scroll", updateBackToTop, {
    passive: true
});
updateBackToTop();
// Smoothly return to the top.
if (backToTop) {
    backToTop.addEventListener("click", function () {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });
    });
}
// Highlight navigation links based on the visible section.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                navigationLinks.forEach(function (link) {
                    const isCurrent =
                        link.getAttribute("href") ===
                        "#" + entry.target.id;
                    link.classList.toggle("active", isCurrent);
                });
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );
    sections.forEach(function (section) {
        observer.observe(section);
    });
}

});
