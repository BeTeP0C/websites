document.addEventListener("DOMContentLoaded", () => {
    // select
  const createSelect = () => {
    const element = document.querySelector('.choice__select');
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: "",
    });
  }

  // checkbox
  const clickCheckbox = () => {
    const checkboxs = document.querySelectorAll(".gallery__input");
    checkboxs.forEach((el) => {
      el.addEventListener("click", () => {
        el.classList.toggle("gallery__input_active");
      });
    });
  }

  const addClassVisible = () => {
    const slides = document.querySelectorAll(".gallery__slide");
    slides.forEach((slide) => {
      if (slide.classList.contains("gallery__slide_visible")) {
        slide.tabIndex = "0";
      } else {
        slide.tabIndex = "-1";
      }
    });
  }

  // swiper
  const createSwiper = () => {
    const gallerySwiper = new Swiper('.gallery__slides', {
      slideClass: "gallery__slide",
      wrapperClass: "gallery__wrapper",
      direction: 'horizontal',
      loop: true,
      speed: 500,
      navigation: {
        nextEl: '.gallery__button-next',
        prevEl: '.gallery__button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slideVisibleClass: 'gallery__slide_visible',
      on: {
        init: () => addClassVisible(),
        slideChange: () => addClassVisible(),
      },
      breakpoints: {
        1201: {
          spaceBetween: 50,
          slidesPerGroup: 3,
          slidesPerView: 3,
        },

        901: {
          spaceBetween: 34,
          slidesPerView: 2,
          slidesPerGroup: 2,
        },

        501: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 38,
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
        slideLabelMessage: "Модальное окно",
      },
    });
  }

  // modalWindow
  const createModalWindow = () => {
    const body = document.body;
    const html = document.querySelector("html");
    const main = document.querySelector(".main");
    const gallery = document.querySelector(".gallery");
    const slides = document.querySelectorAll(".gallery__slide");
    const modals = document.querySelector(".gallery__modals");
    const modalOverlay = document.querySelector(".gallery__modal-overlay");
    const inertElements = document.querySelectorAll("[inert]");
    const key = 27;

    slides.forEach((el) => {
      el.addEventListener("click", (e) => {
        const path = e.currentTarget.getAttribute("data-gallery-path");
        const modalCard = document.querySelector(`[data-gallery-target="${path}"]`);
        const close = modalCard.querySelector(".modal__close");

        Array.from(body.children).forEach((child) => {
          if (child !== main) {
            child.inert = true;

            Array.from(main.children).forEach((childs) => {
              if (childs !== gallery) {
                childs.inert = true;

                Array.from(gallery.children).forEach((elem) => {
                  if (elem !== modals) {
                    elem.inert = true;
                  }
                });
              }
            });
          }
        });
        setTimeout(() => {
          close.focus();
        }, 100);

        const returnModals = () => {
          Array.from(body.querySelectorAll("*")).forEach((child) => {

            inertElements.forEach(element => {
                child.inert = false;
                element.inert = true;

            });
          });

          modals.style.display = "none";
          modals.classList.remove("gallery__modals_active");
          body.style.overflowY = "scroll";
          modalOverlay.style.visibility = "hidden";
          modalCard.classList.remove("modal_visible");
          modalCard.classList.remove("modal_hiding");
          modalCard.classList.remove("mobile-height");
          modalCard.style.overflowY = "hidden";
          el.focus();
        }
        const tryEsc = () => {
          window.addEventListener("keydown", (e) => {
            if (e.keyCode === key) {
              modals.classList.add("gallery__modals_active");
              modalCard.classList.add("modal_hiding");
              setTimeout(() => {
                returnModals();
              }, 500);
            }
          });
        }

        modals.style.display = "block";
        body.style.overflowY = "hidden";
        modalOverlay.style.visibility = "visible";
        modalCard.classList.add("modal_visible");

        if (modalCard.offsetHeight > window.innerHeight) {
          modalCard.style.overflowY = "scroll";
          modalCard.classList.add("mobile-height");
        }

        modalOverlay.addEventListener("click", (e) => {
          if (e.target == modalOverlay) {
            modals.classList.add("gallery__modals_active");
            modalCard.classList.add("modal_hiding");
            setTimeout(() => {
              returnModals();
            }, 500);
          } else if (e.target == close) {
            modals.classList.add("gallery__modals_active");
            modalCard.classList.add("modal_hiding");
            setTimeout(() => {
              returnModals();
            }, 500);
          }
        });

        setTimeout(() => {
          tryEsc();
        });
      })
    });
  }

  createSelect();
  clickCheckbox();
  createSwiper()
  createModalWindow();
});
