let isNavOpen = false;

// portable navbar btn
const navBtn = document.querySelector(".nav-btn");
const navHam = document.querySelector(".ri-menu-line");
const portableNavBar = document.querySelector(".nav-portable");
const crossBtn = document.querySelector(".nav-portable-close");

// CONSIDER USING VIDEOS

//for smooth scrolling
const lenis = new Lenis();

lenis.on("scroll");

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const portableNavLinks = document.querySelectorAll(".nav-portable-nav-links a");
// Open portable navbar
navBtn.addEventListener("click", () => {
  if (!isNavOpen) {
    gsap.to(".nav-portable", {
      x: 0,
      duration: 0.6,
      ease: "expo.out",
    });

    gsap.from(portableNavLinks, {
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
portableNavLinks.forEach(elem => elem.addEventListener("click", closeNavBar));
document.addEventListener("click", (event) => {
  const isClickInsideNavbar = portableNavBar.contains(event.target); // Check if clicked inside navbar
  const isClickOnToggleButton = navBtn.contains(event.target); // Check if clicked on toggle button

  // Close the navbar only if the click is outside both navbar and toggle button
  if (!isClickInsideNavbar && !isClickOnToggleButton) {
    closeNavBar();
  }
});

document.addEventListener("click", (event) => {
  const isClickInsideNavbar = portableNavBar.contains(event.target);
  const isClickOnToggleButton = navBtn.contains(event.target);

  if (!isClickInsideNavbar && !isClickOnToggleButton) {
    closeNavBar();
  }
});

function closeNavBar() {
  if (isNavOpen) {
    gsap.to(".nav-portable", {
      x: "400%",
      duration: 0.3,
      ease: "expo.in",
    });

    isNavOpen = false;
  }
}

// Hover effect on nav-portable button
function scaleAnimation(element, scaleTo, duration, ease = "none") {
  gsap.to(element, {
    scale: scaleTo,
    duration: duration,
    ease: ease,
  });
}

navBtn.addEventListener("mouseenter", (event) => {
  scaleAnimation(event.target, 1.2, 0.5);
});

navBtn.addEventListener("mouseleave", (event) => {
  scaleAnimation(event.target, 1, 0.5, "power1.out");
});

// Animating nav button on scroll
gsap.from(".nav-btn", {
  scale: 0,
  duration: 0.4,
  scrollTrigger: {
    trigger: ".about-me",
    start: "top 50%",
    toggleActions: "play none none reverse",
  },
});

gsap.to(".code-box-animated", {
  rotation: 180,
  repeat: -1,
  duration: 1,
  repeatDelay: 1,
});

// nav full mousehover animation
const headings = document.querySelectorAll(".nav-full > div > a");

function dragHover(headings, intensity, ease, duration, scale) {
  headings.forEach((heading) => {
    heading.addEventListener("mouseover", () => {
      heading.addEventListener("mousemove", onMouseMove);
    });

    heading.addEventListener("mouseout", () => {
      heading.removeEventListener("mousemove", onMouseMove);
      gsap.to(heading, {
        x: 0,
        y: 0,
        ease: "",
        scale: scale,
        duration: duration,
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
      ease: ease,
      scale: 1.2,
      duration: duration,
    });
  }
}

dragHover(headings, 0.7, "power1.out", 1, 1);

const navLinks = document.querySelectorAll(".nav-portable-nav-links > a");
dragHover(navLinks, 0.1, "power1.out", 0.6, 1);

//header

// header - img reveal animation
gsap.from(".img-container > img", {
  y: -500,
  ease: "expo.out",
  duration: 1.5,
  delay: 2.2,
});

// header -  text scramble
const initScrambleEffect = (selector) => {
  const scrambleText = document.querySelector(selector);
  const originalText = scrambleText.innerText;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const duration = 0.5;

  const scramble = (element) => {
    const length = originalText.length;
    const scrambleValue = new Array(length)
      .fill("")
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");

    gsap.to(element, {
      duration: duration,
      text: {
        value: scrambleValue,
        newClass: "scramble",
      },
      ease: "none",
      onComplete: () => (element.innerText = originalText),
    });
  };

  let isScrambling = false;

  scrambleText.addEventListener("mouseover", () => {
    if (!isScrambling) {
      isScrambling = true;
      scramble(scrambleText);

      setTimeout(() => {
        isScrambling = false;
      }, duration * 1000);
    }
  });
};

initScrambleEffect(".scramble");
initScrambleEffect(".scramble-1");
initScrambleEffect(".scramble-2");

function textScrambleAnimation(splitText, gsapText, delay) {
  const aboutP = document.querySelector(splitText);
  const aboutText = aboutP.textContent.trim();
  const words = aboutText.split(/\s+/);
  aboutP.innerHTML = words
    .map((word) => `<span class="span-line"><span>${word} </span></span>`)
    .join(" ");

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Function to scramble text
  const scrambleText = (element, duration) => {
    const originalText = element.innerText; // Store original text
    const length = originalText.length;
    const scrambleValue = new Array(length)
      .fill("")
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");

    gsap.to(element, {
      duration: duration,
      text: scrambleValue,
      ease: "none",
      delay: delay,
      onComplete: () => {
        gsap.to(element, {
          duration: 0.5,
          text: originalText,
          ease: "none",
        });
      },
    });
  };

  ScrollTrigger.create({
    trigger: splitText,
    start: "top 80%",
    end: "top 20%",
    onEnter: () => {
      // Scramble each span on scroll
      document.querySelectorAll(gsapText).forEach((span) => {
        scrambleText(span, 0.3);
      });
    },
    toggleActions: "play none none reset",
  });
}


// Call the function with the selectors
textScrambleAnimation(".about-text", ".about-text > span > span", 0);
textScrambleAnimation(".skills-text", ".skills-text > span > span", 0);
textScrambleAnimation(".resume-text", ".resume-text > span > span", 0);
textScrambleAnimation(".education-text", ".education-text > span > span", 0)
textScrambleAnimation(".likings-text", ".likings-text > span > span", 0);
textScrambleAnimation(".header-para-1", ".header-para-1 > .span-line", 1);

function textRevealAnimation(selector) {
  if(window.innerWidth <= 768) return;
  const element = document.querySelector(selector);
  const text = element.textContent.trim();
  const words = text.split(" ");

  const characters = words
    .map((word) => {
      // For each word, map each character into a span, then join with empty string
      const wrappedChars = word
        .split("")
        .map((char) => {
          return `<span class="char-container"><span class="char-line">${char}</span></span>`;
        })
        .join("");

      // Return the word wrapped with spaces
      return `<span class="word-container">${wrappedChars}</span>`;
    })
    .join(" "); // Join words with spaces

  element.innerHTML = characters;

  gsap.from(element.querySelectorAll(".char-line"), {
    y: 25,
    duration: 1,
    stagger: 0.02,
    scrollTrigger: {
      trigger: element,
      start: "top 100%",
      end: "top 40%",
      scrub: 0.5,
    },
  });
}

// Call the function
for (let i = 1; i <= 5; i++) {
  textRevealAnimation(`.about-text-${i}`);
}

// pre loader

const preLoader = document.querySelector(".pre-loader");
const loaderText = document.querySelector(".pre-loader-text");

window.onload = function preLoaderFunc() {
  const loaderContent = [
    "Open it on desktop for best experience",
    "ଜୟ ଜଗନ୍ନାଥ",
    "Namoste",
    "こんにちは",
    "नमस्ते",
    "Hola",
    "Hi",
  ];
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
      ease: "expo.in",
    });
    gsap.from(".header-para", {
      y: 10,
      opacity: 0,
      ease: "expo.out",
      delay: 0.5,
    });
  }, 1000);
};

// dark and light mode

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");

  // Check for saved user preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark-mode") {
    document.body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", ""); // Remove preference
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode"); // Save preference
    }
  });
});

// Work part gsap animation

// const initialClipPaths = [
//     "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
//     "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)",
//     "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
//     "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)",
//     "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)",
//     "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
//     "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)",
//     "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)",
//     "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)",
// ];

// const finalClipPaths = [
//     "polygon(0% 0%, 33.5% 0%, 33.5% 33%, 0% 33.5%)",
//     "polygon(33% 0%, 66.5% 0%, 66.5% 33%, 33% 33.5%)",
//     "polygon(66% 0%, 100% 0%, 100% 33%, 66% 33.5%)",
//     "polygon(0% 33%, 33.5% 33%, 33.5% 66%, 0% 66.5%)",
//     "polygon(33% 33%, 66.5% 33%, 66.5% 66%, 33% 66.5%)",
//     "polygon(66% 33%, 100% 33%, 100% 66%, 66% 66.5%)",
//     "polygon(0% 66%, 33.5% 66%, 33.5% 100%, 0% 100%)",
//     "polygon(33% 66%, 66.5% 66%, 66.5% 100%, 33% 100%)",
//     "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)",
// ];

let revealContainers = document.querySelectorAll(".reveal");

revealContainers.forEach((container) => {
  if (window.innerWidth < 1024) return;
  let image = container.querySelector("img");

  // Apply will-change to optimize performance during animations
  container.style.willChange = "transform, opacity";
  image.style.willChange = "transform";

  // Create a timeline with scrollTrigger
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 50%",
      end: "top 20%",
      toggleActions: "play none none reverse", // Adds smooth reversing
    },
    defaults: {
      duration: 0.7,
      ease: "Power2.out",
    },
  });

  // Chain animations for better readability and control
  tl.set(container, { autoAlpha: 1 })
    .from(container, {
      xPercent: -100,
    })
    .from(
      image,
      {
        xPercent: 100,
        scale: 1.3,
      },
      "<"
    );
});

function animateWorkElems(elem) {
  if(window.innerWidth <= 768) return;
  // Select elements to animate based on the provided `elem` selector
  const workElems = document
    .querySelector(elem)
    .querySelectorAll(":scope > div > div > .work-content-child-animation");

  // Apply GSAP animation
  gsap.from(workElems, {
    y: 100, 
    stagger: 0.2, 
    scrollTrigger: {
      trigger: elem, 
      start: "top 80%", 
      toggleActions: "play none none reverse",
    },
  });
}

// Example usage
animateWorkElems(".work-div-1");
animateWorkElems(".work-div-2");
animateWorkElems(".work-div-3");

// Data for images
// const contentData = [
//     { imgSrc: "/Screenshot_20240420_011401.a75d83eb.png", title : "TEAMSYNC", pg : "01", index : "3" },
//     { imgSrc: "./Screenshot_20240420_061046.81e2a5d3.png", title : "CAFFEE", pg : "02" , index : "4"},
//     { imgSrc: "./Screenshot_20240421_084352.5c5af00c.png", title : "WALDO", pg : "03", index : "5" },
// ];

// let currentIndex = -1;

// // Function to update the content based on the current index
// function updateContent(index) {
//     const content = contentData[index]
//     if (index === currentIndex) return;
//     const TitleElem = document.querySelector(".work-div-1  h3");
//     const pgElem = document.querySelector(".work-div-1 p")
//     const imgElement = document.querySelector('.work-img-div img');
//         // GSAP animation for fading out the old image and fading in the new one
//         gsap.to(imgElement, { opacity: 0, duration: 0.3, onComplete: () => {
//             imgElement.src = content.imgSrc;
//             TitleElem.innerText = content.title;
//             pgElem .innerText= `P / ${content.pg}`;
//             gsap.to(imgElement, { opacity: 1, duration: 0.6});
//         }});

//     currentIndex = index;
// }

// // Function to determine device type and set thresholds
// function getThresholds() {
//     const viewportHeight = window.innerHeight;

//     let threshold1, threshold2;

//     if (window.matchMedia("(max-width: 767px)").matches) {
//         // Mobile devices
//         threshold1 = viewportHeight * 3;
//         threshold2 = viewportHeight * 4;
//     }else {
//         // PCs
//         threshold1 = viewportHeight * 3.5;
//         threshold2 = viewportHeight * 4;
//     }

//     return { threshold1, threshold2 };
// }

// // Function to handle scroll events
// function handleScroll() {
//     const scrollY = window.scrollY;
//     const { threshold1, threshold2 } = getThresholds();

//     if (scrollY < threshold1) {
//         updateContent(0);
//     } else if (scrollY >= threshold1 && scrollY < threshold2) {
//         updateContent(1);
//     } else if (scrollY >= threshold2) {
//         updateContent(2);
//     }
// }

// // Initial call to handleScroll to set the correct content based on initial scroll position
// window.addEventListener("load", handleScroll);

// // Adding event listener for scroll
// window.addEventListener("scroll", handleScroll);

// ScrollTrigger.create({
//     trigger: "#work",
//     start: "top top",
//     end: () => "+=" + window.innerHeight * 3,
//     pin: true,
//     scrub : true,
// });

// // Handle resizing for responsive adjustments
// window.addEventListener("resize", () => {
//     ScrollTrigger.refresh();
// });



(() => {
  if(window.innerWidth <= 768) return
  else {
    gsap.from(".final-section-gallery", {
    y: 300,
    scrollTrigger: {
      trigger: ".final-section-quote",
      start: "top 50%",
      end: "top 20%",
      scrub: 1,
    },
  });
  gsap.from(".final-section-quote", {
    scale: 1.5,
    opacity: 0,
    scrollTrigger: {
      trigger: ".final-section",
      start: "top 50%",
      scrub: 1,
    },
  });
  }
})();



const galleryTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".final-section-gallery",
    start: "top bottom",
    scrub: 1,
  },
});

galleryTimeline.to(".gallery-1", { x: "-5%" }, 0).to(".gallery-2", { x: 0 }, 0);

gsap.from(".innerAnimated-div", {
  scale: 0.7,
  borderRadius: "3rem",
  scrollTrigger: {
    trigger: ".more-projects-div",
    start: "top 90%",
    end: "top 20%",
    scrub: 1,
  },
});
