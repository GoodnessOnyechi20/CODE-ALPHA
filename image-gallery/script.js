const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const counter = document.getElementById("counter");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;
let visibleItems = [...galleryItems];

function updateLightbox() {
    const item = visibleItems[currentIndex];

    lightboxImage.src = item.dataset.image + "?auto=format&fit=crop&w=1400";
    lightboxTitle.textContent = item.dataset.title;
    counter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
}

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

function showNext() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightbox();
}

function showPrevious() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
}

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        visibleItems = galleryItems.filter(
            galleryItem => galleryItem.style.display !== "none"
        );

        openLightbox(visibleItems.indexOf(item));
    });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrevious);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrevious();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {
            const matches = filter === "all" || item.dataset.category === filter;
            item.style.display = matches ? "block" : "none";
        });
    });
});
