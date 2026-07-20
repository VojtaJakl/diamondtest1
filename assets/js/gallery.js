/* ==================================================
   GALLERY LIGHTBOX
================================================== */

const galleryItems = document.querySelectorAll(".gallery-item");
const galleryImages = [...document.querySelectorAll(".gallery-item img")];

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let currentIndex = 0;

if (
    lightbox &&
    lightboxImage &&
    closeBtn &&
    prevBtn &&
    nextBtn &&
    galleryItems.length
) {

    // Otevření lightboxu
    function openLightbox(index){

        currentIndex = index;

        lightboxImage.src = galleryImages[currentIndex].src;
        lightboxImage.alt = galleryImages[currentIndex].alt;

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";

    }

    // Zavření
    function closeLightbox(){

        lightbox.classList.remove("active");
        document.body.style.overflow = "";

    }

    // Další obrázek
    function nextImage(){

        currentIndex++;

        if(currentIndex >= galleryImages.length){

            currentIndex = 0;

        }

        lightboxImage.src = galleryImages[currentIndex].src;
        lightboxImage.alt = galleryImages[currentIndex].alt;

    }

    // Předchozí obrázek
    function prevImage(){

        currentIndex--;

        if(currentIndex < 0){

            currentIndex = galleryImages.length - 1;

        }

        lightboxImage.src = galleryImages[currentIndex].src;
        lightboxImage.alt = galleryImages[currentIndex].alt;

    }

    // Klik na galerii
    galleryItems.forEach((item,index)=>{

        item.addEventListener("click",()=>{

            openLightbox(index);

        });

    });

    // Zavření
    closeBtn.addEventListener("click",(e)=>{

        e.stopPropagation();

        closeLightbox();

    });

    // Klik mimo obrázek
    lightbox.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            closeLightbox();

        }

    });

    // Šipky
    nextBtn.addEventListener("click",(e)=>{

        e.stopPropagation();

        nextImage();

    });

    prevBtn.addEventListener("click",(e)=>{

        e.stopPropagation();

        prevImage();

    });

    // Klávesnice
    document.addEventListener("keydown",(e)=>{

        if(!lightbox.classList.contains("active")) return;

        if(e.key==="Escape"){

            closeLightbox();

        }

        if(e.key==="ArrowRight"){

            nextImage();

        }

        if(e.key==="ArrowLeft"){

            prevImage();

        }

    });

    /* ===========================
       Swipe v lightboxu
    =========================== */

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener("touchstart",(e)=>{

        touchStartX = e.changedTouches[0].screenX;

    });

    lightbox.addEventListener("touchend",(e)=>{

        touchEndX = e.changedTouches[0].screenX;

        handleSwipe();

    });

    function handleSwipe(){

        const swipeDistance = touchEndX - touchStartX;

        if(Math.abs(swipeDistance) < 50) return;

        if(swipeDistance < 0){

            nextImage();

        }else{

            prevImage();

        }

    }

}

/* ===========================
   Mobilní indikátor galerie
=========================== */

const galleryGrid = document.querySelector(".gallery-grid");
const dotsContainer = document.querySelector(".gallery-dots");

if (galleryGrid && dotsContainer) {

    const items = [...galleryGrid.querySelectorAll(".gallery-item")];

    items.forEach((_, index) => {

        const dot = document.createElement("span");

        if (index === 0) {

            dot.classList.add("active");

        }

        dotsContainer.appendChild(dot);

    });

    const dots = dotsContainer.querySelectorAll("span");

    function updateDots() {

        const cardWidth = items[0].offsetWidth + 16;
        const index = Math.round(galleryGrid.scrollLeft / cardWidth);

        dots.forEach(dot => dot.classList.remove("active"));

        if (dots[index]) {

            dots[index].classList.add("active");

        }

    }

    galleryGrid.addEventListener("scroll", updateDots);

}

/* ==================================================
   GALLERY STAGGER
================================================== */

galleryItems.forEach((item, index) => {

    item.classList.add("reveal-scale");

    item.style.transitionDelay = `${index * 80}ms`;

});