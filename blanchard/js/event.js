function disabledButtons(init) {
  const slides = document.querySelectorAll(".events__item");
  const slidesVisible = document.querySelectorAll(".events__slide_visible");
  const buttonNext = document.querySelector(".events__button-next");
  const buttonPrev = document.querySelector(".events__button-prev");

  buttonPrev.style.visibility = "visible";

  if (slidesVisible[slidesVisible.length - 1] == slides[slides.length - 1]) {
    buttonNext.style.opacity = "0";
    buttonPrev.style.opacity = "1";
    buttonPrev.focus();
  } else if (slidesVisible[0] == slides[0]) {
    buttonPrev.style.opacity = "0";
    buttonNext.style.opacity = "1";

    buttonNext.focus();
  } else {
    buttonPrev.style.opacity = "1";
    buttonNext.style.opacity = "1";
  }

  if (init === "init") {
    buttonPrev.style.visibility = "hidden";
    buttonPrev.blur();
    buttonNext.blur();
  }

  slides.forEach((slide) => {
    slide.inert = true;
  });
  slidesVisible.forEach((slideVisible) => {
    slideVisible.inert = false;
  });
}

const eventSwiper = new Swiper(".events__swiper", {
  slideClass: "events__item",
  wrapperClass: "events__wrapper",
  direction: 'horizontal',


  speed: 500,

  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideVisibleClass: 'events__slide_visible',
  on: {
    slideChange: () => { disabledButtons()},
    init: () => { disabledButtons("init")},
  },
  breakpoints: {
    1201: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 50,
      allowTouchMove: false,
      navigation: {
        nextEl: '.events__button-next',
        prevEl: '.events__button-prev',
      },
    },

    901: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 27,
      allowTouchMove: true,
      navigation: {
        nextEl: '',
        prevEl: '',
      },
      pagination: {
        el: ".events__pagination",
        type: "bullets",
        clickable: true,
      }
    },

    501: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
      pagination: {
        el: ".events__pagination",
        type: "bullets",
        clickable: true,
      }
    },

    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      pagination: {
        el: ".events__pagination",
        type: "bullets",
        clickable: true,
      }
    },
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    slideLabelMessage: '',
  },
});
