document.addEventListener("DOMContentLoaded", () => {
  const createPeriod = () => {
    const periods = document.querySelectorAll(".period-date");

    periods.forEach((el) => {
      el.addEventListener("focus", () => {
        el.parentNode.classList.add("history__period_focused");
      });

      el.addEventListener("blur", () => {
        el.parentNode.classList.remove("history__period_focused");
      });

      el.addEventListener("click", () => {
        el.parentNode.classList.add("history__period_active");

      });

      const blockfunctional = () => {
        if (!el.classList.contains("period_active")) {
          Array.from(el.parentNode.children).forEach((child) => {
            if (child !== el) {
              child.inert = true;
            }

            if (child == document.querySelector(".period__content_active")) {
              child.inert = false;
            }
          });
        }
      };

      blockfunctional();

      el.addEventListener("click", (e) => {
        Array.from(el.parentNode.children).forEach((child) => {
          child.inert = false;
        });

        const button = el.querySelector(".period__button");
        const content = el.parentNode.querySelector(".period__content");


        periods.forEach((element) => {
          const currentContent = element.parentNode.querySelector(".period__content");

          if (element != el) {
            element.classList.remove("period-date_active");
            element.parentNode.classList.remove("history__period_active");
            currentContent.inert = true;
            currentContent.classList.remove("period__content_active");
          }
        });

        el.classList.toggle("period-date_active");
        content.classList.toggle("period__content_active");

        if (!el.classList.contains("period-date_active")) {
          Array.from(el.parentNode.children).forEach((child) => {
            if (child != el) {
              el.parentNode.classList.remove("history__period_focused");
              el.parentNode.classList.remove("history__period_active");
              child.inert = true;
            }
          });
        }
      });
    });
  };

  const createTabs = () => {
    const buttons = document.querySelectorAll(".period__button");
    const cards = document.querySelectorAll(".history__item");
    const blockfunctional = () => {
      cards.forEach((card) => {
        if (!card.classList.contains("history__item_active")) {
          card.inert = true;
        }
      });
    };
    blockfunctional();

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const path = e.currentTarget.getAttribute("data-catalog-target");
        const target = document.querySelector(`[data-catalog-path="${path}"]`);

        cards.forEach((card) => {
          if (card !== target) {
            card.classList.remove("history__item_active")
          } else {
            card.inert = false;
          }
        });

        target.classList.add("history__item_active");
        blockfunctional();
      });
    });
  };

  createPeriod();
  createTabs();
});
