document.addEventListener("DOMContentLoaded", () => {
  const createBar = () => {
    new SimpleBar(document.querySelector('.menu-dropdown'));
  };

  const showDropList = () => {
    const titles = document.querySelectorAll(".header__info-heading");
    const lists = document.querySelectorAll(".header__dropdown");
    const key = 27

    titles.forEach((title) => {
      title.addEventListener("click", (e) => {
        const currentList = e.currentTarget.parentNode.querySelector(".header__dropdown");

        lists.forEach((list) => {
          if (list != currentList) {
            setTimeout(() => {
              list.style.visibility = "hidden";
            }, 300);

            list.inert = true;
            list.classList.remove("header__dropdown_active");

            titles.forEach((heading) => {
              if (heading != e.currentTarget) {
                heading.classList.remove("header__info-heading_active");
              }
            });
          }
        });

        if (currentList.classList.contains("header__dropdown_active")) {
          currentList.inert = true;
        } else {
          currentList.inert = false;
        }

        window.addEventListener("keydown", ev => {
          if (ev.keyCode == key) {
            lists.forEach(list => {
              list.inert = true;
              list.classList.remove("header__dropdown_active");
            });
            titles.forEach((heading) => {
              heading.classList.remove("header__info-heading_active");
            });
          };
        });

        e.currentTarget.classList.toggle("header__info-heading_active");
        currentList.style.visibility = "visible";
        currentList.classList.toggle("header__dropdown_active");
      });
    });
  };

   if (document.querySelector(".container").offsetWidth <= 1054) {
    const showList = () => {
      const links = document.querySelectorAll(".menu__link");
      const body = document.body;
      const burger = document.querySelector(".burger");
      const menu = document.querySelector(".menu");
      const hero = document.querySelector(".main").children[0];
      const container = document.createElement("div");
      const close = document.querySelector(".menu__close");
      const header = document.querySelector(".header");
      const inertElements = document.querySelectorAll("[inert]");
      const screenHeight = window.screen.height
      const key = 27;

      container.classList.add("container", "menu__container");
      container.style.width = "100%";
      container.append(close);
      container.append(document.querySelector(".menu__list"));
      container.append(document.querySelector(".menu__entry-link"));
      menu.append(container);

      menu.inert = true;

      function deleteInert () {
        menu.classList.remove("menu_active");
        container.classList.remove("menu__container_active");
        body.style.overflowY = "auto";
        burger.focus();

        Array.from(document.body.querySelectorAll("*")).forEach(child => {
          inertElements.forEach(el => {
            child.inert = false;
            el.inert = true;
          });
        });
        menu.inert = true;
      }

      links.forEach(link => {
        link.addEventListener("click", () => {
          deleteInert();
        });
      });

      burger.addEventListener("click", () => {
        menu.classList.add("menu_active");
        container.classList.add("menu__container_active");
        if (menu.offsetHeight > screenHeight) {
          body.style.overflowY = "hidden";
        }

        menu.inert = false;

        Array.from(document.body.children).forEach(child => {
          if (child !== header) {
            child.inert = false;
          } else {
            Array.from(header.querySelector(".header__top").children).forEach(baby => {;
              if (baby !== menu) {
                baby.inert = true;
              }
            });
          };

          if (child.children[0] == hero) {
            child.children[0].inert = true;
          }
        });

        document.addEventListener("keydown", e => {
          if (e.keyCode == key) {
            deleteInert();
          }
        });

        close.focus();
      });

      close.addEventListener("click", () => {
        deleteInert();
      });
    }

    const showInput = () => {
      if (document.querySelector(".container").offsetWidth <= 900) {
        const block = document.querySelector(".header__search");
        const container = document.querySelector(".header__top");
        const burger = document.querySelector(".burger");
        const logo = document.querySelector(".header__logo-link");
        const button = document.querySelector(".header__search-mobile");
        const form = document.querySelector(".header__form-mobile");
        const input = document.querySelector(".header__input-mobile");
        const close = document.querySelector(".header__form-close");
        form.inert = true;
        close.inert = true;

        button.addEventListener("click", () => {
          form.inert = false;
          block.classList.add("header__search_active");
          burger.classList.add("burger_active");
          logo.classList.add("logo_active");
          container.classList.add("header__top_active");
          form.classList.add("header__form-mobile_active");
          close.classList.add("header__form-close_active");
          input.value = "";
          close.inert = false;
          input.focus();
        });

        close.addEventListener("click", () => {
          block.style.display = "none";
          block.classList.remove("header__search_active");
          form.classList.remove("header__form-mobile_active");
          close.classList.remove("header__form-close_active");
          burger.classList.remove("burger_active");
          logo.classList.remove("logo_active");
          container.classList.remove("header__top_active");
          input.value = "";
          close.inert = true;
          form.inert = true;
          button.focus();
          block.style.display = "flex";
        });
      } else if (document.querySelector(".container").offsetWidth <= 1054) {
        const button = document.querySelector(".header__search-mobile");
        const parent = document.querySelector(".header__mobile-right");
        const logo = document.querySelector(".header__logo-link");
        const form = document.querySelector(".header__form-mobile");
        const input = document.querySelector(".header__input-mobile");
        const close = document.querySelector(".header__form-close");
        form.inert = true;
        close.inert = true;

        button.addEventListener("click", () => {
          if (form.classList.contains("header__form-mobile_active")) {
            form.inert = true;
          } else {
            form.inert = false;
            logo.classList.add("is-active")
            parent.classList.add("is-active");
          }

          form.classList.toggle("header__form-mobile_active");
          close.classList.toggle("header__form-close_active");
          input.value = "";
          close.inert = false;
          input.focus();
        });

        close.addEventListener("click", () => {
          form.classList.remove("header__form-mobile_active");
          close.classList.remove("header__form-close_active");
          input.value = "";
          close.inert = true;
          form.inert = true;
          button.focus();
        });
      }
    }

    showInput();
    showList();
  }

  createBar();
  showDropList();
});
