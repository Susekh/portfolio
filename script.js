let isNavOpen = false;


gsap.from(".page2 .header-para", {
    y : "-900%",
    x : "-125%",
    scale : 2,
    scrollTrigger : {
        trigger : "header",
        scroller : "body",
        start : "top 0",
        end : "top -100%",
        scrub : 1,
        pin : true
    }
})


gsap.from(".page2 .header-heading", {
    x : 550,
    rotation : 180,
    ease : 'power1.out',
    scrollTrigger : {
        trigger : "nav",
        scroller : "body",
        start : "top 0",
        end : "top -100%",
        scrub : 2
    }
})


// Image reveal animation


let revealContainers = document.querySelectorAll(".reveal");

// Define scroll trigger settings and common timeline settings
const scrollTriggerSettings = {
    trigger: "header",
    start: "top 0",
    scrub: 2,
  };
  
revealContainers.forEach((container) => {
    let image = container.querySelector(".reveal > img");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "restart none none reset"
      }
    });
  
    // Set initial visibility of the container
    tl.set(container, { autoAlpha: 1, scrollTrigger: scrollTriggerSettings });
  
    // Animate the container
    tl.from(container, 2, {
      x: "-120%",
      ease: Power2.out,
      scrollTrigger: scrollTriggerSettings
    });
  
    // Animate the image inside the container
    tl.from(image, 1.5, {
      x: "30%",
      scale: 1.3,
      delay: -1.5,
      ease: Power2.out,
      scrollTrigger: scrollTriggerSettings
    });
});

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
        backgroundColor: "#ef4444",
        duration: 0.5,
    });
});

navBtn.addEventListener("mouseleave", (event) => {
    const eventTarg = event.target;

    gsap.to(eventTarg, {
        scale: 1,
        backgroundColor: "gray",
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
        start: "top 70%",
        toggleActions: "play none none reverse",
    }
});



// background gradient color 2. pre loader 3. new nav 

// moving orbs


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






// about div

function aboutDivAnimation(){
    const aboutDiv = document.querySelector(".about-div");

    const tl = gsap.timeline({
            scrollTrigger: {
            trigger: aboutDiv,
            start: "top 75%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            }
    });
    
    tl.from(aboutDiv, {
        y: 100,
        duration: 1,
        opacity: 0,
    })
    .from(aboutDiv.querySelector("h3"), {
        y: 50,
        duration: 1.5,
        opacity: 0,
    }, "-=1");
};

aboutDivAnimation()




// about text revealing part

gsap.from(".about-text", {
    y : 50,
    duration : 0.5,
    stagger : 0.2,
    ease : 'power1.out',
    scrollTrigger : { 
        trigger : ".about-me",
        scroller : "body",
        scrub : 1
    }
});

gsap.from(".about-text-2", {
    y : 50,
    duration : 0.5,
    opacity : 0,
    delay : 0.5,
    ease : 'power1.out',
    scrollTrigger : {
        trigger : ".about-me",
        start: "top 80%", 
        end: "top 20%",
        toggleActions: "play none none reset",
        scrub : 1
    }
})



function textRevealAnimation(splitText, gsapText) {
    const aboutP = document.querySelector(splitText);
    const aboutText = aboutP.textContent.trim();
    const words = aboutText.split(/\s+/);
    aboutP.innerHTML = words.map(word => `<span class="span-line"><span>${word} </span></span>`).join(" ");

    gsap.from(gsapText, {
        y: 100,
        duration: 0.3,
        stagger: 0.01,
        scrollTrigger: {
            trigger: ".span-line",
            start: "top 80%", 
            end: "top 20%",
            toggleActions: "play none none reset",
        }
    });
};

textRevealAnimation(".about-text", ".about-text > span > span");



// work animation

gsap.from(".work-div", {
    x : '100%',
    scrollTrigger: {
        trigger: "#work",
        start: "top 60%",
        end: "top 30%",
        scrub: 1,
        toggleActions: "play none none reset",
    }
});

gsap.fromTo(".work-carousel", 
    { 
        x: "50%",
    },
    { 
        x: "-130%",
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".work-div",
            start: "top 15%",
            end: "top -100%",
            scrub: 1,
            pin: true,
            toggleActions: "play none none reset",
        }
    }
);


// img gallery part

gsap.to(".img-gallery-1", {
    x : 20,
    scrollTrigger : {
        trigger : ".img-gallery-1",
        start: "top 70%",
        end: "top -50%",
        scrub: 1,
        toggleActions: "play none none reset",
    }
});


gsap.to(".img-gallery-2", {
    x : -80,
    scrollTrigger : {
        trigger : ".img-gallery-1",
        start: "top 70%",
        end: "top -100%",
        scrub: 1,
        toggleActions: "play none none reset",
    }
});


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
            scale: 0.5,
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



window.addEventListener("wheel", (event) => {
    const skewAmount = event.deltaY * 1.2 ;
    const workImgs = document.querySelectorAll(".work-imgs");

    workImgs.forEach((elem) => {
        gsap.to(elem, {
            skewX: skewAmount,
            ease : "power2.out",
            scrollTrigger : {
                trigger : ".work-carousel",
                start : "top 10%",
            },
            onComplete: () => {
                gsap.to(".work-imgs", {
                    skewX: 0,
                    duration: 0.5
                });
            }
        });
    })

});