document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector('.burger__menu');
  const burger = document.querySelector('.header__button-burger');
  const close = document.querySelector('.burger__exit');
  const header = document.querySelector(".header");
  const body = document.body;

  let keys = {
    ESC: "Escape",
  };
  let previousActiveElement;

  if (document.body.offsetWidth <= 1240) {
    document.body.querySelector(".header__menu").ariaHidden = 'true';
  }

  function showMenu() {
    menu.classList.add("burger__menu_active");
    previousActiveElement = document.activeElement;

    menu.inert = false;

    Array.from(body.children).forEach((child) => {
      console.log(child);
      if (child !== header) {
        child.inert = true;

        Array.from(document.querySelector(".header__container").children).forEach((childs) => {
          if (childs !== document.querySelector(".header__left")) {
            childs.inert = true;
          }
        });
      }
    });

    setTimeout(() => {
      close.focus();
    }, 100);

    document.addEventListener('keydown', (e) => {
      console.log(e.code);

      if (e.code == keys.ESC) {
        hideMenu();
      }
    });
  }

  function hideMenu() {
    menu.classList.remove('burger__menu_active');

    Array.from(body.querySelectorAll("*")).forEach((child) => {
      if (child !== menu) {
        child.inert = false;
      }
    });

    menu.inert = true;

    setTimeout(() => {
      previousActiveElement.focus();
    }, 100);
  }

  burger.addEventListener('click', showMenu);
  close.addEventListener('click', hideMenu);

  menu.inert = true;
});


