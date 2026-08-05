const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".menu-overlay");

/* ===========================
   MENU
=========================== */

if (menuToggle && navLinks && overlay) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        overlay.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

    overlay.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            overlay.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    });

}

/* ===========================
   Navbar Scroll
=========================== */

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}

/* ===========================
   Aktivní navigace (jen homepage)
=========================== */

if(document.getElementById("hero")){

    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll",()=>{

        let current = "";

        sections.forEach(section=>{

            const top = section.offsetTop - 120;

            if(window.scrollY >= top){

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });

    });

}

/*====================================
    SCROLL REVEAL
====================================*/

const revealElements = document.querySelectorAll(
    ".reveal,.reveal-left,.reveal-right,.reveal-scale"
);

if (revealElements.length) {

    const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold:0.05,
    rootMargin:"0px 0px -60px 0px"

});

    revealElements.forEach(el => {

        revealObserver.observe(el);

    });

}

/*====================================
    HERO PARALLAX
====================================*/

const hero = document.querySelector("#hero");
const heroContent = document.querySelector(".hero-content");
const heroOverlay = document.querySelector(".hero-overlay");

if (
    hero &&
    heroContent &&
    heroOverlay &&
    window.innerWidth > 768
) {

    window.addEventListener("scroll", () => {

        const scroll = window.pageYOffset;

        if (scroll < window.innerHeight) {

            heroContent.style.transform =
                `translateY(${scroll * 0.18}px)`;

            heroOverlay.style.transform =
                `translateY(${scroll * 0.08}px)`;

        }

    });

}

/*====================================
    MAGNET BUTTONS
====================================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * .12}px, ${y * .12}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});