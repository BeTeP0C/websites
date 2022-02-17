const heroSwiper = new Swiper('.hero__swiper', {
  slideClass: "hero__slide",
  wrapperClass: "hero__wrapper",
  direction: 'horizontal',
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    1201: {
      allowTouchMove: false,
    },

    901: {
      allowTouchMove: true,
    },

    501: {
      allowTouchMove: true,
    },

    0: {
      allowTouchMove: false,
    }
  },
});
