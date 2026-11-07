/* =========================================================
   MUSA AFTAB — PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};


/* =========================================================
   ELEMENTS
========================================================= */

const loader = $("#loader");
const loaderProgress = $("#loaderProgress");
const loaderPercent = $("#loaderPercent");

const navbar = $("#navbar");
const scrollProgress = $("#scrollProgress");

const cursorDot = $("#cursorDot");
const cursorRing = $("#cursorRing");

const hero = $("#home");
const heroContent = $(".hero-content");
const heroPortrait = $(".hero-portrait");
const heroGrid = $(".hero-grid-lines");

const revealElements = $$(".reveal");
const navLinks = $$(".nav-link");

const counters = $$(".counter");

const skillRows = $$(".skill-row");

const modal = $("#skillModal");
const modalBackdrop = $("#modalBackdrop");
const modalClose = $("#modalClose");

const modalNumber = $("#modalNumber");
const modalLabel = $("#modalLabel");
const modalTitle = $("#modalTitle");
const modalDescription = $("#modalDescription");
const modalFocus = $("#modalFocus");

const magneticElements = $$(".magnetic");
const tiltCards = $$(".tilt-card");


/* =========================================================
   LOADER
========================================================= */

let loaderValue = 0;

const loaderInterval = setInterval(() => {

    loaderValue +=
        Math.floor(Math.random() * 9) + 2;

    if (loaderValue >= 100) {

        loaderValue = 100;

        clearInterval(loaderInterval);
    }


    if (loaderProgress) {

        loaderProgress.style.width =
            `${loaderValue}%`;

    }


    if (loaderPercent) {

        loaderPercent.textContent =
            `${loaderValue}%`;

    }

}, 45);


window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {

            loader.classList.add(
                "hidden"
            );

        }


        /* -----------------------------------------
           FORCE HERO TO SHOW
           prevents blank first screen
        ------------------------------------------ */

        document
            .querySelectorAll(
                ".hero .reveal"
            )
            .forEach((element) => {

                element.classList.add(
                    "visible"
                );

            });


    }, 750);

});


/* =========================================================
   CURSOR
========================================================= */

const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    );


if (
    finePointer.matches &&
    cursorDot &&
    cursorRing
) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function updateCursor() {

        ringX +=
            (mouseX - ringX) *
            0.14;

        ringY +=
            (mouseY - ringY) *
            0.14;


        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            updateCursor
        );

    }


    updateCursor();


    /* -----------------------------------------
       CURSOR HOVER STATES
    ------------------------------------------ */

    const cursorTargets = [
        ...$$("a"),
        ...$$("button"),
        ...$$(".project-card"),
        ...$$(".portrait-frame")
    ];


    cursorTargets.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorRing.classList.add(
                        "active"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorRing.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

    const currentScroll =
        window.scrollY;

    const totalScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const percentage =
        totalScroll > 0
            ? (currentScroll / totalScroll) * 100
            : 0;


    if (scrollProgress) {

        scrollProgress.style.width =
            `${percentage}%`;

    }

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


/* =========================================================
   NAVBAR SCROLL
========================================================= */

function updateNavbar() {

    if (!navbar) {
        return;
    }


    if (window.scrollY > 50) {

        navbar.classList.add(
            "scrolled"
        );

    } else {

        navbar.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const pageSections =
    $$("main section[id]");


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        const currentId =
                            entry.target.id;


                        navLinks.forEach(
                            (link) => {

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    href ===
                                    `#${currentId}`
                                );

                            }
                        );

                    }

                }
            );

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


pageSections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

$$('a[href^="#"]').forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

magneticElements.forEach(
    (element) => {

        element.addEventListener(
            "mousemove",
            (event) => {

                if (!finePointer.matches) {
                    return;
                }


                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `
                    translate(
                        ${x * 0.12}px,
                        ${y * 0.12}px
                    )
                    `;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   HERO PORTRAIT PARALLAX
========================================================= */

window.addEventListener(
    "mousemove",
    (event) => {

        if (
            !finePointer.matches
        ) {
            return;
        }


        if (!heroPortrait) {
            return;
        }


        const x =
            (
                event.clientX /
                window.innerWidth
            ) - 0.5;


        const y =
            (
                event.clientY /
                window.innerHeight
            ) - 0.5;


        heroPortrait.style.transform =
            `
            translate(
                ${x * 10}px,
                ${y * 7}px
            )
            `;

    }
);


/* =========================================================
   HERO GRID PARALLAX
========================================================= */

window.addEventListener(
    "mousemove",
    (event) => {

        if (
            !finePointer.matches
        ) {
            return;
        }


        if (!heroGrid) {
            return;
        }


        const x =
            (
                event.clientX /
                window.innerWidth
            ) - 0.5;


        const y =
            (
                event.clientY /
                window.innerHeight
            ) - 0.5;


        heroGrid.style.transform =
            `
            perspective(550px)
            rotateX(61deg)
            translate(
                ${x * -15}px,
                ${y * -10}px
            )
            `;

    }
);


/* =========================================================
   PROJECT TILT
========================================================= */

tiltCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (!finePointer.matches) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    (
                        x /
                        rect.width
                        - 0.5
                    ) * 4;


                const rotateX =
                    (
                        y /
                        rect.height
                        - 0.5
                    ) * -4;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   COUNTERS
========================================================= */

const counterObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const counter =
                        entry.target;


                    const target =
                        Number(
                            counter.dataset.target
                        );


                    if (
                        Number.isNaN(target)
                    ) {
                        return;
                    }


                    const duration =
                        900;


                    const startTime =
                        performance.now();


                    function animateCounter(
                        currentTime
                    ) {

                        const progress =
                            Math.min(
                                (
                                    currentTime -
                                    startTime
                                ) / duration,
                                1
                            );


                        const value =
                            Math.floor(
                                progress * target
                            );


                        counter.textContent =
                            value;


                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                animateCounter
                            );

                        } else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        animateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                }
            );

        },
        {
            threshold: 0.6
        }
    );


counters.forEach(
    (counter) => {

        counterObserver.observe(
            counter
        );

    }
);


/* =========================================================
   SKILL DATA
========================================================= */

const skillData = {

    python: {

        number: "01",

        label: "PROGRAMMING",

        title: "PYTHON",

        description:
            "Developing programming fundamentals through Python, logical thinking, problem solving and practical experiments.",

        focus:
            "Programming & Logic"

    },


    editing: {

        number: "02",

        label: "CREATIVE",

        title: "VIDEO EDITING",

        description:
            "Working with cuts, pacing, visual presentation and creative editing to turn raw footage into engaging content.",

        focus:
            "Creative Production"

    },


    it: {

        number: "03",

        label: "TECHNOLOGY",

        title: "IT",

        description:
            "Exploring computers, operating systems, software, hardware and the wider world of information technology.",

        focus:
            "Information Technology"

    },


    networking: {

        number: "04",

        label: "INFRASTRUCTURE",

        title: "COMPUTER NETWORKING",

        description:
            "Learning how devices communicate, how networks operate and the fundamentals behind connected systems.",

        focus:
            "Networks & Connectivity"

    }

};


/* =========================================================
   OPEN SKILL MODAL
========================================================= */

function openSkillModal(skillName) {

    const skill =
        skillData[skillName];


    if (
        !skill ||
        !modal
    ) {
        return;
    }


    modalNumber.textContent =
        skill.number;


    modalLabel.textContent =
        skill.label;


    modalTitle.textContent =
        skill.title;


    modalDescription.textContent =
        skill.description;


    modalFocus.textContent =
        skill.focus;


    modal.classList.add(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


skillRows.forEach(
    (row) => {

        row.addEventListener(
            "click",
            () => {

                openSkillModal(
                    row.dataset.skill
                );

            }
        );

    }
);


/* =========================================================
   CLOSE SKILL MODAL
========================================================= */

function closeSkillModal() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeSkillModal
    );

}


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeSkillModal
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeSkillModal();

        }

    }
);


/* =========================================================
   PORTRAIT MOUSE EFFECT
========================================================= */

if (heroPortrait) {

    heroPortrait.addEventListener(
        "mouseenter",
        () => {

            if (
                !finePointer.matches
            ) {
                return;
            }


            const image =
                $(".portrait-image");

            if (!image) {
                return;
            }


            image.style.transform =
                "scale(1.07)";

        }
    );


    heroPortrait.addEventListener(
        "mouseleave",
        () => {

            const image =
                $(".portrait-image");

            if (!image) {
                return;
            }


            image.style.transform =
                "scale(1.03)";

        }
    );

}


/* =========================================================
   PORTRAIT ERROR CHECK
========================================================= */

const portraitImage =
    $(".portrait-image");


if (portraitImage) {

    portraitImage.addEventListener(
        "error",
        () => {

            portraitImage.style.opacity =
                "0.2";

        }
    );

}


/* =========================================================
   PROJECT IMAGE FALLBACK
========================================================= */

$$(".project-image img").forEach(
    (image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity =
                    "0";

            }
        );

    }
);


/* =========================================================
   VISIBILITY / TITLE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.title =
                "Musa Aftab | Web Developer";

        } else {

            document.title =
                "Musa Aftab | Web Developer & Website Designer";

        }

    }
);


/* =========================================================
   INITIAL SAFETY
========================================================= */

window.addEventListener(
    "load",
    () => {

        /*
            Extra safety:
            any hero reveal element that somehow
            remained hidden gets shown.
        */

        setTimeout(() => {

            $$(".hero .reveal").forEach(
                (element) => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }, 1200);

    }
);