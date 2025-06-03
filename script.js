// Data configuration
const data = [
  {
    name: "Tasknet",
    type: "Project",
    slug: "https://tasknet.susekh.tech",
    project: "live-link",
    label: "Collaboration"
  },
  {
    name: "Kanban & Sprint Planning",
    type: "Project",
    slug: "https://github.com/Susekh/TaskNest-client",
    project: "github-link",
    label: "Tasknet"
  },
  {
    name: "Find Waldo",
    type: "Project",
    slug: "https://find-waldo.khilar.me",
    project: "live-link",
    label: "Game"
  },
  {
    name: "AWS Lambda Deployment",
    type: "Project",
    slug: "https://github.com/Susekh/where-s_waldo",
    project: "github-link",
    label: "Find Waldo"
  },
  {
    name: "Real time chatting",
    type: "Project",
    slug: "https://github.com/Susekh/team-sync",
    project: "github-link",
    label: "TeamSync"
  },
  {
    name: "Pokématch",
    type: "Project",
    slug: "https://codecircuit.khilar.me",
    project: "live-link",
    label: "Frontend"
  },
  {
    name: "Memory Game UI/UX",
    type: "Project",
    slug: "https://github.com/Susekh/PokeMatch",
    project: "github-link",
    label: "Pokématch"
  }
];


// Utility functions
const utils = {
  isMobile: () => window.innerWidth <= 768,
  isDesktop: () => window.innerWidth > 1024,
  getElement: (selector) => document.querySelector(selector),
  getElements: (selector) => document.querySelectorAll(selector),
  debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  },
  throttle: (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return (...args) => {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func.apply(null, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(null, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }
};

// Smooth scrolling initialization
const initLenis = () => {
  const lenis = new Lenis();
  lenis.on("scroll");
  
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
};

// Navigation module
const Navigation = {
  isNavOpen: false,
  
  init() {
    this.cacheElements();
    this.bindEvents();
    this.initAnimations();
  },
  
  cacheElements() {
    this.navBtn = utils.getElement(".nav-btn");
    this.navHam = utils.getElement(".ri-menu-line");
    this.portableNavBar = utils.getElement(".nav-portable");
    this.crossBtn = utils.getElement(".nav-portable-close");
    this.portableNavLinks = utils.getElements(".nav-portable-nav-links a");
    this.headings = utils.getElements(".nav-full > div > a");
    this.navLinks = utils.getElements(".nav-portable-nav-links > a");
  },
  
  bindEvents() {
    // Open navigation
    this.navBtn?.addEventListener("click", () => this.openNav());
    
    // Close navigation
    this.crossBtn?.addEventListener("click", () => this.closeNav());
    this.portableNavLinks.forEach(elem => 
      elem.addEventListener("click", () => this.closeNav())
    );
    
    // Close on outside click
    document.addEventListener("click", (e) => this.handleOutsideClick(e));
    
    // Hover effects
    this.initHoverEffects();
  },
  
  openNav() {
    if (this.isNavOpen) return;
    
    gsap.to(".nav-portable", {
      x: 0,
      duration: 0.6,
      ease: "expo.out",
    });

    gsap.from(this.portableNavLinks, {
      x: 500,
      stagger: 0.05,
      ease: "expo.out",
      duration: 1.5,
    });

    this.isNavOpen = true;
  },
  
  closeNav() {
    if (!this.isNavOpen) return;
    
    gsap.to(".nav-portable", {
      x: "400%",
      duration: 0.3,
      ease: "expo.in",
    });

    this.isNavOpen = false;
  },
  
  handleOutsideClick(event) {
    const isClickInsideNavbar = this.portableNavBar?.contains(event.target);
    const isClickOnToggleButton = this.navBtn?.contains(event.target);

    if (!isClickInsideNavbar && !isClickOnToggleButton) {
      this.closeNav();
    }
  },
  
  initHoverEffects() {
    // Nav button hover
    if (this.navBtn) {
      this.navBtn.addEventListener("mouseenter", (e) => {
        gsap.to(e.target, { scale: 1.2, duration: 0.5 });
      });
      
      this.navBtn.addEventListener("mouseleave", (e) => {
        gsap.to(e.target, { scale: 1, duration: 0.5, ease: "power1.out" });
      });
    }
    
    // Drag hover effects
    this.initDragHover(this.headings, 0.7, "power1.out", 1, 1);
    this.initDragHover(this.navLinks, 0.1, "power1.out", 0.6, 1);
  },
  
  initDragHover(elements, intensity, ease, duration, scale) {
    elements.forEach((element) => {
      const onMouseMove = (event) => {
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: offsetX * intensity,
          y: offsetY * intensity,
          ease: ease,
          scale: 1.2,
          duration: duration,
        });
      };
      
      element.addEventListener("mouseover", () => {
        element.addEventListener("mousemove", onMouseMove);
      });

      element.addEventListener("mouseout", () => {
        element.removeEventListener("mousemove", onMouseMove);
        gsap.to(element, {
          x: 0,
          y: 0,
          ease: "",
          scale: scale,
          duration: duration,
        });
      });
    });
  },
  
  initAnimations() {
    // Nav button scroll animation
    gsap.from(".nav-btn", {
      scale: 0,
      duration: 0.4,
      scrollTrigger: {
        trigger: ".about-me",
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
  }
};

// Text animation module
const TextAnimations = {
  init() {
    this.initScrambleEffects();
    this.initTextRevealAnimations();
  },
  
  initScrambleEffects() {
    const scrambleSelectors = [".scramble", ".scramble-1", ".scramble-2"];
    scrambleSelectors.forEach(selector => this.initScrambleEffect(selector));
    
    // Text scramble animations with scroll trigger
    this.textScrambleAnimation(".about-text", ".about-text > span > span", 0);
    this.textScrambleAnimation(".header-para-1", ".header-para-1 > .span-line", 1);
    this.textScrambleAnimation(".skills-text", ".skills-text > span > span", 0);
    this.textScrambleAnimation(".projects-text", ".projects-text > span > span", 0);
  },
  
  initScrambleEffect(selector) {
    const scrambleText = utils.getElement(selector);
    if (!scrambleText) return;
    
    const originalText = scrambleText.innerText;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const duration = 0.5;
    let isScrambling = false;

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

    scrambleText.addEventListener("mouseover", () => {
      if (isScrambling) return;
      
      isScrambling = true;
      scramble(scrambleText);
      setTimeout(() => { isScrambling = false; }, duration * 1000);
    });
  },
  
  textScrambleAnimation(splitText, gsapText, delay) {
    const element = utils.getElement(splitText);
    if (!element) return;
    
    const text = element.textContent.trim();
    const words = text.split(/\s+/);
    element.innerHTML = words
      .map((word) => `<span class="span-line"><span>${word} </span></span>`)
      .join(" ");

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const scrambleText = (element, duration) => {
      const originalText = element.innerText;
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
        utils.getElements(gsapText).forEach((span) => {
          scrambleText(span, 0.3);
        });
      },
      toggleActions: "play none none reset",
    });
  },
  
  initTextRevealAnimations() {
    // Only on desktop
    if (utils.isMobile()) return;
    
    // Can be extended for multiple selectors if needed
    // this.textRevealAnimation(`.about-text-${i}`) for i in range
  },
  
  textRevealAnimation(selector) {
    const element = utils.getElement(selector);
    if (!element) return;
    
    const text = element.textContent.trim();
    const words = text.split(" ");

    const characters = words
      .map((word) => {
        const wrappedChars = word
          .split("")
          .map((char) => `<span class="char-container"><span class="char-line">${char}</span></span>`)
          .join("");
        return `<span class="word-container">${wrappedChars}</span>`;
      })
      .join(" ");

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
};

// Header animations
const HeaderAnimations = {
  init() {
    this.initImageReveal();
    this.initHeaderText();
  },
  
  initImageReveal() {
    gsap.from(".img-container > img", {
      y: -500,
      ease: "expo.out",
      duration: 1.5,
      delay: 2.2,
    });
  },
  
  initHeaderText() {
    gsap.from(".header-para", {
      y: 10,
      opacity: 0,
      ease: "expo.out",
      delay: 0.5,
    });
  }
};

// Preloader module
const Preloader = {
  init() {
    window.addEventListener('load', () => this.handlePreloader());
  },
  
  handlePreloader() {
    const preLoader = utils.getElement(".pre-loader");
    const loaderText = utils.getElement(".pre-loader-text");
    
    if (!preLoader || !loaderText) return;
    
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
    }, 1000);
  }
};

// Theme toggle module
const ThemeToggle = {
  init() {
    document.addEventListener("DOMContentLoaded", () => this.setupThemeToggle());
  },
  
  setupThemeToggle() {
    const toggleButton = utils.getElement("#theme-toggle");
    if (!toggleButton) return;

    // Check for saved user preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark-mode") {
      document.body.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", () => {
      const isDarkMode = document.body.classList.contains("dark-mode");
      
      if (isDarkMode) {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "");
      } else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
      }
    });
  }
};

// Scroll animations module
const ScrollAnimations = {
  init() {
    this.initMiscAnimations();
    this.initFinalSectionAnimations();
    this.initGalleryAnimations();
  },
  
  initMiscAnimations() {
    // Code box rotation
    gsap.to(".code-box-animated", {
      rotation: 180,
      repeat: -1,
      duration: 1,
      repeatDelay: 1,
    });
  },
  
  initFinalSectionAnimations() {
    if (utils.isMobile()) return;
    
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
  },
  
  initGalleryAnimations() {
    const galleryTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".final-section-gallery",
        start: "top bottom",
        scrub: 1,
      },
    });

    galleryTimeline
      .to(".gallery-1", { x: "-5%" }, 0)
      .to(".gallery-2", { x: 0 }, 0);

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
  }
};

// Project hover effects
const ProjectHover = {
  init() {
    this.cacheElements();
    if (this.hasAllElements()) {
      this.bindEvents();
    }
  },
  
  cacheElements() {
    this.projects = utils.getElement(".projects");
    this.preview = utils.getElement(".preview");
    this.previewImg = utils.getElement(".preview-img");
  },
  
  hasAllElements() {
    return this.projects && this.preview && this.previewImg;
  },
  
  bindEvents() {
    this.isInside = false;
    this.bgPositions = {
      "p-1": "0 33%",
      "p-2": "0 66%",
      "p-3": "0 100%",
    };

    window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    
    Array.from(this.projects.children).forEach((project) => {
      project.addEventListener("mousemove", (e) => {
        this.moveProject(e);
        this.moveProjectImg(project);
      });
    });
  },
  
  handleMouseMove(e) {
    const mouseInside = this.isMouseInsideContainer(e);

    if (mouseInside !== this.isInside) {
      this.isInside = mouseInside;
      gsap.to(this.preview, {
        scale: this.isInside ? 1 : 0,
        duration: 0.3
      });
    }
  },
  
  isMouseInsideContainer(e) {
    const rect = this.projects.getBoundingClientRect();
    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
  },
  
  moveProject(e) {
    const rect = this.preview.getBoundingClientRect();
    const offsetX = rect.width / 2;
    const offsetY = rect.height / 2;

    this.preview.style.left = `${e.pageX - offsetX}px`;
    this.preview.style.top = `${e.pageY - offsetY}px`;
  },
  
  moveProjectImg(project) {
    const projectId = project.id;
    gsap.to(this.previewImg, {
      backgroundPosition: this.bgPositions[projectId] || "0 0",
      duration: 0.4
    });
  }
};

// Skills/Awards section
const SkillsSection = {
  POSITIONS: {
    BOTTOM: 0,
    MIDDLE: -80,
    TOP: -160,
  },
  
  init() {
    this.cacheElements();
    this.initState();
    this.populateAwards();
    this.bindEvents();
  },
  
  cacheElements() {
    this.awardsListContainer = utils.getElement(".awards-list");
    this.awardPreview = utils.getElement(".award-preview");
  },
  
  initState() {
    this.lastMousePosition = { x: 0, y: 0 };
    this.activeAward = null;
    this.ticking = false;
    this.mouseTimeout = null;
    this.isMouseMoving = false;
  },
  
  populateAwards() {
    if (!Array.isArray(data) || !this.awardsListContainer) return;
    
    data.forEach((award) => {
      const awardElement = document.createElement("div");
      awardElement.className = "award";
      awardElement.innerHTML = `
        <div class="award-wrapper">
          <div class="award-name">
            <h1 class="skill-h1">${award.name}</h1>
            <h1 class="skill-h1">${award.type}</h1>
          </div>
          <div class="award-project">
            <h1>${award.project}</h1>
            <h1>${award.label}</h1>
          </div>
          <div class="award-name">
            <h1 class="skill-h1">${award.name}</h1>
            <h1 class="skill-h1">${award.type}</h1> 
          </div>
        </div>
      `;
      this.awardsListContainer.appendChild(awardElement);
    });
    
    this.awardsElements = utils.getElements(".award");
  },
  
  bindEvents() {
    const throttledMouseMove = utils.throttle((e) => this.handleMouseMove(e), 16);
    const throttledScroll = utils.throttle(() => this.handleScroll(), 16);
    
    document.addEventListener("mousemove", throttledMouseMove);
    document.addEventListener("scroll", throttledScroll, { passive: true });
    
    this.bindAwardEvents();
  },
  
  handleMouseMove(e) {
    this.lastMousePosition.x = e.clientX;
    this.lastMousePosition.y = e.clientY;
    this.isMouseMoving = true;

    if (this.mouseTimeout) clearTimeout(this.mouseTimeout);

    const isInside = this.isMouseInsideAwardsList();

    if (isInside) {
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false;
        this.cleanupOldImages();
      }, 2000);
    }

    this.animatePreview();
  },
  
  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateAwards());
      this.ticking = true;
    }
  },
  
  isMouseInsideAwardsList() {
    if (!this.awardsListContainer) return false;
    
    const rect = this.awardsListContainer.getBoundingClientRect();
    return (
      this.lastMousePosition.x >= rect.left &&
      this.lastMousePosition.x <= rect.right &&
      this.lastMousePosition.y >= rect.top &&
      this.lastMousePosition.y <= rect.bottom
    );
  },
  
  animatePreview() {
    const isOutside = !this.isMouseInsideAwardsList();

    if (isOutside && this.awardPreview) {
      const previewImages = this.awardPreview.querySelectorAll("img");
      previewImages.forEach((img) => {
        gsap.to(img, {
          scale: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => img.remove(),
        });
      });
    }
  },
  
  updateAwards() {
    this.animatePreview();

    if (this.activeAward) {
      const rect = this.activeAward.getBoundingClientRect();
      const isStillOver = (
        this.lastMousePosition.x >= rect.left &&
        this.lastMousePosition.x <= rect.right &&
        this.lastMousePosition.y >= rect.top &&
        this.lastMousePosition.y <= rect.bottom
      );

      if (!isStillOver) {
        const wrapper = this.activeAward.querySelector(".award-wrapper");
        const leavingFromTop = this.lastMousePosition.y < rect.top + rect.height / 2;
        gsap.to(wrapper, {
          y: leavingFromTop ? this.POSITIONS.TOP : this.POSITIONS.BOTTOM,
          duration: 0.4,
          ease: "power2.out",
        });
        this.activeAward = null;
      }
    }

    this.awardsElements.forEach((award) => {
      if (award === this.activeAward) return;

      const rect = award.getBoundingClientRect();
      const isMouseOver = (
        this.lastMousePosition.x >= rect.left &&
        this.lastMousePosition.x <= rect.right &&
        this.lastMousePosition.y >= rect.top &&
        this.lastMousePosition.y <= rect.bottom
      );

      if (isMouseOver && this.isMouseMoving) {
        const wrapper = award.querySelector(".award-wrapper");
        gsap.to(wrapper, {
          y: this.POSITIONS.MIDDLE,
          duration: 0.4,
          ease: "power2.out",
        });
        this.activeAward = award;
      }
    });

    this.ticking = false;
  },
  
  cleanupOldImages() {
    if (!this.awardPreview) return;
    
    const images = this.awardPreview.querySelectorAll("img");
    if (images.length > 1) {
      const lastImage = images[images.length - 1];
      images.forEach((img) => {
        if (img !== lastImage) {
          gsap.to(img, {
            scale: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => img.remove(),
          });
        }
      });
    }
  },
  
  bindAwardEvents() {
    this.awardsElements.forEach((award, index) => {
      const wrapper = award.querySelector(".award-wrapper");
      let currentPosition = this.POSITIONS.TOP;

      award.addEventListener("mouseenter", (e) => {
        this.activeAward = award;
        const rect = award.getBoundingClientRect();
        const enterFromTop = e.clientY < rect.top + rect.height / 2;

        if (enterFromTop || currentPosition === this.POSITIONS.BOTTOM) {
          currentPosition = this.POSITIONS.MIDDLE;
          gsap.to(wrapper, {
            y: this.POSITIONS.MIDDLE,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        this.createPreviewImage(index);
      });

      award.addEventListener("mouseleave", (e) => {
        this.activeAward = null;
        const rect = award.getBoundingClientRect();
        const leavingFromTop = e.clientY < rect.top + rect.height / 2;

        currentPosition = leavingFromTop ? this.POSITIONS.TOP : this.POSITIONS.BOTTOM;
        gsap.to(wrapper, {
          y: currentPosition,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });
  },
  
  createPreviewImage(index) {
    if (!this.awardPreview) return;
    
    const img = document.createElement("img");
    img.src = `./imgs/${index + 1}.jpg`;
    img.style.position = "absolute";
    img.style.top = 0;
    img.style.left = 0;
    img.style.scale = 0;
    img.style.zIndex = Date.now();

    this.awardPreview.appendChild(img);

    gsap.to(img, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }
};

// new skills sec

const container = document.querySelector(".grid");
const highlight = document.querySelector(".highlight");
const gridItems = document.querySelectorAll(".grid-item");
const firstItem = document.querySelector(".grid-item");

const highlightcolors = [
  '#2563EB', // Blue-600
  '#38BDF8', // Sky-400
  '#1E3A8A', // Indigo-800
  '#E11D48', // Rose-600 (bold pink/red)
  '#F97316', // Orange-500 (accent)
  '#9333EA', // Purple-600 (lavender contrast)
  '#0EA5E9', // Cyan-500
  '#10B981', // Emerald-500 (aqua-green)
  '#F43F5E', // Pink-500
  '#3B82F6', // Blue-500
];

gridItems.forEach((item, index) => {
  item.dataset.color = highlightcolors[index % highlightcolors.length];
});

const moveToElement = (element) => {
  if (element) {
    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.backgroundColor = element.dataset.color;
  }
};

const moveHighlight = (e) => {
  const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
  if (hoveredElement) {
    const target = hoveredElement.closest(".grid-item");
    if (target) moveToElement(target);
  }
};

moveToElement(firstItem);

container.addEventListener("mousemove", moveHighlight);


// mouse move

const follower = document.querySelector(".mouse-follower");

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.2;

let lastX = 0, lastY = 0;
let lastMoveTime = performance.now();

const animate = () => {
  const now = performance.now();
  const dx = mouseX - currentX;
  const dy = mouseY - currentY;
  const velocity = Math.sqrt(dx * dx + dy * dy);

  currentX += dx * speed;
  currentY += dy * speed;

  const isMoving = velocity > 0.5;
  const stretchFactor = isMoving ? 1 + Math.min(velocity / 100, 0.1) : 1;

  follower.style.transform = `
    translate(${currentX}px, ${currentY}px)
    scaleX(${stretchFactor})
    scaleY(${2 - stretchFactor})
  `;

  requestAnimationFrame(animate);
};

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lastMoveTime = performance.now();
});

animate();



// Main initialization
const App = {
  init() {
    // Initialize smooth scrolling first
    initLenis();
    
    // Initialize all modules
    Navigation.init();
    TextAnimations.init();
    HeaderAnimations.init();
    Preloader.init();
    ThemeToggle.init();
    ScrollAnimations.init();
    ProjectHover.init();
    SkillsSection.init();
  }
};

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}