let isNavOpen = false;

// portable navbar btn
const navBtn = document.querySelector(".nav-btn");
const navHam = document.querySelector(".ri-menu-line");
const portableNavBar = document.querySelector(".nav-portable");
const crossBtn = document.querySelector(".nav-portable-close");

// Open portable navbar
navBtn.addEventListener("click", () => {
    if (!isNavOpen) {
        gsap.to(".nav-portable", {
            x: 0,
            duration: 0.6,
            ease: "expo.out", 
        });

        gsap.from(".nav-portable-nav-links a", {
            x: 500,
            stagger: 0.05,
            ease: "expo.out",
            duration: 1.5,
        });

        isNavOpen = true;
    }
});

// Close portable navbar
crossBtn.addEventListener("click", closeNavBar);

document.addEventListener('click', (event) => {
    const isClickInsideNavbar = portableNavBar.contains(event.target);
    const isClickOnToggleButton = navBtn.contains(event.target);

    if (!isClickInsideNavbar && !isClickOnToggleButton) {
        closeNavBar();
    }
});

function closeNavBar() {
    if (isNavOpen) {
        gsap.to(".nav-portable", {
            x: "100%",
            duration : 0.3,
            ease: 'expo.in'
        });

        isNavOpen = false;
    }
}

// Hover effects on nav button
navBtn.addEventListener("mouseenter", (event) => {
    const eventTarg = event.target;

    gsap.to(eventTarg, {
        scale: 1.2,
        duration: 0.5,
    });
});

navBtn.addEventListener("mouseleave", (event) => {
    const eventTarg = event.target;

    gsap.to(eventTarg, {
        scale: 1,
        duration: 0.5,
        ease: "power1.out"
    });
});

// Animating nav button on scroll
gsap.from(".nav-btn", {
    scale: 0,
    duration: 0.4,
    scrollTrigger: {
        trigger: ".about-me",
        start: "top 50%",
        toggleActions: "play none none reverse",
    }
});



// nav full mousehover
const headings = document.querySelectorAll(".nav-full > div > a");

function dragHover(headings, intensity, ease, duration) {
    headings.forEach((heading) => {
        heading.addEventListener("mouseover", () => {
            heading.addEventListener("mousemove", onMouseMove);
        });
    
        heading.addEventListener("mouseout", () => {
            heading.removeEventListener("mousemove", onMouseMove);
            gsap.to(heading, {
                x: 0,
                y: 0,
                ease : '',
                scale: 1,
                duration: duration
            });
        });
    });
    
    function onMouseMove(event) {
        const heading = event.target;
        const rect = heading.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
    
        gsap.to(heading, {
            x: offsetX * intensity,
            y: offsetY * intensity,
            ease : ease,
            scale: 1.2,
            duration: duration
        });
    }
};

dragHover(headings, 0.7, 'power1.out', 1);

const navLinks = document.querySelectorAll(".nav-portable-nav-links > a");
dragHover(navLinks, 0.1, 'power1.out', 0.6);



//header

// header - img reveal animation
gsap.from(".img-container > img", {
    y : -500,
    ease : "expo.out",
    duration : 1.5,
    delay : 1.7
})

// header -  text scramble
const initScrambleEffect = (selector) => {
    const scrambleText = document.querySelector(selector);
    const originalText = scrambleText.innerText;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const duration = 0.5;

    const scramble = (element) => {
        const length = originalText.length;
        const scrambleValue = new Array(length).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');

        gsap.to(element, {
            duration: duration,
            text: {
                value: scrambleValue,
                newClass: "scramble"
            },
            ease: "none",
            onComplete: () => element.innerText = originalText
        });
    };

    let isScrambling = false;

    scrambleText.addEventListener('mouseover', () => {
        if (!isScrambling) {
            isScrambling = true;
            scramble(scrambleText);

            setTimeout(() => {
                isScrambling = false;
            }, duration * 1000);
        }
    });
};


initScrambleEffect('.scramble');
initScrambleEffect('.scramble-1');
initScrambleEffect('.scramble-2');


function textScrambleAnimation(splitText, gsapText, delay) {
    const aboutP = document.querySelector(splitText);
    const aboutText = aboutP.textContent.trim();
    const words = aboutText.split(/\s+/);
    aboutP.innerHTML = words.map(word => `<span class="span-line"><span>${word} </span></span>`).join(" ");

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Function to scramble text
    const scrambleText = (element, duration) => {
        const originalText = element.innerText; // Store original text
        const length = originalText.length;
        const scrambleValue = new Array(length).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');

        gsap.to(element, {
            duration: duration,
            text: scrambleValue,
            ease: "none",
            delay : delay,
            onComplete: () => {
                gsap.to(element, {
                    duration: 0.5,
                    text: originalText,
                    ease: "none"
                });
            }
        });
    };

    ScrollTrigger.create({
        trigger: splitText,
        start: "top 80%", 
        end: "top 20%",
        onEnter: () => {
            // Scramble each span on scroll
            document.querySelectorAll(gsapText).forEach(span => {
                scrambleText(span, 0.3);
            });
        },
        toggleActions: "play none none reset",
    });
}

// Call the function with the selectors
textScrambleAnimation(".about-text", ".about-text > span > span", 0);
textScrambleAnimation(".header-para-1", ".header-para-1 > .span-line", 1);



// pre loader

const preLoader = document.querySelector(".pre-loader");
const loaderText = document.querySelector(".pre-loader-text");

window.onload = function preLoaderFunc() {
    const loaderContent = ["ଜୟ ଜଗନ୍ନାଥ", "Namoste", "こんにちは", "नमस्ते", "Hola", "Hi"];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
        loaderText.textContent = loaderContent[currentIndex];
        currentIndex = (currentIndex + 1) % loaderContent.length;
    }, 100);

    setTimeout(() => {
        clearInterval(intervalId);

        gsap.to(preLoader, {
            display: "none",
            y: "-100%",
            ease: "expo.in"
        });
        gsap.from(".header-para", {
            y: 10,
            opacity: 0,
            ease: "expo.out",
            delay: 0.5
        });
    }, 1000);
}


// dark and light mode

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        document.body.classList.add('dark-mode');
    }

    toggleButton.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', ''); // Remove preference
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode'); // Save preference
        }
    });
});




// about part gsap animation

// Data for images
const contentData = [
    { imgSrc: "./imgs/Screenshot_20240420_061046.png", title : "TEAMSYNC", pg : "01" },
    { imgSrc: "./imgs/Screenshot_20240420_011401.png", title : "CAFFEE", pg : "02" },
    { imgSrc: "./imgs/Screenshot_20240421_084352.png", title : "WALDO", pg : "03" }
];

let currentIndex = -1;

// Function to update the content based on the current index
function updateContent(index) {
    const content = contentData[index]
    if (index === currentIndex) return;
    const TitleElem = document.querySelector(".work-div-1  h3");
    const pgElem = document.querySelector(".work-div-1 p")
    const imgElement = document.querySelector('.work-img-div img');
        // GSAP animation for fading out the old image and fading in the new one
        gsap.to(imgElement, { opacity: 0, duration: 0.3, onComplete: () => {
            imgElement.src = content.imgSrc;
            TitleElem.innerText = content.title;
            pgElem .innerText= `P / ${content.pg}`;
            gsap.to(imgElement, { opacity: 1, duration: 0.3});
        }});

    currentIndex = index;
}

// Function to determine device type and set thresholds
function getThresholds() {
    const viewportHeight = window.innerHeight;

    let threshold1, threshold2;

    if (window.matchMedia("(max-width: 767px)").matches) {
        // Mobile devices
        threshold1 = viewportHeight * 3;
        threshold2 = viewportHeight * 4;
    } else if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) {
        // Tablets
        threshold1 = viewportHeight * 3;
        threshold2 = viewportHeight * 4;
    } else {
        // PCs
        threshold1 = viewportHeight * 3;
        threshold2 = viewportHeight * 4;
    }

    return { threshold1, threshold2 };
}

// Function to handle scroll events
function handleScroll() {
    const scrollY = window.scrollY;
    const { threshold1, threshold2 } = getThresholds();

    if (scrollY < threshold1) {
        updateContent(0);
    } else if (scrollY >= threshold1 && scrollY < threshold2) {
        updateContent(1);
    } else if (scrollY >= threshold2) {
        updateContent(2);
    }
}

// Initial call to handleScroll to set the correct content based on initial scroll position
window.addEventListener("load", handleScroll);

// Adding event listener for scroll
window.addEventListener("scroll", handleScroll);

ScrollTrigger.create({
    trigger: "#work",
    start: "top top",
    end: () => "+=" + window.innerHeight * 3,
    pin: true,
    scrub : true,
});

// Handle resizing for responsive adjustments
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});


gsap.to(".work-scroll-bar", {
    x : 0,
    scrollTrigger : {
        trigger : "#work",
        start : "top top",
        end: () => "+=" + window.innerHeight * 3,
        scrub : 2
    }
});