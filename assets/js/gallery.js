/* ==================================================
   GALLERY FILTER + LIGHTBOX
================================================== */

const galleryGroups = document.querySelectorAll(".gallery-group");
const galleryCategories = document.querySelectorAll(".gallery-category");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let currentGallery = [];
let currentIndex = 0;


/* ==================================================
   GALLERY FILTER
================================================== */

galleryCategories.forEach(category => {

    category.addEventListener("click", () => {

        const filter = category.dataset.filter;

        /* Aktivní box */

        galleryCategories.forEach(item => {
            item.classList.remove("active");
        });

        category.classList.add("active");


        /* Přepnutí galerie */

        galleryGroups.forEach(group => {

            if (group.dataset.group === filter) {

                group.hidden = false;

            } else {

                group.hidden = true;

            }

        });


        /* Připravíme aktuální galerii pro lightbox */

        setTimeout(() => {

            prepareCurrentGallery(filter);

            restartRevealAnimation();

        }, 50);

    });

});


/* ==================================================
   AKTUÁLNÍ GALERIE
================================================== */

function prepareCurrentGallery(filter) {

    const activeGroup = document.querySelector(
        `.gallery-group[data-group="${filter}"]`
    );

    if (!activeGroup) {

        currentGallery = [];

        return;

    }

    currentGallery = [
        ...activeGroup.querySelectorAll(".gallery-item img")
    ];

}


/* ==================================================
   START
================================================== */

prepareCurrentGallery("all");


/* ==================================================
   LIGHTBOX
================================================== */

function openLightbox(index) {

    if (!currentGallery.length) return;

    currentIndex = index;

    lightboxImage.src = currentGallery[currentIndex].src;
    lightboxImage.alt = currentGallery[currentIndex].alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


function showImage(index) {

    if (!currentGallery.length) return;

    currentIndex = index;

    lightboxImage.src = currentGallery[currentIndex].src;
    lightboxImage.alt = currentGallery[currentIndex].alt;

}


/* ==================================================
   NEXT
================================================== */

function nextImage() {

    if (!currentGallery.length) return;

    currentIndex++;

    if (currentIndex >= currentGallery.length) {

        currentIndex = 0;

    }

    showImage(currentIndex);

}


/* ==================================================
   PREVIOUS
================================================== */

function prevImage() {

    if (!currentGallery.length) return;

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentGallery.length - 1;

    }

    showImage(currentIndex);

}


/* ==================================================
   KLIKNUTÍ NA OBRÁZEK
================================================== */

galleryGroups.forEach(group => {

    const items = group.querySelectorAll(".gallery-item");

    items.forEach(item => {

        item.addEventListener("click", () => {

            /* Najdeme galerii, ve které se kliklo */

            const images = [
                ...group.querySelectorAll(".gallery-item img")
            ];

            currentGallery = images;

            const clickedImage = item.querySelector("img");

            currentIndex = images.indexOf(clickedImage);

            openLightbox(currentIndex);

        });

    });

});


/* ==================================================
   CLOSE
================================================== */

if (closeBtn) {

    closeBtn.addEventListener("click", e => {

        e.stopPropagation();

        closeLightbox();

    });

}


/* ==================================================
   CLICK OUTSIDE
================================================== */

if (lightbox) {

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            closeLightbox();

        }

    });

}


/* ==================================================
   NEXT / PREVIOUS BUTTONS
================================================== */

if (nextBtn) {

    nextBtn.addEventListener("click", e => {

        e.stopPropagation();

        nextImage();

    });

}


if (prevBtn) {

    prevBtn.addEventListener("click", e => {

        e.stopPropagation();

        prevImage();

    });

}


/* ==================================================
   KEYBOARD
================================================== */

document.addEventListener("keydown", e => {

    if (!lightbox || !lightbox.classList.contains("active")) return;


    if (e.key === "Escape") {

        closeLightbox();

    }


    if (e.key === "ArrowRight") {

        nextImage();

    }


    if (e.key === "ArrowLeft") {

        prevImage();

    }

});


/* ==================================================
   SWIPE
================================================== */

let touchStartX = 0;
let touchEndX = 0;


if (lightbox) {

    lightbox.addEventListener("touchstart", e => {

        touchStartX = e.changedTouches[0].screenX;

    });


    lightbox.addEventListener("touchend", e => {

        touchEndX = e.changedTouches[0].screenX;

        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 50) return;


        if (distance < 0) {

            nextImage();

        } else {

            prevImage();

        }

    });

}


/* ==================================================
   RESTART REVEAL ANIMATION
================================================== */

function restartRevealAnimation() {

    const visibleGroup = [...galleryGroups]
        .find(group => !group.hidden);

    if (!visibleGroup) return;


    const items = visibleGroup.querySelectorAll(".gallery-item");


    items.forEach((item, index) => {

        item.classList.remove("reveal-scale");

        item.style.transitionDelay = "0ms";

        /* restart CSS animation */

        void item.offsetWidth;

        item.classList.add("reveal-scale");

        item.style.transitionDelay = `${Math.min(index, 12) * 60}ms`;

    });

}


/* ==================================================
   GALLERY STAGGER
================================================== */

restartRevealAnimation();


/* ==================================================
   MOBILNÍ SWIPE INDIKÁTOR
================================================== */

const galleryGroupsForMobile =
    document.querySelectorAll(".gallery-group");

galleryGroupsForMobile.forEach(group => {

    const grid = group.querySelector(".gallery-grid");

    const currentNumber =
        group.querySelector(".gallery-current");

    const totalNumber =
        group.querySelector(".gallery-total");

    if (!grid || !currentNumber || !totalNumber) return;

    const items =
        [...grid.querySelectorAll(".gallery-item")];

    if (!items.length) return;

    totalNumber.textContent =
        String(items.length).padStart(2, "0");

    function updateMobileProgress() {

        const firstItem = items[0];

        if (!firstItem) return;

        const gap = 16;

        const itemWidth =
            firstItem.offsetWidth + gap;

        if (!itemWidth) return;

        let index =
            Math.round(grid.scrollLeft / itemWidth);

        index = Math.max(
            0,
            Math.min(index, items.length - 1)
        );

        currentNumber.textContent =
            String(index + 1).padStart(2, "0");

    }

    grid.addEventListener(
        "scroll",
        updateMobileProgress,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateMobileProgress
    );

    updateMobileProgress();

});