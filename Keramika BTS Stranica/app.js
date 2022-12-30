"use strict";
// Slider
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
// Calculate Price
const userSubmitButton = document.querySelector(".btn-submit-1");
const showFinalResultButton = document.querySelector(".btn-submit-2");
const formFloating = document.querySelector(".form-floating");
const showResultInput = document.querySelector(".final-result");
const inputAmount = document.querySelector(".input--amount");
const mySelect = document.querySelector(".my-select");
// Tabbed content
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// Menu fade animation
const nav = document.querySelector(".navbar");
// ////////////////////////////////////////////
// Sticky navbar
const section1 = document.querySelector(".section-1");
//////////////////////////////////
// Slider
let curSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

////////////////////////////////////////
//Calculate Price

const finalResult = function (optionNum) {
  return (showResultInput.textContent = inputAmount.value * optionNum + " KM");
};

const openResult = function () {
  formFloating.classList.remove("hidden");
  showFinalResultButton.classList.remove("hidden");
};
const openResult2 = function () {
  showResultInput.classList.remove("hidden");

  inputAmount.value <= 200 && mySelect[0].selected
    ? finalResult(15)
    : inputAmount.value <= 200 && mySelect[1].selected
    ? finalResult(15)
    : (inputAmount.value > 200 && mySelect[0].selected) || mySelect[1].selected
    ? finalResult(12)
    : inputAmount.value && mySelect[2].selected
    ? finalResult(20)
    : "";
};

userSubmitButton.addEventListener("click", openResult);
showFinalResultButton.addEventListener("click", openResult2);

/////////////////////////////
// Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;
  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  // Active tab
  clicked.classList.add("operations__tab--active");
  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".navbar").querySelectorAll(".nav-link");
    const brand = link.closest(".navbar").querySelector(".navbar-brand");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    brand.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
////////////////////////////
// Sticky navigation

const header = document.querySelector("#Pocetna");
const navHight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHight}px`,
});

headerObserver.observe(header);
// ///////////////////
// Reveal sections
const allSections = document.querySelectorAll(".section");
const allImages = document.querySelectorAll(".img-fluid");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/////////////////////////////
// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "+200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

/////////////////////////
