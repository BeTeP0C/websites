document.addEventListener("DOMContentLoaded", () => {
  const createTooltip = () => {
    tippy('.projects__tooltip', {
      duration: 300,
      arrow: true,
      theme: 'projects-tooltip',
      maxWidth: 265,
      hideOnClick: true,
      trigger: "click",
    });

    const buttons = document.querySelectorAll(".projects__tooltip");
    const text = document.querySelector(".projects__description");

    text.addEventListener("click", (e) => {
        buttons.forEach(child => {
          if (e.target != child) {
            child.classList.remove("projects__tooltip_active");
          }
        });
    });

    buttons.forEach(button => {
      button.addEventListener("blur", () => {
        button.classList.remove("projects__tooltip_active");
      });

      button.addEventListener("click", (e) => {
        buttons.forEach(child => {
          const icon = child.querySelector(".projects__sing");

          if (child.hasAttribute("aria-describedby")) {
            child.classList.toggle("projects__tooltip_active");
            // icon.style.opacity = "0";
          } else {
            child.classList.remove("projects__tooltip_active");
            // icon.style.opacity = "1";
          }
        });
      })
    });
  };

  function inertCards () {
    const slides = document.querySelectorAll(".partners__item");
    const slidesVisible = document.querySelectorAll(".projects__slide_visible");

    slides.forEach((slide) => {
      slide.inert = true;
    });
    slidesVisible.forEach((slideVisible) => {
      slideVisible.inert = false;
    });
    }

  const createSlider = () => {
    const projectsSwiper = new Swiper(".partners__swiper", {
      wrapperClass: "partners__list",
      slideClass: "partners__item",
      direction: 'horizontal',
      allowTouchMove: false,
      speed: 500,
      navigation: {
        nextEl: '.partners__button-next',
        prevEl: '.partners__button-prev',
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slideVisibleClass: 'projects__slide_visible',
      on: {
        init: () => { inertCards()},
        slideChange: () => { inertCards()},
      },
      breakpoints: {
        1201: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        },

        901: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 50,
        },

        501: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
        },

        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 0,
        }
      },
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        slideLabelMessage: "",
      },
    })
  };

  createTooltip();
  createSlider();
});
